import Link from 'next/link'
import Image from 'next/image'
import {ArrowRight, Mail, MapPin, Phone} from 'lucide-react'
import {client} from '@/sanity/client'
import laztekLogo from '@/assets/brand/laztek-logo.webp'

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
  {label: 'Industrijski 3D tisk', href: '/storitve/industrijski-3d-tisk'},
  {label: '3D skeniranje & reverse engineering', href: '/storitve/3d-skeniranje-reverse-engineering'},
  {label: 'Obnova plastičnih kosov', href: '/storitve/obnova-plasticnih-kosov'},
  {label: 'Konstruiranje & 3D modeliranje', href: '/storitve/konstruiranje-3d-modeliranje'},
  {label: 'Prototipizacija', href: '/storitve/prototipizacija'},
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
  {label: 'Politika zasebnosti', href: '/politika-zasebnosti'},
]

function FooterIndustrialHex() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,19,32,0.96),rgba(2,13,23,0.995))]" />
      <div className="absolute left-[8%] top-[-120px] h-72 w-72 rounded-full bg-cyan-400/[0.055] blur-[110px]" />
      <div className="absolute bottom-[-170px] right-[4%] h-96 w-96 rounded-full bg-sky-500/[0.055] blur-[130px]" />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 520" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="footerHexStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8EDDE7" stopOpacity="0.34" />
            <stop offset="50%" stopColor="#31B7C9" stopOpacity="0.48" />
            <stop offset="100%" stopColor="#176B91" stopOpacity="0.22" />
          </linearGradient>
          <linearGradient id="footerHexFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#31B7C9" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#123B50" stopOpacity="0.015" />
          </linearGradient>
        </defs>

        <g opacity="0.56">
          <polygon points="22,55 112,55 157,133 112,211 22,211 -23,133" fill="none" stroke="url(#footerHexStroke)" strokeWidth="1.5" />
          <polygon points="105,196 180,196 218,261 180,326 105,326 67,261" fill="url(#footerHexFill)" stroke="url(#footerHexStroke)" strokeWidth="1.25" />
          <polygon points="8,326 70,326 101,380 70,434 8,434 -23,380" fill="none" stroke="#55BECE" strokeOpacity="0.30" strokeWidth="1.1" />
          <polygon points="196,44 252,44 280,92 252,140 196,140 168,92" fill="none" stroke="#59C4D3" strokeOpacity="0.25" strokeWidth="1" />
        </g>

        <g fill="none" stroke="#4EB4C4" strokeLinecap="round" strokeWidth="1" opacity="0.18">
          <path d="M400 30h55l28 48-28 48h-55" />
          <path d="M500 160h42l21 36-21 36h-42" />
          <path d="M585 346h52l26 45-26 45h-52" />
          <path d="M755 58h42l21 36" />
        </g>

        <g opacity="0.62">
          <polygon points="1230,30 1320,30 1365,108 1320,186 1230,186 1185,108" fill="url(#footerHexFill)" stroke="url(#footerHexStroke)" strokeWidth="1.55" />
          <polygon points="1345,138 1422,138 1461,205 1422,272 1345,272 1306,205" fill="none" stroke="#5FC7D6" strokeOpacity="0.45" strokeWidth="1.2" />
          <polygon points="1454,28 1514,28 1544,80 1514,132 1454,132 1424,80" fill="rgba(49,183,201,0.035)" stroke="#78D2DF" strokeOpacity="0.38" strokeWidth="1.1" />
          <polygon points="1514,274 1580,274 1613,331 1580,388 1514,388 1481,331" fill="none" stroke="#31B7C9" strokeOpacity="0.38" strokeWidth="1.1" />
          <polygon points="1280,330 1348,330 1382,389 1348,448 1280,448 1246,389" fill="rgba(23,107,145,0.05)" stroke="#58C0D0" strokeOpacity="0.34" strokeWidth="1.05" />
        </g>

        <g fill="#72CEDA" opacity="0.28">
          <circle cx="330" cy="115" r="1.4" />
          <circle cx="365" cy="285" r="1.2" />
          <circle cx="1110" cy="96" r="1.35" />
          <circle cx="1170" cy="278" r="1.5" />
          <circle cx="1445" cy="390" r="1.2" />
          <circle cx="1510" cy="190" r="1.35" />
        </g>
      </svg>

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/18 to-transparent" />
    </div>
  )
}

