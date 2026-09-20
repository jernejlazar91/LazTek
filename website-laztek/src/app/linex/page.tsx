import fgfPelletPrint from "@/assets/laztek-v2/services/industrial-print/fgf-granulate-print.webp";
import linexCadAssembly from "@/assets/laztek-v2/linex/linex-cad-assembly.webp";
import linexElectronics from "@/assets/laztek-v2/linex/linex-control-electronics.webp";
import linexDevelopmentStage from "@/assets/laztek-v2/linex/linex-development-stage.webp";
import linexEarlyBuild from "@/assets/laztek-v2/linex/linex-early-build.webp";
import linexPlatform from "@/assets/laztek-v2/linex/linex-ht-platform.webp";
import linexThermalBellows from "@/assets/laztek/linex-thermal-bellows.webp";
import {
  CapabilityGrid,
  CTASection,
  ImageSequence,
  JumpNav,
  Metric,
  PageHero,
  SectionHeading,
  TechnicalImage,
} from "@/components/engineering/DesignSystem";
import JsonLd from "@/components/engineering/JsonLd";
import SiteHeader from "@/components/SiteHeader";
import { pageMetadata } from "@/lib/seo";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import Image from "next/image";
import Link from "next/link";

export const metadata = pageMetadata(
  "LINEX HT v1 – velikoformatni FDM/FGF 3D tiskalnik",
  "Lastno razvit industrijski FDM/FFF in FGF 3D tiskalnik za velike komponente iz filamenta ali granulata, z IDEX sistemom in delovnim volumnom nad enim metrom.",
  "/linex",
);

async function getPageData() {
  return client.fetch(`{
    "siteSettings": *[_type == "siteSettings"][0]{
      brandName,
      email,
      phone,
      location,
      logo
    },
    "platformSection": *[_type == "platformSection"][0]{
      image
    }
  }`);
}

const headlineStats = [
  {
    label: "Največji delovni volumen",
    value: "1030 × 737 × 715 mm",
    note: "MONO; v načinu IDEX 1030 × 666 × 715 mm",
  },
  {
    label: "Ekstruzijski tehnologiji",
    value: "FFF + FGF",
    note: "filament Ø 2,85 mm in termoplastični granulat",
  },
  {
    label: "Konfiguracija orodij",
    value: "IDEX",
    note: "samostojno delo, dve orodji, kopiranje in zrcaljenje",
  },
  {
    label: "Temperature orodij",
    value: "550 / 450 °C",
    note: "Typhoon do 550 °C; Pulsar Atom do 450 °C",
  },
  {
    label: "Ogrevanje mize",
    value: "4.990 W",
    note: "šest silikonskih grelcev pod 35-kilogramsko ploščo EN AW-5083",
  },
  {
    label: "Ponovljivost sondiranja",
    value: "≈ 0,009 mm RMS",
    note: "izmerjeno pri pripravi goste višinske mreže velike mize",
  },
];

const useCases = [
  "veliki funkcionalni prototipi in tehnični vzorci",
  "pokrovi, ohišja, zaščite in namenski konstrukcijski deli",
  "kalupi, modeli, vpenjala, šablone in industrijske priprave",
  "nadomestni plastični deli, ki jih ni več mogoče kupiti",
  "maloserijska izdelava večjih tehničnih komponent",
  "razvoj materiala, geometrije in procesnih parametrov pred proizvodnjo",
];

const testedMaterials = ["PLA", "PETG", "PETG-CF", "ABS", "ASA", "PA6-CF"];

