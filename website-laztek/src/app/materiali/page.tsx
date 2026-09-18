import type {Metadata} from 'next'
import type {ReactNode} from 'react'
import Link from 'next/link'
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Flame,
  FlaskConical,
  Gauge,
  Layers3,
  Ruler,
  ShieldCheck,
  Sparkles,
  Thermometer,
} from 'lucide-react'
import SiteHeader from '@/components/SiteHeader'
import {client} from '@/sanity/client'
import {urlFor} from '@/sanity/image'

export const metadata: Metadata = {
  title: 'Materiali za industrijski 3D tisk | Laztek Engineering',
  description:
    'Izbira tehničnih materialov za funkcionalne 3D tiskane dele: PA6 CF/GF, PPA CF/GF, PPS CF/GF, PETG CF, PCTG, ABS, ASA, PC, TPU/TPE ter svetovanje glede uporabe, geometrije in procesa.',
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
    "materialsSection": *[_type == "materialsSection"][0]{
      title,
      text,
      tags,
      process
    }
  }`)
}

const primaryMaterials = [
  {
    title: 'PA6 / PA6 CF / PA6 GF',
    subtitle: 'Za toge in mehansko obremenjene tehnične dele, priprave, nosilce in funkcionalne nadomestne kose.',
    icon: ShieldCheck,
    properties: [
      'zelo dobra mehanska trdnost in togost, posebej pri CF/GF izvedbah',
      'dobra odpornost na obrabo in primeren material za tehnične kose',
      'CF poveča togost in zmanjša krčenje, GF pogosto doda robustnost in stabilnost',
      'material vpija vlago, zato je sušenje pred tiskom zelo pomembno',
    ],
    bestFor: ['nosilci in priprave', 'funkcionalni nadomestni deli', 'kosi, kjer je pomembna togost'],
    watchOut: ['material je higroskopen', 'zahteva pravilno sušenje', 'pri večjih kosih je pomembna geometrija'],
  },
  {
    title: 'PPA / PPA CF / PPA GF',
    subtitle: 'Za zahtevnejše tehnične dele, kjer je pomembna kombinacija togosti, temperaturne stabilnosti in dimenzijske zanesljivosti.',
    icon: Gauge,
    properties: [
      'višji tehnični razred poliamida od običajnega PA6 pri zahtevnejših aplikacijah',
      'boljša stabilnost pri povišani temperaturi kot pri osnovnih materialih',
      'CF/GF polnitve povečajo togost, dimenzijsko stabilnost in uporabnost za nosilne kose',
      'primeren za dele, kjer PETG/ASA/ABS niso več dovolj',
    ],
    bestFor: ['zahtevnejši nosilci in ohišja', 'deli v bližini toplote', 'tehnični kosi z višjimi mehanskimi zahtevami'],
    watchOut: ['zahteva dobro sušenje', 'pri večjih kosih je pomembna kontrola krčenja', 'ni vedno smiselna izbira za enostavne prototipe'],
  },
  {
    title: 'PPS / PPS GF / PPS CF',
    subtitle: 'Za specialne aplikacije, kjer so pomembni visoka temperaturna odpornost, kemijska obstojnost in stabilnost materiala.',
    icon: Thermometer,
    properties: [
      'zelo dobra kemijska obstojnost v zahtevnejšem okolju',
      'dobra dimenzijska stabilnost in nizka občutljivost na vlago',
      'primeren za aplikacije, kjer je pomembna dolgoročna stabilnost materiala',
      'GF/CF izvedbe povečajo togost in uporabnost za tehnične kose',
    ],
    bestFor: ['deli v zahtevnejšem okolju', 'tehnični kosi z višjo temperaturo uporabe', 'aplikacije, kjer običajni materiali niso dovolj'],
    watchOut: ['material je zahtevnejši za procesiranje', 'pred izdelavo je smiseln testni tisk', 'strošek in dobavljivost se preverita glede na projekt'],
  },
  {
    title: 'PETG / PETG CF / PCTG',
    subtitle: 'Dobra izbira za uporabne prototipe, ohišja in večje funkcionalne kose.',
    icon: Layers3,
    properties: [
      'dobra žilavost in uporabnost za funkcionalne prototipe',
      'zanesljivejši in enostavnejši proces kot pri večini visokotemperaturnih materialov',
      'PETG CF poveča togost in zmanjša občutek “mehke” plastike',
      'PCTG je pogosto dobra izbira, ko je pomembna žilavost in lepša površina',
    ],
    bestFor: ['ohišja in zaščitni elementi', 'prototipi za testiranje oblike', 'kosi z dobro žilavostjo'],
    watchOut: ['ni najboljša izbira za visoke temperature', 'pri zelo togih kosih je lahko boljši CF material', 'pomembna je pravilna orientacija slojev'],
  },
  {
    title: 'ABS',
    subtitle: 'Za tehnična ohišja, prototipe in kose, kjer je pomembna žilavost, obdelava po tisku in uporabna mehanska odpornost.',
    icon: Layers3,
    properties: [
      'dobra udarna žilavost in primeren material za funkcionalna ohišja',
      'dobro se brusi, kita, lepi in naknadno obdeluje',
      'primeren za prototipe, kjer je pomemben industrijski občutek kosa',
      'bolj občutljiv na UV kot ASA, zato za zunaj pogosto izberemo ASA',
    ],
    bestFor: ['ohišja in pokrovi', 'funkcionalni prototipi', 'kosi za naknadno brušenje in barvanje'],
    watchOut: ['pri večjih kosih je potrebna zaprta komora', 'lahko se zvija', 'ni najboljša izbira za dolgotrajno zunanjo uporabo brez zaščite'],
  },
  {
    title: 'ASA',
    subtitle: 'Za zunanje aplikacije in dele, kjer je pomembna UV odpornost.',
    icon: Flame,
    properties: [
      'zelo primeren za zunanje kose zaradi UV in vremenske obstojnosti',
      'podoben občutek in uporabnost kot ABS, vendar boljši za zunanjo uporabo',
      'dobra izbira za pokrove, ohišja in zaščitne elemente',
      'lepša in bolj stabilna izbira kot ABS, ko bo kos na soncu ali vremenu',
    ],
    bestFor: ['zunanji pokrovi', 'tehnična ohišja', 'deli, izpostavljeni vremenu'],
    watchOut: ['potrebuje stabilen proces', 'večji kosi lahko zahtevajo komoro', 'ni univerzalna rešitev za vse obremenitve'],
  },
  {
    title: 'PC',
    subtitle: 'Za zahtevnejše tehnične dele, kjer osnovni materiali niso dovolj.',
    icon: Thermometer,
    properties: [
      'visoka udarna žilavost in dobra mehanska odpornost',
      'boljša temperaturna odpornost kot pri osnovnih materialih',
      'primeren za tehnične prototipe, zaščite in kose z višjimi zahtevami',
      'zahteva dobro kontrolo procesa, ker je občutljiv na vlago in pogoje tiska',
    ],
    bestFor: ['višje temperaturne zahteve', 'močnejši tehnični prototipi', 'deli z višjimi mehanskimi zahtevami'],
    watchOut: ['zahteva nadzorovan proces', 'ni vedno ekonomična izbira', 'potrebna je dobra priprava kosa'],
  },
  {
    title: 'TPU / TPE',
    subtitle: 'Za fleksibilne dele, blažilce, zaščite in tehnične elastične kose.',
    icon: Sparkles,
    properties: [
      'elastičnost in sposobnost blaženja vibracij ali udarcev',
      'primeren za zaščite, obloge, tesnila in mehke tehnične elemente',
      'trdota materiala močno vpliva na končni občutek in funkcijo kosa',
      'pri fleksibilnih materialih sta geometrija in debelina sten zelo pomembni',
    ],
    bestFor: ['tesnila in zaščite', 'blažilci vibracij', 'mehki oprijemi in obloge'],
    watchOut: ['tisk je počasnejši', 'trdota materiala mora ustrezati uporabi', 'ni namenjen za vsako geometrijo'],
  },
  {
    title: 'Materiali po dogovoru',
    subtitle: 'Pri posebnih zahtevah se material izbere glede na kos, dobavljivost, testiranje in realne pogoje uporabe.',
    icon: FlaskConical,
    properties: [
      'možna izbira materiala glede na konkretno aplikacijo',
      'pri neznanih pogojih je smiseln testni kos ali manjša testna serija',
      'končna izbira je odvisna od geometrije, okolja, obremenitve in cene',
      'pri posebnih materialih se posebej preveri dobavljivost in procesna zahtevnost',
    ],
    bestFor: ['posebne aplikacije', 'testni vzorci', 'manjše razvojne serije'],
    watchOut: ['potrebno je preverjanje dobavljivosti', 'lahko zahteva testni tisk', 'končna izbira je odvisna od uporabe'],
  },
]

const decisionFactors = [
  {
    title: 'Temperatura in okolje',
    text: 'Ali bo kos v komori, na soncu, ob motorju, v vlagi ali zunaj? Okolje pogosto takoj izloči napačne materiale.',
    icon: Thermometer,
  },
  {
    title: 'Obremenitev in smer slojev',
    text: 'Pri 3D tisku ni pomemben samo material, ampak tudi orientacija kosa, smer sile in debelina kritičnih sten.',
    icon: Gauge,
  },
  {
    title: 'Velikost kosa',
    text: 'Večji kosi so bolj občutljivi na krčenje, zvijanje in notranje napetosti, zato material izberemo skupaj s procesom.',
    icon: Ruler,
  },
  {
    title: 'Namen izdelave',
    text: 'Prototip, nadomestni del, priprava za delavnico ali manjša serija nimajo enakih zahtev in ne potrebujejo vedno istega materiala.',
    icon: Layers3,
  },
]

const processControls = [
  {
    title: 'Sušenje materiala pred tiskom',
    text: 'Pri PA, PPA, PC, TPU in drugih higroskopnih materialih je sušenje kritično. Vlaga lahko povzroči mehurčke, slabšo površino in slabše mehanske lastnosti.',
  },
  {
    title: 'Kontrola vlage med procesom',
    text: 'Material ni dovolj samo enkrat posušiti. Pri daljših tiskih je pomembno, da ostane suh tudi med izdelavo kosa.',
  },
  {
    title: 'Procesni parametri glede na komponento',
    text: 'Temperatura, hlajenje, hitrost, širina sledi, orientacija in polnilo se prilagodijo geometriji in funkciji konkretnega kosa.',
  },
  {
    title: 'Primerjava modela in rezultata',
    text: 'Pri zahtevnejših delih se lahko preverja odstopanje med CAD modelom, tiskanim kosom in skenirano geometrijo.',
  },
]

const comparisonRows = [
  {
    useCase: 'Hiter funkcionalni prototip',
    suggested: 'PETG, PCTG, ABS ali PETG CF',
    note: 'PETG/PCTG za zanesljiv proces, ABS za obdelavo po tisku in bolj industrijski občutek kosa.',
  },
  {
    useCase: 'Tog nosilec ali priprava',
    suggested: 'PA6 CF / PA6 GF ali PETG CF',
    note: 'Odvisno od obremenitve, velikosti in okolja uporabe.',
  },
  {
    useCase: 'Zahtevnejši tehnični kos z višjo temperaturo',
    suggested: 'PPA CF/GF, PC ali PPS CF/GF',
    note: 'Izbira je odvisna od temperature, obremenitve, geometrije in zahtevane stabilnosti.',
  },
  {
    useCase: 'Kos v kemijsko ali toplotno zahtevnejšem okolju',
    suggested: 'PPS, PPS GF ali PPS CF',
    note: 'Smiselno je preveriti realno okolje uporabe in narediti testni kos.',
  },
  {
    useCase: 'Zunanja uporaba',
    suggested: 'ASA; ABS samo za notranjo uporabo ali z zaščito',
    note: 'ASA je praviloma boljša izbira za sonce in vreme, ABS pa za ohišja in kose, ki se bodo naknadno obdelovali.',
  },
  {
    useCase: 'Fleksibilen zaščitni del',
    suggested: 'TPU / TPE',
    note: 'Treba je izbrati pravo trdoto in preveriti geometrijo kosa.',
  },
  {
    useCase: 'Obnova poškodovanega plastičnega kosa',
    suggested: 'Material glede na originalni namen kosa',
    note: 'Najprej preverimo funkcijo, pritrdilne točke in realne obremenitve.',
  },
]

const requestChecklist = [
  'fotografije kosa ali poškodovanega dela',
  'mere oziroma približna velikost kosa',
  'kje in kako se kos uporablja',
  'temperatura, vlaga, UV, kemikalije ali mehanske obremenitve',
  'ali potrebuješ prototip, en kos ali manjšo serijo',
  'če imaš datoteko: STEP, STL, 3MF, skico ali tehnično risbo',
]

export default async function MaterialsPage() {
  const data = await getPageData()
  const site = data?.siteSettings
  const materials = data?.materialsSection

  return (
    <main className="laztek-page">

      <SiteHeader
        logoUrl={site?.logo ? urlFor(site.logo).width(2200).height(650).url() : undefined}
        brandName={site?.brandName}
        basePath="/"
      />

      <section className="mx-auto max-w-7xl px-4 pb-14 pt-14 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-cyan-100/75">
              <FlaskConical size={16} />
              Materiali in proces
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Pravi material je kombinacija plastike, geometrije in pravilnega procesa tiska.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              {materials?.text ||
                'Pri funkcionalnih 3D tiskanih kosih materiala ne izbiramo samo po imenu. Upoštevati je treba obremenitev, temperaturo, okolje uporabe, velikost kosa, smer slojev in pričakovano življenjsko dobo.'}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
              >
                Pošlji kos za oceno <ArrowRight size={16} />
              </Link>
              <Link
                href="/storitve/industrijski-3d-tisk"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/85 transition hover:border-cyan-300/30 hover:bg-cyan-400/10"
              >
                Industrijski 3D tisk
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-200/15 bg-[#071b2d]/65 shadow-[0_18px_58px_rgba(0,15,27,0.20)] backdrop-blur-xl p-6 shadow-[0_24px_100px_rgba(8,47,73,0.22)]">
            <div className="rounded-[1.5rem] border border-cyan-300/15 bg-cyan-400/10 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100/70">Pomembno</p>
              <p className="mt-3 text-2xl font-semibold leading-snug text-white">
                Tudi najboljši material ne reši slabe geometrije ali napačne orientacije tiska.
              </p>
              <p className="mt-4 leading-7 text-white/65">
                Zato pri izbiri materiala pogledamo celoten kos: funkcijo, pritrdilne točke, smer obremenitve, temperaturo in pričakovano uporabo.
              </p>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {['PA6 CF/GF', 'PPA CF/GF', 'PPS CF/GF', 'PETG CF', 'PCTG', 'ABS', 'ASA', 'PC', 'TPU/TPE'].map((tag) => (
                <div key={tag} className="rounded-2xl border border-cyan-200/15 bg-[#071b2d]/65 shadow-[0_18px_58px_rgba(0,15,27,0.20)] backdrop-blur-xl px-4 py-4">
                  <div className="text-base font-semibold text-white">{tag}</div>
                  <div className="mt-1 text-xs leading-5 text-white/50">izbira glede na namen kosa</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Materialne skupine"
          title="Najpogostejše smeri izbire materiala"
          text="Spodaj niso obljubljene zaloge, ampak praktična razdelitev materialov po namenu. Pri zahtevnejših kosih je smiselno narediti testni tisk ali prototip."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {primaryMaterials.map((item) => {
            const Icon = item.icon
            return (
              <article key={item.title} className="rounded-[2rem] border border-cyan-200/15 bg-[#071b2d]/65 shadow-[0_18px_58px_rgba(0,15,27,0.20)] backdrop-blur-xl p-6">
                <Icon className="h-7 w-7 text-cyan-300" />
                <h2 className="mt-5 text-2xl font-semibold text-white">{item.title}</h2>
                <p className="mt-3 leading-7 text-white/65">{item.subtitle}</p>

                <div className="mt-6 rounded-[1.25rem] border border-cyan-300/15 bg-cyan-400/[0.06] p-4">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/65">Ključne lastnosti</h3>
                  <ul className="mt-3 space-y-2">
                    {item.properties.map((point) => (
                      <li key={point} className="text-sm leading-6 text-white/65">{point}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/60">Primerno za</h3>
                  <ul className="mt-3 space-y-2">
                    {item.bestFor.map((point) => (
                      <li key={point} className="flex gap-2 text-sm leading-6 text-white/70">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-300" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 rounded-[1.25rem] border border-amber-300/15 bg-amber-300/[0.06] p-4">
                  <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-100/65">
                    <AlertTriangle className="h-4 w-4" /> Pozor
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {item.watchOut.map((point) => (
                      <li key={point} className="text-sm leading-6 text-white/58">{point}</li>
                    ))}
                  </ul>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-400/10 via-white/[0.04] to-sky-400/10 p-7">
            <Thermometer className="h-8 w-8 text-cyan-300" />
            <h2 className="mt-5 text-3xl font-semibold">Kako izberemo pravi material?</h2>
            <p className="mt-4 leading-8 text-white/65">
              Najprej določimo realne zahteve kosa. Šele potem izberemo material, orientacijo, debeline sten, polnilo in procesne nastavitve.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {decisionFactors.map((item) => {
              const Icon = item.icon
              return (
                <article key={item.title} className="rounded-[1.5rem] border border-cyan-200/15 bg-[#071b2d]/65 shadow-[0_18px_58px_rgba(0,15,27,0.20)] backdrop-blur-xl p-5">
                  <Icon className="h-5 w-5 text-cyan-300" />
                  <h3 className="mt-4 font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/60">{item.text}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-[2.25rem] border border-cyan-200/15 bg-[#071b2d]/65 shadow-[0_18px_58px_rgba(0,15,27,0.20)] backdrop-blur-xl p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/55">Priprava materiala</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Pri tehničnih materialih je proces enako pomemben kot izbira plastike.</h2>
              <p className="mt-4 leading-8 text-white/65">
                Pri ojačanih polimerih in visokozmogljivih materialih rezultat ni odvisen samo od oznake materiala. Ključni so sušenje, vlaga, geometrija kosa, temperatura procesa in pravilna orientacija tiska.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {processControls.map((item) => (
                <article key={item.title} className="rounded-[1.5rem] border border-cyan-200/12 bg-[#061a2c]/62 backdrop-blur-xl p-5">
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/62">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Praktična izbira"
          title="Material glede na tip projekta"
          text="Za prvo oceno je pogosto dovolj, da veš namen kosa. Končna izbira pa se potrdi glede na geometrijo, okolje in zahtevnost izdelave."
        />
        <div className="mt-8 overflow-hidden rounded-[2rem] border border-cyan-200/15 bg-[#071b2d]/65 shadow-[0_18px_58px_rgba(0,15,27,0.20)] backdrop-blur-xl">
          <div className="hidden grid-cols-[0.9fr_0.9fr_1.2fr] border-b border-white/10 bg-white/[0.04] px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/55 md:grid">
            <div>Tip projekta</div>
            <div>Možna izbira</div>
            <div>Opomba</div>
          </div>
          {comparisonRows.map((row) => (
            <div key={row.useCase} className="grid gap-3 border-b border-white/10 px-6 py-5 last:border-b-0 md:grid-cols-[0.9fr_0.9fr_1.2fr] md:gap-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/45 md:hidden">Tip projekta</div>
                <div className="mt-1 font-semibold text-white md:mt-0">{row.useCase}</div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/45 md:hidden">Možna izbira</div>
                <div className="mt-1 text-white/75 md:mt-0">{row.suggested}</div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/45 md:hidden">Opomba</div>
                <div className="mt-1 leading-7 text-white/58 md:mt-0">{row.note}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[2rem] border border-cyan-200/15 bg-[#071b2d]/65 shadow-[0_18px_58px_rgba(0,15,27,0.20)] backdrop-blur-xl p-7">
            <h2 className="text-3xl font-semibold">Kaj pošlji za izbor materiala?</h2>
            <p className="mt-4 leading-8 text-white/65">
              Za hitro oceno ni treba imeti popolne dokumentacije. Pomagajo pa slike, mere in informacija, kaj mora kos prenesti.
            </p>
            <ul className="mt-6 grid gap-3">
              {requestChecklist.map((item) => (
                <li key={item} className="flex gap-3 rounded-2xl border border-cyan-200/12 bg-[#071b2d]/58 backdrop-blur-xl p-4 text-sm leading-6 text-white/70">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-300" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-cyan-300/15 bg-cyan-400/10 p-7">
            <h2 className="text-3xl font-semibold">Nisi prepričan, kateri material izbrati?</h2>
            <p className="mt-4 leading-8 text-white/70">
              Pošlji opis uporabe, slike kosa ali datoteko. Na podlagi namena lahko predlagamo smiselno materialno smer in opozorimo na morebitna tveganja pri tisku.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
              >
                Odpri kontaktni obrazec <ArrowRight size={16} />
              </Link>
              <Link
                href="/storitve/obnova-plasticnih-kosov"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/85 transition hover:border-cyan-300/30 hover:bg-cyan-400/10"
              >
                Obnova plastičnih kosov
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function SectionIntro({eyebrow, title, text}: {eyebrow: string; title: string; text: string}) {
  return (
    <div className="max-w-3xl">
      <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/55">{eyebrow}</div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-8 text-white/62">{text}</p>
    </div>
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
