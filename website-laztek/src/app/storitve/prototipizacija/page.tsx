import type {Metadata} from 'next'
import SiteHeader from '@/components/SiteHeader'
import {client} from '@/sanity/client'
import {urlFor} from '@/sanity/image'
import Link from 'next/link'
import {ArrowRight, CheckCircle2, FlaskConical, Hammer, Repeat2, Rocket} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Prototipizacija in razvoj izdelkov | Laztek Engineering',
  description:
    'Razvoj funkcionalnih prototipov, iteracije, testni vzorci in priprava tehničnih kosov za manjšo serijo.',
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
  'razvoj ideje v prvi fizični prototip',
  'funkcionalni testni vzorci za preverjanje vgradnje in uporabe',
  'iteracije po testiranju, meritvah ali povratnih informacijah',
  'ohišja, nosilci, adapterji, priprave in mehanski sklopi',
  'kombinacija CAD razvoja, 3D tiska in tehničnega svetovanja',
  'priprava kosa za manjšo serijo ali nadaljnjo proizvodnjo',
]

const blocks = [
  {
    title: 'Hiter prvi prototip',
    text: 'Idejo spravimo v fizično obliko, da se lahko preveri velikost, montaža, občutek in osnovna funkcija.',
  },
  {
    title: 'Iteracije in izboljšave',
    text: 'Po testu se kos popravi. Spremenijo se debeline, luknje, ojačitve, tolerančna mesta ali material.',
  },
  {
    title: 'Priprava na uporabo',
    text: 'Ko je prototip potrjen, se model pripravi za bolj stabilno izdelavo, manjšo serijo ali drugo tehnologijo.',
  },
]

const process = [
  'Najprej določimo, kaj mora prototip dokazati ali preveriti.',
  'Pripravimo model in izberemo material, ki je smiseln za testiranje.',
  'Izdelamo prototip, ga pregledamo in zabeležimo potrebne spremembe.',
  'Naredimo naslednjo iteracijo ali pripravimo model za končno izdelavo.',
]

export default async function PrototypingPage() {
  const data = await getPageData()
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
            <div className="mb-6 inline-flex rounded-full border border-sky-300/15 bg-sky-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-sky-100/75">
              Ideja → test → izboljšava
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Prototipizacija in razvoj izdelkov od prve ideje do uporabnega kosa.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              Prototip je najhitrejši način, da idejo preverimo v realnosti. Laztek pomaga pri razvoju,
              izdelavi in izboljšavah prototipov, kjer je pomembno, da kos ni samo viden, ampak tudi uporaben.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={contactHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-600 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_40px_rgba(56,189,248,0.28)] transition hover:scale-[1.02]"
              >
                Opiši idejo ali problem
                <ArrowRight size={16} />
              </a>
              <Link
                href="/storitve"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/30 hover:bg-cyan-400/10"
              >
                Nazaj na storitve
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-sky-300/18 bg-gradient-to-br from-sky-400/14 to-blue-600/10 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl border border-sky-300/20 bg-sky-400/10 p-3">
                <Rocket size={24} className="text-cyan-300" />
              </div>
              <div>
                <div className="text-sm text-white/50">Cilj</div>
                <div className="text-xl font-semibold">Hitro preveriti, kaj deluje</div>
              </div>
            </div>
            <div className="grid gap-3">
              {capabilities.map((item) => (
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
          {blocks.map((item, index) => {
            const icons = [FlaskConical, Repeat2, Hammer]
            const Icon = icons[index]
            return (
              <article key={item.title} className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
                <div className="mb-5 inline-flex rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-3">
                  <Icon size={22} className="text-cyan-300" />
                </div>
                <h2 className="text-2xl font-semibold tracking-tight">{item.title}</h2>
                <p className="mt-4 text-sm leading-7 text-white/66">{item.text}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="rounded-[2.25rem] border border-white/10 bg-[#0b1020]/70 p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <div className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-cyan-100/65">Proces</div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Prototip je razvojno orodje, ne samo končni kos.</h2>
            <p className="mt-5 text-sm leading-8 text-white/66 sm:text-base">
              Namen prototipizacije je hitro ugotoviti, kaj je dobro, kaj je treba spremeniti in kako naj se kos razvije naprej.
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
        </div>
      </section>
    </main>
  )
}

function BackgroundGlow() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050816]">
      <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-400/12 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-sky-500/10 blur-[120px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_28%),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:auto,80px_80px,80px_80px]" />
    </div>
  )
}
