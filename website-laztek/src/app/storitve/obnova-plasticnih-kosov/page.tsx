import type {Metadata} from 'next'
import SiteHeader from '@/components/SiteHeader'
import {client} from '@/sanity/client'
import {urlFor} from '@/sanity/image'
import Link from 'next/link'
import {ArrowRight, CheckCircle2, FileScan, RefreshCw, ScanLine, Wrench} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Obnova plastičnih kosov | Laztek Engineering',
  description:
    'Obnova polomljenih, poškodovanih in nedobavljivih plastičnih kosov z 3D skeniranjem, reverse engineeringom, CAD rekonstrukcijo in 3D tiskom.',
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

const suitableParts = [
  'polomljeni nosilci, pokrovi, ohišja in zaščite',
  'plastični deli, ki jih ni več možno kupiti kot rezervni del',
  'kosi, pri katerih originalna dokumentacija ne obstaja',
  'obrabljeni ali počeni deli, ki jih je smiselno konstrukcijsko izboljšati',
  'adapterji, vodila, sponke, distančniki in posebni tehnični kosi',
  'majhne serije nadomestnih delov za stroje, naprave ali opremo',
]

const limits = [
  'del mora biti tehnično smiseln za obnovo ali ponovno izdelavo',
  'pri zelo obremenjenih varnostnih delih je potreben dodatni tehnični pregled',
  'material se izbere glede na temperaturo, udarce, kemikalije in namen uporabe',
]

const process = [
  {
    title: '1. Pregled kosa',
    text: 'Pošljete slike, mere ali fizični kos. Najprej ocenimo, ali je boljša obnova, kopija ali izboljšan nadomestni del.',
  },
  {
    title: '2. Skeniranje in merjenje',
    text: 'Kos se po potrebi 3D skenira in dodatno izmeri na kritičnih mestih, kjer morajo biti ujemanja natančna.',
  },
  {
    title: '3. CAD rekonstrukcija',
    text: 'Poškodovane dele rekonstruiramo, manjkajočo geometrijo dopolnimo in po potrebi ojačamo šibke točke.',
  },
  {
    title: '4. Izdelava novega kosa',
    text: 'Novi kos se izdela iz primernega tehničnega materiala in se po potrebi testira ali dodatno prilagodi.',
  },
]

const materialExamples = [
  'PETG / PCTG za robustne splošne tehnične dele',
  'ASA za zunanje dele in UV obstojnost',
  'PA6 CF/GF za bolj toga in temperaturno odporna ojačana ohišja ali nosilce',
  'TPU/TPE za fleksibilne vložke, blažilce in gumijaste funkcionalne elemente',
]

export default async function PlasticPartRepairPage() {
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
            <div className="mb-6 inline-flex rounded-full border border-cyan-300/15 bg-cyan-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-cyan-100/75">
              Obnova / rekonstrukcija / nadomestni deli
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Obnova poškodovanih plastičnih kosov, ko originala ni več možno dobiti.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              Poškodovan ali nedobavljiv plastični kos lahko digitaliziramo, rekonstruiramo in po potrebi izboljšamo. Namen ni samo narediti kopijo, ampak izdelati uporaben nadomestni del, ki je prilagojen dejanski obremenitvi in načinu uporabe.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={contactHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_40px_rgba(56,189,248,0.28)] transition hover:scale-[1.02]"
              >
                Pošlji slike kosa za oceno
                <ArrowRight size={16} />
              </a>
              <Link
                href="/storitve/3d-skeniranje-reverse-engineering"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/30 hover:bg-cyan-400/10"
              >
                3D skeniranje & reverse engineering
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-300/18 bg-gradient-to-br from-cyan-400/14 via-sky-500/10 to-indigo-500/10 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-3">
                <Wrench size={24} className="text-cyan-300" />
              </div>
              <div>
                <div className="text-sm text-white/50">Tipični primeri</div>
                <div className="text-xl font-semibold">Kosi, ki se jih splača rešiti</div>
              </div>
            </div>
            <div className="grid gap-3">
              {suitableParts.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[1.4rem] border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/78">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-cyan-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="mb-5 inline-flex rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-3">
              <FileScan size={22} className="text-cyan-300" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">Brez risb in dokumentacije</h2>
            <p className="mt-4 text-sm leading-7 text-white/66">
              Tudi če obstaja samo fizični kos, lahko iz njega pripravimo digitalni model za ponovno izdelavo ali nadaljnje spremembe.
            </p>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="mb-5 inline-flex rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-3">
              <RefreshCw size={22} className="text-cyan-300" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">Ne samo kopija</h2>
            <p className="mt-4 text-sm leading-7 text-white/66">
              Če se je original zlomil zaradi slabe geometrije, se lahko kritične cone ojačajo, dodajo radiji, odebelitve ali spremeni material.
            </p>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="mb-5 inline-flex rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-3">
              <ScanLine size={22} className="text-cyan-300" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">Primerno za unikatne dele</h2>
            <p className="mt-4 text-sm leading-7 text-white/66">
              Rešitev je posebej uporabna za starejše stroje, opremo, prototipe, posebne nosilce in dele, kjer serijska dobava ni možna.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[2.25rem] border border-white/10 bg-[#0b1020]/70 p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <div className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-cyan-100/65">Proces obnove</div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Od poškodovanega kosa do uporabnega nadomestnega dela.</h2>
            <p className="mt-5 text-sm leading-8 text-white/66 sm:text-base">
              Najboljši rezultat dobimo, ko se obnova ne obravnava samo kot kopiranje oblike, ampak kot tehnična rekonstrukcija z izbiro pravega materiala in izboljšavami tam, kjer so potrebne.
            </p>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-4">
            {process.map((step) => (
              <div key={step.title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/72">
                <h3 className="mb-3 font-semibold text-white">{step.title}</h3>
                {step.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-cyan-100/65">Materiali</div>
            <h2 className="text-3xl font-semibold tracking-tight">Material se izbere po namenu, ne na pamet.</h2>
            <p className="mt-5 text-sm leading-8 text-white/66">
              Pri obnovi plastičnih kosov je material pogosto enako pomemben kot oblika. Pomembni so temperatura, togost, udarci, zunanja uporaba, trenje in način montaže.
            </p>
          </div>

          <div className="grid gap-3">
            {materialExamples.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-[1.4rem] border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/78">
                <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-cyan-300" />
                <span>{item}</span>
              </div>
            ))}
            <div className="rounded-[1.4rem] border border-amber-300/20 bg-amber-300/8 p-4 text-sm leading-7 text-amber-50/72">
              Pomembno: vsak kos ni primeren za 3D tisk ali obnovo. Pri varnostno kritičnih delih je treba posebej preveriti obremenitve, material in način uporabe.
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-cyan-400/12 via-indigo-400/10 to-fuchsia-400/10 p-6 sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-center">
            <div>
              <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-white/65">
                Hitra ocena izvedljivosti
              </div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Pošljite slike kosa in napišite, kje se je zlomil.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-8 text-white/68 sm:text-base">
                Za prvi pregled so dovolj fotografije z več strani, osnovne mere, opis uporabe in informacija, ali je kos izpostavljen temperaturi, vlagi, udarcem ali kemikalijam.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={contactHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
              >
                Pošlji povpraševanje
                <ArrowRight size={16} />
              </a>
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Kontaktna stran
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
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050816]">
      <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-400/12 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-fuchsia-500/10 blur-[120px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_28%),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:auto,80px_80px,80px_80px]" />
    </div>
  )
}