const technicalSpecs = [
  ["Naziv stroja", "LINEX HT v1"],
  ["Vrsta stroja", "Industrijski velikoformatni hibridni 3D-tiskalnik"],
  ["Tehnologija", "FFF oziroma FDM iz filamenta in FGF iz granulata"],
  ["Kinematika", "Kartezični IDEX"],
  ["Delovni volumen IDEX", "1030 × 666 × 715 mm"],
  ["Delovni volumen MONO", "1030 × 737 × 715 mm"],
  ["Število neodvisnih orodij", "2"],
  ["Orodje 1", "Dyze Design Typhoon™"],
  ["Material Orodja 1", "Filament Ø 2,85 mm"],
  ["Šoba Orodja 1", "Ø 0,6 mm"],
  ["Temperatura Orodja 1", "Do 550 °C v konfiguraciji LINEX HT v1"],
  ["Masni pretok Orodja 1", "Do 1 kg/h"],
  ["Orodje 2", "Dyze Design Pulsar™ Atom"],
  ["Material Orodja 2", "Termoplastični granulat"],
  ["Šobe Orodja 2", "Ø 0,4 / 0,6 / 0,9 / 1,8 / 2,5 mm"],
  ["Temperatura Orodja 2", "Do 450 °C"],
  ["Masni pretok Orodja 2", "Do 1 kg/h"],
  ["Pogon osi", "SMJ ironless linearni motorji"],
  ["Servo pogoni", "INVT DA-300, 230 V"],
  ["Povratna informacija", "Linearni enkoderji z ločljivostjo 10 µm"],
  ["Konfiguriran pomik", "Do 1000 mm/s"],
  ["Konfiguriran pospešek", "Do 12.000 mm/s²"],
  ["Material tiskalne mize", "EN AW-5083"],
  ["Dimenzije tiskalne mize", "1070 × 820 × 15 mm"],
  ["Masa tiskalne plošče", "Približno 35 kg"],
  ["Ogrevanje mize", "6 silikonskih grelcev"],
  ["Skupna moč grelcev mize", "4.990 W"],
  ["Tipala mize", "2 × PT1000 ter dodatni nadzor sredine in roba"],
  ["Procesne podlage", "PEI, visokotemperaturni FR4, Kapton in druge namenske podlage"],
  ["Delovna komora", "Zaprta, izolirana in aktivno ogrevana; v razvoju"],
  ["Dosedanja testna temperatura komore", "Približno 75–80 °C"],
  ["Cilj po zaključku razvoja komore", "Do 200 °C po končni validaciji"],
  ["Glavni krmilnik", "Duet 3 Mainboard 6XD"],
  ["Razširitvena plošča", "Duet 3 Expansion Board 3HC"],
  ["SBC", "Raspberry Pi 4B"],
  ["Komunikacija", "CAN-FD"],
  ["Programska oprema", "RepRapFirmware in Duet Web Control"],
  ["Primarni sistem merjenja mize", "Duet 3 Scanning Z Probe"],
  ["Dodatna sonda", "Induktivna sonda K0"],
  ["Izvedena višinska mreža", "800 merilnih točk"],
  ["Ponovljivost sondiranja", "Približno 0,009 mm RMS"],
  ["Električno napajanje", "Trifazno, 3 × 25 A"],
  ["Ocenjena masa stroja", "Približno 400 kg"],
  ["Načini IDEX", "Samostojno, dve orodji, kopiranje in zrcaljenje"],
];

