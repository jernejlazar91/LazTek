import {NextResponse} from 'next/server'
import {google} from 'googleapis'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  // Samo lokalni razvoj.
  // Na Vercelu tega callback endpointa ne izpostavljamo.
  if (process.env.VERCEL === '1') {
    return new NextResponse('Not Found', {
      status: 404,
    })
  }

  try {
    const url = new URL(request.url)
    const code =
      url.searchParams.get('code')

    if (!code) {
      return NextResponse.json(
        {
          error:
            'Google ni vrnil authorization code.',
        },
        {status: 400},
      )
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

    const {tokens} =
      await oauth2Client.getToken(
        code,
      )

    console.log('')
    console.log(
      '========================================',
    )
    console.log(
      'GOOGLE DRIVE POVEZAVA USPEŠNA',
    )
    console.log(
      '========================================',
    )

    if (tokens.refresh_token) {
      console.log(
        `GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`,
      )
    } else {
      console.log(
        'Refresh token ni bil vrnjen. Ponovno odpri /api/google/auth.',
      )
    }

    console.log(
      '========================================',
    )
    console.log('')

    return new NextResponse(
      `
      <!DOCTYPE html>
      <html lang="sl">
        <body
          style="
            background:#050816;
            color:white;
            font-family:Arial,sans-serif;
            padding:50px;
          "
        >
          <h1>Google Drive povezan ✓</h1>

          <p>
            Avtorizacija je uspela.
          </p>

          <p>
            Vrni se v terminal, kjer teče
            <strong>npm run dev</strong>.
          </p>

          <p>
            Tam bo izpisan GOOGLE_REFRESH_TOKEN.
          </p>

          <p>
            Tega tokena ne deli z nikomer.
          </p>
        </body>
      </html>
      `,
      {
        status: 200,

        headers: {
          'Content-Type':
            'text/html; charset=utf-8',
        },
      },
    )
  } catch (error) {
    console.error(
      'Google OAuth napaka:',
      error,
    )

    return NextResponse.json(
      {
        error:
          'Google Drive povezave ni bilo mogoče dokončati.',
      },
      {status: 500},
    )
  }
}