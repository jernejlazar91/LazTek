import type {Metadata} from 'next'
import type {ReactNode} from 'react'
import SiteHeader from '@/components/SiteHeader'
import ContactForm from '@/components/ContactForm'
import LocationMap from '@/components/LocationMap'
import {client} from '@/sanity/client'
import {urlFor} from '@/sanity/image'
import {
  FileText,
  Mail,
  Phone,
  Send,
  UploadCloud,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Pošljite povpraševanje za 3D tisk, 3D skeniranje, reverse engineering, CAD modeliranje, prototipizacijo ali obnovo plastičnih kosov.',
}

async function getPageData() {
  return client.fetch(`{
    "siteSettings": *[_type == "siteSettings"][0]{
      brandName,
      email,
      phone,
      location,
      logo
    },
    "contactSection": *[_type == "contactSection"][0]{
      title,
      text,
      email,
      phone,
      location
    }
  }`)
}

const projectInfo = [
  'kratek opis kosa ali problema',
  'slike obstoječega kosa, poškodbe ali mesta vgradnje',
  'STEP, STL, DXF ali PDF datoteke, če jih imate',
  'okvirne mere in količino kosov',
  'zahteve glede temperature, trdnosti, zunanje uporabe ali materiala',
  'rok oziroma želeni čas izvedbe',
]

function getValidEmail(...values: unknown[]) {
  const emailRegex =
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

  for (const value of values) {
    if (typeof value !== 'string') {
      continue
    }

    const cleaned = value
      .trim()
      .replace(/^mailto:/i, '')
      .replace(/\s+/g, '')

    if (
      cleaned &&
      cleaned.toLowerCase() !== 'null' &&
      cleaned.toLowerCase() !== 'undefined' &&
      emailRegex.test(cleaned)
    ) {
      return cleaned
    }
  }

  return 'jernej.lazar91@gmail.com'
}

export default async function ContactPage() {
  const data = await getPageData()

  const site = data?.siteSettings
  const contact = data?.contactSection

  const email = getValidEmail(
    contact?.email,
    site?.email,
    'jernej.lazar91@gmail.com',
  )

  const phone =
    contact?.phone ||
    site?.phone

  const emailSubject =
    'Povpraševanje – LazTek Engineering'

  const emailHref =
    `mailto:${email}?subject=${encodeURIComponent(emailSubject)}`

  return (
    <main className="laztek-page">

      <SiteHeader
        logoUrl={
          site?.logo
            ? urlFor(site.logo)
                .width(2200)
                .height(650)
                .url()
            : undefined
        }
        brandName={site?.brandName}
        basePath="/"
      />

      {/* KONTAKT + OBRAZEC */}
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">

          {/* LEVA STRAN */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-cyan-100/75">
              <Send size={16} />
              Kontakt in povpraševanje
            </div>

            <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {contact?.title ||
                'Pošljite kos, idejo, datoteko ali opis problema.'}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              {contact?.text ||
                'Za hiter in uporaben odgovor pošljite čim več informacij o kosu, namenu uporabe, materialu, količini in morebitnih omejitvah.'}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">

              {/* EMAIL */}
              <a
                href={emailHref}
                className="block h-full cursor-pointer"
                aria-label={`Pošlji e-pošto na ${email}`}
              >
                <div className="h-full rounded-[1.5rem] border border-cyan-200/15 bg-[#071b2d]/65 shadow-[0_18px_58px_rgba(0,15,27,0.20)] backdrop-blur-xl p-5 transition hover:border-cyan-300/25 hover:bg-cyan-400/10">
                  <div className="flex items-center gap-3 text-cyan-300">
                    <Mail className="h-5 w-5" />

                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/55">
                      Email
                    </span>
                  </div>

                  <div className="mt-3 break-words text-sm font-semibold text-white/85">
                    {email}
                  </div>
                </div>
              </a>

              {/* TELEFON */}
              {phone ? (
                <ContactCard
                  icon={<Phone className="h-5 w-5" />}
                  label="Telefon"
                  value={phone}
                  href={`tel:${phone.replace(/\s/g, '')}`}
                />
              ) : null}

              {/* LOKACIJA + ZEMLJEVID */}
              <div className="sm:col-span-2">
                <LocationMap />
              </div>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-cyan-300/15 bg-cyan-400/10 p-5">
              <div className="flex items-center gap-3 text-sm font-semibold text-cyan-100">
                <UploadCloud className="h-5 w-5" />
                Datoteke in priloge
              </div>

              <p className="mt-3 text-sm leading-6 text-white/62">
                STEP, STP, STL in OBJ datoteke lahko neposredno
                naložite v obrazcu. Če imate dodatne fotografije,
                DXF, PDF ali drugo dokumentacijo, jih omenite v
                sporočilu.
              </p>
            </div>
          </div>

          {/* DESNA STRAN */}
          <div>
            <div className="mb-5">
              <h2 className="text-2xl font-semibold">
                Pošljite povpraševanje
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/55">
                Izpolnite spodnji obrazec. Povpraševanje bo poslano
                neposredno podjetju LazTek Engineering.
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* KAJ POSLATI */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-cyan-200/15 bg-[#071b2d]/65 shadow-[0_18px_58px_rgba(0,15,27,0.20)] backdrop-blur-xl p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/55">
                Kaj poslati?
              </div>

              <h2 className="mt-3 text-3xl font-semibold">
                Za dober odgovor je najbolj pomemben kontekst uporabe kosa.
              </h2>
            </div>

            <FileText className="h-10 w-10 text-cyan-300" />
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projectInfo.map((item) => (
              <div
                key={item}
                className="rounded-[1.5rem] border border-cyan-200/15 bg-[#071b2d]/65 shadow-[0_18px_58px_rgba(0,15,27,0.20)] backdrop-blur-xl p-5 text-sm leading-6 text-white/70"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode
  label: string
  value: string
  href?: string
}) {
  const content = (
    <div className="h-full rounded-[1.5rem] border border-cyan-200/15 bg-[#071b2d]/65 shadow-[0_18px_58px_rgba(0,15,27,0.20)] backdrop-blur-xl p-5 transition hover:border-cyan-300/25 hover:bg-cyan-400/10">
      <div className="flex items-center gap-3 text-cyan-300">
        {icon}

        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/55">
          {label}
        </span>
      </div>

      <div className="mt-3 break-words text-sm font-semibold text-white/85">
        {value}
      </div>
    </div>
  )

  return href ? (
    <a
      href={href}
      className="block h-full cursor-pointer"
      aria-label={`${label}: ${value}`}
    >
      {content}
    </a>
  ) : (
    content
  )
}

function BackgroundGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050816]">
      <div className="absolute left-1/2 top-[-10%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[140px]" />

      <div className="absolute bottom-[-20%] right-[-10%] h-[620px] w-[620px] rounded-full bg-blue-500/12 blur-[160px]" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:80px_80px] opacity-30" />
    </div>
  )
}