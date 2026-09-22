import type {StaticImageData} from 'next/image'

import linexCadAssembly from '@/assets/laztek-v2/linex/linex-cad-assembly.webp'
import linexCadPlatform from '@/assets/laztek-v2/linex/linex-cad-platform.webp'
import linexElectronics from '@/assets/laztek-v2/linex/linex-control-electronics.webp'
import linexDevelopment from '@/assets/laztek-v2/linex/linex-development-stage.webp'
import linexEarlyBuild from '@/assets/laztek-v2/linex/linex-early-build.webp'
import linexPlatform from '@/assets/laztek-v2/linex/linex-ht-platform.webp'
import vehicle60l from '@/assets/laztek-v2/projects/60l/60l-vehicle.webp'
import scan60l from '@/assets/laztek-v2/projects/60l/60l-full-scan.webp'
import geometry60l from '@/assets/laztek-v2/projects/60l/60l-reconstructed-geometry.webp'
import atxOriginal from '@/assets/laztek-v2/projects/atx/atx-original-part.webp'
import atxScan from '@/assets/laztek-v2/projects/atx/atx-scan-model.webp'
import atxModel from '@/assets/laztek-v2/projects/atx/atx-engineered-model.webp'
import fenderOriginal from '@/assets/laztek-v2/projects/blatnik/fender-reference-part.webp'
import fenderScan from '@/assets/laztek-v2/projects/blatnik/fender-scan.webp'
import fenderCad from '@/assets/laztek-v2/projects/blatnik/fender-cad-model.webp'
import bmwPrototypes from '@/assets/laztek-v2/projects/bmw/bmw-component-prototypes.webp'
import bmwScan from '@/assets/laztek-v2/projects/bmw/bmw-component-scan.webp'
import bmwSolid from '@/assets/laztek-v2/projects/bmw/bmw-component-solid.webp'
import clioFinal from '@/assets/laztek-v2/projects/clio-197/clio-grille-final-set.webp'
import clioIterations from '@/assets/laztek-v2/projects/clio-197/clio-grille-iterations.webp'
import clioPrintDetail from '@/assets/laztek-v2/projects/clio-197/clio-grille-print-detail.webp'
import clioPrinting from '@/assets/laztek-v2/projects/clio-197/clio-grille-printing.webp'
import clioProcess from '@/assets/laztek-v2/projects/clio-197/clio-grille-process.webp'
import clioScan from '@/assets/laztek-v2/projects/clio-197/clio-grille-scan.webp'
import airVentDetail from '@/assets/laztek-v2/projects/klima/air-vent-printed-part-detail.webp'
import airVent from '@/assets/laztek-v2/projects/klima/air-vent-printed-part.webp'
import prototypePhysical from '@/assets/laztek-v2/services/prototyping/physical-prototype-iteration.webp'
import prototypeFinal from '@/assets/laztek-v2/services/prototyping/prototype-final-set.webp'
import prototypeIterations from '@/assets/laztek-v2/services/prototyping/prototype-iteration-set.webp'

export type ProjectStage = {
  image: StaticImageData
  alt: string
  label: string
  title: string
  text: string
  position?: string
  contain?: boolean
}

export type StaticProject = {
  slug: string
  title: string
  category: string
  excerpt: string
  seoDescription: string
  featuredImage: StaticImageData
  featuredAlt: string
  featuredPosition?: string
  intro: string
  challenge: string
  approach: string
  result: string
  capabilities: string[]
  stages: ProjectStage[]
  serviceHref: string
  serviceLabel: string
}