const faqItems = [
  {
    question: "Kako velik kos je mogoče izdelati na LINEX HT v1?",
    answer:
      "Največji delovni volumen v načinu MONO je 1030 × 737 × 715 mm. V načinu IDEX je na voljo 1030 × 666 × 715 mm. Dejanska izvedljivost je odvisna tudi od materiala, orientacije, šobe in zahtevane kakovosti.",
  },
  {
    question: "Kakšna je razlika med filamentnim in peletnim 3D tiskom?",
    answer:
      "Filamentni sistem Typhoon je namenjen natančnejšim površinam in podrobnejšim tehničnim delom. Peletni sistem Pulsar Atom uporablja granulat ter omogoča produktivno nanašanje materiala in uporabo industrijskih surovin pri večjih izdelkih.",
  },
  {
    question: "Katere materiale ste na platformi že preizkusili?",
    answer:
      "Do zdaj so bili uporabljeni oziroma preizkušeni PLA, PETG, PETG-CF, ABS, ASA in PA6-CF. Za vsak projekt se material, sušenje, šoba, temperatura in parametri določijo glede na namen komponente.",
  },
  {
    question: "Ali LINEX HT v1 že redno tiska PEEK in PEI?",
    answer:
      "Ne. Orodji temperaturno omogočata razvoj visokotemperaturnih procesov, vendar je komora še v fazi testiranja in dodelav. Tisk najzahtevnejših materialov, kot sta PEEK in PEI, predstavlja naslednjo razvojno stopnjo po zaključku in validaciji celotnega termičnega sistema.",
  },
  {
    question: "Kakšna je trenutna temperatura ogrevane komore?",
    answer:
      "Pri dosedanjih testih je bilo doseženih približno 75–80 °C. Cilj po vgradnji ustreznih visokotemperaturnih komponent in končni validaciji je možnost obratovanja do 200 °C; to še ni temperatura potrjenega rednega obratovanja.",
  },
  {
    question: "Ali visoka temperatura tiskalne glave pomeni, da je mogoče takoj tiskati vsak termoplast?",
    answer:
      "Ne. Temperatura glave je samo eden od pogojev. Uspešen proces je odvisen še od sušenja in oblike materiala, šobe, ogrevane mize, temperature komore, geometrije kosa ter validiranih procesnih nastavitev.",
  },
  {
    question: "Kaj potrebujete za oceno izdelave velikega kosa?",
    answer:
      "Najbolje je poslati CAD ali STL model, osnovne mere, namen uporabe, predvidene obremenitve, količino in želeni material. Če model še ne obstaja, lahko projekt začnemo tudi z idejo, fizičnim kosom, meritvami ali 3D skeniranjem.",
  },
];

