import {NextResponse} from 'next/server'
import {
  createHmac,
  randomUUID,
} from 'node:crypto'
import path from 'node:path'

export const runtime = 'nodejs'

const MAX_FILES = 5
const MAX_FILE_SIZE = 500 * 1024 * 1024
const MAX_TOTAL_SIZE = 1024 * 1024 * 1024

const TOKEN_LIFETIME_MS =
  15 * 60 * 1000

const ALLOWED_EXTENSIONS =
  new Set([
    '.step',
    '.stp',
    '.stl',
    '.obj',
  ])

type AuthorizedFile = {
  slot: number
  name: string
  size: number
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

function signPayload(
  payload: object,
  secret: string,
) {
  const encoded =
    Buffer.from(
      JSON.stringify(payload),
    ).toString('base64url')

  const signature =
    createHmac(
      'sha256',
      secret,
    )
      .update(encoded)
      .digest('base64url')

  return `${encoded}.${signature}`
}

export async function POST(
  request: Request,
) {
  try {
    const body =
      await request.json()

    const turnstileToken =
      String(
        body?.turnstileToken ||
          '',
      ).trim()

    if (!turnstileToken) {
      return NextResponse.json(
        {
          error:
            'Varnostno preverjanje ni bilo dokončano.',
        },
        {status: 400},
      )
    }

    const rawFiles =
      Array.isArray(body?.files)
        ? body.files
        : []

    if (
      rawFiles.length < 1 ||
      rawFiles.length >
        MAX_FILES
    ) {
      return NextResponse.json(
        {
          error:
            `Dovoljenih je največ ${MAX_FILES} datotek.`,
        },
        {status: 400},
      )
    }

    const files: AuthorizedFile[] =
      []

    let totalSize = 0

    for (
      let index = 0;
      index < rawFiles.length;
      index += 1
    ) {
      const rawFile =
        rawFiles[index]

      const name =
        safeFileName(
          rawFile?.name,
        )

      const size =
        Number(rawFile?.size)

      if (!name) {
        return NextResponse.json(
          {
            error:
              'Ena od datotek nima veljavnega imena.',
          },
          {status: 400},
        )
      }

      const extension =
        path
          .extname(name)
          .toLowerCase()

      if (
        !ALLOWED_EXTENSIONS.has(
          extension,
        )
      ) {
        return NextResponse.json(
          {
            error:
              `Datoteka "${name}" ni dovoljena. Dovoljeni so STEP, STP, STL in OBJ.`,
          },
          {status: 400},
        )
      }

      if (
        !Number.isFinite(
          size,
        ) ||
        size <= 0 ||
        size >
          MAX_FILE_SIZE
      ) {
        return NextResponse.json(
          {
            error:
              `Datoteka "${name}" je prevelika ali nima veljavne velikosti.`,
          },
          {status: 400},
        )
      }

      totalSize += size

      if (
        totalSize >
        MAX_TOTAL_SIZE
      ) {
        return NextResponse.json(
          {
            error:
              'Skupna velikost datotek je lahko največ 1 GB.',
          },
          {status: 400},
        )
      }

      files.push({
        slot: index,
        name,
        size,
      })
    }

    const turnstileSecret =
      process.env
        .TURNSTILE_SECRET_KEY

    const uploadSecret =
      process.env
        .UPLOAD_AUTH_SECRET

    if (
      !turnstileSecret ||
      !uploadSecret
    ) {
      console.error(
        'Turnstile ali upload secret manjka.',
      )

      return NextResponse.json(
        {
          error:
            'Varnostni sistem trenutno ni pravilno nastavljen.',
        },
        {status: 500},
      )
    }

    // ----------------------------------
    // CLOUDFLARE TURNSTILE VERIFY
    // ----------------------------------

    const forwardedFor =
      request.headers.get(
        'x-forwarded-for',
      )

    const remoteIp =
      request.headers.get(
        'cf-connecting-ip',
      ) ||
      forwardedFor
        ?.split(',')[0]
        ?.trim() ||
      ''

    const verifyBody =
      new URLSearchParams()

    verifyBody.set(
      'secret',
      turnstileSecret,
    )

    verifyBody.set(
      'response',
      turnstileToken,
    )

    if (remoteIp) {
      verifyBody.set(
        'remoteip',
        remoteIp,
      )
    }

    const turnstileResponse =
      await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/x-www-form-urlencoded',
          },

          body:
            verifyBody.toString(),
        },
      )

    if (
      !turnstileResponse.ok
    ) {
      console.error(
        'Turnstile HTTP napaka:',
        turnstileResponse.status,
      )

      return NextResponse.json(
        {
          error:
            'Varnostnega preverjanja ni bilo mogoče dokončati.',
        },
        {status: 500},
      )
    }

    const turnstileResult =
      await turnstileResponse.json()

    if (
      !turnstileResult.success
    ) {
      console.error(
        'Turnstile preverjanje zavrnjeno:',
        turnstileResult[
          'error-codes'
        ],
      )

      return NextResponse.json(
        {
          error:
            'Varnostno preverjanje ni uspelo. Poskusite ponovno.',
        },
        {status: 403},
      )
    }

    // ----------------------------------
    // LAZTEK UPLOAD TOKEN
    // ----------------------------------

    const uploadGroup =
      randomUUID()

    const expiresAt =
      Date.now() +
      TOKEN_LIFETIME_MS

    const uploadToken =
      signPayload(
        {
          version: 1,

          uploadGroup,

          expiresAt,

          files,
        },

        uploadSecret,
      )

    return NextResponse.json({
      success: true,

      uploadToken,

      uploadGroup,

      expiresAt,
    })
  } catch (error) {
    console.error(
      'Upload authorize napaka:',
      error,
    )

    return NextResponse.json(
      {
        error:
          'Pri varnostnem preverjanju je prišlo do napake.',
      },
      {status: 500},
    )
  }
}