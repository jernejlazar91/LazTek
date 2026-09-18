import SiteHeader from '@/components/SiteHeader'
import {client} from '@/sanity/client'
import {urlFor} from '@/sanity/image'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers3,
  RefreshCw,
  Rocket,
  ScanLine,
  Sparkles,
  Wrench,
} from 'lucide-react'

async function getServicesPageData() {
  return client.fetch(`{
    "siteSettings": *[_type == "siteSettings"][0]{
      siteTitle,
      brandName,
      tagline,
      email,
      phone,
      location,
      logo
    }
  }`)
}

const serviceGroups = [
  {
    eyebrow: 'FDM / FGF / veliki format',
    title: 'Industrijski 3D tisk',
    href: '/storitve/industrijski-3d-tisk',
    icon: Cpu,
    text:
      'Izdelava funkcionalnih prototipov, nadomestnih delov in manjših serij iz tehničnih polimerov. Fokus je na uporabnih kosih, ne samo na lepih modelih.',
    bullets: [
      'funkcionalni prototipi in testni vzorci',
      'večji formati in robustni tehnični deli',
      'materiali kot PA6 CF/GF, PETG, ASA, PC, TPU in sorodni polimeri',
      'priprava modela za tisk, orientacija, podpore in procesne nastavitve',
    ],
  },
  {
    eyebrow: 'Skeniranje / CAD rekonstrukcija',
    title: '3D skeniranje & reverse engineering',
    href: '/storitve/3d-skeniranje-reverse-engineering',
    icon: ScanLine,
    text:
      'Obstoječ kos pretvorimo v uporaben digitalni model. Primerno za poškodovane, izgubljene ali zastarele plastične dele, kjer originalna dokumentacija ne obstaja.',
    bullets: [
      '3D skeniranje obstoječih kosov',
      'rekonstrukcija površin in izdelava CAD modela',
      'obnova pokvarjenih ali poškodovanih plastičnih kosov',
      'izboljšava oblike pred ponovno izdelavo',
    ],
  },
  {
    eyebrow: 'Poškodovani / nedobavljivi kosi',
    title: 'Obnova plastičnih kosov',
    href: '/storitve/obnova-plasticnih-kosov',
    icon: RefreshCw,
    text:
      'Rekonstrukcija polomljenih, obrabljenih ali nedobavljivih plastičnih kosov. Kos lahko izdelamo kot izboljšan nadomestni del, ne samo kot kopijo originala.',
    bullets: [
      'obnova polomljenih nosilcev, ohišij, pokrovov in zaščit',
      'izdelava nadomestnih delov, ko original ni več dobavljiv',
      'ojačitev šibkih točk in izboljšava geometrije',
      'izbira materiala glede na temperaturo, togost in namen uporabe',
    ],
  },
  {
    eyebrow: 'CAD / tehnični razvoj',
    title: 'Konstruiranje & 3D modeliranje',
    href: '/storitve/konstruiranje-3d-modeliranje',
    icon: Wrench,
    text:
      'Razvoj tehničnih kosov, sklopov in priprav od ideje do izvedljivega modela. Namenjeno podjetjem, ki potrebujejo praktično konstrukcijsko podporo.',
    bullets: [
      '3D modeliranje in konstrukcija v CAD okolju',
      'priprava STEP/STL datotek za proizvodnjo ali 3D tisk',
      'optimizacija oblike glede na obremenitve in namen uporabe',
      'tehnična dokumentacija in priprava za izdelavo',
    ],
  },
  {
    eyebrow: 'Ideja → test → izboljšava',
    title: 'Prototipizacija in razvoj izdelkov',
    href: '/storitve/prototipizacija',
    icon: Rocket,
    text:
      'Hitra izdelava in izboljševanje prototipov, ko je treba idejo spraviti v fizično obliko, jo testirati in pripraviti na naslednji razvojni korak.',
    bullets: [
      'razvoj funkcionalnih prototipov',
      'iteracije po testiranju in meritvah',
      'ohišja, nosilci, adapterji, priprave in mehanski deli',
      'priprava za manjšo serijo ali nadaljnjo proizvodnjo',
    ],
  },
]

const workflow = [
  'Pošljete opis, slike, mere ali obstoječe datoteke STEP/STL.',
  'Skupaj določimo namen kosa, obremenitve, material in pričakovani rezultat.',
  'Pripravimo model, proces, prototip ali rekonstrukcijo obstoječega dela.',
  'Po testu se kos po potrebi izboljša in pripravi za končno izdelavo ali serijo.',
]

