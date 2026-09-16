import SiteHeader from '@/components/SiteHeader'
import {client} from '@/sanity/client'
import {urlFor} from '@/sanity/image'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers3,
  Route,
  ScanLine,
  Sparkles,
  Wrench,
} from 'lucide-react'

async function getPageData() {
  return client.fetch(`{
    "siteSettings": *[_type == "siteSettings"][0]{
      siteTitle,
      brandName,
      tagline,
      email,
      phone,
      location,
      logo
    },
    "homePage": *[_type == "homePage"][0]{
      eyebrow,
      heroTitle,
      heroText,
      heroImage,
      badges
    },
    "projects": *[_type == "project"] | order(publishedAt desc)[0...3]{
      _id,
      title,
      "slug": slug.current,
      category,
      excerpt,
      featuredImage,
      publishedAt
    }
  }`)
}

const serviceCards = [
  {
    title: 'Industrijski 3D tisk',
    text: 'Funkcionalni prototipi, veliki tehnični kosi, manjše serije in zahtevni materiali za realno uporabo.',
    href: '/storitve/industrijski-3d-tisk',
    icon: Cpu,
  },
  {
    title: '3D skeniranje & reverse engineering',
    text: 'Od obstoječega ali poškodovanega kosa do uporabnega CAD modela, izboljšave in nove izdelave.',
    href: '/storitve/3d-skeniranje-reverse-engineering',
    icon: ScanLine,
  },
  {
    title: 'Konstruiranje & 3D modeliranje',
    text: 'CAD razvoj, priprava modelov za proizvodnjo, tehnična dokumentacija in optimizacija konstrukcije.',
    href: '/storitve/konstruiranje-3d-modeliranje',
    icon: Wrench,
  },
  {
    title: 'Prototipizacija izdelkov',
    text: 'Hiter prehod od ideje do fizičnega kosa: zasnova, iteracije, testiranje in priprava na uporabo.',
    href: '/storitve/prototipizacija',
    icon: Layers3,
  },
]

const whyItems = [
  'Inženirski pristop: kos ni samo natisnjen, ampak zasnovan za realno obremenitev in uporabo.',
  'Možnost kombinacije 3D skeniranja, CAD modeliranja, reverse engineeringa in izdelave novega dela.',
  'Fokus na tehnične materiale, funkcionalne prototipe, obnovo plastičnih kosov in manjše serije.',
  'Lasten razvoj platforme LINEX in praktične izkušnje z velikimi formati ter procesnimi izzivi.',
]

const processSteps = [
  {
    title: '1. Pošljete problem ali model',
    text: 'Slike, mere, poškodovan kos, STL/STEP datoteko ali samo opis, kaj mora kos opravljati.',
  },
  {
    title: '2. Določimo najboljšo rešitev',
    text: 'Izbira tehnologije, materiala, konstrukcije, orientacije tiska in potrebnih izboljšav.',
  },
  {
    title: '3. Izdelava in predaja',
    text: 'Izdelava prototipa ali kosa, preverjanje uporabnosti in dogovor za morebitne izboljšave.',
  },
]

