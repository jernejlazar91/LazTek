import type {Metadata} from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import {client} from '@/sanity/client'
import {urlFor} from '@/sanity/image'
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  CheckCircle2,
  ClipboardCheck,
  Cog,
  DraftingCompass,
  FileCheck2,
  FileText,
  Layers3,
  Ruler,
  Settings2,
  Sparkles,
  Wrench,
  XCircle,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Konstruiranje in 3D modeliranje | Laztek Engineering',
  description:
    'CAD konstruiranje, 3D modeliranje, generative design, topology optimization, tehnični razvoj, optimizacija geometrije, priprava modelov za 3D tisk in izdelavo funkcionalnih tehničnih kosov.',
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
  '3D modeliranje tehničnih kosov, ohišij, nosilcev, adapterjev in sklopov',
  'konstruiranje z mislijo na material, montažo, obremenitve in dejansko izdelavo',
  'priprava STEP/STL datotek za 3D tisk, prototipiranje ali nadaljnjo proizvodnjo',
  'optimizacija oblike za aditivno proizvodnjo, manj deformacij in boljšo uporabnost',
  'generative design za iskanje več možnih konstrukcijskih rešitev glede na omejitve, obremenitve in prostor',
  'topology optimization za zmanjšanje mase, odstranjevanje nepotrebnega materiala in boljši izkoristek oblike',
  'preoblikovanje skice, ideje ali poškodovanega kosa v uporaben tehnični model',
  'osnovne delavniške risbe, mere, tehnična dokumentacija in priprava za komunikacijo z dobavitelji',
]

const projectTypes = [
  {
    icon: DraftingCompass,
    title: 'Celoten sestav stroja',
    text: 'Pri zahtevnejših projektih lahko razvijemo celoten 3D sestav: konstrukcijo, nosilce, osi, vpetja, montažne površine in prostor za komponente.',
    image: '/images/3d_konstruiranje2.jpg',
    imageAlt: 'Celoten 3D sestav industrijskega stroja',
  },
  {
    icon: Wrench,
    title: 'Optimizacija teže in oblike',
    text: 'Pri nosilcih in adapterjih lahko obliko prilagodimo obremenitvam: odstranimo nepotreben material, ohranimo funkcijo in dobimo lažji, bolj smiseln kos.',
    image: '/images/topology2.png',
    imageAlt: 'Optimizacija teže in oblike tehničnega nosilca',
  },
  {
    icon: Boxes,
    title: 'Podsklopi strojev in priprave',
    text: 'Modeliramo tudi posamezne podsklope strojev, nosilce, vpetja, šablone, adapterje in priprave, ki morajo biti uporabne za montažo ali proizvodnjo.',
    image: '/images/3d_konstruiranje.jpg',
    imageAlt: '3D model podsklopa stroja z vodili in nosilci',
  },
]

const designFocus = [
  {
    title: 'Izvedljivost',
    text: 'Model mora biti možno realno izdelati, ne samo narisati. Zato se že pri konstrukciji upoštevajo omejitve tehnologije.',
  },
  {
    title: 'Trdnost in uporaba',
    text: 'Pri funkcionalnih kosih so pomembne smer obremenitve, pritrdilne točke, debeline sten, rebra, zaokrožitve in montaža.',
  },
  {
    title: 'Material in proces',
    text: 'Konstrukcija za PETG, PA-CF, PPA, PPS ali TPU ni vedno enaka. Geometrijo je smiselno prilagoditi materialu in procesu izdelave.',
  },
  {
    title: 'DfAM optimizacija',
    text: 'Pri aditivni proizvodnji lahko kos zasnujemo drugače kot pri rezkanju ali brizganju: lažje, bolj funkcionalno in z manj sestavnimi deli.',
  },
  {
    title: 'Generative design',
    text: 'Pri zahtevnejših kosih lahko zasnovo usmerimo s cilji in omejitvami: prostor, pritrdilne točke, obremenitve, masa in tehnologija izdelave.',
  },
  {
    title: 'Topology optimization',
    text: 'Topološka optimizacija pomaga prepoznati, kje material res prispeva k nosilnosti in kje ga je mogoče odstraniti brez nepotrebne izgube funkcije.',
  },
]

