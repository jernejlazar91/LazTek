import type {Metadata} from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  CheckCircle2,
  ClipboardCheck,
  Cpu,
  Factory,
  Layers3,
  Ruler,
  ShieldCheck,
  Sparkles,
  Thermometer,
  Wrench,
  XCircle,
} from 'lucide-react'
import SiteHeader from '@/components/SiteHeader'
import {client} from '@/sanity/client'
import {urlFor} from '@/sanity/image'

export const metadata: Metadata = {
  title: 'Industrijski 3D tisk | Laztek Engineering',
  description:
    'Industrijski 3D tisk funkcionalnih prototipov, nadomestnih delov in manjših serij iz tehničnih materialov, kot so PA6 CF/GF, PPA, PPS, ASA, ABS, PC, PETG in TPU.',
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

const highlights = [
  {
    icon: Factory,
    title: 'Funkcionalni deli, ne samo dekoracija',
    text: 'Tisk je obravnavan kot tehnična izdelava kosa: material, smer tiska, temperatura, obremenitve in montaža so del odločitve.',
  },
  {
    icon: Ruler,
    title: 'Večji formati in namenska geometrija',
    text: 'Primerno za prototipe, ohišja, nosilce, šablone, adapterje, pokrove in dele, kjer navaden namizni tiskalnik ni dovolj.',
  },
  {
    icon: Thermometer,
    title: 'Tehnični in temperaturno odpornejši materiali',
    text: 'Izbira materiala se prilagodi uporabi: od PETG/ABS/ASA do PA6 CF/GF, PPA, PPS, PC in elastičnih TPU/TPE materialov.',
  },
]

const capabilities = [
  'funkcionalni prototipi za preverjanje oblike, montaže in delovanja',
  'nadomestni plastični deli in izboljšane verzije obstoječih kosov',
  'majhne serije, kjer izdelava orodja še ni smiselna',
  'industrijski pripomočki, šablone, vpenjala, adapterji in zaščitni pokrovi',
  'večji kosi in deli z zahtevnejšimi dimenzijami',
  'prilagoditev modela za boljši tisk, manj deformacij in boljšo trdnost',
]

const useCases = [
  {
    title: 'Prototipi za razvoj izdelka',
    text: 'Za hitro preverjanje oblike, montaže, ergonomije, prostora za vijake, kablovje, vložke in realno uporabo kosa.',
  },
  {
    title: 'Nadomestni in izboljšani deli',
    text: 'Ko originalen del ni več dobavljiv, je predrag ali ima konstrukcijsko šibko točko, ki jo je smiselno popraviti.',
  },
  {
    title: 'Manjše serije in namenski pripomočki',
    text: 'Za serije, kjer brizganje plastike nima smisla, ali za proizvodne pripomočke, ki so narejeni točno za določen proces.',
  },
]

const materialGroups = [
  {
    name: 'PETG / PCTG / PETG CF',
    use: 'univerzalni tehnični deli, prototipi, ohišja, nosilci',
    note: 'dobra izbira za veliko projektov, kjer ni ekstremne temperature',
  },
  {
    name: 'ABS / ASA',
    use: 'ohišja, zunanji deli, funkcionalni kosi, ki potrebujejo večjo temperaturno odpornost kot PETG',
    note: 'ASA je posebej uporaben za UV in zunanjo uporabo',
  },
  {
    name: 'PA6 / PA6 CF / PA6 GF',
    use: 'mehansko obremenjeni kosi, nosilci, vpenjala, tehnični adapterji',
    note: 'zahteva pravilno sušenje in premišljeno konstrukcijo',
  },
  {
    name: 'PPA / PPA CF / PPA GF',
    use: 'zahtevnejši tehnični deli z višjo temperaturo in boljšo dimenzijsko stabilnostjo',
    note: 'primeren za bolj industrijske aplikacije kot klasičen PA6',
  },
  {
    name: 'PPS / PPS GF / PPS CF',
    use: 'visokotemperaturni, kemično odpornejši in dimenzijsko stabilnejši deli',
    note: 'za projekte, kjer navadni materiali niso več dovolj',
  },
  {
    name: 'TPU / TPE',
    use: 'elastični vložki, blažilci, zaščite, tesnilom podobni elementi',
    note: 'trdota, geometrija in način uporabe močno vplivajo na rezultat',
  },
]

const engineeringPoints = [
  {
    title: 'DfAM optimizacija',
    text: 'Model se prilagodi aditivni izdelavi: debeline sten, rebra, smer slojev, radiji, pritrdilne točke in mesta največjih obremenitev.',
  },
  {
    title: 'Kombinacija aditivne in klasične obdelave',
    text: 'Pri nekaterih kosih je smiselno tisk kombinirati z naknadnim vrtanjem, brušenjem, vgradnjo vložkov ali drugimi postopki.',
  },
  {
    title: 'Razvoj procesnih parametrov',
    text: 'Pri zahtevnejših materialih se nastavitve ne jemljejo kot univerzalni profil, ampak se prilagodijo materialu in konkretni komponenti.',
  },
]

const process = [
  {
    title: 'Pregled zahteve',
    text: 'Pošljete model, slike, mere ali opis problema. Najprej se preveri, kaj mora kos dejansko prenašati.',
  },
  {
    title: 'Izbira materiala in izvedbe',
    text: 'Predlaga se material, orientacija, debeline sten, polnilo, tolerance in morebitni popravki modela.',
  },
  {
    title: 'Izdelava in preverjanje',
    text: 'Kos se izdela kot prototip, nadomestni del ali serija. Pri zahtevnejših kosih je smiselna iteracija po testu.',
  },
  {
    title: 'Nadgradnja za serijo',
    text: 'Če se kos obnese, se lahko optimizira za krajši čas izdelave, večjo ponovljivost ali boljšo mehansko zanesljivost.',
  },
]

const requestChecklist = [
  'STEP ali STL datoteko, če jo imate',
  'slike kosa, mesta poškodbe ali vgradnje',
  'osnovne mere ali zahteve glede tolerance',
  'temperaturo okolja in morebiten stik s kemikalijami, oljem, UV ali vlago',
  'koliko kosov potrebujete in do kdaj',
  'ali mora biti kos lep na pogled, mehansko močan ali oboje',
]

const notIdeal = [
  'zelo velike serije, kjer je brizganje plastike že cenejše',
  'kosi z izjemno ostrimi tolerancami brez naknadne obdelave',
  'projekti, kjer material ni primeren za temperaturo ali kemijsko okolje',
  'kos, ki mora biti popolnoma enak brizganemu delu brez konstrukcijske prilagoditve',
]

export default async function IndustrialPrintingPage() {
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
            <div className="mb-6 inline-flex rounded-full border border-cyan-300/15 bg-cyan-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-cyan-100/75">
              FDM / FGF / tehnični materiali / funkcionalni deli
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Industrijski 3D tisk za kose, ki morajo dejansko delovati.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              Laztek 3D tisk je namenjen funkcionalnim prototipom, nadomestnim delom, namenskim
              industrijskim pripomočkom in manjšim serijam. Pri vsakem kosu se poleg oblike upošteva
              tudi material, smer tiskanja, temperaturna obremenitev, montaža in realni pogoji uporabe.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-600 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_40px_rgba(56,189,248,0.28)] transition hover:scale-[1.02]"
              >
                Pošlji model ali opis kosa
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/materiali"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/30 hover:bg-cyan-400/10"
              >
                Poglej materiale
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-300/18 bg-gradient-to-br from-cyan-400/16 to-sky-500/10 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-3">
                <Cpu size={24} className="text-cyan-300" />
              </div>
              <div>
                <div className="text-sm text-white/50">Primerno za</div>
                <div className="text-xl font-semibold">Prototipe, nadomestne dele in manjše serije</div>
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

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-[2.25rem] border border-cyan-200/15 bg-[#071b2d]/65 shadow-[0_18px_58px_rgba(0,15,27,0.20)] backdrop-blur-xl p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/55">Inženirska priprava</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Največja razlika nastane pred tiskom.</h2>
            <p className="mt-4 leading-8 text-white/65">
              Pri funkcionalnih delih ni dovolj, da se STL samo pošlje na tiskalnik. Kos je treba prilagoditi materialu, obremenitvi, smeri slojev in realni uporabi.
            </p>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {engineeringPoints.map((item) => (
              <article key={item.title} className="rounded-[1.5rem] border border-cyan-200/12 bg-[#061a2c]/62 backdrop-blur-xl p-5">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/62">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon
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

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-cyan-100/65">Uporaba</div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Kje ima industrijski 3D tisk največ smisla?</h2>
          <p className="mt-5 text-sm leading-8 text-white/66 sm:text-base">
            Največ koristi prinese tam, kjer potrebujete uporaben kos hitro, v majhni količini ali z geometrijo,
            ki bi bila z drugimi postopki nerodna, draga ali počasna.
          </p>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {useCases.map((item, index) => {
            const icons = [Layers3, ShieldCheck, Wrench]
            const Icon = icons[index]
            return (
              <article key={item.title} className="rounded-[2rem] border border-white/10 bg-[#0b1020]/70 p-6">
                <div className="mb-5 inline-flex rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-3">
                  <Icon size={22} className="text-cyan-300" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/66">{item.text}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-[2.25rem] border border-white/10 bg-white/5 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <div className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-cyan-100/65">Materiali</div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Material izberemo glede na namen uporabe, ne po občutku.</h2>
              <p className="mt-5 text-sm leading-8 text-white/66 sm:text-base">
                Isti model se lahko v različnih materialih obnaša popolnoma drugače. Zato je pri tehničnih kosih
                pomembno razmisliti o temperaturi, togosti, udarcih, vlagi, UV, kemikalijah in smeri obremenitve.
              </p>
            </div>
            <Link
              href="/materiali"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/30 hover:bg-cyan-400/10"
            >
              Primerjava materialov
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {materialGroups.map((item) => (
              <article key={item.name} className="rounded-[1.6rem] border border-cyan-200/12 bg-[#061a2c]/62 backdrop-blur-xl p-5">
                <div className="text-lg font-semibold text-white">{item.name}</div>
                <p className="mt-3 text-sm leading-7 text-white/68">{item.use}</p>
                <div className="mt-4 rounded-2xl border border-cyan-300/15 bg-cyan-400/10 px-4 py-3 text-xs leading-6 text-cyan-100/75">
                  {item.note}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[#0b1020]/70 p-6 sm:p-8">
            <div className="mb-4 inline-flex rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-3">
              <ClipboardCheck size={22} className="text-cyan-300" />
            </div>
            <h2 className="text-3xl font-semibold tracking-tight">Kaj poslati za oceno?</h2>
            <p className="mt-4 text-sm leading-8 text-white/66">
              Več informacij kot je na začetku, hitreje se lahko oceni izvedljivost, material in približna cena.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {requestChecklist.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-[1.35rem] border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/72">
                <BadgeCheck size={17} className="mt-0.5 shrink-0 text-cyan-300" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-[2.25rem] border border-amber-300/15 bg-amber-300/5 p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <div className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-amber-100/70">Realna omejitev</div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Kdaj 3D tisk ni najboljša izbira?</h2>
            <p className="mt-5 text-sm leading-8 text-white/66 sm:text-base">
              Dober rezultat pomeni tudi to, da se včasih pravočasno pove, kdaj je smiselna druga tehnologija
              ali dodatna obdelava. 3D tisk je močan postopek, ni pa najboljša rešitev za vsak kos.
            </p>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {notIdeal.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-[1.5rem] border border-cyan-200/12 bg-[#061a2c]/62 backdrop-blur-xl p-5 text-sm leading-7 text-white/70">
                <XCircle size={18} className="mt-0.5 shrink-0 text-amber-200" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:pb-24">
        <div className="rounded-[2.25rem] border border-cyan-300/15 bg-gradient-to-br from-cyan-400/12 via-sky-500/8 to-blue-600/12 p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <div className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-cyan-100/65">Proces</div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Kako poteka naročilo 3D tiska?</h2>
            <p className="mt-5 text-sm leading-8 text-white/66 sm:text-base">
              Najboljši rezultat nastane takrat, ko se tisk ne obravnava kot zadnji klik pred izdelavo,
              ampak kot del konstrukcijske in materialne odločitve.
            </p>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-4">
            {process.map((step, index) => (
              <div key={step.title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/72">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-400/10 font-semibold text-cyan-100">
                  {index + 1}
                </div>
                <h3 className="mb-2 font-semibold text-white">{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="rounded-[2.25rem] border border-white/10 bg-white/5 p-6 text-center sm:p-8 lg:p-10">
          <div className="mx-auto mb-5 inline-flex rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-3">
            <Sparkles size={22} className="text-cyan-300" />
          </div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Imate model, poškodovan kos ali samo idejo?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-white/66 sm:text-base">
            Pošljite datoteko, slike ali opis uporabe. Skupaj se lahko preveri, ali je 3D tisk prava rešitev,
            kateri material je smiseln in ali je model treba pred izdelavo prilagoditi.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-600 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_40px_rgba(56,189,248,0.25)] transition hover:scale-[1.02]"
            >
              Oddaj povpraševanje
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/storitve/obnova-plasticnih-kosov"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/30 hover:bg-cyan-400/10"
            >
              Obnova plastičnih kosov
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
      <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-sky-500/10 blur-[120px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_28%),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:auto,80px_80px,80px_80px]" />
    </div>
  )
}
