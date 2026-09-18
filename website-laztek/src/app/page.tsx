import SiteHeader from "@/components/SiteHeader";
import { pageMetadata } from "@/lib/seo";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers3,
  ScanLine,
  Sparkles,
  Wrench,
} from "lucide-react";
import Link from "next/link";

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
  }`);
}

const serviceCards = [
  {
    title: "Industrijski 3D tisk",
    text: "Funkcionalni prototipi, veliki tehnični kosi, manjše serije in zahtevni materiali za realno uporabo.",
    href: "/storitve/industrijski-3d-tisk",
    icon: Cpu,
  },
  {
    title: "3D skeniranje & reverse engineering",
    text: "Od obstoječega ali poškodovanega kosa do uporabnega CAD modela, izboljšave in nove izdelave.",
    href: "/storitve/3d-skeniranje-reverse-engineering",
    icon: ScanLine,
  },
  {
    title: "Konstruiranje & 3D modeliranje",
    text: "CAD razvoj, priprava modelov za proizvodnjo, tehnična dokumentacija in optimizacija konstrukcije.",
    href: "/storitve/konstruiranje-3d-modeliranje",
    icon: Wrench,
  },
  {
    title: "Prototipizacija izdelkov",
    text: "Hiter prehod od ideje do fizičnega kosa: zasnova, iteracije, testiranje in priprava na uporabo.",
    href: "/storitve/prototipizacija",
    icon: Layers3,
  },
];

const whyItems = [
  "Inženirski pristop: kos ni samo natisnjen, ampak zasnovan za realno obremenitev in uporabo.",
  "Možnost kombinacije 3D skeniranja, CAD modeliranja, reverse engineeringa in izdelave novega dela.",
  "Fokus na tehnične materiale, funkcionalne prototipe, obnovo plastičnih kosov in manjše serije.",
  "Lasten razvoj platforme LINEX in praktične izkušnje z velikimi formati ter procesnimi izzivi.",
];

const processSteps = [
  {
    title: "1. Pošljete problem ali model",
    text: "Slike, mere, poškodovan kos, STL/STEP datoteko ali samo opis, kaj mora kos opravljati.",
  },
  {
    title: "2. Določimo najboljšo rešitev",
    text: "Izbira tehnologije, materiala, konstrukcije, orientacije tiska in potrebnih izboljšav.",
  },
  {
    title: "3. Izdelava in predaja",
    text: "Izdelava prototipa ali kosa, preverjanje uporabnosti in dogovor za morebitne izboljšave.",
  },
];

const previousHeroTitle =
  "Industrijski FDM/FGF 3D tisk, razvoj komponent in reverse engineering za zahtevne tehnične aplikacije.";
const conciseHeroTitle = "Industrijski 3D tisk in razvoj komponent.";

export default async function Home() {
  const data = await getPageData();

  const site = data?.siteSettings;
  const home = data?.homePage;
  const projects = data?.projects || [];
  const cmsHeroTitle = home?.heroTitle?.trim();
  const heroTitle =
    !cmsHeroTitle || cmsHeroTitle === previousHeroTitle
      ? conciseHeroTitle
      : cmsHeroTitle;

  return (
    <>
      <SiteHeader
        logoUrl={
          site?.logo
            ? urlFor(site.logo).width(2200).height(650).url()
            : undefined
        }
        brandName={site?.brandName}
        basePath=""
      />
      <main
        id="vsebina"
        tabIndex={-1}
        className="lt-home relative min-h-screen overflow-x-hidden bg-transparent text-[#0B2B4C]"
      >
        {/* Vsa vsebina je nad enim samim neskončnim backgroundom */}
        <div className="relative z-10">
          {/* HERO */}

          <section
            id="domov"
            className="relative z-10 isolate overflow-hidden bg-transparent"
          >
            {/* FINALNI TRANSPARENTNI LINEX + PROJEKTI */}
            <div className="pointer-events-none absolute inset-0 z-[2] hidden lg:block">
              <img
                src="/images/laztek-hero-objects.png"
                alt=""
                aria-hidden="true"
                className="absolute right-[-1.5%] top-5 w-[54vw] max-w-[980px] object-contain drop-shadow-[0_24px_30px_rgba(21,84,118,0.16)] xl:right-[0.5%] xl:top-2 xl:w-[52vw] xl:max-w-[1040px]"
              />
            </div>

            {/* Lokalna bela svetloba samo za berljivost hero teksta.
            Robovi so mehki, zato se pri dnu heroja ne more pojaviti horizontalna črta. */}
            <div className="pointer-events-none absolute left-[-14%] top-[-20%] z-[3] h-[120%] w-[70%] rounded-[50%] bg-white/36 blur-[95px]" />

            <div className="relative z-10 mx-auto min-h-[650px] max-w-7xl px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16 lg:min-h-[690px] lg:px-8 lg:pb-20 lg:pt-20 xl:min-h-[720px]">
              <div className="max-w-[680px] lg:max-w-[610px] xl:max-w-[660px]">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/70 bg-white/[0.76] px-4 py-2 text-sm font-semibold text-[#0F5D7A] shadow-[0_8px_30px_rgba(56,189,248,0.10)] backdrop-blur-md">
                  <Sparkles size={16} className="text-cyan-500" />

                  {home?.eyebrow ||
                    "Industrijski razvoj, 3D tisk in reverse engineering"}
                </div>

                <h1 className="max-w-[660px] text-[2.35rem] font-semibold leading-[1.08] tracking-tight text-[#082A4B] sm:text-[2.85rem] lg:text-[3.15rem] xl:text-[3.55rem]">
                  {heroTitle}
                </h1>

                <p className="mt-6 max-w-xl text-base leading-8 text-[#425F74] sm:text-lg">
                  {home?.heroText ||
                    "Združujemo konstruiranje, 3D skeniranje, reverse engineering, industrijski 3D tisk in prototipizacijo za podjetja, ki potrebujejo uporabne in tehnično smiselne rešitve."}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/kontakt"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 px-7 py-3.5 text-sm font-bold text-[#06253D] shadow-[0_12px_32px_rgba(14,165,233,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(14,165,233,0.28)]"
                  >
                    Pošlji povpraševanje
                    <ArrowRight size={16} />
                  </Link>

                  <Link
                    href="/storitve"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-200/90 bg-white/[0.88] px-7 py-3.5 text-sm font-semibold text-[#123A57] shadow-[0_8px_24px_rgba(15,74,105,0.08)] backdrop-blur-md transition hover:border-cyan-300 hover:bg-white"
                  >
                    Poglej storitve
                  </Link>
                </div>

                {home?.badges?.length ? (
                  <div className="mt-10 grid max-w-[650px] gap-4 sm:grid-cols-3">
                    {home.badges.map(
                      (
                        item: {
                          label?: string;
                          value?: string;
                        },
                        index: number,
                      ) => (
                        <MetricCard
                          key={`${item.label}-${index}`}
                          label={item.label}
                          value={item.value}
                          index={index}
                        />
                      ),
                    )}
                  </div>
                ) : null}

                {/* Na manjših zaslonih se vizual prestavi pod tekst. */}
                <div className="mt-10 lg:hidden">
                  <img
                    src="/images/laztek-hero-objects.png"
                    alt=""
                    aria-hidden="true"
                    className="mx-auto w-full max-w-[760px] object-contain drop-shadow-[0_20px_28px_rgba(21,84,118,0.14)]"
                  />
                </div>
              </div>
            </div>
          </section>
          <section
            className="lt-home-bridge"
            aria-label="Povezan razvojni proces"
          >
            <div className="lt-container">
              <p>3D skeniranje → CAD razvoj → funkcionalni del</p>
              <Link href="/storitve">
                Raziščite celoten inženirski proces →
              </Link>
            </div>
          </section>

          {/* NADALJEVANJE STRANI - spodaj je ŠE VEDNO ista fixed HEX slika */}
          <div className="relative z-10">
            {/* STORITVE */}
            <section className="relative z-10">
              <SectionAura side="right" tone="cyan" />

              <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
                <SectionHeading
                  eyebrow="Storitve"
                  title="Oglejte si, kaj lahko storimo za vas"
                  text="Ne glede na to, ali imate idejo, poškodovan kos, obstoječ izdelek ali že pripravljeno datoteko, vam lahko pomagamo pri izbiri prave poti od zasnove do uporabnega tehničnega izdelka."
                  centered
                />

                <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                  {serviceCards.map((service) => {
                    const Icon = service.icon;

                    return (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="group relative overflow-hidden rounded-xl border border-sky-200/70 bg-white/[0.76] p-6 shadow-[0_14px_38px_rgba(24,86,122,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-[0_20px_48px_rgba(24,86,122,0.12)]"
                      >
                        <div className="absolute right-[-30px] top-[-30px] h-28 w-28 rounded-full bg-cyan-300/20 blur-2xl" />

                        <div className="relative mb-5 inline-flex rounded-2xl border border-cyan-200 bg-gradient-to-br from-white/90 to-sky-100/70 p-3 shadow-sm">
                          <Icon size={22} className="text-[#1596C0]" />
                        </div>

                        <h2 className="relative text-xl font-semibold tracking-tight text-[#0B2B4C]">
                          {service.title}
                        </h2>

                        <p className="relative mt-4 text-sm leading-7 text-[#587082]">
                          {service.text}
                        </p>

                        <div className="relative mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#087EA5] transition group-hover:gap-3">
                          Več o storitvi
                          <ArrowRight size={15} />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* ZAKAJ LAZTEK */}
            <section className="relative z-10 overflow-hidden">
              <SectionAura side="left" tone="turquoise" />

              <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
                <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                  <div className="rounded-xl border border-white/90 bg-white/[0.72] p-7 shadow-[0_18px_50px_rgba(24,86,122,0.08)] backdrop-blur-xl lg:p-9">
                    <SectionHeading
                      eyebrow="Zakaj LazTek"
                      title="Manj klasičen 3D print servis, bolj tehnični razvojni partner"
                      text="Največja vrednost je kombinacija prakse, konstrukcijskega razmišljanja in izdelave. Cilj ni samo lep kos, ampak kos, ki opravi svojo nalogo."
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {whyItems.map((item, index) => (
                      <div
                        key={`${item}-${index}`}
                        className="rounded-lg border border-white/90 bg-white/[0.72] p-6 shadow-[0_14px_36px_rgba(24,86,122,0.07)] backdrop-blur-xl"
                      >
                        <div className="mb-4 inline-flex rounded-full border border-cyan-200 bg-cyan-50 p-2.5">
                          <CheckCircle2 size={19} className="text-[#1596C0]" />
                        </div>

                        <p className="text-sm leading-7 text-[#4F687A]">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* POTEK SODELOVANJA */}
            <section className="relative z-10 overflow-hidden">
              <SectionAura side="left" tone="blue" />
              <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
                <SectionHeading
                  eyebrow="Potek sodelovanja"
                  title="Od problema do uporabnega kosa"
                  text="Za povpraševanje ne rabi biti vse pripravljeno. Dovolj je opis problema, slika kosa, obstoječa datoteka ali osnovne mere."
                  centered
                />

                <div className="mt-12 grid gap-6 lg:grid-cols-3">
                  {processSteps.map((step, index) => (
                    <div
                      key={step.title}
                      className="relative overflow-hidden rounded-xl border border-sky-200/70 bg-white/[0.76] p-7 shadow-[0_14px_38px_rgba(24,86,122,0.08)] backdrop-blur-xl"
                    >
                      <div className="absolute right-[-45px] top-[-45px] h-36 w-36 rounded-full bg-gradient-to-br from-cyan-200/60 to-blue-300/35 opacity-80 blur-2xl" />

                      <div className="relative mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#22C6D7] via-[#35BDE2] to-[#4389EE] text-sm font-bold text-white shadow-[0_10px_25px_rgba(14,165,233,0.22)]">
                        {index + 1}
                      </div>

                      <h2 className="relative text-xl font-semibold text-[#0B2B4C]">
                        {step.title}
                      </h2>

                      <p className="relative mt-4 text-sm leading-7 text-[#587082]">
                        {step.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* PROJEKTI */}
            {projects.length ? (
              <section className="relative z-10 overflow-hidden">
                <SectionAura side="right" tone="turquoise" />
                <div className="absolute left-[-120px] top-1/3 h-[360px] w-[360px] rounded-full bg-cyan-200/30 blur-[100px]" />
                <div className="absolute right-[-120px] top-[10%] h-[400px] w-[400px] rounded-full bg-blue-200/30 blur-[110px]" />

                <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <SectionHeading
                      eyebrow="Projekti"
                      title="Izbrani razvojni in proizvodni projekti"
                      text="Projekti bodo postopoma postali najmočnejši dokaz sposobnosti: problem, rešitev, material, tehnologija in rezultat."
                    />

                    <Link
                      href="/projekti"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-200 bg-white/85 px-6 py-3 text-sm font-semibold text-[#123A57] shadow-[0_8px_24px_rgba(24,86,122,0.07)] backdrop-blur transition hover:border-cyan-300 hover:bg-white"
                    >
                      Vsi projekti
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                  <div className="mt-12 grid gap-6 lg:grid-cols-3">
                    {projects.map((project: any) => (
                      <Link
                        href={`/projekti/${project.slug}`}
                        key={project._id}
                        className="group block overflow-hidden rounded-xl border border-white/90 bg-white/[0.78] shadow-[0_18px_48px_rgba(24,86,122,0.10)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(24,86,122,0.14)]"
                      >
                        {project.featuredImage ? (
                          <img
                            src={urlFor(project.featuredImage)
                              .width(900)
                              .height(600)
                              .url()}
                            alt={
                              project.title ||
                              "Izvedba projekta LazTek Engineering"
                            }
                            className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                          />
                        ) : (
                          <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-cyan-100 via-sky-50 to-blue-100 text-center text-sm text-slate-500">
                            Projekt
                          </div>
                        )}

                        <div className="p-6">
                          <div className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-medium text-[#087EA5]">
                            {project.category}
                          </div>

                          <h2 className="mt-4 text-2xl font-semibold text-[#0B2B4C]">
                            {project.title}
                          </h2>

                          <p className="mt-3 text-sm leading-7 text-[#587082]">
                            {project.excerpt}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            ) : null}

            {/* CTA */}
            <section className="relative z-10 overflow-hidden">
              <SectionAura side="left" tone="cyan" />
              <div className="absolute bottom-[-140px] left-[20%] h-[380px] w-[380px] rounded-full bg-cyan-200/25 blur-[110px]" />
              <div className="absolute right-[-120px] top-[-90px] h-[360px] w-[360px] rounded-full bg-blue-200/25 blur-[110px]" />

              <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
                <div className="lt-home-cta overflow-hidden rounded-[2.25rem] border border-sky-200/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.88)_0%,rgba(232,249,252,0.86)_48%,rgba(230,240,253,0.88)_100%)] shadow-[0_26px_76px_rgba(24,86,122,0.13)] backdrop-blur-2xl">
                  <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
                    <div className="p-7 sm:p-9 lg:p-12">
                      <div className="mb-4 inline-flex rounded-full border border-cyan-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#087EA5]">
                        Povpraševanje
                      </div>

                      <h2 className="text-3xl font-semibold tracking-tight text-[#0B2B4C] sm:text-4xl">
                        Imate poškodovan kos, prototip, model ali idejo?
                      </h2>

                      <p className="mt-5 max-w-2xl text-sm leading-8 text-[#587082] sm:text-base">
                        Pošljite slike, mere, obstoječo datoteko ali opis
                        problema. Skupaj določimo, ali je najbolj smiselna
                        izdelava, skeniranje, reverse engineering,
                        konstrukcijska izboljšava ali kombinacija postopkov.
                      </p>
                    </div>

                    <div className="flex flex-col justify-center gap-4 border-t border-sky-200/70 bg-white/55 p-7 backdrop-blur-md sm:p-9 lg:border-l lg:border-t-0 lg:p-12">
                      <div className="text-sm font-bold uppercase tracking-[0.18em] text-[#087EA5]">
                        Začnimo projekt
                      </div>

                      <p className="max-w-md text-sm leading-7 text-[#587082]">
                        Za prvo oceno pogosto zadostujejo že fotografija,
                        osnovne mere in kratek opis problema.
                      </p>

                      <Link
                        href="/kontakt"
                        className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 px-7 py-3.5 text-sm font-bold text-[#06253D] shadow-[0_12px_30px_rgba(14,165,233,0.22)] transition hover:-translate-y-0.5"
                      >
                        Oddaj povpraševanje
                        <ArrowRight size={16} />
                      </Link>

                      <Link
                        href="/o-podjetju"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-200 bg-white/80 px-7 py-3.5 text-sm font-semibold text-[#123A57] transition hover:border-cyan-300 hover:bg-white"
                      >
                        Več o podjetju
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* konec vsebine nad fixed backgroundom */}
        </div>
      </main>
    </>
  );
}

function SectionAura({
  side,
  tone,
}: {
  side: "left" | "right";
  tone: "cyan" | "blue" | "turquoise";
}) {
  const toneClass =
    tone === "blue"
      ? "bg-blue-200/20"
      : tone === "turquoise"
        ? "bg-teal-100/28"
        : "bg-cyan-200/24";

  return (
    <div
      className={[
        "pointer-events-none absolute top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full blur-[150px]",
        toneClass,
        side === "left" ? "left-[-18rem]" : "right-[-18rem]",
      ].join(" ")}
    />
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
  centered = false,
}: {
  eyebrow?: string;
  title?: string;
  text?: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <div className="mb-4 inline-flex rounded-full border border-cyan-200 bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#087EA5] shadow-sm backdrop-blur">
          {eyebrow}
        </div>
      ) : null}

      {title ? (
        <h2 className="text-3xl font-semibold tracking-tight text-[#0B2B4C] sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      ) : null}

      {text ? (
        <p className="mt-5 text-sm leading-8 text-[#587082] sm:text-base">
          {text}
        </p>
      ) : null}
    </div>
  );
}

function MetricCard({
  label,
  value,
  index,
}: {
  label?: string;
  value?: string;
  index: number;
}) {
  const border =
    index === 0
      ? "border-cyan-200"
      : index === 1
        ? "border-sky-200"
        : "border-blue-200";

  return (
    <div
      className={`rounded-lg border ${border} bg-white/70 p-5 shadow-[0_10px_28px_rgba(24,86,122,0.06)] backdrop-blur-md`}
    >
      <div className="text-sm text-[#6A8292]">{label}</div>

      <div className="mt-2 text-base font-semibold text-[#0B2B4C]">{value}</div>
    </div>
  );
}
export const metadata = pageMetadata(
  "Industrijski 3D tisk, 3D skeniranje in razvoj",
  "LazTek Engineering: industrijski 3D tisk, 3D skeniranje, CAD razvoj in izdelava funkcionalnih tehničnih komponent.",
  "/",
);