const advancedMethods = [
  {
    icon: Sparkles,
    title: 'Generative design',
    text: 'Namesto ene ročno narisane oblike se določijo cilji in omejitve: kje mora biti kos pritrjen, koliko prostora ima, kje so obremenitve, koliko mase želimo prihraniti in s katero tehnologijo bo izdelan. Na tej osnovi se lahko razvije več možnih konstrukcijskih smeri, ki jih potem tehnično očistimo in pripravimo za realno izdelavo.',
  },
  {
    icon: Layers3,
    title: 'Topology optimization',
    text: 'Topološka optimizacija je uporabna, ko želimo ohraniti funkcijo in togost, hkrati pa zmanjšati maso ali porabo materiala. Rezultat ni slepo sprejet kot končni model, ampak služi kot osnova za bolj smiselno konstrukcijo z zaokrožitvami, stenami, rebri in detajli, ki jih je mogoče dejansko natisniti ali izdelati.',
  },
  {
    icon: Settings2,
    title: 'Praktična konstrukcijska presoja',
    text: 'Pri obeh pristopih je pomembno, da rezultat ni samo zanimiva organska oblika. Model mora biti uporaben, merljiv, ponovljiv, primeren za material in dovolj enostaven za montažo, servis ali nadaljnjo proizvodnjo.',
  },
]


const deliverables = [
  'STEP model za nadaljnjo uporabo ali proizvodnjo',
  'STL/3MF model pripravljen za 3D tisk',
  'popravljena ali optimizirana geometrija obstoječega kosa',
  'osnovna tehnična risba ali skica z merami, kjer je to smiselno',
  'predlog materiala in izvedbe glede na uporabo',
  'model pripravljen za prototip, test ali manjšo serijo',
]

const process = [
  {
    title: 'Razumevanje problema',
    text: 'Najprej določimo, kaj mora kos delati: kje je vgrajen, kaj drži, kaj se premika, kakšne so obremenitve in omejitve prostora.',
  },
  {
    title: 'Zasnova in modeliranje',
    text: 'Pripravi se začetni 3D model, popravi obstoječa datoteka ali se iz skice oziroma fizičnega kosa razvije nova geometrija.',
  },
  {
    title: 'Preverjanje izvedbe',
    text: 'Pregledajo se kritični detajli: debeline sten, pritrditve, tolerance, montaža, smer izdelave, material in morebitna potreba po testnem kosu.',
  },
  {
    title: 'Datoteka ali prototip',
    text: 'Model se preda kot datoteka ali se uporabi za izdelavo prototipa. Pri zahtevnih delih se po prvem testu naredi izboljšana verzija.',
  },
]

const requestChecklist = [
  'skico, fotografije ali obstoječo 3D datoteko, če jo imate',
  'osnovne mere, prostor vgradnje in način pritrditve',
  'opis funkcije kosa in kaj pri trenutni rešitvi ne deluje',
  'pričakovane obremenitve, temperaturo, vlago, UV, olje ali kemikalije',
  'želeni material, izgled ali omejitve izdelave, če so znane',
  'količino kosov in ali potrebujete samo model, prototip ali končni izdelek',
]

const notIdeal = [
  'projekt, kjer še ni jasno, kaj mora kos sploh delati',
  'želja po samo lepem renderju brez tehnične uporabe',
  'kopiranje zaščitenega ali patentiranega izdelka brez pravice uporabe',
  'zelo natančni strojni elementi brez dogovorjenih toleranc in merilnega postopka',
]