export default async function LinexPage() {
  const data = await getPageData();
  const site = data?.siteSettings;
  const platform = data?.platformSection;

  return (
    <>
      <SiteHeader brandName={site?.brandName} basePath="/" />
      <main id="vsebina" tabIndex={-1} className="lt-theme lt-linex">
        <PageHero
          eyebrow="LazTek / Lastna razvojna platforma"
          breadcrumb="LINEX HT v1"
          title={
            <>
              LINEX
              <br />
              <em>HT v1.</em>
            </>
          }
          description="Lastno razvita industrijska platforma za velikoformatni 3D tisk funkcionalnih prototipov, tehničnih komponent, kalupov, priprav in maloserijskih izdelkov iz filamenta ali granulata."
          variant="product"
          visual={
            platform?.image ? (
              <figure className="lt-product-media">
                <Image
                  src={urlFor(platform.image).width(1100).auto("format").url()}
                  alt={
                    platform.image.alt ||
                    "Industrijski velikoformatni hibridni 3D-tiskalnik LINEX HT v1"
                  }
                  width={1100}
                  height={720}
                  sizes="(max-width: 800px) 100vw, 52vw"
                  priority
                />
                <figcaption>
                  LINEX HT v1 / FFF + FGF / INDUSTRIJSKA RAZVOJNA PLATFORMA
                </figcaption>
              </figure>
            ) : (
              <TechnicalImage
                image={linexPlatform}
                alt="Industrijski velikoformatni hibridni 3D-tiskalnik LINEX HT v1"
                label="LINEX / HT v1"
                caption="Filamentna in peletna ekstruzija na eni razvojni platformi"
                priority
              />
            )
          }
          action="Povpraševanje za velik kos"
          secondary={{ href: "#specifikacije", label: "Tehnične specifikacije" }}
        />

        <JumpNav
          items={[
            { id: "zmogljivosti", label: "Zmogljivosti" },
            { id: "orodji", label: "Dve orodji" },
            { id: "temperatura-materiali", label: "Komora in materiali" },
            { id: "specifikacije", label: "Specifikacije" },
            { id: "pogosta-vprasanja", label: "Vprašanja" },
          ]}
        />

        <section id="zmogljivosti" className="lt-container lt-section">
          <SectionHeading
            eyebrow="01 / Ključne zmogljivosti"
            title="Velik format, dve tehnologiji in procesni nadzor."
            text="LINEX HT v1 ni povečan namizni tiskalnik, temveč razvojna platforma, pri kateri so stroj, material, geometrija izdelka in procesni parametri obravnavani kot povezan sistem."
          />
          <dl className="lt-metrics">
            {headlineStats.slice(0, 3).map((item) => (
              <Metric key={item.label} {...item} />
            ))}
          </dl>
          <dl className="lt-metrics">
            {headlineStats.slice(3).map((item) => (
              <Metric key={item.label} {...item} />
            ))}
          </dl>
          <div className="lt-linex-intro lt-panel">
            <h3>Velika komponenta v enem kosu</h3>
            <p>
              Delovni volumen dolžine več kot en meter zmanjšuje potrebo po
              deljenju modela, lepljenju in naknadnem sestavljanju. S tem se
              ohranijo kontinuiteta geometrije, stabilnost konstrukcije in bolj
              neposredna pot od digitalnega modela do fizičnega izdelka.
            </p>
          </div>
        </section>

        <section id="orodji" className="lt-band">
          <div className="lt-container lt-section lt-split">
            <SectionHeading
              eyebrow="02 / Hibridna ekstruzija"
              title="Filament in granulat na eni IDEX platformi."
              text="Vsako orodje se po osi X premika neodvisno. Neaktivno orodje se parkira izven aktivnega območja, konfiguracija pa omogoča samostojno delo, uporabo dveh materialov, kopiranje in zrcalno izdelavo."
            />
            <div className="lt-editorial-rows">
              <article>
                <span className="lt-index">ORODJE 01 / FFF</span>
                <h3>Dyze Design Typhoon™</h3>
                <p>
                  Filament Ø 2,85 mm, šoba Ø 0,6 mm, temperatura do 550 °C in
                  masni pretok do 1 kg/h. Namenjen je podrobnejšim funkcionalnim
                  komponentam, tanjšim slojem ter površinam, kjer sta pomembni
                  natančnost in kakovost.
                </p>
              </article>
              <article>
                <span className="lt-index">ORODJE 02 / FGF</span>
                <h3>Dyze Design Pulsar™ Atom</h3>
                <p>
                  Neposredna ekstruzija granulata, šobe Ø 0,4–2,5 mm,
                  temperatura do 450 °C in masni pretok do 1 kg/h. Omogoča
                  uporabo industrijskih surovin ter produktivno nanašanje
                  materiala pri večjih komponentah.
                </p>
              </article>
              <article>
                <span className="lt-index">RAZVOJ / INTEGRACIJA</span>
                <h3>Praktično testiranje Pulsar Atom</h3>
                <p>
                  Razvoj platforme je vključeval neposredno sodelovanje z Dyze
                  Design in testiranje predprodukcijske različice Pulsar Atom.
                  Izkušnje so bile uporabljene pri integraciji, dovajanju
                  granulata in razvoju stabilnih procesnih nastavitev.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="lt-container lt-section">
          <SectionHeading
            eyebrow="03 / Razvoj platforme"
            title="Od prve postavitve do industrijskega sistema."
            text="LINEX ni katalogski tiskalnik. Fotografije prikazujejo dejanski razvoj konstrukcije, integracijo podsistemov in današnjo konfiguracijo platforme."
          />
          <ImageSequence
            ariaLabel="Razvojne faze industrijskega 3D-tiskalnika LINEX HT v1"
            items={[
              {
                image: linexEarlyBuild,
                alt: "Zgodnja mehanska izvedba velikoformatnega 3D-tiskalnika LINEX HT v1",
                label: "01 / PRVA IZVEDBA",
                title: "Preverjanje konstrukcije",
                text: "Na odprti razvojni postavitvi so bili najprej preverjeni konstrukcija, kinematika in veliko delovno območje.",
              },
              {
                image: linexDevelopmentStage,
                alt: "Vmesna razvojna faza industrijskega 3D-tiskalnika LINEX HT v1",
                label: "02 / RAZVOJ SISTEMA",
                title: "Povezovanje podsistemov",
                text: "Mehanika, ekstruzija, elektrika, krmiljenje in termično okolje so se razvijali kot povezana celota.",
              },
              {
                image: linexPlatform,
                alt: "Današnja izvedba industrijske platforme LINEX HT v1 za FFF in FGF 3D tisk",
                label: "03 / LINEX HT v1",
                title: "Današnja platforma",
                text: "Sistem združuje velik delovni volumen, dve ekstruzijski tehnologiji, linearne servo pogone in nadzor procesa.",
              },
            ]}
          />
        </section>

        <section className="lt-band">
          <div className="lt-container lt-section">
            <SectionHeading
              eyebrow="04 / Industrijska zasnova"
              title="Mehanika, krmiljenje in termični koncept kot en sistem."
              text="Lasten razvoj omogoča prilagoditev posameznega podsistema velikim geometrijam, različnim ekstruzijskim sistemom in zahtevnejšemu temperaturnemu okolju."
            />
            <ImageSequence
              ariaLabel="Konstrukcijski, električni in termični sistemi platforme LINEX HT v1"
              items={[
                {
                  image: linexCadAssembly,
                  alt: "Konstrukcijski sestav industrijske platforme LINEX HT v1",
                  label: "01 / KONSTRUKCIJA",
                  title: "Kartezična IDEX platforma",
                  text: "Razvoj delovnega območja, kinematike, vodil, nosilcev ter dostopnosti vseh pomembnih komponent.",
                },
                {
                  image: linexElectronics,
                  alt: "Električna omara in krmilni sistem industrijskega 3D-tiskalnika LINEX HT v1",
                  label: "02 / KRMILJENJE",
                  title: "Industrijska električna arhitektura",
                  text: "Ločeni tokokrogi za servo pogone, grelce in krmiljenje ter nadzor gibanja, temperature in procesnih funkcij.",
                },
                {
                  image: linexThermalBellows,
                  alt: "Toplotna zaščita delovnega območja platforme LINEX HT v1",
                  label: "03 / TERMIČNI SISTEM",
                  title: "Razvoj ogrevane komore",
                  text: "Zaščita vodil in komponent vročega območja pri postopnem razvoju visokotemperaturnega termičnega okolja.",
                },
              ]}
            />
          </div>
        </section>

        <section id="gibanje" className="lt-container lt-section">
          <SectionHeading
            eyebrow="05 / Neposredni linearni pogon"
            title="20-kilogramski portal na linearnih servo motorjih."
            text="Osi temeljijo na brezkontaktnih SMJ ironless linearnih motorjih, industrijskih servo pogonih INVT DA-300 in linearnih enkoderjih z ločljivostjo 10 µm. Os Y poganjata dva sinhronizirana motorja."
          />
          <figure className="lt-product-media">
            <video
              controls
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-label="Preizkušanje linearnega gibanja industrijske platforme LINEX HT v1"
            >
              <source src="/videos/linex-ht-v1-gibanje.mp4" type="video/mp4" />
              Vaš brskalnik ne podpira videa.{" "}
              <a href="/videos/linex-ht-v1-gibanje.mp4">Prenesite video</a>.
            </video>
            <figcaption>
              Linearni servo pogon / konfiguriran pomik do 1000 mm/s / pospešek do 12.000 mm/s²
            </figcaption>
          </figure>
        </section>

        <section id="temperatura-materiali" className="lt-band">
          <div className="lt-container lt-section lt-split">
            <SectionHeading
              eyebrow="06 / Komora in materiali"
              title="Visokotemperaturna zasnova z jasno ločenimi potrjenimi in ciljnimi zmogljivostmi."
              text="Temperatura tiskalne glave je samo eden od pogojev. Za stabilen proces so ključni tudi sušenje, oblika surovine, šoba, miza, komora, geometrija izdelka in validirane nastavitve."
            />
            <div className="lt-editorial-rows">
              <article>
                <span className="lt-index">TRENUTNO POTRJENO</span>
                <h3>Komora pri približno 75–80 °C</h3>
                <p>
                  Ta temperatura je bila dosežena pri dosedanjih testih. Komora
                  je še v fazi tehničnih dodelav in postopnega zviševanja
                  temperature, zato še ni v polnem visokotemperaturnem
                  obratovanju.
                </p>
              </article>
              <article>
                <span className="lt-index">RAZVOJNI CILJ</span>
                <h3>Do 200 °C po končni validaciji</h3>
                <p>
                  Ciljna zmogljivost je vezana na dokončanje vročega območja,
                  vgradnjo vseh ustreznih visokotemperaturnih komponent in
                  potrditev celotnega termičnega sistema.
                </p>
              </article>
              <article>
                <span className="lt-index">PREIZKUŠENI MATERIALI</span>
                <h3>{testedMaterials.join(" / ")}</h3>
                <p>
                  Glavi omogočata nadaljnji razvoj tudi za PA6-GF, PA11-CF,
                  PA12-CF, PPA-CF, PPS-CF, PEI in PEEK, vendar najzahtevnejši
                  materiali zahtevajo dokončano in validirano komoro ter lasten
                  potrjen procesni profil.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="lt-container lt-section lt-media-split">
          <TechnicalImage
            image={fgfPelletPrint}
            alt="FGF 3D tisk neposredno iz termoplastičnega granulata na platformi LINEX HT v1"
            label="FGF / GRANULAT"
            caption="Visoko pretočna izdelava neposredno iz termoplastičnega granulata"
          />
          <SectionHeading
            eyebrow="07 / Proces"
            title="Velik kos zahteva več kot samo velik tiskalnik."
            text="Pri velikih komponentah so odločilni priprava modela za aditivno izdelavo, upravljanje toplotnih obremenitev, pravilno sušenje, stabilen pretok in nadzor dolgega proizvodnega cikla."
          />
        </section>

        <section className="lt-band">
          <div className="lt-container lt-section">
            <SectionHeading
              eyebrow="08 / Merjenje in kompenzacija"
              title="800 merilnih točk za enakomerno prvo plast."
              text="Duet 3 Scanning Z Probe omogoča hitro brezkontaktno merjenje kovinske tiskalne površine. Izmerjena višinska karta se uporablja za programsko kompenzacijo celotne velike mize."
            />
            <dl className="lt-metrics">
              <Metric
                label="Razpon izmerjene površine"
                value="−0,182 do +0,177 mm"
                note="najmanjše in največje odstopanje izvedene višinske mreže"
              />
              <Metric
                label="Povprečje / standardni odklon"
                value="+0,025 / 0,085 mm"
                note="rezultati meritve z 800 točkami"
              />
              <Metric
                label="Ponovljivost sondiranja"
                value="≈ 0,009 mm RMS"
                note="izmerjena ponovljivost sistema sondiranja"
              />
            </dl>
          </div>
        </section>

        <section id="specifikacije" className="lt-container lt-section">
          <SectionHeading
            eyebrow="09 / Tehnični podatki"
            title="Specifikacije LINEX HT v1."
            text="Vrednosti opisujejo trenutno konfiguracijo stroja. Ciljna temperatura komore je posebej označena in ne predstavlja še potrjenega rednega obratovanja."
          />
          <div className="lt-table-scroll">
            <table className="lt-table lt-linex-spec-table">
              <caption>Tehnične specifikacije industrijske platforme LINEX HT v1</caption>
              <thead>
                <tr>
                  <th scope="col">Lastnost</th>
                  <th scope="col">Specifikacija</th>
                </tr>
              </thead>
              <tbody>
                {technicalSpecs.map(([label, value]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="lt-linex-trademark-note">
            Navedene blagovne znamke so uporabljene za identifikacijo vgrajenih
            komponent. LINEX HT v1 uporablja komponente Duet3D, vendar ni razvit
            v sodelovanju z družbo Duet3D.
          </p>
        </section>

        <section id="aplikacije" className="lt-band">
          <div className="lt-container lt-section lt-split">
            <SectionHeading
              eyebrow="10 / Aplikacije"
              title="Za velike kose in resnične razvojne izzive."
              text="Izvedljivost se presoja glede na geometrijo, material, obremenitve, tolerančne zahteve, količino in namen uporabe."
            />
            <CapabilityGrid items={useCases} />
          </div>
        </section>

        <section className="lt-container lt-section">
          <SectionHeading
            eyebrow="11 / Povezane storitve"
            title="Od modela in materiala do končnega kosa."
            text="LINEX je del širšega razvojnega procesa. Po potrebi projekt vključuje konstruiranje, izbor materiala, izdelavo prototipa in validacijo fizične komponente."
          />
          <div className="lt-grid lt-grid-two">
            <article className="lt-card">
              <span className="lt-index">01 / IZDELAVA</span>
              <h3>Industrijski 3D tisk</h3>
              <p className="lt-card-copy">
                Priprava modela, izbira tehnologije, materiala, orientacije in
                procesnih parametrov za funkcionalno izdelavo.
              </p>
              <Link className="lt-text-link" href="/storitve/industrijski-3d-tisk">
                Več o industrijskem 3D tisku →
              </Link>
            </article>
            <article className="lt-card">
              <span className="lt-index">02 / MATERIAL</span>
              <h3>Tehnični polimeri in kompoziti</h3>
              <p className="lt-card-copy">
                Material se izbere glede na temperaturo, obremenitev, okolje,
                zahtevano togost in ekonomiko izdelave.
              </p>
              <Link className="lt-text-link" href="/materiali">
                Pregled materialov →
              </Link>
            </article>
          </div>
        </section>

        <section id="pogosta-vprasanja" className="lt-container lt-section">
          <SectionHeading
            eyebrow="12 / Pogosta vprašanja"
            title="Kaj je pomembno pred začetkom velikega tiska?"
            text="Najhitrejša pot do realne ocene je tehnični pregled modela, dimenzij, materiala in namena uporabe."
          />
          <div className="lt-faq-list">
            {faqItems.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <CTASection
          title="Imate velik kos ali zahteven materialni izziv?"
          text="Pošljite CAD ali STL model, mere, namen uporabe, količino in želene lastnosti. Preverimo geometrijo, material, orientacijo in realno izvedljivost izdelave na platformi LINEX."
          action="Pošljite tehnično povpraševanje"
        />

        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": "https://laztek.si/linex#webpage",
                url: "https://laztek.si/linex",
                name: "LINEX HT v1 – velikoformatni FDM/FGF 3D tiskalnik",
                inLanguage: "sl-SI",
                about: { "@id": "https://laztek.si/linex#platform" },
              },
              {
                "@type": "Product",
                "@id": "https://laztek.si/linex#platform",
                name: "LINEX HT v1",
                category: "Industrijski velikoformatni hibridni 3D-tiskalnik",
                description:
                  "Lastno razvita industrijska platforma za velikoformatni FDM oziroma FFF in FGF 3D tisk iz filamenta in granulata.",
                brand: { "@type": "Brand", name: "LazTek Engineering" },
                manufacturer: { "@id": "https://laztek.si/#organization" },
                additionalProperty: [
                  {
                    "@type": "PropertyValue",
                    name: "Delovni volumen MONO",
                    value: "1030 × 737 × 715 mm",
                  },
                  {
                    "@type": "PropertyValue",
                    name: "Delovni volumen IDEX",
                    value: "1030 × 666 × 715 mm",
                  },
                  {
                    "@type": "PropertyValue",
                    name: "Tehnologija",
                    value: "FFF filament in FGF granulat",
                  },
                ],
              },
              {
                "@type": "FAQPage",
                "@id": "https://laztek.si/linex#faq",
                mainEntity: faqItems.map((item) => ({
                  "@type": "Question",
                  name: item.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: item.answer,
                  },
                })),
              },
            ],
          }}
        />
      </main>
    </>
  );
}
