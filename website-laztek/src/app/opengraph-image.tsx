import {ImageResponse} from 'next/og'
import fs from 'node:fs/promises'
import path from 'node:path'

export const runtime = 'nodejs'

export const alt =
  'LazTek Engineering - Industrijski 3D tisk, 3D skeniranje in razvoj'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function OpenGraphImage() {
  const logoPath = path.join(
    process.cwd(),
    'public',
    'laztek-logo.png',
  )

  const logoBuffer = await fs.readFile(logoPath)

  const logoBase64 =
    `data:image/png;base64,${logoBuffer.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 60,
          background:
            'linear-gradient(135deg, #050816 0%, #081225 55%, #0b1020 100%)',
          color: '#ffffff',
          fontFamily: 'Arial, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* GLOW LEVO */}
        <div
          style={{
            position: 'absolute',
            left: -120,
            top: -150,
            width: 500,
            height: 500,
            borderRadius: 500,
            background: '#06b6d4',
            opacity: 0.18,
            display: 'flex',
          }}
        />

        {/* GLOW DESNO */}
        <div
          style={{
            position: 'absolute',
            right: -140,
            bottom: -180,
            width: 550,
            height: 550,
            borderRadius: 550,
            background: '#6366f1',
            opacity: 0.18,
            display: 'flex',
          }}
        />

        {/* ZGORNJI DEL */}
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            zIndex: 2,
          }}
        >
          {/* TEKST */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: 690,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#67e8f9',
                marginBottom: 24,
              }}
            >
              LazTek Engineering
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                fontSize: 60,
                lineHeight: 1.08,
                fontWeight: 800,
                letterSpacing: '-2px',
              }}
            >
              <div style={{display: 'flex'}}>
                Industrijski 3D tisk
              </div>

              <div style={{display: 'flex'}}>
                in razvoj
              </div>

              <div style={{display: 'flex'}}>
                tehničnih rešitev
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                fontSize: 25,
                lineHeight: 1.45,
                marginTop: 28,
                color: '#cbd5e1',
              }}
            >
              3D skeniranje · reverse engineering · CAD modeliranje ·
              prototipizacija
            </div>
          </div>

          {/* LOGO */}
          <div
            style={{
              width: 380,
              height: 185,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 18,
              borderRadius: 28,
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.05)',
            }}
          >
            <img
              src={logoBase64}
              alt="LazTek Engineering"
              width={360}
              height={150}
              style={{
                objectFit: 'contain',
                width: 360,
                height: 150,
              }}
            />
          </div>
        </div>

        {/* SPODNJI DEL */}
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 12,
            }}
          >
            <div
              style={{
                display: 'flex',
                padding: '11px 18px',
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.05)',
                fontSize: 18,
              }}
            >
              FDM / FGF
            </div>

            <div
              style={{
                display: 'flex',
                padding: '11px 18px',
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.05)',
                fontSize: 18,
              }}
            >
              3D skeniranje
            </div>

            <div
              style={{
                display: 'flex',
                padding: '11px 18px',
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.05)',
                fontSize: 18,
              }}
            >
              Reverse engineering
            </div>

            <div
              style={{
                display: 'flex',
                padding: '11px 18px',
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.05)',
                fontSize: 18,
              }}
            >
              CAD / razvoj
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 25,
              fontWeight: 700,
              color: '#67e8f9',
            }}
          >
            laztek.si
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}