export const staticProjects: StaticProject[] = [
  {
    slug: 'mrezice-renault-clio-197',
    title: 'Mrežice za Renault Clio 197',
    category: 'Reverse engineering in 3D tisk',
    excerpt:
      'Od zajema referenčne geometrije in razvojnih iteracij do kompleta fizičnih, 3D-natisnjenih mrežic.',
    seoDescription:
      'Reverse engineering in izdelava mrežic za Renault Clio 197: 3D-skeniranje, rekonstrukcija geometrije, prototipiranje in 3D-tisk končnega kompleta.',
    featuredImage: clioFinal,
    featuredAlt: 'Komplet štirih izdelanih mrežic za Renault Clio 197.',
    intro:
      'Projekt združuje digitalizacijo obstoječega kosa, rekonstrukcijo uporabne geometrije in več fizičnih preverjanj. Posamezne faze so bile povezane v celovit razvojni proces, pri katerem je mogoče obliko preveriti še pred izdelavo končnega kompleta.',
    challenge:
      'Obstoječo obliko je bilo treba prenesti v digitalno okolje in jo pripraviti tako, da je primerna za ponovljivo izdelavo fizičnih kosov.',
    approach:
      'Referenčna geometrija je bila zajeta, očiščena in uporabljena kot osnova za konstrukcijo. Sledile so razvojne iteracije in preverjanje posameznih rešitev z dejanskimi natisi.',
    result:
      'Rezultat je komplet štirih fizičnih mrežic ter urejena digitalna osnova, ki omogoča nadaljnje prilagoditve in ponovno izdelavo.',
    capabilities: [
      '3D-skeniranje referenčnega kosa',
      'Rekonstrukcija in prilagoditev geometrije',
      'Razvoj skozi fizične iteracije',
      'FDM 3D-tisk končnih komponent',
    ],
    stages: [
      {
        image: clioScan,
        alt: 'Digitalizirana geometrija mrežice za Renault Clio 197 brez vidnega programskega vmesnika.',
        label: '01 / Zajem',
        title: 'Referenčna geometrija',
        text: '3D-sken je zagotovil digitalno izhodišče za rekonstrukcijo oblike in ključnih naležnih površin.',
        contain: true,
      },
      {
        image: clioProcess,
        alt: 'Razvojni kosi in vmesne izvedbe mrežice Renault Clio 197.',
        label: '02 / Razvoj',
        title: 'Preverjanje rešitve',
        text: 'Geometrija se je preverjala skozi več razvojnih kosov, kar omogoča odkrivanje potrebnih sprememb pred končno izdelavo.',
      },
      {
        image: clioIterations,
        alt: 'Več fizičnih iteracij 3D-natisnjene avtomobilske mrežice.',
        label: '03 / Iteracije',
        title: 'Primerjava različic',
        text: 'Fizične iteracije pokažejo vpliv konstrukcijskih sprememb neposredno na kosu, ne samo na računalniškem modelu.',
      },
      {
        image: clioPrinting,
        alt: 'Izdelava mrežice Renault Clio 197 s 3D-tiskom.',
        label: '04 / Izdelava',
        title: '3D-tisk komponent',
        text: 'Potrjena geometrija je bila pripravljena za izdelavo posameznih funkcionalnih kosov.',
      },
      {
        image: clioPrintDetail,
        alt: 'Detajl izdelave 3D-natisnjene mrežice.',
        label: '05 / Detajl',
        title: 'Nadzor izdelave',
        text: 'Procesni posnetek prikazuje dejansko izdelavo in strukturo kosa med tiskom.',
      },
      {
        image: clioFinal,
        alt: 'Končni komplet mrežic za Renault Clio 197.',
        label: '06 / Rezultat',
        title: 'Končni komplet',
        text: 'Zaključena serija štirih komponent predstavlja rezultat povezanega procesa od zajema do fizičnega izdelka.',
      },
    ],
    serviceHref: '/storitve/3d-skeniranje-reverse-engineering',
    serviceLabel: 'Več o 3D-skeniranju in reverse engineeringu',
  },
  {
    slug: 'bmw-komponenta-od-skena-do-prototipa',
    title: 'BMW komponenta: od skena do prototipa',
    category: '3D-skeniranje in CAD',
    excerpt:
      'Digitalizacija komponente, izdelava zaprtega CAD-modela in preverjanje rešitve s fizičnimi prototipi.',
    seoDescription:
      'Primer reverse engineeringa BMW komponente: 3D-skeniranje, izdelava solid CAD-modela ter fizični prototipi za preverjanje geometrije.',
    featuredImage: bmwPrototypes,
    featuredAlt: 'Fizični prototipi rekonstruirane BMW komponente.',
    intro:
      'Pri reverse engineeringu sam 3D-sken pogosto še ni končni rezultat. Zajete podatke je treba pretvoriti v urejeno geometrijo, ki jo je mogoče spreminjati, preverjati in uporabiti za izdelavo novega kosa.',
    challenge:
      'Iz obstoječe fizične komponente je bilo treba pridobiti uporabno digitalno osnovo in jo pretvoriti v konstrukcijski model.',
    approach:
      'Skenirana površina je služila kot referenca za izdelavo solidnega CAD-modela. Geometrija je bila nato preverjena s fizičnimi prototipi.',
    result:
      'Nastal je urejen digitalni model in več fizičnih preveritvenih kosov, na katerih je mogoče oceniti obliko in prileganje.',
    capabilities: [
      '3D-skeniranje manjše komponente',
      'Pretvorba referenčne površine v CAD-solid',
      'Konstrukcijsko prilagajanje',
      'Izdelava preveritvenih prototipov',
    ],
    stages: [
      {
        image: bmwScan,
        alt: '3D-sken BMW komponente brez vidnega programskega vmesnika.',
        label: '01 / Sken',
        title: 'Digitalni zajem',
        text: 'Zajeta površina ohrani oblikovne značilnosti originalne komponente in predstavlja osnovo za nadaljnjo konstrukcijo.',
        contain: true,
      },
      {
        image: bmwSolid,
        alt: 'Konstruiran solidni CAD-model BMW komponente.',
        label: '02 / CAD',
        title: 'Urejen konstrukcijski model',
        text: 'Referenčna geometrija je bila pretvorjena v zaprt model, primeren za prilagoditve in nadaljnjo izdelavo.',
        contain: true,
      },
      {
        image: bmwPrototypes,
        alt: 'Natisnjeni prototipi BMW komponente na delovni površini.',
        label: '03 / Preverjanje',
        title: 'Fizični prototipi',
        text: 'Natisnjeni kosi omogočajo praktično preverjanje geometrije pred izbiro končne izvedbe.',
      },
    ],
    serviceHref: '/storitve/konstruiranje-3d-modeliranje',
    serviceLabel: 'Več o konstruiranju in 3D-modeliranju',
  },
  {
    slug: 'reverse-engineering-sprednjega-blatnika-tomos-bt',
    title: 'Reverse engineering sprednjega blatnika Tomos BT',
    category: '3D-skeniranje in razvoj kalupa',
    excerpt:
      'Od 3D-skeniranja originalnega blatnika do rekonstruiranega 3D-modela in razvoja kalupa za serijsko vakuumsko termoformiranje.',
    seoDescription:
      'Reverse engineering sprednjega blatnika Tomos BT: 3D-skeniranje, rekonstrukcija 3D-modela in razvoj kalupa za vakuumsko termoformiranje.',
    featuredImage: fenderOriginal,
    featuredAlt: 'Sprednji blatnik Tomos BT z referenčnimi markerji pred 3D-skeniranjem.',
    featuredPosition: 'center 46%',
    intro:
      'Originalni sprednji blatnik za Tomos BT je bil 3D-skeniran in digitalno rekonstruiran. Na podlagi zajete geometrije je bil izdelan natančen 3D-model blatnika, nato pa še model kalupa za vakuumsko termoformiranje, saj je projekt namenjen serijski izdelavi novih blatnikov.',
    challenge:
      'Originalni blatnik zaradi starosti, obrabe in morebitnih deformacij ni predstavljal neposredno uporabne osnove za serijsko proizvodnjo. Geometrijo je bilo treba digitalno zajeti, popraviti in pripraviti za ponovljivo izdelavo novih kosov.',
    approach:
      'Sprednji blatnik je bil najprej 3D-skeniran. Skenirani podatki so služili kot referenca za povratni inženiring, pri katerem je bila rekonstruirana osnovna oblika, urejene površine ter pripravljena simetrična in proizvodno uporabna geometrija. Na osnovi končnega modela je bil zasnovan še 3D-model kalupa za vakuumsko termoformiranje.',
    result:
      'Pripravljena sta končni 3D-model sprednjega blatnika Tomos BT in ustrezen model kalupa za vakuumsko termoformiranje. Projekt je s tem pripravljen za ponovljivo serijsko izdelavo novih blatnikov.',
    capabilities: [
      '3D-skeniranje originalnega blatnika',
      'Povratni inženiring in rekonstrukcija površin',
      '3D-modeliranje proizvodno uporabne geometrije',
      'Razvoj kalupa za vakuumsko termoformiranje',
    ],
    stages: [
      {
        image: fenderOriginal,
        alt: 'Sprednji blatnik Tomos BT z referenčnimi markerji, pripravljen za 3D-skeniranje.',
        label: '01 / Priprava',
        title: 'Originalni sprednji blatnik',
        text: 'Originalni kos je bil pripravljen z referenčnimi markerji za zanesljiv zajem ukrivljenih površin in značilnih oblikovnih prehodov.',
      },
      {
        image: fenderScan,
        alt: 'Digitalizirana površina sprednjega blatnika Tomos BT.',
        label: '02 / Zajem',
        title: 'Digitalna referenca',
        text: 'Skenirana površina je zagotovila merilno osnovo za povratni inženiring in rekonstrukcijo celotne oblike blatnika.',
        contain: true,
      },
      {
        image: fenderCad,
        alt: 'Rekonstruiran 3D-model sprednjega blatnika Tomos BT.',
        label: '03 / Model in kalup',
        title: 'Priprava serijske proizvodnje',
        text: 'Rekonstruiran 3D-model blatnika je služil kot osnova za razvoj kalupa, prilagojenega vakuumskemu termoformiranju in ponovljivi izdelavi.',
        contain: true,
      },
    ],
    serviceHref: '/storitve/3d-skeniranje-reverse-engineering',
    serviceLabel: 'Več o 3D-skeniranju in reverse engineeringu',
  },
  {
    slug: 'tomos-atx-maska-rekonstrukcija',
    title: 'Reverse engineering sprednje maske Tomos ATX',
    category: '3D-skeniranje in razvoj kalupa',
    excerpt:
      'Od 3D-skeniranja originalne maske do rekonstruiranega 3D-modela in razvoja kalupa za serijsko vakuumsko termoformiranje.',
    seoDescription:
      'Reverse engineering sprednje maske Tomos ATX: 3D-skeniranje, rekonstrukcija 3D-modela in razvoj kalupa za vakuumsko termoformiranje.',
    featuredImage: atxOriginal,
    featuredAlt: 'Originalna rdeča maska Tomos ATX pred digitalizacijo.',
    intro:
      'Originalna sprednja maska za Tomos ATX je bila 3D-skenirana in digitalno rekonstruirana. Na podlagi zajete geometrije je bil izdelan nov 3D-model maske, nato pa še model kalupa za vakuumsko termoformiranje, namenjen ponovljivi serijski izdelavi novih kosov.',
    challenge:
      'Originalne maske so težko dobavljive, obstoječi deli pa so zaradi starosti pogosto poškodovani ali deformirani. Geometrijo originalnega dela je bilo zato treba natančno zajeti, digitalno popraviti in pripraviti za ponovno proizvodnjo.',
    approach:
      'Originalna maska je bila najprej 3D-skenirana. Zajeti podatki so služili kot referenca za povratni inženiring, rekonstrukcijo površin in izdelavo čistega, simetričnega ter proizvodno uporabnega 3D-modela. Na njegovi osnovi je bil zasnovan še model kalupa za vakuumsko termoformiranje.',
    result:
      'Pripravljena sta končni 3D-model sprednje maske Tomos ATX in model kalupa za vakuumsko termoformiranje. Projekt omogoča ponovno, ponovljivo in serijsko izdelavo težko dobavljivega dela.',
    capabilities: [
      '3D-skeniranje originalne maske',
      'Povratni inženiring in rekonstrukcija površin',
      '3D-modeliranje proizvodno uporabne geometrije',
      'Razvoj kalupa za vakuumsko termoformiranje',
    ],
    stages: [
      {
        image: atxOriginal,
        alt: 'Originalna maska Tomos ATX kot referenčni kos.',
        label: '01 / Original',
        title: 'Izhodiščni kos',
        text: 'Ohranjeni original določa obliko, proporce in značilne prehode, ki jih je treba prenesti v nov proizvodno uporaben model.',
      },
      {
        image: atxScan,
        alt: 'Obdelan 3D-sken maske Tomos ATX brez programskega vmesnika.',
        label: '02 / Sken',
        title: 'Digitalna referenca',
        text: 'Skenirana površina je merilna osnova za nadzorovano rekonstrukcijo kompleksne zunanje oblike.',
        contain: true,
      },
      {
        image: atxModel,
        alt: 'Rekonstruiran konstrukcijski model maske Tomos ATX.',
        label: '03 / Model',
        title: 'Model maske in razvoj kalupa',
        text: 'Urejen model maske je postal osnova za zasnovo kalupa, pri kateri so bile upoštevane zahteve vakuumskega termoformiranja in snemanja izdelka.',
        contain: true,
      },
    ],
    serviceHref: '/storitve/obnova-plasticnih-kosov',
    serviceLabel: 'Več o obnovi in rekonstrukciji plastičnih kosov',
  },
  {
    slug: '3d-skeniranje-dirkalnega-vozila-60l',
    title: 'Rekonstrukcija podaljška odbijača za vozilo 60L',
    category: 'Od 3D-skena do PA6-CF izdelka',
    excerpt:
      'Lasersko 3D-skeniranje sprednjega dela vozila, izris nedobavljivega podaljška odbijača in FGF 3D-tisk iz PA6-CF granulata.',
    seoDescription:
      'Rekonstrukcija podaljška odbijača za vozilo 60L: lasersko 3D-skeniranje z Revopoint MetroY Pro, CAD-modeliranje in FGF 3D-tisk iz PA6-CF granulata.',
    featuredImage: vehicle60l,
    featuredAlt: 'Dirkalno vozilo 60L pred izvedbo 3D-skeniranja.',
    featuredPosition: 'center 55%',
    intro:
      'Ker originalni podaljšek odbijača ni več dobavljiv, je bil sprednji del dirkalnega vozila lasersko 3D-skeniran z napravo Revopoint MetroY Pro. Na podlagi zajete geometrije je bil izdelan nov 3D-model podaljška, prilagojen dejanski obliki vozila.',
    challenge:
      'Originalnega podaljška odbijača ni bilo več mogoče dobaviti. Pri razvoju nadomestnega dela je bilo treba natančno upoštevati obstoječo obliko sprednjega dela vozila in vsa pomembna mesta prileganja.',
    approach:
      'Sprednji del vozila je bil z laserskim skenerjem Revopoint MetroY Pro zajet iz več položajev. Združena in očiščena geometrija je služila kot prostorska referenca za izris novega podaljška odbijača ter preverjanje njegovega prileganja.',
    result:
      'Končni podaljšek odbijača je bil izdelan na lastni platformi LINEX HT v1. Natisnjen je bil iz PA6-CF granulata z mikrogranulatnim ekstruderjem Dyze ATOM ter nadomešča originalni del, ki ni več dobavljiv.',
    capabilities: [
      'Lasersko 3D-skeniranje z Revopoint MetroY Pro',
      'Obdelava in povezovanje skenirane geometrije',
      'CAD-izris podaljška po dejanskem vozilu',
      'FGF 3D-tisk iz PA6-CF granulata z Dyze ATOM',
    ],
    stages: [
      {
        image: vehicle60l,
        alt: 'Resnično dirkalno vozilo 60L kot izhodišče projekta.',
        label: '01 / Vozilo',
        title: 'Nedobavljiv originalni del',
        text: 'Sprednji del vozila je predstavljal realno izhodišče za rekonstrukcijo podaljška odbijača, ki ga ni več mogoče dobaviti.',
        position: 'center 55%',
      },
      {
        image: scan60l,
        alt: 'Laserski 3D-sken sprednjega dela dirkalnega vozila 60L.',
        label: '02 / Laserski zajem',
        title: '3D-sken z MetroY Pro',
        text: 'Več posameznih pogledov je bilo z napravo Revopoint MetroY Pro združenih v natančno digitalno predstavitev sprednjega dela vozila.',
        contain: true,
      },
      {
        image: geometry60l,
        alt: 'Rekonstruirana digitalna geometrija podaljška odbijača za vozilo 60L.',
        label: '03 / CAD in izdelava',
        title: 'Od modela do PA6-CF izdelka',
        text: 'Na osnovi skena je bil izdelan 3D-model podaljška. Končni del je bil nato na platformi LINEX HT v1 natisnjen iz PA6-CF granulata z ekstruderjem Dyze ATOM.',
        contain: true,
      },
    ],
    serviceHref: '/storitve/3d-skeniranje-reverse-engineering',
    serviceLabel: 'Več o 3D-skeniranju in reverse engineeringu',
  },
  {
    slug: 'linex-ht-v1-razvoj-platforme',
    title: 'Razvoj industrijske platforme LINEX HT v1',
    category: 'Razvoj stroja',
    excerpt:
      'Lasten razvoj velikoformatne FDM/FGF platforme: konstrukcija, pogoni, krmiljenje, elektronika in termični sistem.',
    seoDescription:
      'Razvoj industrijskega 3D-tiskalnika LINEX HT v1, velikoformatne FDM/FGF platforme za tehnične termoplaste, filament in granulat.',
    featuredImage: linexPlatform,
    featuredAlt: 'Lastno razvita velikoformatna FDM/FGF platforma LINEX HT v delavnici LazTek Engineering.',
    intro:
      'LINEX HT v1 je lastna razvojna platforma LazTek Engineering. Projekt povezuje strojno konstrukcijo, linearne pogone, IDEX zasnovo, krmiljenje, ogrevano delovno okolje ter dve različni tehnologiji doziranja materiala.',
    challenge:
      'Razviti je bilo treba velikoformatni stroj kot usklajen sistem, v katerem se mehanska togost, gibanje, temperatura, ekstruzija in krmiljenje med seboj neposredno dopolnjujejo.',
    approach:
      'Platforma je nastajala skozi več razvojnih faz. Posamezni sklopi so bili konstruirani, izdelani, povezani in preverjani na delujočem stroju.',
    result:
      'Nastala je delujoča industrijska razvojna platforma za FDM-tisk iz filamenta in FGF-tisk iz granulata, namenjena funkcionalnim tehničnim komponentam.',
    capabilities: [
      'Razvoj in konstruiranje stroja',
      'Integracija pogonov ter krmilnega sistema',
      'IDEX platforma za filament in granulat',
      'Razvoj termičnega in procesnega okolja',
    ],
    stages: [
      {
        image: linexEarlyBuild,
        alt: 'Zgodnja faza izdelave velikega 3D-tiskalnika LINEX HT v1.',
        label: '01 / Začetek',
        title: 'Zgodnja sestava',
        text: 'Nosilna konstrukcija in osnovni sklopi so postavili fizično izhodišče za razvoj celotne platforme.',
      },
      {
        image: linexCadPlatform,
        alt: 'Čist tehnični prikaz konstrukcije platforme LINEX HT v1 brez programskega vmesnika.',
        label: '02 / Konstrukcija',
        title: 'Razvoj geometrije stroja',
        text: 'Konstrukcijski model omogoča usklajevanje delovnega območja, pogonov, orodij in servisnih prostorov.',
        contain: true,
      },
      {
        image: linexCadAssembly,
        alt: 'Tehnični sestav velikega 3D-tiskalnika LINEX HT v1.',
        label: '03 / Sestav',
        title: 'Povezovanje podsistemov',
        text: 'Posamezni mehanski in funkcionalni sklopi so bili obravnavani kot del skupnega proizvodnega sistema.',
        contain: true,
      },
      {
        image: linexDevelopment,
        alt: 'Razvojna faza platforme LINEX HT v1 v delavnici.',
        label: '04 / Integracija',
        title: 'Razvoj na stroju',
        text: 'Po sestavi so sledili povezovanje podsistemov, preizkusi gibanja in postopno uvajanje procesne opreme.',
      },
      {
        image: linexElectronics,
        alt: 'Krmilna elektronika industrijske platforme LINEX HT v1.',
        label: '05 / Krmiljenje',
        title: 'Elektronika in nadzor',
        text: 'Krmilni sistem povezuje gibanje, orodja, temperaturne sklope in varnostne funkcije platforme.',
      },
      {
        image: linexPlatform,
        alt: 'Dokončana razvojna platforma LINEX HT v1 v delavnici LazTek Engineering.',
        label: '06 / Platforma',
        title: 'Delujoč sistem',
        text: 'Zrela razvojna platforma omogoča procesno delo z različnimi tehničnimi materiali in dvema načinoma ekstruzije.',
      },
    ],
    serviceHref: '/linex',
    serviceLabel: 'Podrobne specifikacije LINEX HT v1',
  },
  {
    slug: 'nadomestni-element-prezracevanja',
    title: 'Nadomestni element prezračevanja',
    category: 'Obnova plastičnih kosov',
    excerpt:
      'Izdelava nove plastične komponente za primer, ko originalnega dela ni smiselno oziroma mogoče preprosto nadomestiti z dobavljivim kosom.',
    seoDescription:
      'Izdelava nadomestnega plastičnega elementa prezračevanja s 3D-modeliranjem in 3D-tiskom za obnovo težje dobavljive komponente.',
    featuredImage: airVent,
    featuredAlt: '3D-natisnjen nadomestni element prezračevanja.',
    intro:
      'Pri poškodovanih ali nedobavljivih plastičnih delih je mogoče izdelati nov kos, prilagojen dejanski funkciji in razpoložljivemu prostoru. Projekt prikazuje fizični rezultat takšne obnove brez zamenjave celotnega sklopa.',
    challenge:
      'Potrebna je bila nova komponenta, ki ohrani osnovno obliko in funkcijo obstoječega elementa prezračevanja.',
    approach:
      'Geometrija je bila pripravljena za aditivno izdelavo, pri čemer so bili upoštevani oblika, sestava in namen uporabe kosa.',
    result:
      'Izdelan je bil nov fizični element, ki prikazuje možnost obnove posamezne plastične komponente namesto menjave večjega sklopa.',
    capabilities: [
      'Priprava nadomestne geometrije',
      'Prilagoditev modela načinu izdelave',
      '3D-tisk posameznega funkcionalnega kosa',
      'Možnost ponovne izdelave iz digitalnega modela',
    ],
    stages: [
      {
        image: airVent,
        alt: 'Izdelan nadomestni element prezračevanja v celotnem pogledu.',
        label: '01 / Izvedba',
        title: 'Nova komponenta',
        text: 'Fizični kos je izdelan kot samostojen nadomestni element in ne zahteva menjave celotnega sklopa.',
      },
      {
        image: airVentDetail,
        alt: 'Detajl površine in geometrije 3D-natisnjenega elementa prezračevanja.',
        label: '02 / Detajl',
        title: 'Geometrija in površina',
        text: 'Bližnji pogled prikazuje dejansko izdelano geometrijo, robove in površino komponente brez umetnega olepševanja.',
      },
    ],
    serviceHref: '/storitve/obnova-plasticnih-kosov',
    serviceLabel: 'Več o obnovi nedobavljivih plastičnih kosov',
  },
  {
    slug: 'razvoj-prototipne-resetke',
    title: 'Razvoj prototipne rešetke skozi iteracije',
    category: 'Prototipiranje',
    excerpt:
      'Primer razvoja, pri katerem se rešitev preverja z več fizičnimi različicami in izboljšuje pred končno izvedbo.',
    seoDescription:
      'Razvoj prototipne rešetke z več fizičnimi iteracijami, 3D-tiskom in primerjavo različic pred pripravo končne izvedbe.',
    featuredImage: prototypeFinal,
    featuredAlt: 'Končni komplet fizičnih prototipov rešetke.',
    intro:
      'Prototipiranje omogoča, da se konstrukcijske odločitve preverijo na resničnem kosu. Namesto neposrednega prehoda v končno izdelavo se rešitev razvija postopoma, napake in možnosti izboljšav pa se pokažejo dovolj zgodaj.',
    challenge:
      'Obliko in izvedljivost rešetke je bilo treba preveriti fizično ter primerjati več razvojnih različic.',
    approach:
      'Izdelanih je bilo več prototipov. Vsaka iteracija je omogočila pregled geometrije in pripravo naslednje izboljšane različice.',
    result:
      'Razvojno zaporedje je pripeljalo do usklajene fizične izvedbe ter dokumentirane osnove za ponovljivo izdelavo.',
    capabilities: [
      'Hitra izdelava fizičnih preveritvenih kosov',
      'Primerjava več geometrijskih različic',
      'Postopno odpravljanje konstrukcijskih težav',
      'Priprava potrjene izvedbe za manjšo serijo',
    ],
    stages: [
      {
        image: prototypePhysical,
        alt: 'Posamezna fizična razvojna iteracija prototipne rešetke.',
        label: '01 / Prototip',
        title: 'Prva fizična preverjanja',
        text: 'Fizični kos hitro pokaže razmerja, robove in detajle, ki jih je samo na zaslonu težje zanesljivo oceniti.',
      },
      {
        image: prototypeIterations,
        alt: 'Komplet več razvojnih iteracij prototipne rešetke.',
        label: '02 / Primerjava',
        title: 'Razvoj skozi različice',
        text: 'Postavitev več različic ob bok jasno pokaže razvoj geometrije in učinek posameznih sprememb.',
      },
      {
        image: prototypeFinal,
        alt: 'Izbrana končna izvedba prototipne rešetke.',
        label: '03 / Rezultat',
        title: 'Usklajena izvedba',
        text: 'Po preverjanju je mogoče izbrano rešitev pripraviti za ponovljivo izdelavo ali nadaljnje testiranje.',
      },
    ],
    serviceHref: '/storitve/prototipizacija',
    serviceLabel: 'Več o razvoju prototipov',
  },
]

export const staticProjectSlugs = staticProjects.map(({slug}) => slug)

export function getStaticProject(slug: string) {
  return staticProjects.find((project) => project.slug === slug)
}