export default async function Home() {
  const data = await getPageData()

  const site = data?.siteSettings
  const home = data?.homePage
  const projects = data?.projects || []

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <BackgroundGlow />

      <SiteHeader
        logoUrl={site?.logo ? urlFor(site.logo).width(2200).height(650).url() : undefined}
        brandName={site?.brandName}
        basePath=""
      />

      <section
        id="domov"
        className="scroll-mt-40 mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20"
      >
        <div className="grid items-center gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-14">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100/90 shadow-[0_0_30px_rgba(34,211,238,0.12)]">
              <Sparkles size={16} className="text-cyan-300" />
              {home?.eyebrow || 'Industrijski razvoj, 3D tisk in reverse engineering'}
            </div>

            <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {home?.heroTitle || 'Laztek Engineering za funkcionalne tehnične kose, prototipe in industrijske rešitve.'}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              {home?.heroText ||
                'Združujemo konstruiranje, 3D skeniranje, reverse engineering, industrijski 3D tisk in prototipizacijo za podjetja, ki potrebujejo uporabne in tehnično smiselne rešitve.'}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_40px_rgba(56,189,248,0.28)] transition hover:scale-[1.02]"
              >
                Pošlji povpraševanje
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/storitve"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/30 hover:bg-cyan-400/10"
              >
                Poglej storitve
              </Link>
            </div>

            {home?.badges?.length ? (
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {home.badges.map((item: {label?: string; value?: string}, index: number) => (
                  <MetricCard key={`${item.label}-${index}`} label={item.label} value={item.value} index={index} />
                ))}
              </div>
            ) : null}
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1020]/70 shadow-2xl shadow-black/20">
            {home?.heroImage ? (
              <img
                src={urlFor(home.heroImage).width(1200).height(900).url()}
                alt={home?.heroTitle || 'Laztek hero image'}
                className="aspect-[16/10] w-full object-cover"
              />
            ) : (
              <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-cyan-400/18 via-indigo-400/10 to-fuchsia-400/16 text-center text-sm text-white/45">
                <div className="flex flex-col items-center gap-3 px-8">
                  <div className="text-lg font-semibold">Hero slika</div>
                  <div className="max-w-sm text-xs leading-6 text-white/45">
                    V Sanityju dodaj sliko v dokument Domov → Hero image
                  </div>
                </div>
              </div>
            )}

            <div className="p-5">
              <div className="text-lg font-semibold">{site?.brandName || 'Laztek Engineering'}</div>
              <p className="mt-2 text-sm leading-7 text-white/70">{site?.tagline}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Storitve"
          title="Oglejte si, kaj lahko storimo za vas"
          text="Ne glede na to, ali imate idejo, poškodovan kos, obstoječ izdelek ali že pripravljeno datoteko, vam lahko pomagamo pri izbiri prave poti od zasnove do uporabnega tehničnega izdelka."
          centered
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {serviceCards.map((service) => {
            const Icon = service.icon
            return (
              <Link
                key={service.href}
                href={service.href}
                className="group rounded-[2rem] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-cyan-300/25 hover:bg-cyan-400/10"
              >
                <div className="mb-5 inline-flex rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-3">
                  <Icon size={22} className="text-cyan-300" />
                </div>
                <h2 className="text-xl font-semibold tracking-tight">{service.title}</h2>
                <p className="mt-4 text-sm leading-7 text-white/68">{service.text}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition group-hover:gap-3">
                  Več o storitvi
                  <ArrowRight size={15} />
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 lg:p-8">
            <SectionHeading
              eyebrow="Zakaj Laztek"
              title="Manj klasičen 3D print servis, bolj tehnični razvojni partner"
              text="Največja vrednost je kombinacija prakse, konstrukcijskega razmišljanja in izdelave. Cilj ni samo lep kos, ampak kos, ki opravi svojo nalogo."
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {whyItems.map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="rounded-[1.75rem] border border-white/10 bg-[#0b1020]/65 p-5"
              >
                <CheckCircle2 size={18} className="mb-4 text-cyan-300" />
                <p className="text-sm leading-7 text-white/75">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Potek sodelovanja"
          title="Od problema do uporabnega kosa"
          text="Za povpraševanje ne rabi biti vse pripravljeno. Dovolj je opis problema, slika kosa, obstoječa datoteka ali osnovne mere."
          centered
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {processSteps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6"
            >
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-400/10 text-sm font-semibold text-cyan-100">
                {index + 1}
              </div>
              <h2 className="text-xl font-semibold">{step.title}</h2>
              <p className="mt-4 text-sm leading-7 text-white/68">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {projects.length ? (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Projekti"
              title="Izbrani razvojni in proizvodni projekti"
              text="Projekti bodo postopoma postali najmočnejši dokaz sposobnosti: problem, rešitev, material, tehnologija in rezultat."
            />
            <Link
              href="/projekti"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/30 hover:bg-cyan-400/10"
            >
              Vsi projekti
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {projects.map((project: any) => (
              <Link
                href={`/projekti/${project.slug}`}
                key={project._id}
                className="block overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 transition hover:-translate-y-1"
              >
                {project.featuredImage ? (
                  <img
                    src={urlFor(project.featuredImage).width(900).height(600).url()}
                    alt={project.title || 'Project image'}
                    className="aspect-[16/10] w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-cyan-400/18 via-indigo-400/10 to-fuchsia-400/16 text-center text-sm text-white/45">
                    <div className="px-6">Projekt</div>
                  </div>
                )}

                <div className="p-6">
                  <div className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/60">
                    {project.category}
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold">{project.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-white/68">{project.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2.25rem] border border-cyan-300/15 bg-gradient-to-br from-cyan-400/14 via-indigo-400/10 to-fuchsia-400/10 p-6 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-cyan-100/75">
                Povpraševanje
              </div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Imate poškodovan kos, prototip, model ali idejo?
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-8 text-white/72 sm:text-base">
                Pošljite slike, mere, obstoječo datoteko ali opis problema. Skupaj določimo, ali je najbolj smiselna izdelava, skeniranje, reverse engineering, konstrukcijska izboljšava ali kombinacija postopkov.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_40px_rgba(56,189,248,0.28)] transition hover:scale-[1.02]"
              >
                Oddaj povpraševanje
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/o-podjetju"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/30 hover:bg-cyan-400/10"
              >
                Več o podjetju
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
      <div className="absolute right-[-8%] top-[10%] h-96 w-96 rounded-full bg-fuchsia-500/10 blur-3xl" />
      <div className="absolute bottom-[-10%] left-[12%] h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
    </div>
  )
}

function SectionHeading({
  eyebrow,
  title,
  text,
  centered = false,
}: {
  eyebrow?: string
  title?: string
  text?: string
  centered?: boolean
}) {
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}>
      {eyebrow ? (
        <div className="mb-4 inline-flex rounded-full border border-cyan-300/15 bg-cyan-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-cyan-100/75">
          {eyebrow}
        </div>
      ) : null}
      {title ? (
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      ) : null}
      {text ? <p className="mt-5 text-sm leading-8 text-white/66 sm:text-base">{text}</p> : null}
    </div>
  )
}

function MetricCard({
  label,
  value,
  index,
}: {
  label?: string
  value?: string
  index: number
}) {
  return (
    <div
      className={[
        'rounded-[1.75rem] border p-5 backdrop-blur-sm',
        index === 0 && 'border-cyan-300/20 bg-cyan-400/10',
        index === 1 && 'border-fuchsia-300/20 bg-fuchsia-400/10',
        index === 2 && 'border-indigo-300/20 bg-indigo-400/10',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="text-sm text-white/55">{label}</div>
      <div className="mt-2 text-base font-medium text-white">{value}</div>
    </div>
  )
}
