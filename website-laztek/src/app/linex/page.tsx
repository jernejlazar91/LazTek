import type {Metadata} from 'next'
import SiteHeader from '@/components/SiteHeader'
import {client} from '@/sanity/client'
import {urlFor} from '@/sanity/image'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Gauge,
  Layers3,
  PackageCheck,
  Ruler,
  ShieldCheck,
  Thermometer,
  Wrench,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'LINEX HT v1 | Laztek Engineering',
  description:
    'LINEX HT v1 je lastna velikoformatna razvojna platforma za industrijski 3D tisk funkcionalnih kosov iz tehničnih polimerov.',
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
    "platformSection": *[_type == "platformSection"][0]{
      title,
      text,
      image,
      stats
    }
  }`)
}

const strengths = [
  {
    title: 'Velik format',
    text: 'Platforma je namenjena kosom, ki so preveliki ali preveč zahtevni za običajne namizne 3D tiskalnike.',
    icon: Ruler,
  },
  {
    title: 'Funkcionalni deli',
    text: 'Fokus ni na dekorativnih modelih, ampak na kosih, ki imajo mehansko nalogo, obremenitev ali realno uporabo.',
    icon: PackageCheck,
  },
  {
    title: 'Tehnični materiali',
    text: 'Razvoj je usmerjen v materiale, kot so PA6 CF/GF, PETG/PETG CF, ASA, PC, TPU in druge tehnične polimere.',
    icon: ShieldCheck,
  },
  {
    title: 'Procesni nadzor',
    text: 'Pri večjih kosih so ključni temperatura, sušenje materiala, orientacija, krčenje, togost in pravilna konstrukcija.',
    icon: Thermometer,
  },
]

const useCases = [
  'veliki prototipi in funkcionalni vzorci',
  'namenski nosilci, pokrovi, ohišja in zaščite',
  'nadomestni plastični deli, ki jih ni več mogoče kupiti',
  'vpenjala, šablone, priprave in pomožni industrijski kosi',
  'manjše serije tehničnih delov',
  'testiranje materiala, oblike in funkcije pred dražjo proizvodnjo',
]

const technicalSpecs = [
  {
    label: 'Delovni volumen',
    value: '1030 × 660 × 715 mm',
    note: 'za velike prototipe, pokrove, ohišja, priprave in tehnične kose',
  },
  {
    label: 'Ogrevana miza',
    value: 'do 200 °C',
    note: 'večconsko regulirano ogrevanje za zahtevnejše materiale in večje kose',
  },
  {
    label: 'FDM + FGF',
    value: 'filament in granulat',
    note: 'kombinacija natančnega filamentnega tiska in fleksibilnosti granulata',
  },
  {
    label: 'IDEX zasnova',
    value: '2 neodvisni glavi',
    note: 'platforma je zasnovana za širši nabor materialov, podpor in razvojnih testov',
  },
  {
    label: 'Procesni nadzor',
    value: 'remote + video',
    note: 'nadzor stroja in tiska na daljavo pri daljših industrijskih ciklih',
  },
  {
    label: 'Razvojni fokus',
    value: 'DfAM + parametri',
    note: 'model, material in nastavitve se prilagodijo konkretni komponenti',
  },
]

const extrusionHighlights = [
  {
    title: 'Dyze Typhoon — filament 2.85 mm',
    text: 'Za natančnejše funkcionalne dele, kontrolirano ekstruzijo in tehnične materiale, kjer je pomembna ponovljivost.',
  },
  {
    title: 'Dyze Atom — direktno iz granulata',
    text: 'Za večjo materialno fleksibilnost, razvoj specifičnih formulacij in nižji strošek materiala pri večjih kosih ali testih.',
  },
]

const process = [
  {
    title: '1. Pregled kosa ali ideje',
    text: 'Najprej pogledamo namen uporabe, približne mere, obremenitve, okolje, materialne zahteve in omejitve izdelave.',
  },
  {
    title: '2. Tehnična priprava',
    text: 'Po potrebi uredimo CAD model, orientacijo tiska, debeline sten, rebra, spoje, tolerance in materialno izbiro.',
  },
  {
    title: '3. Izdelava in iteracija',
    text: 'Kos se izdela kot prototip, funkcionalni del ali manjša serija. Pri zahtevnejših kosih je možna izboljšava po prvem testu.',
  },
]

const notIdeal = [
  'najcenejši dekorativni izdelki brez tehnične funkcije',
  'zelo majhni standardni kosi, ki jih je ceneje kupiti kot tiskati',
  'kosi brez osnovnih mer, namena uporabe ali jasnega problema',
]

export default async function LinexPage() {
  const data = await getPageData()
  const site = data?.siteSettings
  const platform = data?.platformSection
  const contactHref = site?.email ? `mailto:${site.email}` : '/kontakt'

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
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-cyan-100/75">
              <Gauge size={16} />
              Lastna razvojna platforma
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              LINEX HT v1 — velikoformatni industrijski 3D tisk za funkcionalne tehnične kose.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              {platform?.text ||
                'LINEX HT v1 je lastna razvojna platforma za izdelavo večjih funkcionalnih kosov iz tehničnih polimerov. Namenjena je projektom, kjer običajen 3D tisk ni dovolj in je potreben inženirski pristop k materialu, konstrukciji in procesu.'}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
              >
                Povpraševanje za velik kos <ArrowRight size={16} />
              </Link>
              <Link
                href="/projekti"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/85 transition hover:border-cyan-300/30 hover:bg-cyan-400/10"
              >
                Poglej projekte
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-200/15 bg-[#071b2d]/65 shadow-[0_18px_58px_rgba(0,15,27,0.20)] backdrop-blur-xl p-5 shadow-[0_24px_100px_rgba(8,47,73,0.22)] sm:p-6">
            <div className="rounded-[1.5rem] border border-cyan-300/15 bg-gradient-to-br from-cyan-400/15 via-sky-400/10 to-sky-400/10 p-6">
              <div className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-100/60">Kaj je prednost?</div>
              <div className="mt-4 text-4xl font-semibold">Stroj + material + konstrukcija</div>
              <p className="mt-4 leading-7 text-white/65">
                Pri velikem 3D tisku ni dovolj samo velik delovni volumen. Ključno je, da se kos že v zasnovi prilagodi materialu, obremenitvi, krčenju in načinu izdelave.
              </p>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {['Large format', 'Engineering', 'Advanced polymers', 'Functional parts'].map((item) => (
                <div key={item} className="rounded-[1.2rem] border border-cyan-200/15 bg-[#071b2d]/65 shadow-[0_18px_58px_rgba(0,15,27,0.20)] backdrop-blur-xl p-4 text-sm font-semibold text-white/75">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-[2.25rem] border border-cyan-200/15 bg-[#071b2d]/65 shadow-[0_18px_58px_rgba(0,15,27,0.20)] backdrop-blur-xl p-5 shadow-[0_24px_100px_rgba(8,47,73,0.18)] sm:p-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:p-8">
          <div className="overflow-hidden rounded-[1.75rem] border border-cyan-300/15 bg-black/35 shadow-2xl shadow-cyan-950/30">
            <video
              className="aspect-video w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/images/linex-ht-v1-poster.jpg"
            >
              <source src="/videos/linex-ht-v1-gibanje.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="p-1 lg:p-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/55">LINEX HT v1 v gibanju</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Realno testiranje gibanja velike FDM/FGF platforme.</h2>
            <p className="mt-4 leading-8 text-white/65">
              Kratek posnetek prikazuje gibanje LINEX HT v1 med testiranjem osi in procesnih nastavitev. Namen platforme je izdelava velikih funkcionalnih kosov, kjer so pomembni togost konstrukcije, natančno vodenje, stabilno gibanje in kontrola procesa.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {['lasten razvoj stroja', 'velik delovni volumen', 'industrijski FDM/FGF', 'testiranje procesnih nastavitev'].map((item) => (
                <div key={item} className="rounded-[1.1rem] border border-cyan-200/15 bg-[#071b2d]/65 shadow-[0_18px_58px_rgba(0,15,27,0.20)] backdrop-blur-xl px-4 py-3 text-sm font-semibold text-white/68">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-[2.25rem] border border-cyan-200/15 bg-[#071b2d]/65 shadow-[0_18px_58px_rgba(0,15,27,0.20)] backdrop-blur-xl p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/55">Tehnični poudarki</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">LINEX HT v1 ni samo velik tiskalnik, ampak razvojna platforma.</h2>
              <p className="mt-4 leading-8 text-white/65">
                Platforma je zasnovana za velik format, tehnične polimere, kontrolirano temperaturo in razvoj procesnih parametrov. Prednost je kombinacija stroja, materialnega znanja in konstrukcijske priprave kosa.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {technicalSpecs.map((item) => (
                <article key={item.label} className="rounded-[1.5rem] border border-cyan-200/12 bg-[#061a2c]/62 backdrop-blur-xl p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/50">{item.label}</div>
                  <div className="mt-2 text-2xl font-semibold text-white">{item.value}</div>
                  <p className="mt-3 text-sm leading-6 text-white/58">{item.note}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {extrusionHighlights.map((item) => (
              <article key={item.title} className="rounded-[1.5rem] border border-cyan-300/15 bg-cyan-400/[0.07] p-5">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/64">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/55">Zmogljivosti</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Za projekte, kjer običajen 3D print servis ni dovolj.</h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-4">
          {strengths.map((item) => {
            const Icon = item.icon
            return (
              <article key={item.title} className="rounded-[2rem] border border-cyan-200/15 bg-[#071b2d]/65 shadow-[0_18px_58px_rgba(0,15,27,0.20)] backdrop-blur-xl p-6">
                <Icon className="h-7 w-7 text-cyan-300" />
                <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/62">{item.text}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-cyan-200/15 bg-[#071b2d]/65 shadow-[0_18px_58px_rgba(0,15,27,0.20)] backdrop-blur-xl p-7">
            <Cpu className="h-8 w-8 text-cyan-300" />
            <h2 className="mt-5 text-3xl font-semibold">Za kaj je LINEX smiseln?</h2>
            <p className="mt-4 leading-8 text-white/65">
              Največ vrednosti ima pri kosih, kjer velikost, material, geometrija ali funkcija zahtevajo več kot samo hiter tisk STL datoteke. Prednost je kombinacija razvojnega znanja, priprave modela in razumevanja materiala.
            </p>
            <Link
              href="/storitve/industrijski-3d-tisk"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/15"
            >
              Več o industrijskem 3D tisku <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {useCases.map((item) => (
              <div key={item} className="rounded-[1.5rem] border border-cyan-200/15 bg-[#071b2d]/65 shadow-[0_18px_58px_rgba(0,15,27,0.20)] backdrop-blur-xl p-5 text-sm leading-6 text-white/70">
                <CheckCircle2 className="mb-3 h-5 w-5 text-cyan-300" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-[2.25rem] border border-cyan-200/15 bg-[#071b2d]/65 shadow-[0_18px_58px_rgba(0,15,27,0.20)] backdrop-blur-xl p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <Wrench className="h-8 w-8 text-cyan-300" />
              <h2 className="mt-5 text-3xl font-semibold">Kako poteka projekt?</h2>
              <p className="mt-4 leading-8 text-white/65">
                Pri večjih kosih je veliko odločitev sprejetih pred tiskom. Zato je postopek bolj podoben tehničnemu razvoju kot samo naročilu kosa.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {process.map((step) => (
                <article key={step.title} className="rounded-[1.5rem] border border-cyan-200/12 bg-[#061a2c]/62 backdrop-blur-xl p-5">
                  <h3 className="text-base font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/62">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-cyan-300/15 bg-cyan-400/10 p-7">
            <h2 className="text-2xl font-semibold">Kaj je dobro poslati za oceno?</h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-white/68">
              <li>• slike obstoječega kosa ali skice ideje</li>
              <li>• približne mere in namen uporabe</li>
              <li>• STEP/STL datoteko, če jo imate</li>
              <li>• želene lastnosti: togost, temperatura, UV, udarci, kemikalije, videz</li>
              <li>• okvirno količino in želeni rok</li>
            </ul>
          </div>

          <div className="rounded-[2rem] border border-cyan-200/15 bg-[#071b2d]/65 shadow-[0_18px_58px_rgba(0,15,27,0.20)] backdrop-blur-xl p-7">
            <h2 className="text-2xl font-semibold">Kdaj LINEX ni najboljša izbira?</h2>
            <div className="mt-5 space-y-3">
              {notIdeal.map((item) => (
                <div key={item} className="rounded-[1.2rem] border border-white/10 bg-white/[0.035] px-4 py-3 text-sm leading-6 text-white/62">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[2rem] border border-white/10 bg-gradient-to-r from-cyan-400/15 via-blue-500/10 to-sky-400/10 p-7 sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-100/55">Povpraševanje</p>
              <h2 className="mt-2 text-2xl font-semibold">Imate večji kos ali tehnični problem za izdelavo?</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65">
                Pošljite slike, mere ali datoteko. Tudi če dokumentacije še ni, lahko začnemo z obstoječim kosom, 3D skeniranjem ali osnovno tehnično zasnovo.
              </p>
            </div>
            <Link
              href="/kontakt"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
            >
              Pošlji povpraševanje <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
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
