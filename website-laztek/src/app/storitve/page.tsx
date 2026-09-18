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
  const contactHref = site?.email ? `mailto:${site.email}` : '/#kontakt'

  return (
    <main className="laztek-page">

      <SiteHeader
        logoUrl={site?.logo ? urlFor(site.logo).width(2200).height(650).url() : undefined}
        brandName={site?.brandName}
        basePath="/"
      />

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-cyan-300/15 bg-cyan-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-cyan-100/75">
              Storitve Laztek
            </div>

            <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Inženirske storitve za funkcionalne dele, prototipe in tehnične rešitve.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              Laztek združuje industrijski 3D tisk, 3D skeniranje, reverse engineering,
              konstruiranje, 3D modeliranje in prototipizacijo. Cilj ni samo izdelati kos,
              ampak izdelati kos, ki ima smiseln material, geometrijo in uporabo.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={contactHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-600 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_40px_rgba(56,189,248,0.28)] transition hover:scale-[1.02]"
              >
                Pošlji povpraševanje
                <ArrowRight size={16} />
              </a>

              <a
                href="#pregled"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/30 hover:bg-cyan-400/10"
              >
                Poglej storitve
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[#0b1020]/70 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-3">
                <Layers3 size={22} className="text-cyan-300" />
              </div>
              <div>
                <div className="text-sm text-white/50">Način dela</div>
                <div className="text-xl font-semibold">Od problema do uporabnega kosa</div>
              </div>
            </div>

            <div className="space-y-3">
              {workflow.map((step, index) => (
                <div
                  key={step}
                  className="flex gap-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-white/74"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-400/10 text-sm font-semibold text-cyan-100">
                    {index + 1}
                  </div>
                  <div>{step}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pregled" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex rounded-full border border-cyan-300/15 bg-cyan-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-cyan-100/75">
            Pregled storitev
          </div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Od ideje, skena ali poškodovanega kosa do uporabnega tehničnega izdelka.
          </h2>
          <p className="mt-5 text-sm leading-8 text-white/66 sm:text-base">
            Storitve so razdeljene glede na tip izhodišča: nov funkcionalni del,
            obstoječ kos za rekonstrukcijo, CAD razvoj ali prototip pred izdelavo.
            Tako hitreje najdemo pravo pot od problema do rešitve.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {serviceGroups.map((service, index) => {
            const Icon = service.icon

            return (
              <Link
                href={service.href}
                key={service.href}
                className={[
                  'group block rounded-[2rem] border p-6 transition hover:-translate-y-1 hover:shadow-[0_20px_70px_rgba(0,0,0,0.28)]',
                  index === 0 && 'border-cyan-300/18 bg-gradient-to-br from-cyan-400/16 to-sky-500/10',
                  index === 1 && 'border-sky-300/18 bg-gradient-to-br from-sky-400/14 to-blue-500/10',
                  index === 2 && 'border-blue-300/18 bg-gradient-to-br from-blue-400/14 to-cyan-500/10',
                  index === 3 && 'border-blue-300/18 bg-gradient-to-br from-blue-400/14 to-cyan-500/10',
                  index === 4 && 'border-sky-300/18 bg-gradient-to-br from-sky-400/14 to-blue-600/10',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="rounded-2xl border border-cyan-200/15 bg-cyan-100/[0.07] p-3">
                    <Icon size={22} className="text-cyan-300" />
                  </div>
                  <div className="rounded-full border border-cyan-200/15 bg-cyan-100/[0.07] px-3 py-1 text-xs text-white/55">
                    Podstran
                  </div>
                </div>

                <div className="mt-6 text-xs font-medium uppercase tracking-[0.22em] text-cyan-100/65">
                  {service.eyebrow}
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/72">{service.text}</p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {service.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-start gap-3 text-sm leading-6 text-white/80">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-cyan-300" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition group-hover:translate-x-1">
                  Odpri podstran
                  <ArrowRight size={16} />
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-cyan-400/12 via-sky-400/10 to-sky-400/10 p-6 sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-center">
            <div>
              <div className="mb-4 inline-flex rounded-full border border-cyan-200/15 bg-cyan-100/[0.07] px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-white/65">
                Povpraševanje
              </div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Imate kos, idejo, poškodovan del ali datoteko za izdelavo?
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-8 text-white/68 sm:text-base">
                Najhitreje ocenim projekt, če pošljete slike, osnovne mere, namen uporabe,
                želeni material in morebitne STEP/STL datoteke. Če dokumentacije ni,
                lahko začnemo tudi z obstoječim kosom in 3D skeniranjem.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={contactHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
              >
                Kontaktiraj Laztek
                <ArrowRight size={16} />
              </a>
              <Link
                href="/projekti"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Poglej projekte
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}

function BackgroundGlow() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.13),transparent_25%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.15),transparent_22%),radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.12),transparent_24%)]" />
      <div className="absolute left-[-8%] top-[-10%] h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute right-[-8%] top-[10%] h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="absolute bottom-[-10%] left-[12%] h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
    </div>
  )
}
