import {getStaticProject} from '@/data/projects';
import {getPageEditor, editableMetadata} from '@/sanity/pageEditor';
import SiteHeader from "@/components/CmsSiteHeader";
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
import Image, { getImageProps } from "next/image";
import heroDesktop from "@/assets/laztek-v2/hero/linex-workshop-desktop.webp";
import heroMobile from "@/assets/laztek-v2/hero/linex-workshop-mobile.webp";
import fenderReference from "@/assets/laztek-v2/projects/blatnik/fender-reference-part.webp";
import clioFinalSet from "@/assets/laztek-v2/projects/clio-197/clio-grille-final-set.webp";
import smallSeriesProduction from "@/assets/laztek-v2/services/industrial-print/small-series-production.webp";

type HomeProject = {
  _id: string;
  slug: string;
  title?: string;
  category?: string;
  excerpt?: string;
  featuredImage?: unknown;
  imageUrl?: string;
  path?: string;
};

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
    "homeSelection": *[_id == "website.home"][0].s06.selection[]->{_id,title,path,"slug":slug.current,category,excerpt,featuredImage},
    "projects": *[_type == "project" && defined(slug.current)] | order(isFeatured desc, publishedAt desc)[0...3]{
      _id,
      title,
      "slug": slug.current,
      category,
      excerpt,
      featuredImage,
      publishedAt
    }
  }`, {}, {next: {revalidate: 60}});
}

const defaultServiceCards = [
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

const defaultWhyItems = [
  "Inženirski pristop: kos ni samo natisnjen, ampak zasnovan za realno obremenitev in uporabo.",
  "Možnost kombinacije 3D skeniranja, CAD modeliranja, reverse engineeringa in izdelave novega dela.",
  "Fokus na tehnične materiale, funkcionalne prototipe, obnovo plastičnih kosov in manjše serije.",
  "Lasten razvoj platforme LINEX in praktične izkušnje z velikimi formati ter procesnimi izzivi.",
];

const defaultProcessSteps = [
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
  const editor = await getPageEditor("/");
  const serviceCards = editor.data("s01.f001", defaultServiceCards);
  const whyItems = editor.data("s02.f002", defaultWhyItems);
  const processSteps = editor.data("s03.f003", defaultProcessSteps);

  const data = await getPageData();

  const site = data?.siteSettings;
  const home = data?.homePage;
  const selectedProjects: HomeProject[] = Array.isArray(data?.homeSelection) ? data.homeSelection.filter(Boolean) : data?.projects || [];
  const projects = await Promise.all(selectedProjects.map(async (item) => {
    const slug = item.slug || item.path?.split('/').pop() || '';
    const original = getStaticProject(slug);
    if (!original) return {...item, slug};
    const projectEditor = await getPageEditor(`/projekti/${slug}`);
    if (!projectEditor.exists) return {...item, slug};
    const edited = projectEditor.data('project', original);
    return {...item, slug, title: edited.title, excerpt: edited.excerpt, category: edited.category, imageUrl: edited.featuredImage.src};
  }));
  const cmsHeroTitle = home?.heroTitle?.trim();
  const heroTitle =
    editor.text("s04.f040", !cmsHeroTitle || cmsHeroTitle === previousHeroTitle
      ? conciseHeroTitle
      : cmsHeroTitle);
  const heroAlt = editor.text("s04.heroAlt", "Lastno razvita velikoformatna FDM in FGF platforma LINEX HT v delavnici LazTek Engineering");
  const badges = editor.data<{label?: string; value?: string}[]>("s04.badges", home?.badges || []);
  const {
    props: { srcSet: heroDesktopSrcSet },
  } = getImageProps({
    src: editor.image("s04.f041", heroDesktop),
    alt: heroAlt,
    width: heroDesktop.width,
    height: heroDesktop.height,
    sizes: "(min-width: 1280px) 52vw, 760px",
    quality: 82,
  });
  const { props: heroMobileProps } = getImageProps({
    src: editor.image("s04.f042", heroMobile),
    alt: heroAlt,
    width: heroMobile.width,
    height: heroMobile.height,
    sizes: "100vw",
    quality: 80,
  });

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
            {/* Lokalna bela svetloba samo za berljivost hero teksta.
            Robovi so mehki, zato se pri dnu heroja ne more pojaviti horizontalna črta. */}
            <div className="pointer-events-none absolute left-[-14%] top-[-20%] z-[3] h-[120%] w-[70%] rounded-[50%] bg-white/36 blur-[95px]" />

            <div className="relative z-10 mx-auto max-w-[1440px] px-4 pb-12 pt-10 sm:px-6 sm:pb-14 sm:pt-12 lg:px-8 lg:pb-16 lg:pt-14 xl:grid xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:items-start xl:gap-10">
              <div className="min-w-0 max-w-[680px] xl:max-w-[640px]">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/70 bg-white/[0.76] px-4 py-2 text-sm font-semibold text-[#0F5D7A] shadow-[0_8px_30px_rgba(56,189,248,0.10)] backdrop-blur-md">
                  <Sparkles size={16} className="text-cyan-500" />

                  {editor.text("s04.f004", home?.eyebrow ||
                    "Industrijski razvoj, 3D tisk in reverse engineering")}
                </div>

                <h1 className="max-w-[660px] text-[2.35rem] font-semibold leading-[1.08] tracking-tight text-[#082A4B] sm:text-[2.85rem] lg:text-[3.15rem] xl:text-[3.55rem]">
                  {heroTitle}
                </h1>

                <p className="mt-6 max-w-xl text-base leading-8 text-[#425F74] sm:text-lg">
                  {editor.text("s04.f005", home?.heroText ||
                    "Združujemo konstruiranje, 3D skeniranje, reverse engineering, industrijski 3D tisk in prototipizacijo za podjetja, ki potrebujejo uporabne in tehnično smiselne rešitve.")}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={editor.text("s04.f006", "/kontakt")}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 px-7 py-3.5 text-sm font-bold text-[#06253D] shadow-[0_12px_32px_rgba(14,165,233,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(14,165,233,0.28)]"
                  >{editor.text("s04.f007", "Pošlji povpraševanje")}<ArrowRight size={16} />
                  </Link>

                  <Link
                    href={editor.text("s04.f008", "/storitve")}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-200/90 bg-white/[0.88] px-7 py-3.5 text-sm font-semibold text-[#123A57] shadow-[0_8px_24px_rgba(15,74,105,0.08)] backdrop-blur-md transition hover:border-cyan-300 hover:bg-white"
                  >{editor.text("s04.f009", "Poglej storitve")}</Link>
                </div>

                {badges.length ? (
                  <div className="mt-10 grid max-w-[650px] gap-4 sm:grid-cols-3">
                    {badges.map(
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
              </div>

              <div className="relative z-[2] mx-auto mt-10 w-full max-w-[760px] min-w-0 overflow-hidden rounded-2xl border border-white/80 bg-white/55 p-2 shadow-[0_24px_64px_rgba(18,67,96,0.16)] xl:mt-0 xl:max-w-none">
                <picture>
                  <source
                    media="(min-width: 768px)"
                    srcSet={heroDesktopSrcSet}
                  />
                  <img
                    {...heroMobileProps}
                    alt={heroAlt}
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                    className="block aspect-[8/5] h-auto w-full rounded-xl object-cover object-center max-md:aspect-[4/5]"
                  />
                </picture>
                <div className="pointer-events-none absolute inset-x-2 bottom-2 rounded-b-xl bg-gradient-to-t from-[#061f31]/80 via-[#061f31]/25 to-transparent px-4 pb-4 pt-16 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90">{editor.text("s04.f010", "LINEX HT / Lasten razvoj / Rovte")}</div>
              </div>
            </div>
          </section>
          {/* NADALJEVANJE STRANI - spodaj je ŠE VEDNO ista fixed HEX slika */}
          <div className="relative z-10">
            {/* STORITVE */}
            <section className="relative z-10">
              <SectionAura side="right" tone="cyan" />

              <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
                <SectionHeading
                  eyebrow={editor.text("s01.f011", "Storitve")}
                  title={editor.text("s01.f012", "Oglejte si, kaj lahko storimo za vas")}
                  text={editor.text("s01.f013", "Ne glede na to, ali imate idejo, poškodovan kos, obstoječ izdelek ali že pripravljeno datoteko, vam lahko pomagamo pri izbiri prave poti od zasnove do uporabnega tehničnega izdelka.")}
                  centered
                />

                <div className="mt-9 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                  {serviceCards.map((service) => {
                    const Icon = service.icon;

                    return (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="group relative flex h-full flex-col items-start overflow-hidden rounded-xl border border-sky-200/70 bg-white/[0.76] p-6 shadow-[0_14px_38px_rgba(24,86,122,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-[0_20px_48px_rgba(24,86,122,0.12)]"
                      >
                        <div className="absolute right-[-30px] top-[-30px] h-28 w-28 rounded-full bg-cyan-300/20 blur-2xl" />

                        <div className="relative mb-5 inline-flex rounded-2xl border border-cyan-200 bg-gradient-to-br from-white/90 to-sky-100/70 p-3 shadow-sm">
                          <Icon size={22} className="text-[#1596C0]" />
                        </div>

                        <h3 className="relative text-xl font-semibold tracking-tight text-[#0B2B4C]">
                          {service.title}
                        </h3>

                        <p className="relative mt-4 text-sm leading-7 text-[#587082]">
                          {service.text}
                        </p>

                        <div className="relative mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-[#087EA5] transition group-hover:gap-3">{editor.text("s01.f014", "Več o storitvi")}<ArrowRight size={15} />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>

            <section
              className="lt-deferred-section relative z-10 overflow-hidden"
              aria-label="Dejansko delo iz delavnice LazTek Engineering"
            >
              <SectionAura side="left" tone="turquoise" />
              <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                <SectionHeading
                  eyebrow={editor.text("s05.f015", "Dejansko delo")}
                  title={editor.text("s05.f016", "Resnični deli. Resnični procesi.")}
                  text={editor.text("s05.f017", "Fotografije prikazujejo dejansko digitalizacijo, izdelavo in končne tehnične komponente iz delavnice LazTek Engineering.")}
                  centered
                />
                <div className="mt-10 grid gap-5 md:grid-cols-3">
                  {[
                    {
                      image: fenderReference,
                      alt: "Plastični blatnik z referenčnimi markerji, pripravljen za 3D skeniranje",
                      label: "3D skeniranje",
                      href: "/storitve/3d-skeniranje-reverse-engineering",
                      text: "Priprava realnega kosa za natančen zajem geometrije.",
                    },
                    {
                      image: clioFinalSet,
                      alt: "Komplet štirih izdelanih zračnih mrežic za Renault Clio 197",
                      label: "Reverse engineering",
                      href: "/storitve/3d-skeniranje-reverse-engineering",
                      text: "Končni komplet po rekonstrukciji in več razvojnih iteracijah.",
                    },
                    {
                      image: smallSeriesProduction,
                      alt: "Manjša serija črnih tehničnih komponent na delovni površini LINEX",
                      label: "Mala serija",
                      href: "/storitve/industrijski-3d-tisk",
                      text: "Ponovljiva izdelava funkcionalnih kosov na lastni platformi.",
                    },
                  ].map((item) => (
                    <Link
                      href={item.href}
                      key={item.label}
                      className="group block h-full overflow-hidden rounded-xl border border-white/90 bg-white/80 shadow-[0_16px_42px_rgba(24,86,122,0.09)] transition hover:-translate-y-1 hover:border-cyan-300"
                    >
                      <figure>
                        <Image
                          src={item.image}
                          alt={item.alt}
                          sizes="(max-width: 767px) calc(100vw - 2rem), 33vw"
                          className="aspect-[4/3] h-auto w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                        />
                        <figcaption className="p-5">
                          <span className="flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.16em] text-[#087EA5]">
                            {item.label}
                            <ArrowRight size={16} aria-hidden="true" />
                          </span>
                          <p className="mt-2 text-sm leading-6 text-[#587082]">
                            {item.text}
                          </p>
                        </figcaption>
                      </figure>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {/* ZAKAJ LAZTEK */}
            <section className="lt-deferred-section relative z-10 overflow-hidden">
              <SectionAura side="left" tone="turquoise" />

              <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
                <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                  <div className="rounded-xl border border-white/90 bg-white/[0.72] p-7 shadow-[0_18px_50px_rgba(24,86,122,0.08)] backdrop-blur-xl lg:p-9">
                    <SectionHeading
                      eyebrow={editor.text("s02.f018", "Zakaj LazTek")}
                      title={editor.text("s02.f019", "Več kot 3D tisk: tehnični razvojni partner.")}
                      text={editor.text("s02.f020", "Največja vrednost je kombinacija prakse, konstrukcijskega razmišljanja in izdelave. Cilj ni samo lep kos, ampak kos, ki opravi svojo nalogo.")}
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
            <section className="lt-deferred-section relative z-10 overflow-hidden">
              <SectionAura side="left" tone="blue" />
              <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
                <SectionHeading
                  eyebrow={editor.text("s03.f021", "Potek sodelovanja")}
                  title={editor.text("s03.f022", "Od problema do uporabnega kosa")}
                  text={editor.text("s03.f023", "Za povpraševanje ne rabi biti vse pripravljeno. Dovolj je opis problema, slika kosa, obstoječa datoteka ali osnovne mere.")}
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

                      <h3 className="relative text-xl font-semibold text-[#0B2B4C]">
                        {step.title}
                      </h3>

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
              <section className="lt-deferred-section relative z-10 overflow-hidden">
                <SectionAura side="right" tone="turquoise" />
                <div className="absolute left-[-120px] top-1/3 h-[360px] w-[360px] rounded-full bg-cyan-200/30 blur-[100px]" />
                <div className="absolute right-[-120px] top-[10%] h-[400px] w-[400px] rounded-full bg-blue-200/30 blur-[110px]" />

                <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <SectionHeading
                      eyebrow={editor.text("s06.f024", "Projekti")}
                      title={editor.text("s06.f025", "Izbrani razvojni in proizvodni projekti")}
                      text={editor.text("s06.f026", "Izbrani primeri razvoja in izdelave tehničnih komponent: izhodišče, uporabljeni postopki in rezultat.")}
                    />

                    <Link
                      href={editor.text("s06.f027", "/projekti")}
                      className="inline-flex shrink-0 self-start items-center justify-center gap-2 rounded-full border border-sky-200 bg-white/85 px-6 py-3 text-sm font-semibold text-[#123A57] shadow-[0_8px_24px_rgba(24,86,122,0.07)] backdrop-blur transition hover:border-cyan-300 hover:bg-white lg:self-center"
                    >{editor.text("s06.f028", "Vsi projekti")}<ArrowRight size={16} />
                    </Link>
                  </div>

                  <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {projects.map((project: HomeProject) => (
                      <Link
                        href={`/projekti/${project.slug}`}
                        key={project._id}
                        className="group block overflow-hidden rounded-xl border border-white/90 bg-white/[0.78] shadow-[0_18px_48px_rgba(24,86,122,0.10)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(24,86,122,0.14)]"
                      >
                        {project.imageUrl || project.featuredImage ? (
                          <Image
                            src={project.imageUrl || urlFor(project.featuredImage)
                              .width(720)
                              .height(450)
                              .format("webp")
                              .quality(72)
                              .url()}
                            width={720}
                            height={450}
                            sizes="(max-width: 1023px) calc(100vw - 2rem), 33vw"
                            alt={project.title || "Izvedba projekta LazTek Engineering"}
                            className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                          />
                        ) : (
                          <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-cyan-100 via-sky-50 to-blue-100 text-center text-sm text-slate-500">{editor.text("s06.f030", "Projekt")}</div>
                        )}

                        <div className="p-6">
                          <div className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-medium text-[#087EA5]">
                            {project.category}
                          </div>

                          <h3 className="mt-4 text-2xl font-semibold text-[#0B2B4C]">
                            {project.title}
                          </h3>

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
            <section className="lt-deferred-section relative z-10 overflow-hidden">
              <SectionAura side="left" tone="cyan" />
              <div className="absolute bottom-[-140px] left-[20%] h-[380px] w-[380px] rounded-full bg-cyan-200/25 blur-[110px]" />
              <div className="absolute right-[-120px] top-[-90px] h-[360px] w-[360px] rounded-full bg-blue-200/25 blur-[110px]" />

              <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
                <div className="lt-home-cta overflow-hidden rounded-[2.25rem] border border-sky-200/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.88)_0%,rgba(232,249,252,0.86)_48%,rgba(230,240,253,0.88)_100%)] shadow-[0_26px_76px_rgba(24,86,122,0.13)] backdrop-blur-2xl">
                  <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
                    <div className="p-7 sm:p-9 lg:p-12">
                      <div className="mb-4 inline-flex rounded-full border border-cyan-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#087EA5]">{editor.text("s07.f031", "Povpraševanje")}</div>

                      <h2 className="text-3xl font-semibold tracking-tight text-[#0B2B4C] sm:text-4xl">{editor.text("s07.f032", "Imate poškodovan kos, prototip, model ali idejo?")}</h2>

                      <p className="mt-5 max-w-2xl text-sm leading-8 text-[#587082] sm:text-base">{editor.text("s07.f033", "Pošljite slike, mere, obstoječo datoteko ali opis problema. Skupaj določimo, ali je najbolj smiselna izdelava, skeniranje, reverse engineering, konstrukcijska izboljšava ali kombinacija postopkov.")}</p>
                    </div>

                    <div className="flex flex-col justify-center gap-4 border-t border-sky-200/70 bg-white/55 p-7 backdrop-blur-md sm:p-9 lg:border-l lg:border-t-0 lg:p-12">
                      <div className="text-sm font-bold uppercase tracking-[0.18em] text-[#087EA5]">{editor.text("s07.f034", "Začnimo projekt")}</div>

                      <p className="max-w-md text-sm leading-7 text-[#587082]">{editor.text("s07.f035", "Za prvo oceno pogosto zadostujejo že fotografija, osnovne mere in kratek opis problema.")}</p>

                      <Link
                        href={editor.text("s07.f036", "/kontakt")}
                        className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 px-7 py-3.5 text-sm font-bold text-[#06253D] shadow-[0_12px_30px_rgba(14,165,233,0.22)] transition hover:-translate-y-0.5"
                      >{editor.text("s07.f037", "Oddaj povpraševanje")}<ArrowRight size={16} />
                      </Link>

                      <Link
                        href={editor.text("s07.f038", "/o-podjetju")}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-200 bg-white/80 px-7 py-3.5 text-sm font-semibold text-[#123A57] transition hover:border-cyan-300 hover:bg-white"
                      >{editor.text("s07.f039", "Več o podjetju")}</Link>
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
      <div className="text-sm font-medium text-[#405A6A]">{label}</div>

      <div className="mt-2 text-base font-semibold text-[#0B2B4C]">{value}</div>
    </div>
  );
}
export async function generateMetadata() { return editableMetadata("/", pageMetadata(
  "Industrijski 3D tisk, 3D skeniranje in razvoj",
  "LazTek Engineering: industrijski 3D tisk, 3D skeniranje, CAD razvoj in izdelava funkcionalnih tehničnih komponent.",
  "/",
)); }