export default async function SiteFooter() {
  const site = await getFooterData()

  const brandName = site?.brandName || site?.siteTitle || 'LazTek Engineering'
  const email = site?.email || 'jernej.lazar91@gmail.com'
  const phone = site?.phone
  const location = site?.location || 'Slovenija'

  return (
    <footer className="relative overflow-hidden border-t border-cyan-200/[0.08] text-white shadow-[0_-20px_70px_rgba(0,21,36,0.18)]">
      <FooterIndustrialHex />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-5 rounded-[2rem] border border-cyan-200/[0.09] bg-[linear-gradient(120deg,rgba(12,52,73,0.46),rgba(7,28,43,0.58))] p-5 shadow-[0_22px_70px_rgba(0,8,18,0.17)] backdrop-blur-xl sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.23em] text-cyan-200/55">
              LazTek Engineering
            </div>
            <div className="mt-2 max-w-3xl text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Industrijski razvoj od skena in CAD-a do funkcionalnega končnega kosa.
            </div>
          </div>

          <Link href="/kontakt" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_12px_34px_rgba(49,183,201,0.16)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(49,183,201,0.23)]">
            Začnimo projekt
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-5">
          <div className="xl:col-span-2">
            <Link href="/" className="inline-flex max-w-[300px] items-center rounded-[1.25rem] border border-cyan-200/[0.09] bg-[linear-gradient(135deg,rgba(12,45,61,0.48),rgba(7,25,38,0.34))] px-4 py-3 transition hover:border-cyan-300/17 hover:bg-cyan-300/[0.045]">
              <Image
                src={laztekLogo}
                alt="LazTek Engineering"
                loading="lazy"
                sizes="300px"
                className="h-14 w-full object-contain sm:h-16"
              />
            </Link>

            <p className="mt-4 max-w-md text-sm leading-7 text-white/56">
              {site?.tagline ||
                'Industrijski 3D tisk, 3D skeniranje, reverse engineering, CAD konstruiranje in funkcionalna prototipizacija za tehnične kose.'}
            </p>

            <div className="mt-5 space-y-2.5 text-sm text-white/58">
              {email ? (
                <a href={`mailto:${email}`} className="group flex items-center gap-3 transition hover:text-cyan-100">
                  <Mail size={16} className="text-cyan-300/76" />
                  {email}
                </a>
              ) : null}

              {phone ? (
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="group flex items-center gap-3 transition hover:text-cyan-100">
                  <Phone size={16} className="text-cyan-300/76" />
                  {phone}
                </a>
              ) : null}

              {location ? (
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-cyan-300/76" />
                  {location}
                </div>
              ) : null}
            </div>
          </div>

          <FooterColumn title="Storitve" links={serviceLinks} />
          <FooterColumn title="Tehnologije" links={technologyLinks} />
          <FooterColumn title="Podjetje" links={companyLinks} />
        </div>

        <div className="mt-9 flex flex-col gap-3 border-t border-white/[0.07] pt-5 text-xs text-white/34 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} {brandName}. Vse pravice pridržane.</div>

          <div className="flex flex-wrap gap-4 uppercase tracking-[0.10em]">
            <span>Industrial 3D Printing</span>
            <span>Reverse Engineering</span>
            <span>CAD Development</span>
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
      <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-100/48">
        {title}
      </h3>

      <div className="mt-4 flex flex-col gap-2">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="group inline-flex items-center gap-2 text-sm leading-6 text-white/52 transition hover:text-cyan-100">
            <span className="h-1 w-1 rounded-full bg-cyan-300/28 transition group-hover:bg-cyan-200" />
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
