import {NextResponse} from 'next/server'
import {Resend} from 'resend'

export const runtime = 'nodejs'

type UploadedFile = {
  name: string
  size: number
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function formatFileSize(bytes: number) {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return ''
  }

  if (bytes >= 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
  }

  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(0)} KB`
  }

  return `${bytes} B`
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const name = String(body?.name || '').trim()
    const company = String(body?.company || '').trim()
    const email = String(body?.email || '').trim()
    const phone = String(body?.phone || '').trim()
    const message = String(body?.message || '').trim()
    const website = String(body?.website || '').trim()

    const driveFolderUrl = String(
      body?.driveFolderUrl || '',
    ).trim()

    const uploadedFiles: UploadedFile[] = Array.isArray(
      body?.uploadedFiles,
    )
      ? body.uploadedFiles
          .slice(0, 5)
          .map(
            (file: {
              name?: unknown
              size?: unknown
            }) => ({
              name: String(file?.name || '')
                .trim()
                .slice(0, 220),

              size: Number(file?.size || 0),
            }),
          )
          .filter(
            (file: UploadedFile) =>
              file.name.length > 0 &&
              Number.isFinite(file.size) &&
              file.size >= 0,
          )
      : []

    // Honeypot proti spam botom.
    // Pravi uporabnik tega skritega polja ne vidi.
    if (website) {
      return NextResponse.json({
        success: true,
      })
    }

    // -----------------------------------------------------
    // OSNOVNA VALIDACIJA
    // -----------------------------------------------------

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          error:
            'Prosimo, izpolnite ime, e-pošto in sporočilo.',
        },
        {status: 400},
      )
    }

    if (name.length > 100) {
      return NextResponse.json(
        {
          error: 'Ime je predolgo.',
        },
        {status: 400},
      )
    }

    if (company.length > 120) {
      return NextResponse.json(
        {
          error: 'Naziv podjetja je predolg.',
        },
        {status: 400},
      )
    }

    if (email.length > 160) {
      return NextResponse.json(
        {
          error: 'E-poštni naslov je predolg.',
        },
        {status: 400},
      )
    }

    if (phone.length > 50) {
      return NextResponse.json(
        {
          error: 'Telefonska številka je predolga.',
        },
        {status: 400},
      )
    }

    if (message.length < 10) {
      return NextResponse.json(
        {
          error: 'Sporočilo je prekratko.',
        },
        {status: 400},
      )
    }

    if (message.length > 5000) {
      return NextResponse.json(
        {
          error: 'Sporočilo je predolgo.',
        },
        {status: 400},
      )
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          error:
            'Vnesite veljaven e-poštni naslov.',
        },
        {status: 400},
      )
    }

    // -----------------------------------------------------
    // RESEND
    // -----------------------------------------------------

    const apiKey =
      process.env.RESEND_API_KEY

    if (!apiKey) {
      console.error(
        'RESEND_API_KEY ni nastavljen.',
      )

      return NextResponse.json(
        {
          error:
            'Pošiljanje trenutno ni na voljo. Manjka nastavitev e-poštnega sistema.',
        },
        {status: 500},
      )
    }

    const resend = new Resend(apiKey)

    // -----------------------------------------------------
    // ZAŠČITA VSEBINE ZA HTML MAIL
    // -----------------------------------------------------

    const safeName = escapeHtml(name)
    const safeCompany =
      escapeHtml(company)
    const safeEmail =
      escapeHtml(email)
    const safePhone =
      escapeHtml(phone)
    const safeMessage =
      escapeHtml(message)

    /*
     * Sprejmemo samo URL v obliki:
     *
     * https://drive.google.com/drive/folders/ID
     *
     * Tako uporabnik ne more podtakniti poljubnega URL-ja
     * v gumb e-pošte.
     */
    const driveFolderUrlRegex =
      /^https:\/\/drive\.google\.com\/drive\/folders\/[A-Za-z0-9_-]+$/

    const safeDriveFolderUrl =
      driveFolderUrlRegex.test(
        driveFolderUrl,
      )
        ? driveFolderUrl
        : ''

    const safeUploadedFiles =
      uploadedFiles.map((file) => ({
        name: escapeHtml(file.name),
        size: file.size,
      }))

    // -----------------------------------------------------
    // HTML ZA PRILOŽENE CAD DATOTEKE
    // -----------------------------------------------------

    const filesHtml =
      safeUploadedFiles.length > 0 &&
      safeDriveFolderUrl
        ? `
          <div style="margin-top:28px;">
            <h2
              style="
                margin:0 0 12px;
                font-size:18px;
                line-height:1.4;
              "
            >
              Priložene CAD / 3D datoteke
            </h2>

            <div
              style="
                background:#ecfeff;
                border:1px solid #a5f3fc;
                border-radius:12px;
                padding:18px;
              "
            >
              <div
                style="
                  margin-bottom:14px;
                  font-size:13px;
                  color:#155e75;
                  line-height:1.6;
                "
              >
                Datoteke so bile naložene v Google Drive.
              </div>

              ${safeUploadedFiles
                .map((file) => {
                  const size =
                    formatFileSize(file.size)

                  return `
                    <div
                      style="
                        padding:8px 0;
                        border-bottom:1px solid #cffafe;
                        color:#164e63;
                        font-size:14px;
                        line-height:1.5;
                      "
                    >
                      <strong>${file.name}</strong>
                      ${
                        size
                          ? `<span style="color:#64748b;"> · ${size}</span>`
                          : ''
                      }
                    </div>
                  `
                })
                .join('')}

              <a
                href="${safeDriveFolderUrl}"
                target="_blank"
                rel="noopener noreferrer"
                style="
                  display:inline-block;
                  margin-top:18px;
                  background:#0891b2;
                  color:#ffffff;
                  text-decoration:none;
                  font-weight:700;
                  font-size:14px;
                  padding:12px 18px;
                  border-radius:10px;
                "
              >
                Odpri datoteke v Google Drive
              </a>
            </div>
          </div>
        `
        : ''

    // -----------------------------------------------------
    // POŠLJI MAIL
    // -----------------------------------------------------

    const {data, error} =
      await resend.emails.send({
        from:
          'LazTek Engineering <povprasevanje@laztek.si>',

        to: [
          'jernej.lazar91@gmail.com',
        ],

        /*
         * Če v Gmailu klikneš Reply,
         * odgovoriš neposredno stranki.
         */
        replyTo: email,

        subject:
          `Novo povpraševanje LazTek.si – ${name}`,

        html: `
          <!DOCTYPE html>
          <html lang="sl">
            <body
              style="
                margin:0;
                padding:0;
                background:#f4f6f8;
              "
            >
              <div
                style="
                  max-width:700px;
                  margin:0 auto;
                  padding:32px 20px;
                  font-family:Arial,Helvetica,sans-serif;
                  color:#111827;
                "
              >
                <div
                  style="
                    background:#ffffff;
                    border:1px solid #e5e7eb;
                    border-radius:18px;
                    padding:28px;
                  "
                >
                  <div
                    style="
                      font-size:12px;
                      font-weight:700;
                      text-transform:uppercase;
                      letter-spacing:1.5px;
                      color:#0891b2;
                      margin-bottom:10px;
                    "
                  >
                    LazTek Engineering
                  </div>

                  <h1
                    style="
                      margin:0 0 10px;
                      font-size:26px;
                      line-height:1.25;
                    "
                  >
                    Novo povpraševanje
                  </h1>

                  <p
                    style="
                      margin:0 0 26px;
                      color:#6b7280;
                      line-height:1.6;
                    "
                  >
                    Novo sporočilo je bilo poslano preko
                    kontaktnega obrazca na LazTek.si.
                  </p>

                  <table
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      border-collapse:collapse;
                    "
                  >
                    <tr>
                      <td
                        style="
                          padding:12px 0;
                          border-bottom:1px solid #e5e7eb;
                          width:150px;
                          color:#6b7280;
                          vertical-align:top;
                        "
                      >
                        Ime in priimek
                      </td>

                      <td
                        style="
                          padding:12px 0;
                          border-bottom:1px solid #e5e7eb;
                          font-weight:600;
                        "
                      >
                        ${safeName}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding:12px 0;
                          border-bottom:1px solid #e5e7eb;
                          color:#6b7280;
                          vertical-align:top;
                        "
                      >
                        Podjetje
                      </td>

                      <td
                        style="
                          padding:12px 0;
                          border-bottom:1px solid #e5e7eb;
                        "
                      >
                        ${safeCompany || '—'}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding:12px 0;
                          border-bottom:1px solid #e5e7eb;
                          color:#6b7280;
                          vertical-align:top;
                        "
                      >
                        E-pošta
                      </td>

                      <td
                        style="
                          padding:12px 0;
                          border-bottom:1px solid #e5e7eb;
                        "
                      >
                        <a
                          href="mailto:${safeEmail}"
                          style="
                            color:#0891b2;
                          "
                        >
                          ${safeEmail}
                        </a>
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding:12px 0;
                          border-bottom:1px solid #e5e7eb;
                          color:#6b7280;
                          vertical-align:top;
                        "
                      >
                        Telefon
                      </td>

                      <td
                        style="
                          padding:12px 0;
                          border-bottom:1px solid #e5e7eb;
                        "
                      >
                        ${safePhone || '—'}
                      </td>
                    </tr>
                  </table>

                  <h2
                    style="
                      margin:28px 0 10px;
                      font-size:18px;
                    "
                  >
                    Sporočilo
                  </h2>

                  <div
                    style="
                      white-space:pre-wrap;
                      background:#f3f4f6;
                      border-radius:12px;
                      padding:18px;
                      line-height:1.65;
                      color:#1f2937;
                    "
                  >${safeMessage}</div>

                  ${filesHtml}

                  <p
                    style="
                      margin:26px 0 0;
                      font-size:13px;
                      line-height:1.6;
                      color:#6b7280;
                    "
                  >
                    Če v Gmailu kliknete
                    <strong>Odgovori / Reply</strong>,
                    bo odgovor naslovljen neposredno na
                    pošiljatelja tega povpraševanja.
                  </p>

                  <p
                    style="
                      margin:12px 0 0;
                      font-size:12px;
                      line-height:1.6;
                      color:#9ca3af;
                    "
                  >
                    Poslano preko kontaktnega obrazca
                    LazTek Engineering.
                  </p>
                </div>
              </div>
            </body>
          </html>
        `,
      })

    if (error) {
      console.error(
        'Resend napaka:',
        error,
      )

      return NextResponse.json(
        {
          error:
            'Povpraševanja ni bilo mogoče poslati. Poskusite ponovno.',
        },
        {status: 500},
      )
    }

    console.log(
      'Povpraševanje poslano. Resend ID:',
      data?.id,
    )

    console.log(
      'Število CAD datotek:',
      uploadedFiles.length,
    )

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error(
      'Contact API napaka:',
      error,
    )

    return NextResponse.json(
      {
        error:
          'Prišlo je do nepričakovane napake. Poskusite ponovno.',
      },
      {status: 500},
    )
  }
}