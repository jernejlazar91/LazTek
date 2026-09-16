import type {Metadata} from 'next'
import SiteHeader from '@/components/SiteHeader'
import {client} from '@/sanity/client'
import {urlFor} from '@/sanity/image'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  FileScan,
  Gauge,
  Layers3,
  RefreshCw,
  Ruler,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react'

export const metadata: Metadata = {
  title: '3D skeniranje, reverse engineering in obnova plastičnih kosov | Laztek',
  description:
    '3D skeniranje, reverse engineering, CAD rekonstrukcija, obnova poškodovanih plastičnih kosov in izdelava nadomestnih delov.',
}

async function getPageData() {
  return client.fetch(`{
    "siteSettings": *[_type == "siteSettings"][0]{
      brandName,
      email,
      phone,
      location,
      logo
    }
  }`)
}

const capabilities = [
  '3D skeniranje obstoječih kosov, ohišij, nosilcev in tehničnih oblik',
  'reverse engineering in izdelava uporabnega CAD modela iz fizičnega kosa',
  'obnova počenih, obrabljenih ali zlomljenih plastičnih delov',
  'izdelava nadomestnega kosa, ko original ni več dobavljiv',
  'izboljšava šibkih con, pritrditev, reber, zatičev in nosilnih mest',
  'priprava STEP/STL datotek za 3D tisk, CNC, dokumentacijo ali nadaljnji razvoj',
]

const useCases = [
  {
    title: 'Kos obstaja, dokumentacije pa ni',
    text:
      'Obstoječ del se izmeri, skenira in pretvori v digitalni model, ki ga lahko uporabimo za ponovno izdelavo ali nadaljnje spremembe.',
    icon: FileScan,
  },
  {
    title: 'Poškodovan plastični del',
    text:
      'Pri zlomljenih kosih se rekonstruira prvotna oblika, nato pa se kritična mesta po potrebi ojačajo ali konstrukcijsko izboljšajo.',
    icon: Wrench,
  },
  {
    title: 'Nadomestni del ali izboljšana verzija',
    text:
      'Kos lahko ostane oblikovno podoben originalu, hkrati pa dobi boljši material, debelejša rebra, močnejše pritrdilne točke ali lažjo montažo.',
    icon: RefreshCw,
  },
]

const comparison = [
  {
    title: '3D skeniranje',
    text:
      'Najbolj uporabno za organske oblike, ulite kose, ohišja, pokrove in dele, kjer je veliko krivin ali površin, ki jih je težko ročno izmeriti.',
    icon: ScanLine,
  },
  {
    title: 'Ročno merjenje in CAD',
    text:
      'Primerno za tehnične kose, kjer so pomembne luknje, razdalje, ravnine, navoji, naležne površine in funkcionalne tolerance.',
    icon: Ruler,
  },
  {
    title: 'Kombiniran pristop',
    text:
      'V praksi je pogosto najboljša kombinacija: sken za obliko, ročne meritve za funkcionalne dimenzije in CAD rekonstrukcija za čist model.',
    icon: Layers3,
  },
]

const process = [
  'Pošljete slike, opis težave, osnovne mere ali fizični kos.',
  'Ocenimo, ali je primernejše skeniranje, ročno merjenje ali kombinacija obojega.',
  'Pripravimo CAD model in po potrebi izboljšamo šibke ali poškodovane dele.',
  'Izdelamo nadomestni kos ali pripravimo datoteke za nadaljnjo proizvodnjo.',
]

const deliverables = [
  'STL za 3D tisk',
  'STEP model za nadaljnjo konstrukcijo',
  'popravljen ali izboljšan CAD model',
  'funkcionalen nadomestni kos',
  'predlog materiala glede na namen uporabe',
  'osnovna priporočila za montažo ali izboljšavo',
]

const notIdeal = [
  'če so potrebne zelo ozke tolerance brez možnosti merjenja naležnih površin',
  'če je kos močno deformiran in ni več razvidna prvotna oblika',
  'če je originalni material ali obremenitev neznana in se kos uporablja v varnostno kritični aplikaciji',
]

