export const primaryMaterials = [
  {
    title: 'PA6 / PA6 CF / PA6 GF',
    subtitle:
      'Za toge in mehansko obremenjene tehnične dele, priprave, nosilce in funkcionalne nadomestne kose.',
    properties: [
      'zelo dobra mehanska trdnost in togost, posebej pri CF/GF izvedbah',
      'dobra odpornost na obrabo in primeren material za tehnične kose',
      'CF poveča togost in zmanjša krčenje, GF pogosto doda robustnost in stabilnost',
      'material vpija vlago, zato je sušenje pred tiskom zelo pomembno',
    ],
    bestFor: [
      'nosilci in priprave',
      'funkcionalni nadomestni deli',
      'kosi, kjer je pomembna togost',
    ],
    watchOut: [
      'material je higroskopen',
      'zahteva pravilno sušenje',
      'pri večjih kosih je pomembna geometrija',
    ],
  },
  {
    title: 'PPA / PPA CF / PPA GF',
    subtitle:
      'Za zahtevnejše tehnične dele, kjer je pomembna kombinacija togosti, temperaturne stabilnosti in dimenzijske zanesljivosti.',
    properties: [
      'višji tehnični razred poliamida od običajnega PA6 pri zahtevnejših aplikacijah',
      'boljša stabilnost pri povišani temperaturi kot pri osnovnih materialih',
      'CF/GF polnitve povečajo togost, dimenzijsko stabilnost in uporabnost za nosilne kose',
      'primeren za dele, kjer PETG/ASA/ABS niso več dovolj',
    ],
    bestFor: [
      'zahtevnejši nosilci in ohišja',
      'deli v bližini toplote',
      'tehnični kosi z višjimi mehanskimi zahtevami',
    ],
    watchOut: [
      'zahteva dobro sušenje',
      'pri večjih kosih je pomembna kontrola krčenja',
      'ni vedno smiselna izbira za enostavne prototipe',
    ],
  },
  {
    title: 'PPS / PPS GF / PPS CF',
    subtitle:
      'Za specialne aplikacije, kjer so pomembni visoka temperaturna odpornost, kemijska obstojnost in stabilnost materiala.',
    properties: [
      'zelo dobra kemijska obstojnost v zahtevnejšem okolju',
      'dobra dimenzijska stabilnost in nizka občutljivost na vlago',
      'primeren za aplikacije, kjer je pomembna dolgoročna stabilnost materiala',
      'GF/CF izvedbe povečajo togost in uporabnost za tehnične kose',
    ],
    bestFor: [
      'deli v zahtevnejšem okolju',
      'tehnični kosi z višjo temperaturo uporabe',
      'aplikacije, kjer običajni materiali niso dovolj',
    ],
    watchOut: [
      'material je zahtevnejši za procesiranje',
      'pred izdelavo je smiseln testni tisk',
      'strošek in dobavljivost se preverita glede na projekt',
    ],
  },
  {
    title: 'PETG / PETG CF / PCTG',
    subtitle:
      'Dobra izbira za uporabne prototipe, ohišja in večje funkcionalne kose.',
    properties: [
      'dobra žilavost in uporabnost za funkcionalne prototipe',
      'zanesljivejši in enostavnejši proces kot pri večini visokotemperaturnih materialov',
      'PETG CF poveča togost in zmanjša občutek “mehke” plastike',
      'PCTG je pogosto dobra izbira, ko je pomembna žilavost in lepša površina',
    ],
    bestFor: [
      'ohišja in zaščitni elementi',
      'prototipi za testiranje oblike',
      'kosi z dobro žilavostjo',
    ],
    watchOut: [
      'ni najboljša izbira za visoke temperature',
      'pri zelo togih kosih je lahko boljši CF material',
      'pomembna je pravilna orientacija slojev',
    ],
  },
  {
    title: 'ABS',
    subtitle:
      'Za tehnična ohišja, prototipe in kose, kjer je pomembna žilavost, obdelava po tisku in uporabna mehanska odpornost.',
    properties: [
      'dobra udarna žilavost in primeren material za funkcionalna ohišja',
      'dobro se brusi, kita, lepi in naknadno obdeluje',
      'primeren za prototipe, kjer je pomemben industrijski občutek kosa',
      'bolj občutljiv na UV kot ASA, zato za zunaj pogosto izberemo ASA',
    ],
    bestFor: [
      'ohišja in pokrovi',
      'funkcionalni prototipi',
      'kosi za naknadno brušenje in barvanje',
    ],
    watchOut: [
      'pri večjih kosih je potrebna zaprta komora',
      'lahko se zvija',
      'ni najboljša izbira za dolgotrajno zunanjo uporabo brez zaščite',
    ],
  },
  {
    title: 'ASA',
    subtitle: 'Za zunanje aplikacije in dele, kjer je pomembna UV odpornost.',
    properties: [
      'zelo primeren za zunanje kose zaradi UV in vremenske obstojnosti',
      'podoben občutek in uporabnost kot ABS, vendar boljši za zunanjo uporabo',
      'dobra izbira za pokrove, ohišja in zaščitne elemente',
      'lepša in bolj stabilna izbira kot ABS, ko bo kos na soncu ali vremenu',
    ],
    bestFor: [
      'zunanji pokrovi',
      'tehnična ohišja',
      'deli, izpostavljeni vremenu',
    ],
    watchOut: [
      'potrebuje stabilen proces',
      'večji kosi lahko zahtevajo komoro',
      'ni univerzalna rešitev za vse obremenitve',
    ],
  },
  {
    title: 'PC',
    subtitle:
      'Za zahtevnejše tehnične dele, kjer osnovni materiali niso dovolj.',
    properties: [
      'visoka udarna žilavost in dobra mehanska odpornost',
      'boljša temperaturna odpornost kot pri osnovnih materialih',
      'primeren za tehnične prototipe, zaščite in kose z višjimi zahtevami',
      'zahteva dobro kontrolo procesa, ker je občutljiv na vlago in pogoje tiska',
    ],
    bestFor: [
      'višje temperaturne zahteve',
      'močnejši tehnični prototipi',
      'deli z višjimi mehanskimi zahtevami',
    ],
    watchOut: [
      'zahteva nadzorovan proces',
      'ni vedno ekonomična izbira',
      'potrebna je dobra priprava kosa',
    ],
  },
  {
    title: 'TPU / TPE',
    subtitle:
      'Za fleksibilne dele, blažilce, zaščite in tehnične elastične kose.',
    properties: [
      'elastičnost in sposobnost blaženja vibracij ali udarcev',
      'primeren za zaščite, obloge, tesnila in mehke tehnične elemente',
      'trdota materiala močno vpliva na končni občutek in funkcijo kosa',
      'pri fleksibilnih materialih sta geometrija in debelina sten zelo pomembni',
    ],
    bestFor: [
      'tesnila in zaščite',
      'blažilci vibracij',
      'mehki oprijemi in obloge',
    ],
    watchOut: [
      'tisk je počasnejši',
      'trdota materiala mora ustrezati uporabi',
      'ni namenjen za vsako geometrijo',
    ],
  },
  {
    title: 'Materiali po dogovoru',
    subtitle:
      'Pri posebnih zahtevah se material izbere glede na kos, dobavljivost, testiranje in realne pogoje uporabe.',
    properties: [
      'možna izbira materiala glede na konkretno aplikacijo',
      'pri neznanih pogojih je smiseln testni kos ali manjša testna serija',
      'končna izbira je odvisna od geometrije, okolja, obremenitve in cene',
      'pri posebnih materialih se posebej preveri dobavljivost in procesna zahtevnost',
    ],
    bestFor: ['posebne aplikacije', 'testni vzorci', 'manjše razvojne serije'],
    watchOut: [
      'potrebno je preverjanje dobavljivosti',
      'lahko zahteva testni tisk',
      'končna izbira je odvisna od uporabe',
    ],
  },
]
