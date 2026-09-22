export type MaterialProfile = {
  label: string;
  value: string;
};

export type Material = {
  title: string;
  family: string;
  subtitle: string;
  tags: string[];
  profile: MaterialProfile[];
  bestFor: string[];
  examples: string[];
  properties: string[];
  process: string[];
  watchOut: string[];
};

export const primaryMaterials: Material[] = [
  {
    title: "PLA",
    family: "Osnovni termoplast",
    subtitle:
      "Dimenzijsko natančen in ekonomičen material za vizualne modele, preverjanje oblike ter manj zahtevne priprave.",
    tags: ["prototipi", "enostaven proces"],
    profile: [
      { label: "Togost", value: "visoka" },
      { label: "Žilavost", value: "nižja" },
      { label: "Toplota", value: "nižja" },
      { label: "Proces", value: "enostaven" },
    ],
    bestFor: [
      "hitri oblikovni in montažni prototipi",
      "kontrolne šablone brez toplotne obremenitve",
      "modeli, makete in predstavitveni kosi",
    ],
    examples: ["vizualni prototip", "ergonomski model", "montažna šablona"],
    properties: [
      "dobra togost in praviloma zelo dobra dimenzijska ponovljivost",
      "majhno krčenje omogoča izdelavo večjih geometrij z manj deformacijami",
      "kakovostna površina in dobra berljivost detajlov",
      "ekonomična izbira za zgodnje razvojne iteracije",
    ],
    process: [
      "praviloma ne zahteva aktivno ogrevane komore",
      "omogoča hiter in stabilen proces ter kratke razvojne cikle",
      "za večje kose se geometrija in polnilo prilagodita zahtevani togosti",
    ],
    watchOut: [
      "ni primeren za vroče okolje ali dolgotrajno obremenitev pri povišani temperaturi",
      "pri udarcih je lahko bolj krhek kot PETG, PCTG, ABS ali PA",
      "ni prva izbira za dolgoročno zunanjo uporabo in funkcionalne dele v vozilu",
    ],
  },
  {
    title: "PETG",
    family: "Kopoliestrski termoplast",
    subtitle:
      "Uravnotežena izbira za večje funkcionalne prototipe, ohišja in zaščitne elemente, kjer sta pomembni žilavost in zanesljiv proces.",
    tags: ["prototipi", "ohišja", "enostaven proces"],
    profile: [
      { label: "Togost", value: "srednja" },
      { label: "Žilavost", value: "dobra" },
      { label: "Toplota", value: "srednja" },
      { label: "Proces", value: "zanesljiv" },
    ],
    bestFor: [
      "funkcionalni prototipi in večji testni kosi",
      "ohišja, kanali, pokrovi in zaščite",
      "komponente v vlažnem okolju brez večje toplotne obremenitve",
    ],
    examples: ["zaščitni pokrov", "večje ohišje", "funkcionalni prototip"],
    properties: [
      "dobra udarna žilavost in močan oprijem med sloji",
      "majhna nagnjenost h krčenju v primerjavi z ABS ali PA",
      "dobra odpornost proti vlagi in številnim običajnim kemikalijam",
      "uporabno razmerje med ceno, mehanskimi lastnostmi in velikostjo kosa",
    ],
    process: [
      "primeren za stabilen FDM ali FGF proces in večje komponente",
      "nadzor hlajenja izboljša kakovost previsov in oblikovno stabilnost",
      "pri funkcionalnih kosih se orientacija slojev določi po smeri obremenitve",
    ],
    watchOut: [
      "pod stalno obremenitvijo in pri višji temperaturi lahko sčasoma leze",
      "površina je mehkejša in se lahko hitreje opraska kot pri nekaterih tehničnih polimerih",
      "za zelo toge ali temperaturno obremenjene nosilce so primernejši ojačani PA, PPA ali PPS",
    ],
  },
  {
    title: "PETG-CF",
    family: "S karbonskimi vlakni ojačan kopoliester",
    subtitle:
      "Bolj toga in dimenzijsko stabilna različica PETG za priprave, večja ohišja in funkcionalne dele z manjšim krčenjem.",
    tags: ["kompoziti", "prototipi", "priprave"],
    profile: [
      { label: "Togost", value: "visoka" },
      { label: "Žilavost", value: "srednja" },
      { label: "Toplota", value: "srednja" },
      { label: "Proces", value: "srednje zahteven" },
    ],
    bestFor: [
      "toge montažne in kontrolne priprave",
      "večja dimenzijsko stabilna ohišja",
      "funkcionalni prototipi z mat tehničnim videzom",
    ],
    examples: ["kontrolna priprava", "nosilec senzorja", "ohišje stroja"],
    properties: [
      "karbonska vlakna povečajo togost in zmanjšajo deformacije med tiskom",
      "boljša dimenzijska stabilnost kot pri neojačanem PETG",
      "mat površina in dobra geometrijska ponovljivost",
      "primeren vmesni razred med osnovnimi polimeri in ojačanimi poliamidi",
    ],
    process: [
      "zahteva protiobrabno šobo in nadzorovano pot materiala",
      "sušenje izboljša površino, oprijem slojev in ponovljivost procesa",
      "delež vlakna in osnovna formulacija pomembno vplivata na končne lastnosti",
    ],
    watchOut: [
      "ojačitev ne pomeni enake trdnosti v vseh smereh",
      "praviloma je manj duktilen od neojačanega PETG",
      "ni nadomestilo za PPA-CF ali PPS-CF pri visoki temperaturi",
    ],
  },
  {
    title: "PCTG",
    family: "Visoko žilav kopoliester",
    subtitle:
      "Za udarno obremenjene prototipe, zaskočne spoje in ohišja, kjer je pomembnejša žilavost kot največja togost.",
    tags: ["prototipi", "ohišja", "udarci"],
    profile: [
      { label: "Togost", value: "srednja" },
      { label: "Žilavost", value: "zelo dobra" },
      { label: "Toplota", value: "srednja" },
      { label: "Proces", value: "zanesljiv" },
    ],
    bestFor: [
      "udarno obremenjena ohišja in zaščite",
      "zaskočni spoji ter deli, ki se morajo elastično upogniti",
      "funkcionalni prototipi z dobro medplastno vezjo",
    ],
    examples: ["zaskočni pokrov", "zaščita elektronike", "žilav prototip"],
    properties: [
      "zelo dobra žilavost in odpornost proti lomu",
      "dober oprijem med sloji in majhna nagnjenost h krčenju",
      "dobra kemijska in hidrolitična stabilnost je odvisna od konkretne formulacije",
      "uporaben za geometrije, kjer bi bil PLA prekrhek",
    ],
    process: [
      "proces je podoben PETG, vendar zahteva parametre konkretne formulacije",
      "pri debelih kosih je treba nadzorovati vnos toplote in hlajenje",
      "za zaskočne elemente se prilagodijo radiji, debeline in smer slojev",
    ],
    watchOut: [
      "ni tako tog kot CF-kompoziti ali tehnični poliamidi",
      "pri trajni obremenitvi je treba upoštevati lezenje",
      "temperaturna zmogljivost je nižja od PC, PPA ali PPS",
    ],
  },
  {
    title: "ABS",
    family: "Tehnični termoplast",
    subtitle:
      "Za tehnična ohišja, prototipe in dele, ki se bodo brusili, lepili, barvali ali drugače naknadno obdelovali.",
    tags: ["ohišja", "naknadna obdelava"],
    profile: [
      { label: "Togost", value: "srednja" },
      { label: "Žilavost", value: "dobra" },
      { label: "Toplota", value: "dobra" },
      { label: "Proces", value: "zahteven" },
    ],
    bestFor: [
      "tehnična ohišja, pokrovi in notranji avtomobilski deli",
      "prototipi za brušenje, lepljenje in barvanje",
      "funkcionalni deli z zmerno temperaturno obremenitvijo",
    ],
    examples: ["ohišje naprave", "notranja obloga", "barvan prototip"],
    properties: [
      "dobro ravnotežje med togostjo, žilavostjo in temperaturno odpornostjo",
      "primeren za mehansko in površinsko naknadno obdelavo",
      "dobra obdelovalnost pri vrtanju, brušenju in lepljenju",
      "industrijsko uveljavljen material za funkcionalna ohišja",
    ],
    process: [
      "večji kosi zahtevajo zaprto in temperaturno stabilno komoro",
      "nadzor krčenja in enakomerno ohlajanje sta ključna za ravnost",
      "pri procesu je potrebno ustrezno prezračevanje delovnega prostora",
    ],
    watchOut: [
      "brez procesnega nadzora se lahko robovi dvigujejo ali sloji razslojijo",
      "UV in vremenska obstojnost sta slabši kot pri ASA",
      "ni primeren za neposreden stik z nekaterimi topili",
    ],
  },
  {
    title: "ASA",
    family: "UV-stabilen tehnični termoplast",
    subtitle:
      "Prednostna izbira za zunanja ohišja, pokrove in avtomobilske elemente, izpostavljene soncu, vlagi in vremenu.",
    tags: ["zunanja uporaba", "ohišja"],
    profile: [
      { label: "Togost", value: "srednja" },
      { label: "Žilavost", value: "dobra" },
      { label: "UV/vreme", value: "zelo dobro" },
      { label: "Proces", value: "zahteven" },
    ],
    bestFor: [
      "zunanja tehnična ohišja in pokrovi",
      "avtomobilski dodatki ter zaščitni elementi",
      "komponente, izpostavljene UV-svetlobi in vremenu",
    ],
    examples: ["zunanje ohišje", "avtomobilski pokrov", "zaščita na prostem"],
    properties: [
      "zelo dobra UV in vremenska obstojnost",
      "mehansko obnašanje je primerljivo z ABS, vendar je primernejši za zunaj",
      "dobra kakovost površine in možnost naknadne obdelave",
      "primeren za dolgotrajnejšo uporabo na soncu in v spremenljivem vremenu",
    ],
    process: [
      "za večje komponente je priporočena zaprta ogrevana komora",
      "enakomerna temperatura zmanjšuje zvijanje in razslojevanje",
      "potrebno je ustrezno prezračevanje delovnega prostora",
    ],
    watchOut: [
      "pri velikih tankostenskih delih je geometrija zelo pomembna",
      "ni enakovreden PA-CF ali PPA-CF pri visoki mehanski togosti",
      "odpornost proti posamezni kemikaliji je treba preveriti po tehničnem listu",
    ],
  },
  {
    title: "PC",
    family: "Polikarbonat",
    subtitle:
      "Za udarno obremenjene zaščite in tehnične dele, ki potrebujejo dobro žilavost ter višjo temperaturno odpornost.",
    tags: ["udarci", "višja temperatura", "ohišja"],
    profile: [
      { label: "Togost", value: "visoka" },
      { label: "Žilavost", value: "zelo dobra" },
      { label: "Toplota", value: "visoka" },
      { label: "Proces", value: "zelo zahteven" },
    ],
    bestFor: [
      "udarno obremenjene zaščite in pokrovi",
      "tehnični nosilci pri povišani temperaturi",
      "močni funkcionalni prototipi in manjše serije",
    ],
    examples: [
      "zaščitni ščit",
      "toplotno obremenjen nosilec",
      "trpežno ohišje",
    ],
    properties: [
      "visoka udarna žilavost in dobra mehanska trdnost",
      "višja temperaturna odpornost od PLA, PETG, ABS in ASA",
      "dobra dimenzijska stabilnost pri pravilno nadzorovanem procesu",
      "primeren za varnostne in funkcionalne dele z višjimi zahtevami",
    ],
    process: [
      "material mora biti pred tiskanjem pravilno posušen",
      "zahteva visoko temperaturo orodja, dober oprijem na podlago in komoro",
      "za večje dele je pomembno počasno ter enakomerno ohlajanje",
    ],
    watchOut: [
      "občutljiv je na vlago in nepravilen temperaturni režim",
      "pri velikih kosih ima večje tveganje za notranje napetosti in zvijanje",
      "kemijska odpornost ni univerzalna in jo je treba preveriti za konkretni medij",
    ],
  },
  {
    title: "TPU / TPE",
    family: "Fleksibilni elastomeri",
    subtitle:
      "Za prožne zaščite, blažilce, tesnila, mehke oprijeme in komponente, ki morajo absorbirati vibracije ali udarce.",
    tags: ["fleksibilni deli", "udarci"],
    profile: [
      { label: "Togost", value: "nastavljiva" },
      { label: "Prožnost", value: "zelo visoka" },
      { label: "Obraba", value: "dobra" },
      { label: "Proces", value: "počasen" },
    ],
    bestFor: [
      "blažilci, odbojniki in protivibracijski elementi",
      "zaščitne obloge, mehki oprijemi in vodila",
      "tesnila ter gibljivi tehnični elementi",
    ],
    examples: ["blažilec", "tesnilo", "zaščitna manšeta"],
    properties: [
      "visoka elastičnost in dobra sposobnost blaženja udarcev",
      "dobra odpornost proti obrabi pri ustrezni formulaciji",
      "na voljo v različnih trdotah, ki bistveno spremenijo funkcijo kosa",
      "uporaben za integracijo mehkih funkcij v tehnične sklope",
    ],
    process: [
      "hitrost, vodenje materiala in dolžina poti do šobe morajo biti prilagojeni prožnosti",
      "sušenje je pomembno za stabilno površino in medplastno vez",
      "debelina sten in oblika polnila določata dejansko prožnost kosa",
    ],
    watchOut: [
      "oznaka TPU sama ne določa trdote, obrabe ali kemijske odpornosti",
      "mehki materiali niso primerni za vse tanke in zelo natančne geometrije",
      "pri trajnem stisku je treba preveriti kompresijsko deformacijo konkretne formulacije",
    ],
  },
  {
    title: "PA6",
    family: "Tehnični poliamid",
    subtitle:
      "Žilav in obrabno odporen material za mehanske dele, vodila, ohišja in komponente, ki prenašajo udarce ali drsenje.",
    tags: ["poliamidi", "udarci", "obraba"],
    profile: [
      { label: "Togost", value: "srednja" },
      { label: "Žilavost", value: "zelo dobra" },
      { label: "Obraba", value: "zelo dobra" },
      { label: "Vlaga", value: "zelo občutljiv" },
    ],
    bestFor: [
      "mehanski deli, vodila, drsniki in zobni elementi",
      "udarno obremenjeni nosilci in zaščite",
      "funkcionalni deli z dobro odpornostjo proti obrabi",
    ],
    examples: ["drsno vodilo", "zobni element", "udarno obremenjen nosilec"],
    properties: [
      "dobro razmerje med mehansko trdnostjo, žilavostjo in obrabno odpornostjo",
      "dobre drsne lastnosti ter odpornost proti oljem in številnim tehničnim medijem",
      "pri pravilnem procesu dosega zelo dobro medplastno vez",
      "v primerjavi z ojačanimi izvedbami ohrani več duktilnosti",
    ],
    process: [
      "temeljito sušenje pred tiskom in suho dovajanje med procesom sta obvezna",
      "ogrevana komora pomaga pri večjih kosih in zmanjšuje notranje napetosti",
      "po izdelavi se dimenzije lahko spremenijo z ravnovesno vsebnostjo vlage",
    ],
    watchOut: [
      "vpija vlago, kar vpliva na togost, mere in kakovost tiska",
      "za tesne tolerance je treba upoštevati kondicioniranje in realno okolje uporabe",
      "pri velikih ravnih delih obstaja večje tveganje krčenja in zvijanja",
    ],
  },
  {
    title: "PA6-CF",
    family: "S karbonskimi vlakni ojačan PA6",
    subtitle:
      "Za zelo toge in mehansko obremenjene nosilce, priprave, orodja ter funkcionalne nadomestne dele.",
    tags: ["poliamidi", "kompoziti", "priprave", "višja temperatura"],
    profile: [
      { label: "Togost", value: "zelo visoka" },
      { label: "Žilavost", value: "dobra" },
      { label: "Toplota", value: "visoka" },
      { label: "Vlaga", value: "občutljiv" },
    ],
    bestFor: [
      "togi konstrukcijski nosilci in funkcionalni nadomestni deli",
      "montažne, varilne in kontrolne priprave",
      "večje tehnične komponente, kjer sta pomembni oblika in stabilnost",
    ],
    examples: [
      "strojni nosilec",
      "proizvodna priprava",
      "avtomobilska komponenta",
    ],
    properties: [
      "karbonska vlakna izrazito povečajo togost in zmanjšajo krčenje osnovnega PA6",
      "dobra dimenzijska stabilnost ter visoko razmerje med togostjo in maso",
      "dobra temperaturna in obrabna odpornost za tehnične aplikacije",
      "mat tehnična površina in manj deformacij pri večjih kosih",
    ],
    process: [
      "zahteva intenzivno sušenje in neprekinjeno zaščito materiala pred vlago",
      "potrebni so protiobrabna šoba, ustrezna podlaga in nadzorovana komora",
      "orientacija slojev se določi glede na glavne smeri obremenitve",
    ],
    watchOut: [
      "vlakna ne odpravijo anizotropije aditivno izdelanega kosa",
      "material je manj duktilen od neojačanega PA6 in ni idealen za tanke udarne zaponke",
      "končne lastnosti močno določajo delež in dolžina vlakna ter osnovna formulacija",
    ],
  },
  {
    title: "PA6-GF",
    family: "S steklenimi vlakni ojačan PA6",
    subtitle:
      "Robusten kompozit za strukturne dele, ohišja in priprave, kjer je pomembna kombinacija togosti, toplotne stabilnosti in odpornosti.",
    tags: ["poliamidi", "kompoziti", "priprave", "višja temperatura"],
    profile: [
      { label: "Togost", value: "zelo visoka" },
      { label: "Robustnost", value: "zelo dobra" },
      { label: "Toplota", value: "visoka" },
      { label: "Vlaga", value: "občutljiv" },
    ],
    bestFor: [
      "robustna tehnična ohišja in nosilne komponente",
      "priprave, podstavki in deli pri dolgotrajnejši statični obremenitvi",
      "večje komponente, kjer je potrebna termična in dimenzijska stabilnost",
    ],
    examples: [
      "nosilno ohišje",
      "industrijski podstavek",
      "toplotno obremenjen pokrov",
    ],
    properties: [
      "steklena vlakna povečajo togost, trdnost in stabilnost pri povišani temperaturi",
      "praviloma robustnejše obnašanje kot pri zelo togih CF-formulacijah, odvisno od recepture",
      "nižja nagnjenost h krčenju kot pri neojačanem PA6",
      "primeren za večje industrijske komponente in priprave",
    ],
    process: [
      "zahteva temeljito sušenje, protiobrabno šobo in kontrolirano komoro",
      "steklena vlakna povečajo obrabo šobe in dovodnega sistema",
      "površinska kakovost in vidnost vlaken sta odvisni od granulacije in parametrov",
    ],
    watchOut: [
      "še vedno vpija vlago in lahko spreminja dimenzije",
      "površina je lahko bolj groba kot pri CF ali neojačanem polimeru",
      "za zelo lahke in maksimalno toge dele je lahko primernejši PA6-CF",
    ],
  },
  {
    title: "PPA-CF",
    family: "Visokotemperaturni poliamid s CF",
    subtitle:
      "Za zelo toge in dimenzijsko stabilne tehnične dele pri višji temperaturi, kjer PA6-CF ne zagotavlja dovolj rezerve.",
    tags: ["visokozmogljivi", "kompoziti", "višja temperatura", "poliamidi"],
    profile: [
      { label: "Togost", value: "zelo visoka" },
      { label: "Stabilnost", value: "zelo visoka" },
      { label: "Toplota", value: "zelo visoka" },
      { label: "Proces", value: "zelo zahteven" },
    ],
    bestFor: [
      "togi nosilci v motornem ali industrijskem okolju",
      "natančne priprave pri povišani temperaturi",
      "nadomeščanje lažjih kovinskih delov po tehnični validaciji",
    ],
    examples: [
      "nosilec ob viru toplote",
      "dimenzijsko stabilna priprava",
      "lahek konstrukcijski del",
    ],
    properties: [
      "višja temperaturna in dimenzijska stabilnost od običajnega PA6",
      "karbonska vlakna zagotavljajo zelo visoko togost in manjše krčenje",
      "nižja absorpcija vlage kot pri PA6 je značilna za mnoge PPA-formulacije",
      "dobra kemijska odpornost za zahtevnejše tehnično okolje",
    ],
    process: [
      "zahteva sušenje po navodilih proizvajalca in suho dovajanje do ekstruderja",
      "potrebni so visokotemperaturno orodje, protiobrabna šoba in stabilna komora",
      "končni proces se potrdi s testnim kosom iz izbrane formulacije",
    ],
    watchOut: [
      "visoka togost pomeni manj rezerve pri udarnih in zaskočnih geometrijah",
      "zahteva več procesne energije in dražji material kot PA6-CF",
      "dejanska temperatura uporabe se določi iz tehničnega lista konkretnega razreda",
    ],
  },
  {
    title: "PPA-GF",
    family: "Visokotemperaturni poliamid z GF",
    subtitle:
      "Za robustne nosilne dele in ohišja pri višji temperaturi, kjer je zaželena bolj uravnotežena mehanska odpornost kot pri maksimalno togem CF-kompozitu.",
    tags: ["visokozmogljivi", "kompoziti", "višja temperatura", "poliamidi"],
    profile: [
      { label: "Togost", value: "zelo visoka" },
      { label: "Robustnost", value: "zelo dobra" },
      { label: "Toplota", value: "zelo visoka" },
      { label: "Proces", value: "zelo zahteven" },
    ],
    bestFor: [
      "industrijska ohišja in konstrukcijski deli ob viru toplote",
      "robustni avtomobilski ter električni nosilci",
      "komponente z dolgotrajnejšo statično obremenitvijo",
    ],
    examples: [
      "električni nosilec",
      "vroče industrijsko ohišje",
      "strukturni pokrov",
    ],
    properties: [
      "steklena vlakna povečajo togost, nosilnost in toplotno stabilnost PPA",
      "dobra stabilnost pri temperaturi ter nižja občutljivost na vlago kot pri PA6",
      "uravnotežena izbira za robustne strukturne komponente",
      "dobra odpornost proti številnim oljem, gorivom in tehničnim medijem je odvisna od razreda",
    ],
    process: [
      "material mora ostati suh od sušilnika do orodja",
      "zahteva visokotemperaturno in protiobrabno procesno opremo",
      "pri velikih kosih se proces razvije skupaj z orientacijo in geometrijo",
    ],
    watchOut: [
      "steklena vlakna lahko ustvarijo bolj grobo površino",
      "material in proces sta dražja od osnovnih poliamidov",
      "za vsak agresiven medij se preveri odpornost konkretne formulacije",
    ],
  },
  {
    title: "PPS-CF",
    family: "Visokozmogljiv polimer s CF",
    subtitle:
      "Za maksimalno toge in stabilne dele v vročem, kemično zahtevnem ali električno zahtevnem okolju.",
    tags: ["visokozmogljivi", "kompoziti", "višja temperatura", "kemikalije"],
    profile: [
      { label: "Togost", value: "ekstremna" },
      { label: "Kemikalije", value: "odlično" },
      { label: "Toplota", value: "ekstremna" },
      { label: "Proces", value: "specialen" },
    ],
    bestFor: [
      "natančni nosilci in priprave v vročem okolju",
      "deli v stiku z agresivnejšimi kemikalijami ali paro",
      "električne, avtomobilske in procesne komponente z visokimi zahtevami",
    ],
    examples: [
      "procesni nosilec",
      "električni izolacijski del",
      "komponenta ob kemikalijah",
    ],
    properties: [
      "zelo visoka togost, nizko lezenje in odlična dimenzijska stabilnost",
      "zelo nizka absorpcija vode v primerjavi s poliamidi",
      "izjemna kemijska in temperaturna odpornost osnovnega PPS",
      "inherentno dobro električno izolacijsko ter negorljivo obnašanje je odvisno od razreda",
    ],
    process: [
      "zahteva visokotemperaturno orodje, komoro in strogo kontroliran termični cikel",
      "CF-polnilo zahteva protiobrabne komponente celotne talilne poti",
      "izvedljivost, kristaliničnost in mehanske lastnosti se potrdijo na testnem kosu",
    ],
    watchOut: [
      "material je drag in procesno bistveno zahtevnejši od PA6-CF ali PPA-CF",
      "visoka togost in anizotropija zahtevata premišljeno orientacijo",
      "uporaba mora upravičiti specialni material in proces",
    ],
  },
  {
    title: "PPS-GF",
    family: "Visokozmogljiv polimer z GF",
    subtitle:
      "Za robustne, dimenzijsko stabilne komponente pri visoki temperaturi, vlagi in kemijski izpostavljenosti.",
    tags: ["visokozmogljivi", "kompoziti", "višja temperatura", "kemikalije"],
    profile: [
      { label: "Togost", value: "ekstremna" },
      { label: "Kemikalije", value: "odlično" },
      { label: "Toplota", value: "ekstremna" },
      { label: "Proces", value: "specialen" },
    ],
    bestFor: [
      "vroča procesna ohišja, pokrovi in nosilci",
      "komponente z zahtevano kemijsko in hidrolitično stabilnostjo",
      "električne ter strojne aplikacije z nizkim lezenjem",
    ],
    examples: ["ohišje senzorja", "procesni pokrov", "električni nosilec"],
    properties: [
      "steklena vlakna povečajo togost in nosilnost termično stabilnega PPS",
      "zelo nizka absorpcija vlage in dobra dimenzijska ponovljivost",
      "odlična odpornost proti številnim kemikalijam, vroči vodi in pari",
      "primeren za trajnejše statične obremenitve pri povišani temperaturi",
    ],
    process: [
      "zahteva specializirano visokotemperaturno in protiobrabno opremo",
      "termalna zgodovina bistveno vpliva na kristaliničnost in končne lastnosti",
      "pred izdelavo se potrdita materialni razred in dejansko okolje uporabe",
    ],
    watchOut: [
      "površina je lahko bolj groba in vlakna bolj vidna kot pri CF-izvedbi",
      "proces in material sta namenjena upravičeno zahtevnim aplikacijam",
      "natančne lastnosti niso prenosljive med različnimi PPS-GF formulacijami",
    ],
  },
];
