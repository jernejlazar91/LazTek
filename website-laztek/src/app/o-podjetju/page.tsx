import type {Metadata} from 'next'
import SiteHeader from '@/components/SiteHeader'
import {client} from '@/sanity/client'
import {urlFor} from '@/sanity/image'
import Link from 'next/link'
import {ArrowRight, CheckCircle2, Cpu, DraftingCompass, ScanLine, Wrench} from 'lucide-react'

export const metadata: Metadata = {
  title: 'O podjetju | Laztek Engineering',
  description:
    'Laztek Engineering združuje strojniško konstruiranje, 3D tisk, reverse engineering, 3D skeniranje in prototipizacijo za funkcionalne tehnične kose.',
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
    "aboutSection": *[_type == "aboutSection"][0]{
      title,
      text1,
      text2,
      highlights
    }
  }`)
}

const pillars = [
  {
    title: 'Inženirski pristop',
    text: 'Fokus ni samo na lepem modelu ali hitrem tisku, ampak na funkcionalnem kosu, ki ima smiseln material, geometrijo in namen uporabe.',
    icon: DraftingCompass,
  },
  {
    title: 'Od kosa do rešitve',
    text: 'Obstoječ kos, poškodovan del, skica ali ideja se lahko pretvori v CAD model, prototip, nadomestni del ali manjšo serijo.',
    icon: ScanLine,
  },
  {
    title: 'Tehnični materiali',
    text: 'Velik poudarek je na materialih, kot so PA6 CF/GF, PETG CF, ASA, PC, TPU in drugih polimerih za realno uporabo.',
    icon: Cpu,
  },
  {
    title: 'Praktična izvedba',
    text: 'Cilj je, da naročnik dobi uporaben kos, ne samo datoteke. Po potrebi se izvedejo popravki, testiranje in iteracije.',
    icon: Wrench,
  },
]

const differentiators = [
  'lastna velikoformatna FDM/FGF platforma LINEX HT v1',
  'razvoj mehansko in temperaturno obremenjenih polimernih komponent',
  'scan → CAD → redesign → proizvodnja workflow',
  'svetovanje pri izbiri tehničnih termoplastov in kompozitov',
  'kombiniranje aditivne izdelave, meritev in klasične obdelave',
  'razvoj funkcionalnih prototipov in maloserijskih tehničnih kosov',
]

const workFlow = [
  'razumevanje problema, kosa ali aplikacije',
  'izbira tehnologije, materiala in konstrukcijske smeri',
  'CAD priprava, skeniranje, modeliranje ali optimizacija',
  'izdelava prototipa oziroma funkcionalnega kosa',
  'pregled rezultata in po potrebi naslednja iteracija',
]

export default async function AboutPage() {
  const data = await getPageData()
  const site = data?.siteSettings
  const about = data?.aboutSection
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
              O podjetju
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {about?.title || 'Laztek Engineering — tehnične rešitve od ideje do funkcionalnega kosa.'}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              {about?.text1 ||
                'Laztek združuje strojniško konstruiranje, 3D modeliranje, 3D skeniranje, reverse engineering, industrijski 3D tisk in prototipizacijo. Poudarek je na uporabnih kosih, ki rešijo konkreten problem.'}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/60">
              {about?.text2 ||
                'Pristop je praktičen: najprej razumeti namen kosa, nato izbrati smiselno tehnologijo, material in konstrukcijsko rešitev.'}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={contactHref}
                className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
              >
                Predstavi projekt <ArrowRight size={16} />
              </a>
              <Link
                href="/projekti"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/85 transition hover:border-cyan-300/30 hover:bg-cyan-400/10"
              >
                Projekti
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-400/10 via-white/[0.04] to-fuchsia-400/10 p-7">
            <div className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-100/60">Način dela</div>
            <div className="mt-5 space-y-4">
              {workFlow.map((item, index) => (
                <div key={item} className="flex gap-4 rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-300 text-sm font-semibold text-slate-950">
                    {index + 1}
                  </div>
                  <div className="text-sm leading-6 text-white/72">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-4">
          {pillars.map((item) => {
            const Icon = item.icon
            return (
              <article key={item.title} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
                <Icon className="h-7 w-7 text-cyan-300" />
                <h2 className="mt-5 text-xl font-semibold text-white">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/62">{item.text}</p>
              </article>
            )
          })}
        </div>

        <div className="mt-8 rounded-[2rem] border border-cyan-300/15 bg-cyan-400/[0.07] p-7">
          <h2 className="text-2xl font-semibold">Kaj je zanimivo pri Laztek pristopu?</h2>
          <p className="mt-4 max-w-4xl leading-8 text-white/65">
            Prednost je, da se storitev ne konča pri tiskanju datoteke. V isti proces lahko spadajo meritve, rekonstrukcija obstoječega kosa, izbor materiala, prilagoditev geometrije in izdelava funkcionalnega dela.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-[1.25rem] border border-white/10 bg-[#050816]/40 px-4 py-3 text-sm leading-6 text-white/70">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-300" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-7">
          <h2 className="text-2xl font-semibold">Kaj je glavna razlika?</h2>
          <p className="mt-4 max-w-4xl leading-8 text-white/65">
            Laztek ni samo klasična storitev 3D tiska. Prednost je kombinacija konstrukcijskega znanja, materialnega razumevanja, 3D skeniranja, reverse engineeringa in praktične izdelave. To pomeni, da se lahko lotimo tudi primerov, kjer naročnik nima pripravljene datoteke, ima poškodovan kos ali potrebuje razvoj od začetka.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {['3D tisk', 'reverse engineering', '3D skeniranje', 'CAD konstrukcija', 'prototipizacija', 'obnova kosov'].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/70">
                <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                {item}
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
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050816]">
      <div className="absolute left-1/2 top-[-10%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[140px]" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[620px] w-[620px] rounded-full bg-fuchsia-500/15 blur-[160px]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:80px_80px] opacity-30" />
    </div>
  )
}
