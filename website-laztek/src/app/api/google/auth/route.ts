import {NextResponse} from 'next/server'
import {google} from 'googleapis'

export const runtime = 'nodejs'

export async function GET() {
  // Ta route dovolimo samo lokalno.
  // Na Vercelu ne sme biti javno dostopen.
  if (process.env.VERCEL === '1') {
    return new NextResponse('Not Found', {
      status: 404,
    })
  }

  const clientId =
    process.env.GOOGLE_CLIENT_ID

  const clientSecret =
    process.env.GOOGLE_CLIENT_SECRET

  const redirectUri =
    process.env.GOOGLE_REDIRECT_URI

  if (
    !clientId ||
    !clientSecret ||
    !redirectUri
  ) {
    return NextResponse.json(
      {
        error:
          'Google OAuth nastavitve manjkajo.',
      },
      {status: 500},
    )
  }

  const oauth2Client =
    new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUri,
    )

  const authUrl =
    oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      include_granted_scopes: true,

      scope: [
        'https://www.googleapis.com/auth/drive.file',
      ],
    })

  return NextResponse.redirect(
    authUrl,
  )
}