import Link from 'next/link'
import {Mail, MapPin, Phone} from 'lucide-react'
import {client} from '@/sanity/client'

async function getFooterData() {
  return client.fetch(`*[_type == "siteSettings"][0]{
    siteTitle,
    brandName,
    tagline,
    email,
    phone,
    location
  }`)
}

const serviceLinks = [
  {
    label: 'Industrijski 3D tisk',
    href: '/storitve/industrijski-3d-tisk',
  },
  {
    label: '3D skeniranje & reverse engineering',
    href: '/storitve/3d-skeniranje-reverse-engineering',
  },
  {
    label: 'Obnova plastičnih kosov',
    href: '/storitve/obnova-plasticnih-kosov',
  },
  {
    label: 'Konstruiranje & 3D modeliranje',
    href: '/storitve/konstruiranje-3d-modeliranje',
  },
  {
    label: 'Prototipizacija',
    href: '/storitve/prototipizacija',
  },
]

const technologyLinks = [
  {label: 'Materiali', href: '/materiali'},
  {label: 'LINEX HT v1', href: '/linex'},
  {label: 'Projekti', href: '/projekti'},
  {label: 'Galerija', href: '/galerija'},
]

const companyLinks = [
  {label: 'O podjetju', href: '/o-podjetju'},
  {label: 'Blog', href: '/blog'},
  {label: 'Kontakt', href: '/kontakt'},
  {label: 'Pregled storitev', href: '/storitve'},
  {
    label: 'Politika zasebnosti',
    href: '/politika-zasebnosti',
  },
]

export default async function SiteFooter() {
  const site = await getFooterData()

  const brandName =
    site?.brandName ||
    site?.siteTitle ||
    'LazTek Engineering'

  const email =
    site?.email ||
    'jernej.lazar91@gmail.com'

  const phone = site?.phone

  const location =
    site?.location ||
    'Slovenija'

  return (
    <footer className="relative border-t border-white/10 bg-[#050816] text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-400/8 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-indigo-500/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-5">
          {/* LOGO + OPIS */}
          <div className="xl:col-span-2">
            <Link
              href="/"
              className="inline-flex max-w-[300px] items-center rounded-[1.25rem] border border-white/10 bg-white/[0.04] px-4 py-3 transition hover:border-cyan-300/20 hover:bg-cyan-400/[0.06]"
            >
              <img
                src="/laztek-logo.png"
                alt="LazTek Engineering"
                className="h-14 w-full object-contain sm:h-16"
              />
            </Link>

            <p className="mt-4 max-w-md text-sm leading-7 text-white/62">
              {site?.tagline ||
                'Industrijski 3D tisk, 3D skeniranje, reverse engineering, CAD konstruiranje in funkcionalna prototipizacija za tehnične kose.'}
            </p>

            <div className="mt-5 space-y-2.5 text-sm text-white/65">
              {email ? (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 transition hover:text-cyan-200"
                >
                  <Mail
                    size={16}
                    className="text-cyan-300"
                  />

                  {email}
                </a>
              ) : null}

              {phone ? (
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 transition hover:text-cyan-200"
                >
                  <Phone
                    size={16}
                    className="text-cyan-300"
                  />

                  {phone}
                </a>
              ) : null}

              {location ? (
                <div className="flex items-center gap-3">
                  <MapPin
                    size={16}
                    className="text-cyan-300"
                  />

                  {location}
                </div>
              ) : null}
            </div>
          </div>

          <FooterColumn
            title="Storitve"
            links={serviceLinks}
          />

          <FooterColumn
            title="Tehnologije"
            links={technologyLinks}
          />

          <FooterColumn
            title="Podjetje"
            links={companyLinks}
          />
        </div>

        <div className="mt-9 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} {brandName}. Vse pravice pridržane.
          </div>

          <div className="flex flex-wrap gap-4">
            <span>Industrial 3D Printing</span>
            <span>Reverse Engineering</span>
            <span>Slovenia / EU</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: {
    label: string
    href: string
  }[]
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-100/55">
        {title}
      </h3>

      <div className="mt-4 flex flex-col gap-2.5">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm leading-6 text-white/62 transition hover:text-cyan-200"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  )
}