export default async function CADModelingPage() {
  const data = await getPageData()
  const site = data?.siteSettings

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
            <div className="mb-6 inline-flex rounded-full border border-blue-300/15 bg-blue-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-blue-100/75">
              CAD / 3D modeliranje / tehnični razvoj / DfAM
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Konstruiranje in 3D modeliranje za kose, ki morajo biti uporabni v praksi.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              Tehnični model ni samo lepa oblika na zaslonu. Pri Laztek se konstrukcija pripravi z mislijo na
              material, izdelavo, montažo, obremenitve in realno uporabo kosa. Cilj je model, ki ga je možno
              izdelati, testirati in po potrebi izboljšati.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-600 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_40px_rgba(56,189,248,0.28)] transition hover:scale-[1.02]"
              >
                Pošlji skico ali opis
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/storitve/industrijski-3d-tisk"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/30 hover:bg-cyan-400/10"
              >
                Poveži z izdelavo
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-blue-300/18 bg-gradient-to-br from-blue-400/14 to-cyan-500/10 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl border border-blue-300/20 bg-blue-400/10 p-3">
                <DraftingCompass size={24} className="text-cyan-300" />
              </div>
              <div>
                <div className="text-sm text-white/50">Rezultat</div>
                <div className="text-xl font-semibold">Model, ki je pripravljen za izdelavo</div>
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
          <div className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-cyan-100/65">Kaj lahko razvijemo</div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Od celotnega sestava do optimiziranega kosa ali podsklopa.</h2>
          <p className="mt-5 text-sm leading-8 text-white/66 sm:text-base">
            Modeliranje je lahko usmerjeno v celoten stroj, posamezen podsklop ali optimiziran tehnični kos. Pomembno je, da je
            model uporaben za montažo, izdelavo, prototipiranje in nadaljnje izboljšave.
          </p>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {projectTypes.map((item) => {
            const Icon = item.icon
            return (
              <article key={item.title} className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
                <div className="aspect-[16/9] overflow-hidden border-b border-white/10 bg-white/5">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-5 inline-flex rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-3">
                    <Icon size={22} className="text-cyan-300" />
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/66">{item.text}</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-cyan-100/65">Konstrukcijski fokus</div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Ne gre samo za risanje, ampak za odločitev, kako bo kos deloval.</h2>
            <p className="mt-5 text-sm leading-8 text-white/66 sm:text-base">
              Pri tehničnih kosih so majhni detajli pogosto razlika med uporabnim kosom in kosom, ki poči, se zvije,
              ne sede v montažo ali ga ni mogoče ponovljivo izdelati.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {designFocus.map((item) => (
              <article key={item.title} className="rounded-[1.75rem] border border-white/10 bg-[#0b1020]/70 p-5">
                <div className="mb-4 inline-flex rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-2.5">
                  <BadgeCheck size={19} className="text-cyan-300" />
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/64">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[2.25rem] border border-cyan-300/15 bg-gradient-to-br from-cyan-400/10 via-sky-400/10 to-sky-400/8 p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-cyan-100/65">Napredna optimizacija oblike</div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Generative design in topology optimization uporabimo tam, kjer imata dejansko smisel.</h2>
              <p className="mt-5 text-sm leading-8 text-white/66 sm:text-base">
                Ti pristopi niso namenjeni lepim slikam, ampak boljšim tehničnim odločitvam. Najbolj koristni so pri
                nosilcih, adapterjih, prijemalih, vpenjalih, lahkih konstrukcijah in kosih, kjer je pomembno razmerje med
                maso, togostjo, materialom in načinom izdelave.
              </p>
            </div>
            <figure className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.05] shadow-[0_18px_70px_rgba(0,0,0,0.22)]">
              <img
                src="/images/topology2.png"
                alt="Topološko optimizirana oblika kot izhodišče za konstrukcijsko rešitev"
                className="aspect-[16/9] h-full w-full object-cover"
                loading="lazy"
              />
              <figcaption className="border-t border-white/10 px-5 py-4 text-xs leading-5 text-white/56">
                Primer optimizirane oblike, ki služi kot izhodišče za tehnično očiščen in izvedljiv model.
              </figcaption>
            </figure>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {advancedMethods.map((item) => {
              const Icon = item.icon
              return (
                <article key={item.title} className="rounded-[1.75rem] border border-cyan-200/12 bg-[#061a2c]/62 backdrop-blur-xl p-6">
                  <div className="mb-5 inline-flex rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-3">
                    <Icon size={22} className="text-cyan-300" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/66">{item.text}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>


      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[2.25rem] border border-white/10 bg-[#0b1020]/70 p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <div className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-cyan-100/65">Kaj dobite</div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Datoteke in rešitve, ki imajo nadaljnjo uporabnost.</h2>
              <p className="mt-5 text-sm leading-8 text-white/66 sm:text-base">
                Cilj ni samo enkratna risba, ampak uporabna osnova za prototip, test, izdelavo, dokumentacijo ali
                kasnejše izboljšave.
              </p>
            </div>
            <div className="grid gap-3">
              {deliverables.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[1.35rem] border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/74">
                  <FileCheck2 size={17} className="mt-0.5 shrink-0 text-cyan-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[2.25rem] border border-white/10 bg-gradient-to-br from-blue-400/12 via-cyan-400/8 to-sky-400/10 p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <div className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-cyan-100/65">Proces</div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Od zahteve do uporabnega modela.</h2>
            <p className="mt-5 text-sm leading-8 text-white/66 sm:text-base">
              Konstrukcijski proces je najbolj učinkovit, ko so že na začetku znani namen kosa, pogoji uporabe in
              način izdelave. Tako se izognemo nepotrebnim iteracijam.
            </p>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-4">
            {process.map((step, index) => (
              <article key={step.title} className="rounded-[1.5rem] border border-cyan-200/12 bg-[#061a2c]/62 backdrop-blur-xl p-5 text-sm leading-7 text-white/72">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-400/10 font-semibold text-cyan-100">
                  {index + 1}
                </div>
                <h3 className="mb-2 font-semibold text-white">{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-cyan-300/15 bg-cyan-400/10 p-6 sm:p-8">
            <div className="mb-4 inline-flex rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-3">
              <ClipboardCheck size={22} className="text-cyan-300" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">Kaj pošljete za oceno?</h2>
            <div className="mt-6 grid gap-3">
              {requestChecklist.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm leading-6 text-white/74">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-cyan-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-sky-300/15 bg-sky-400/10 p-6 sm:p-8">
            <div className="mb-4 inline-flex rounded-2xl border border-sky-300/20 bg-sky-400/10 p-3">
              <XCircle size={22} className="text-sky-200" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">Kdaj moramo najprej razčistiti zahteve?</h2>
            <div className="mt-6 grid gap-3">
              {notIdeal.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm leading-6 text-white/74">
                  <XCircle size={17} className="mt-0.5 shrink-0 text-sky-200" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="rounded-[2.25rem] border border-cyan-200/15 bg-[#071b2d]/65 shadow-[0_18px_58px_rgba(0,15,27,0.20)] backdrop-blur-xl p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-cyan-100/65">Naslednji korak</div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Imate skico, idejo ali kos, ki ga je treba razviti?</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/66 sm:text-base">
                Pošljite opis, slike ali obstoječo datoteko. Skupaj določimo, ali je bolj smiselna konstrukcija iz nule,
                popravek modela, 3D skeniranje ali takojšnja izdelava prototipa.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-600 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_40px_rgba(56,189,248,0.25)] transition hover:scale-[1.02]"
              >
                Oddaj povpraševanje
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/storitve/3d-skeniranje-reverse-engineering"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/30 hover:bg-cyan-400/10"
              >
                Poglej skeniranje
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
      <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-sky-500/10 blur-[120px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_28%),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:auto,80px_80px,80px_80px]" />
    </div>
  )
}
