import {NextResponse} from 'next/server'
import {google} from 'googleapis'

export const runtime = 'nodejs'

export async function GET() {
  // Testni endpoint dovolimo samo lokalno.
  // Na Vercelu naj ne bo javno dostopen.
  if (process.env.VERCEL === '1') {
    return new NextResponse('Not Found', {
      status: 404,
    })
  }

  try {
    const clientId =
      process.env.GOOGLE_CLIENT_ID

    const clientSecret =
      process.env.GOOGLE_CLIENT_SECRET

    const refreshToken =
      process.env.GOOGLE_REFRESH_TOKEN

    if (
      !clientId ||
      !clientSecret ||
      !refreshToken
    ) {
      return NextResponse.json(
        {
          error:
            'Manjkajo Google OAuth nastavitve.',
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

    const existing =
      await drive.files.list({
        q: [
          "name = 'LazTek - Povpraševanja'",
          "mimeType = 'application/vnd.google-apps.folder'",
          'trashed = false',
        ].join(' and '),

        fields:
          'files(id,name,webViewLink)',

        spaces: 'drive',
      })

    let folder =
      existing.data.files?.[0]

    if (!folder) {
      const created =
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

          fields:
            'id,name,webViewLink',
        })

      folder =
        created.data
    }

    return NextResponse.json({
      success: true,

      folderId:
        folder?.id,

      folderName:
        folder?.name,

      folderUrl:
        folder?.id
          ? `https://drive.google.com/drive/folders/${folder.id}`
          : null,
    })
  } catch (error) {
    console.error(
      'Google Drive test napaka:',
      error,
    )

    return NextResponse.json(
      {
        success: false,

        error:
          'Google Drive povezava ni uspela.',
      },
      {status: 500},
    )
  }
}