export default async function ScanningReverseEngineeringPage() {
  const data = await getPageData()
  const site = data?.siteSettings
  const contactHref = site?.email ? `mailto:${site.email}` : '/kontakt'

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <BackgroundGlow />

      <SiteHeader
        logoUrl={site?.logo ? urlFor(site.logo).width(2200).height(650).url() : undefined}
        brandName={site?.brandName}
        basePath="/"
      />

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-fuchsia-300/15 bg-fuchsia-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-fuchsia-100/75">
              Skeniranje / reverse engineering / obnova kosov
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              3D skeniranje, reverse engineering in obnova plastičnih kosov.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              Ko dokumentacija ne obstaja ali je del poškodovan, lahko obstoječ kos digitaliziramo,
              rekonstruiramo in pripravimo za ponovno izdelavo. Cilj ni samo kopija, ampak uporaben
              tehnični model, ki ga je možno po potrebi izboljšati in izdelati iz primernejšega materiala.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={contactHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_40px_rgba(56,189,248,0.28)] transition hover:scale-[1.02]"
              >
                Pošlji slike ali kos za oceno
                <ArrowRight size={16} />
              </a>
              <Link
                href="/storitve/obnova-plasticnih-kosov"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/30 hover:bg-cyan-400/10"
              >
                Posebej o obnovi kosov
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-fuchsia-300/18 bg-gradient-to-br from-fuchsia-400/14 to-violet-500/10 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl border border-fuchsia-300/20 bg-fuchsia-400/10 p-3">
                <ScanLine size={24} className="text-cyan-300" />
              </div>
              <div>
                <div className="text-sm text-white/50">Workflow</div>
                <div className="text-xl font-semibold">Scan → CAD → redesign → proizvodnja</div>
              </div>
            </div>
            <div className="grid gap-3">
              {capabilities.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[1.4rem] border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/78"
                >
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-cyan-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-cyan-100/65">Kdaj je uporabno</div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Za kose, ki jih je treba razumeti, ne samo poskenirati.</h2>
          <p className="mt-5 text-sm leading-8 text-white/66 sm:text-base">
            Sken je samo začetna informacija. Za dober nadomestni del je pomembno razumeti, kaj kos drži,
            kje se prilega, kje je bil šibek in iz katerega materiala ga je smiselno izdelati.
          </p>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {useCases.map((item) => {
            const Icon = item.icon
            return (
              <article key={item.title} className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
                <div className="mb-5 inline-flex rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-3">
                  <Icon size={22} className="text-cyan-300" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/66">{item.text}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[2.25rem] border border-white/10 bg-[#0b1020]/70 p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <div className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-fuchsia-100/65">Pristop</div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Skeniranje ni vedno dovolj.</h2>
              <p className="mt-5 text-sm leading-8 text-white/66 sm:text-base">
                Pri tehničnih kosih kombiniramo sken, ročne meritve in konstrukcijsko logiko. Tako dobimo model,
                ki ni samo vizualno podoben, ampak je primeren za dejansko uporabo.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {comparison.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                    <div className="mb-4 inline-flex rounded-2xl border border-fuchsia-300/20 bg-fuchsia-400/10 p-3">
                      <Icon size={20} className="text-cyan-300" />
                    </div>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/64">{item.text}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[2rem] border border-cyan-300/15 bg-cyan-400/10 p-6 sm:p-8">
            <div className="mb-5 inline-flex rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-3">
              <ShieldCheck size={22} className="text-cyan-300" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">Kaj lahko dobi stranka?</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {deliverables.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm leading-6 text-white/74">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-cyan-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-fuchsia-300/15 bg-fuchsia-400/10 p-6 sm:p-8">
            <div className="mb-5 inline-flex rounded-2xl border border-fuchsia-300/20 bg-fuchsia-400/10 p-3">
              <Gauge size={22} className="text-fuchsia-200" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">Kdaj je treba biti previden?</h2>
            <div className="mt-6 grid gap-3">
              {notIdeal.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm leading-6 text-white/72">
                  <Sparkles size={15} className="mt-1 shrink-0 text-fuchsia-200" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="rounded-[2.25rem] border border-white/10 bg-[#0b1020]/70 p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <div className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-cyan-100/65">Proces</div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Od fizičnega kosa do novega modela.</h2>
            <p className="mt-5 text-sm leading-8 text-white/66 sm:text-base">
              Najboljši rezultat nastane, ko se že na začetku jasno določi, ali potrebujete kopijo, izboljšan kos,
              datoteko za proizvodnjo ali dokončan funkcionalen nadomestni del.
            </p>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-4">
            {process.map((step, index) => (
              <div key={step} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/72">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-400/10 font-semibold text-cyan-100">
                  {index + 1}
                </div>
                {step}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
            >
              Oddaj povpraševanje
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/materiali"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/30 hover:bg-cyan-400/10"
            >
              Poglej materiale
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

function BackgroundGlow() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050816]">
      <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-400/12 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-fuchsia-500/10 blur-[120px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_28%),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:auto,80px_80px,80px_80px]" />
    </div>
  )
}