export default async function ServicesPage() {
  const data = await getServicesPageData()
  const site = data?.siteSettings
  const contactHref = site?.email ? `mailto:${site.email}` : '/kontakt'

  return (
    <main className="min-h-screen overflow-hidden bg-[#F5FBFE] text-[#0B2B4C]">
      <SiteHeader
        logoUrl={
          site?.logo
            ? urlFor(site.logo).width(2200).height(650).url()
            : undefined
        }
        brandName={site?.brandName}
        basePath="/"
      />

      {/* LIGHT TECH BACKGROUND */}
      <div className="relative isolate overflow-hidden">
        <SubpageBackground />

        {/* HERO */}
        <section className="relative z-10 border-b border-sky-200/55 bg-white/[0.42] backdrop-blur-[1px]">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:px-8 lg:pb-24 lg:pt-20">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/70 bg-white/[0.82] px-4 py-2 text-xs font-bold uppercase tracking-[0.20em] text-[#0F6D8C] shadow-[0_8px_28px_rgba(14,165,233,0.08)] backdrop-blur-md">
                <Sparkles size={15} className="text-cyan-500" />
                Storitve LazTek
              </div>

              <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-[#082A4B] sm:text-5xl lg:text-[3.55rem]">
                Inženirske storitve za funkcionalne dele, prototipe in tehnične rešitve.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-[#4B667A] sm:text-lg">
                LazTek združuje industrijski 3D tisk, 3D skeniranje, reverse engineering,
                konstruiranje, 3D modeliranje in prototipizacijo. Cilj ni samo izdelati kos,
                ampak izdelati kos, ki ima smiseln material, geometrijo in uporabo.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={contactHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 px-7 py-3.5 text-sm font-bold text-[#06253D] shadow-[0_12px_32px_rgba(14,165,233,0.20)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(14,165,233,0.27)]"
                >
                  Pošlji povpraševanje
                  <ArrowRight size={16} />
                </a>

                <a
                  href="#pregled"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-200/90 bg-white/[0.86] px-7 py-3.5 text-sm font-bold text-[#123A57] shadow-[0_8px_24px_rgba(15,74,105,0.07)] backdrop-blur-md transition hover:border-cyan-300 hover:bg-white"
                >
                  Poglej storitve
                </a>
              </div>
            </div>

            {/* WORKFLOW CARD */}
            <div className="relative">
              <div className="absolute -inset-6 rounded-[3rem] bg-cyan-100/45 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-sky-200/80 bg-white/[0.91] p-6 shadow-[0_22px_65px_rgba(31,88,119,0.11)] backdrop-blur-xl sm:p-7">
                <div className="pointer-events-none absolute right-[-45px] top-[-45px] h-40 w-40 rounded-full bg-cyan-100/80 blur-3xl" />
                <div className="pointer-events-none absolute inset-x-[12%] top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />

                <div className="relative mb-5 flex items-center gap-3">
                  <div className="rounded-2xl border border-cyan-200 bg-gradient-to-br from-white to-cyan-50 p-3 shadow-sm">
                    <Layers3 size={23} className="text-[#1596C0]" />
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-[#6D8798]">Način dela</div>
                    <div className="text-xl font-bold tracking-tight text-[#0B2B4C]">
                      Od problema do uporabnega kosa
                    </div>
                  </div>
                </div>

                <div className="relative space-y-3">
                  {workflow.map((step, index) => (
                    <div
                      key={step}
                      className="flex gap-4 rounded-[1.45rem] border border-sky-200/65 bg-[#F8FCFE]/95 p-4 text-sm leading-7 text-[#526C7E] shadow-[0_8px_24px_rgba(20,78,109,0.04)]"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-300/70 bg-white text-sm font-extrabold text-[#0D86AA] shadow-sm">
                        {index + 1}
                      </div>
                      <div>{step}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES GRID */}
        <section id="pregled" className="relative z-10 bg-white/[0.28]">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex rounded-full border border-cyan-300/60 bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.20em] text-[#0F6D8C] shadow-sm">
                Pregled storitev
              </div>

              <h2 className="text-3xl font-semibold tracking-tight text-[#082A4B] sm:text-4xl lg:text-5xl">
                Od ideje, skena ali poškodovanega kosa do uporabnega tehničnega izdelka.
              </h2>

              <p className="mt-5 text-sm leading-8 text-[#587082] sm:text-base">
                Storitve so razdeljene glede na tip izhodišča: nov funkcionalni del,
                obstoječ kos za rekonstrukcijo, CAD razvoj ali prototip pred izdelavo.
                Tako hitreje najdemo pravo pot od problema do rešitve.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {serviceGroups.map((service, index) => {
                const Icon = service.icon

                return (
                  <Link
                    href={service.href}
                    key={service.href}
                    className="group relative block overflow-hidden rounded-[2rem] border border-sky-200/75 bg-white/[0.91] p-6 shadow-[0_12px_38px_rgba(24,86,122,0.07)] transition duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-[0_22px_54px_rgba(24,86,122,0.13)] sm:p-7"
                  >
                    <div
                      className={[
                        'pointer-events-none absolute right-[-45px] top-[-45px] h-36 w-36 rounded-full blur-3xl',
                        index % 2 === 0 ? 'bg-cyan-100/85' : 'bg-sky-100/80',
                      ].join(' ')}
                    />

                    <div className="pointer-events-none absolute inset-x-[14%] top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/55 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

                    <div className="relative flex items-start justify-between gap-4">
                      <div className="rounded-2xl border border-cyan-200 bg-gradient-to-br from-white to-cyan-50 p-3 shadow-[0_8px_20px_rgba(14,116,144,0.06)]">
                        <Icon size={22} className="text-[#1596C0]" />
                      </div>

                      <div className="rounded-full border border-sky-200/80 bg-[#F7FCFE] px-3 py-1 text-xs font-bold text-[#688296]">
                        Podstran
                      </div>
                    </div>

                    <div className="relative mt-6 text-xs font-bold uppercase tracking-[0.20em] text-[#118CB0]">
                      {service.eyebrow}
                    </div>

                    <h3 className="relative mt-3 text-2xl font-semibold tracking-tight text-[#0B2B4C] sm:text-3xl">
                      {service.title}
                    </h3>

                    <p className="relative mt-4 text-sm leading-7 text-[#587082]">
                      {service.text}
                    </p>

                    <div className="relative mt-6 grid gap-3 sm:grid-cols-2">
                      {service.bullets.map((bullet) => (
                        <div
                          key={bullet}
                          className="flex items-start gap-3 text-sm leading-6 text-[#425F74]"
                        >
                          <CheckCircle2
                            size={16}
                            className="mt-0.5 shrink-0 text-[#13A4C3]"
                          />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>

                    <div className="relative mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#087EA5] transition group-hover:gap-3">
                      Odpri podstran
                      <ArrowRight size={16} />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative z-10 border-t border-sky-200/45 bg-[linear-gradient(135deg,rgba(231,247,252,0.76),rgba(255,255,255,0.70)_45%,rgba(230,248,246,0.72))]">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-sky-200/80 bg-white/[0.88] p-7 shadow-[0_22px_70px_rgba(24,86,122,0.09)] backdrop-blur-xl sm:p-10 lg:p-12">
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-100/85 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 left-[18%] h-52 w-52 rounded-full bg-sky-100/80 blur-3xl" />

              <div className="relative grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-center">
                <div>
                  <div className="mb-4 inline-flex rounded-full border border-cyan-300/60 bg-[#F4FCFE] px-4 py-2 text-xs font-bold uppercase tracking-[0.20em] text-[#0F7898]">
                    Povpraševanje
                  </div>

                  <h2 className="text-3xl font-semibold tracking-tight text-[#082A4B] sm:text-4xl">
                    Imate kos, idejo, poškodovan del ali datoteko za izdelavo?
                  </h2>

                  <p className="mt-5 max-w-2xl text-sm leading-8 text-[#587082] sm:text-base">
                    Najhitreje ocenim projekt, če pošljete slike, osnovne mere, namen uporabe,
                    želeni material in morebitne STEP/STL datoteke. Če dokumentacije ni,
                    lahko začnemo tudi z obstoječim kosom in 3D skeniranjem.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <a
                    href={contactHref}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 px-6 py-3.5 text-sm font-bold text-[#06253D] shadow-[0_12px_30px_rgba(14,165,233,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(14,165,233,0.25)]"
                  >
                    Kontaktiraj LazTek
                    <ArrowRight size={16} />
                  </a>

                  <Link
                    href="/projekti"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-200/90 bg-white px-6 py-3.5 text-sm font-bold text-[#123A57] shadow-sm transition hover:border-cyan-300 hover:bg-[#F8FDFF]"
                  >
                    Poglej projekte
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

function SubpageBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#F5FBFE_0%,#FFFFFF_48%,#F3FAFD_100%)]" />

      <div className="absolute left-[-9%] top-[4%] h-[420px] w-[420px] rounded-full bg-cyan-100/60 blur-[110px]" />
      <div className="absolute right-[-8%] top-[26%] h-[460px] w-[460px] rounded-full bg-sky-100/65 blur-[120px]" />
      <div className="absolute bottom-[3%] left-[22%] h-[360px] w-[360px] rounded-full bg-teal-100/45 blur-[120px]" />

      <svg
        className="absolute inset-0 h-full w-full opacity-[0.42]"
        viewBox="0 0 1600 1200"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="subHexStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8ED7E2" stopOpacity="0.50" />
            <stop offset="52%" stopColor="#55B7CA" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#3B86A7" stopOpacity="0.10" />
          </linearGradient>
        </defs>

        <g fill="none" stroke="url(#subHexStroke)" strokeWidth="1">
          <polygon points="-40,130 55,130 102,212 55,294 -40,294 -87,212" />
          <polygon points="62,310 132,310 167,371 132,432 62,432 27,371" />
          <polygon points="1455,70 1535,70 1575,139 1535,208 1455,208 1415,139" />
          <polygon points="1490,280 1560,280 1595,341 1560,402 1490,402 1455,341" />
          <polygon points="10,815 86,815 124,881 86,947 10,947 -28,881" />
          <polygon points="1472,935 1540,935 1574,994 1540,1053 1472,1053 1438,994" />
        </g>

        <g fill="none" stroke="#5FAFC1" strokeWidth="0.8" opacity="0.20">
          <path d="M202 170h70l35 61" />
          <path d="M1285 228h76l38 66" />
          <path d="M113 1010h70l35 61" />
          <path d="M1320 1090h76l38 66" />
        </g>
      </svg>
    </div>
  )
}
