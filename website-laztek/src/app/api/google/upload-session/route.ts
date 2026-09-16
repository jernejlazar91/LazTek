import {NextResponse} from 'next/server'
import {google} from 'googleapis'
import {
  createHmac,
  timingSafeEqual,
} from 'node:crypto'

export const runtime = 'nodejs'

type AuthorizedFile = {
  slot: number
  name: string
  size: number
}

type UploadPayload = {
  version: number
  uploadGroup: string
  expiresAt: number
  files: AuthorizedFile[]
}

function cleanText(
  value: unknown,
  maxLength: number,
) {
  return String(value || '')
    .trim()
    .replace(
      /[<>:"/\\|?*\x00-\x1F]/g,
      '',
    )
    .slice(0, maxLength)
}

function safeFileName(
  value: unknown,
) {
  return String(value || '')
    .trim()
    .replace(/[\/\\]/g, '_')
    .replace(
      /[\x00-\x1F]/g,
      '',
    )
    .slice(0, 220)
}

function isAllowedOrigin(
  origin: string,
) {
  if (
    origin ===
      'http://localhost:3000' ||
    origin ===
      'https://laztek.si' ||
    origin ===
      'https://www.laztek.si'
  ) {
    return true
  }

  /*
   * Omogoči tudi Vercel preview.
   */
  try {
    const url =
      new URL(origin)

    return (
      url.protocol === 'https:' &&
      url.hostname.endsWith(
        '.vercel.app',
      )
    )
  } catch {
    return false
  }
}

function verifyUploadToken(
  token: string,
  secret: string,
): UploadPayload | null {
  try {
    const parts =
      token.split('.')

    if (
      parts.length !== 2
    ) {
      return null
    }

    const [
      encoded,
      receivedSignature,
    ] = parts

    const expectedSignature =
      createHmac(
        'sha256',
        secret,
      )
        .update(encoded)
        .digest('base64url')

    const receivedBuffer =
      Buffer.from(
        receivedSignature,
      )

    const expectedBuffer =
      Buffer.from(
        expectedSignature,
      )

    if (
      receivedBuffer.length !==
      expectedBuffer.length
    ) {
      return null
    }

    if (
      !timingSafeEqual(
        receivedBuffer,
        expectedBuffer,
      )
    ) {
      return null
    }

    const decoded =
      Buffer.from(
        encoded,
        'base64url',
      ).toString('utf8')

    const payload =
      JSON.parse(
        decoded,
      ) as UploadPayload

    if (
      payload.version !== 1 ||
      !payload.uploadGroup ||
      !Array.isArray(
        payload.files,
      ) ||
      !Number.isFinite(
        payload.expiresAt,
      )
    ) {
      return null
    }

    if (
      Date.now() >
      payload.expiresAt
    ) {
      return null
    }

    return payload
  } catch {
    return null
  }
}

export async function POST(
  request: Request,
) {
  try {
    const body =
      await request.json()

    const uploadToken =
      String(
        body?.uploadToken || '',
      ).trim()

    const slot =
      Number(body?.slot)

    const fileName =
      safeFileName(
        body?.fileName,
      )

    const fileSize =
      Number(
        body?.fileSize,
      )

    const fileType =
      String(
        body?.fileType || '',
      ).trim() ||
      'application/octet-stream'

    const customerName =
      cleanText(
        body?.customerName,
        100,
      )

    const company =
      cleanText(
        body?.company,
        120,
      )

    const bodyOrigin =
      String(
        body?.origin || '',
      ).trim()

    const headerOrigin =
      request.headers.get(
        'origin',
      ) || ''

    const origin =
      headerOrigin ||
      bodyOrigin

    if (
      !origin ||
      !isAllowedOrigin(origin)
    ) {
      return NextResponse.json(
        {
          error:
            'Neveljaven izvor zahteve.',
        },
        {status: 403},
      )
    }

    const uploadSecret =
      process.env
        .UPLOAD_AUTH_SECRET

    if (!uploadSecret) {
      console.error(
        'UPLOAD_AUTH_SECRET ni nastavljen.',
      )

      return NextResponse.json(
        {
          error:
            'Varnostni sistem ni pravilno nastavljen.',
        },
        {status: 500},
      )
    }

    const payload =
      verifyUploadToken(
        uploadToken,
        uploadSecret,
      )

    if (!payload) {
      return NextResponse.json(
        {
          error:
            'Dovoljenje za nalaganje je neveljavno ali je poteklo.',
        },
        {status: 403},
      )
    }

    if (
      !Number.isInteger(slot) ||
      slot < 0
    ) {
      return NextResponse.json(
        {
          error:
            'Neveljavna pozicija datoteke.',
        },
        {status: 400},
      )
    }

    const authorizedFile =
      payload.files.find(
        (file) =>
          file.slot === slot,
      )

    if (!authorizedFile) {
      return NextResponse.json(
        {
          error:
            'Datoteka ni bila odobrena za nalaganje.',
        },
        {status: 403},
      )
    }

    /*
     * Ime in velikost se morata popolnoma
     * ujemati s Turnstile-avtorizirano datoteko.
     */
    if (
      authorizedFile.name !==
        fileName ||
      authorizedFile.size !==
        fileSize
    ) {
      return NextResponse.json(
        {
          error:
            'Podatki datoteke se ne ujemajo z dovoljenjem za nalaganje.',
        },
        {status: 403},
      )
    }

    const clientId =
      process.env
        .GOOGLE_CLIENT_ID

    const clientSecret =
      process.env
        .GOOGLE_CLIENT_SECRET

    const refreshToken =
      process.env
        .GOOGLE_REFRESH_TOKEN

    if (
      !clientId ||
      !clientSecret ||
      !refreshToken
    ) {
      console.error(
        'Google OAuth okoljske spremenljivke manjkajo.',
      )

      return NextResponse.json(
        {
          error:
            'Google Drive trenutno ni pravilno nastavljen.',
        },
        {status: 500},
      )
    }

    const oauth2Client =
      new google.auth.OAuth2(
        clientId,
        clientSecret,
      )

    oauth2Client.setCredentials({
      refresh_token:
        refreshToken,
    })

    const drive =
      google.drive({
        version: 'v3',
        auth: oauth2Client,
      })

    // ---------------------------------
    // GLAVNA MAPA
    // ---------------------------------

    const rootSearch =
      await drive.files.list({
        q: [
          "name = 'LazTek - Povpraševanja'",
          "mimeType = 'application/vnd.google-apps.folder'",
          'trashed = false',
        ].join(' and '),

        fields:
          'files(id,name)',

        spaces: 'drive',
      })

    let rootFolderId =
      rootSearch.data.files?.[0]
        ?.id

    if (!rootFolderId) {
      const rootFolder =
        await drive.files.create({
          requestBody: {
            name:
              'LazTek - Povpraševanja',

            mimeType:
              'application/vnd.google-apps.folder',

            appProperties: {
              laztek:
                'contact-uploads',
            },
          },

          fields: 'id',
        })

      rootFolderId =
        rootFolder.data.id ||
        undefined
    }

    if (!rootFolderId) {
      throw new Error(
        'Glavne Google Drive mape ni bilo mogoče ustvariti.',
      )
    }

    // ---------------------------------
    // MAPA TEGA POVPRAŠEVANJA
    // ---------------------------------

    const uploadGroup =
      payload.uploadGroup

    const inquirySearch =
      await drive.files.list({
        q: [
          `'${rootFolderId}' in parents`,
          "mimeType = 'application/vnd.google-apps.folder'",
          'trashed = false',
          `appProperties has { key='uploadGroup' and value='${uploadGroup}' }`,
        ].join(' and '),

        fields:
          'files(id,name)',

        spaces: 'drive',
      })

    let inquiryFolderId =
      inquirySearch.data
        .files?.[0]?.id

    if (!inquiryFolderId) {
      const today =
        new Intl.DateTimeFormat(
          'sv-SE',
          {
            timeZone:
              'Europe/Ljubljana',

            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          },
        ).format(
          new Date(),
        )

      const namePart =
        customerName ||
        'Novo povpraševanje'

      const companyPart =
        company
          ? ` - ${company}`
          : ''

      const folderName =
        `${today} - ${namePart}${companyPart}`.slice(
          0,
          180,
        )

      const inquiryFolder =
        await drive.files.create({
          requestBody: {
            name:
              folderName,

            mimeType:
              'application/vnd.google-apps.folder',

            parents: [
              rootFolderId,
            ],

            appProperties: {
              uploadGroup,

              laztek:
                'contact-inquiry',
            },
          },

          fields:
            'id,name',
        })

      inquiryFolderId =
        inquiryFolder.data.id ||
        undefined
    }

    if (!inquiryFolderId) {
      throw new Error(
        'Mape povpraševanja ni bilo mogoče ustvariti.',
      )
    }

    // ---------------------------------
    // GOOGLE ACCESS TOKEN
    // ---------------------------------

    const token =
      await oauth2Client.getAccessToken()

    const accessToken =
      token.token

    if (!accessToken) {
      throw new Error(
        'Google access token ni bil pridobljen.',
      )
    }

    // ---------------------------------
    // RESUMABLE UPLOAD SESSION
    // ---------------------------------

    const metadata = {
      name:
        authorizedFile.name,

      parents: [
        inquiryFolderId,
      ],

      appProperties: {
        uploadGroup,

        laztek:
          'contact-file',
      },
    }

    const googleResponse =
      await fetch(
        'https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&fields=id,name,size',
        {
          method: 'POST',

          headers: {
            Authorization:
              `Bearer ${accessToken}`,

            Origin:
              origin,

            'Content-Type':
              'application/json; charset=UTF-8',

            'X-Upload-Content-Type':
              fileType,

            'X-Upload-Content-Length':
              String(
                authorizedFile.size,
              ),
          },

          body:
            JSON.stringify(
              metadata,
            ),
        },
      )

    if (
      !googleResponse.ok
    ) {
      const googleError =
        await googleResponse.text()

      console.error(
        'Google resumable upload napaka:',
        googleError,
      )

      return NextResponse.json(
        {
          error:
            'Google Drive upload seje ni bilo mogoče ustvariti.',
        },
        {status: 500},
      )
    }

    const uploadUrl =
      googleResponse.headers.get(
        'location',
      )

    if (!uploadUrl) {
      throw new Error(
        'Google ni vrnil resumable upload URL-ja.',
      )
    }

    return NextResponse.json({
      success: true,

      uploadUrl,

      folderUrl:
        `https://drive.google.com/drive/folders/${inquiryFolderId}`,
    })
  } catch (error) {
    console.error(
      'Google upload-session napaka:',
      error,
    )

    return NextResponse.json(
      {
        error:
          'Pri pripravi Google Drive nalaganja je prišlo do napake.',
      },
      {status: 500},
    )
  }
}