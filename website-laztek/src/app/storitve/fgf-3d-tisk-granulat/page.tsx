import fgfPelletPrint from "@/assets/laztek-v2/services/industrial-print/fgf-granulate-print.webp";
import largePartInfill from "@/assets/laztek-v2/services/industrial-print/large-part-infill.webp";
import {
  CapabilityGrid,
  CTASection,
  ImageSequence,
  JumpNav,
  Metric,
  PageHero,
  ProcessFlow,
  SectionHeading,
  TechnicalCard,
  TechnicalImage,
} from "@/components/engineering/DesignSystem";
import JsonLd from "@/components/engineering/JsonLd";
import SiteHeader from "@/components/SiteHeader";
import { pageMetadata } from "@/lib/seo";
import { client } from "@/sanity/client";

export const metadata = pageMetadata(
  "FGF 3D tisk iz granulata in peletov",
  "Industrijski FGF oziroma pellet 3D tisk velikih tehničnih kosov neposredno iz termoplastičnega granulata z ekstruderjem Dyze Pulsar ATOM.",
  "/storitve/fgf-3d-tisk-granulat",
);

async function getPageData() {
  return client.fetch(`*[_type == "siteSettings"][0]{brandName}`);
}

const goodFit = [
  "večji prototipi, kalupi, modeli in tehnične komponente",
  "kosi z večjim presekom in manjšo potrebo po zelo finih detajlih",
  "razvoj procesa z industrijskim termoplastičnim granulatom",
  "komponente, pri katerih sta pomembna materialna učinkovitost in pretočnost procesa",
  "namenske manjše serije večjih kosov po potrditvi parametrov",
];

const process = [
  {
    title: "Preverjanje granulata",
    text: "Pregledamo polimer, dodatke, obliko in dimenzije peletov, priporočila proizvajalca ter tehnični list.",
  },
  {
    title: "Sušenje in stabilen dovod",
    text: "Higroskopne materiale pravilno posušimo in med postopkom nadzorujemo vlago ter zanesljivo doziranje.",
  },
  {
    title: "Razvoj procesnega okna",
    text: "Temperaturo, šobo, pretok, hitrost, širino sledi in hlajenje prilagodimo materialu ter geometriji kosa.",
  },
  {
    title: "Testni odsek in končni kos",
    text: "Pri novem materialu najprej potrdimo osnovno obnašanje na vzorcu ali kritičnem delu geometrije.",
  },
];

export default async function FgfPrintingPage() {
  const site = await getPageData();

  return (
    <>
      <SiteHeader brandName={site?.brandName} basePath="/" />
      <main id="vsebina" tabIndex={-1} className="lt-theme">
        <PageHero
          eyebrow="FGF / Pellet / Granulat"
          breadcrumb="FGF 3D tisk iz granulata"
          title={
            <>
              3D tisk iz granulata.
              <br />
              <em>Proces za velike tehnične kose.</em>
            </>
          }
          description="FGF (Fused Granulate Fabrication) uporablja termoplastični granulat namesto filamenta. Na platformi LINEX HT v1 proces izvajamo z mikrogranulatnim ekstruderjem Dyze Pulsar ATOM in ga prilagodimo materialu ter dejanski komponenti."
          visual={
            <TechnicalImage
              image={fgfPelletPrint}
              alt="FGF 3D tisk velikega tehničnega kosa neposredno iz termoplastičnega granulata"
              label="DYZE PULSAR ATOM / FGF"
              caption="Granulat, nadzorovan dovod in razvoj procesnih parametrov"
              priority
            />
          }
          action="Pošljite projekt za FGF oceno"
          secondary={{ href: "/storitve/velikoformatni-3d-tisk", label: "Veliki formati" }}
        />

        <JumpNav
          items={[
            { id: "kaj-je-fgf", label: "Kaj je FGF" },
            { id: "kdaj", label: "Kdaj je smiseln" },
            { id: "materiali", label: "Materiali" },
            { id: "proces", label: "Razvoj procesa" },
          ]}
        />

        <section id="kaj-je-fgf" className="lt-container lt-section">
          <SectionHeading
            eyebrow="01 / Tehnologija"
            title="Granulat se tali in nanaša neposredno v sled."
            text="FGF uporablja pelete oziroma granulat, ki se v ekstruderju plastificira in skozi šobo nanaša po plasteh. Tehnologija je primerna predvsem za večje kose, večje preseke ter razvoj procesov z industrijskimi termoplasti."
          />
          <dl className="lt-metrics">
            <Metric
              label="Ekstruder"
              value="Dyze Pulsar ATOM"
              note="Mikrogranulatni FGF sistem"
            />
            <Metric
              label="Najvišja temperatura orodja"
              value="do 450 °C"
              note="Temperatura glave sama ne potrjuje materialnega procesa"
            />
            <Metric
              label="Razpoložljive šobe"
              value="0,4–2,5 mm"
              note="0,4 / 0,6 / 0,9 / 1,8 / 2,5 mm"
            />
          </dl>
        </section>

        <section id="kdaj" className="lt-band">
          <div className="lt-container lt-section lt-split">
            <SectionHeading
              eyebrow="02 / Primernost"
              title="FGF ni samo cenejši filament."
              text="Prednost nastane, ko velikost kosa, zahtevani pretok, razpoložljiv granulat in geometrija upravičijo razvoj posebnega procesa. Za fine površine in manjše podrobne dele je lahko filamentni FDM smiselnejši."
            />
            <CapabilityGrid items={goodFit} />
          </div>
        </section>

        <section className="lt-container lt-section">
          <div className="lt-grid lt-grid-two">
            <TechnicalCard index="FGF" title="Granulat / peleti">
              <p>
                Večja izbira industrijskih surovin, večje šobe in učinkovito
                nanašanje materiala pri velikih kosih. Proces je močno odvisen
                od oblike peletov, sušenja in stabilnega dovoda.
              </p>
            </TechnicalCard>
            <TechnicalCard index="FDM" title="Filament">
              <p>
                Praviloma primernejši za manjše šobe, podrobnejše geometrije,
                bolj nadzorovano površino in materiale, ki so že pripravljeni v
                kalibriranem premeru filamenta.
              </p>
            </TechnicalCard>
          </div>
        </section>

        <section id="materiali" className="lt-container lt-section">
          <SectionHeading
            eyebrow="03 / Preverjeno in razvojno"
            title="Jasno ločujemo izvedene procese od razvojnih ciljev."
            text="Na platformi so bile z granulatom že izvedene procesne preizkušnje s PETG in PA6-CF. Primernost vsake konkretne formulacije se ponovno preveri s tehničnim listom in testom."
          />
          <div className="lt-grid lt-grid-two">
            <TechnicalCard index="PREVERJENO" title="PETG in PA6-CF granulat">
              <p>
                Z obema skupinama materialov so bile izvedene dejanske
                procesne preizkušnje. Končni parametri ostajajo odvisni od
                proizvajalca, granulacije, vlage, geometrije in zahtev kosa.
              </p>
            </TechnicalCard>
            <TechnicalCard index="RAZVOJ" title="PA6-GF, PA11/12-CF, PPA-CF, PPS-CF">
              <p>
                To so načrtovane smeri razvoja. Dokler posamezna formulacija
                ni procesno potrjena na platformi, je ne predstavljamo kot
                redno proizvodno zmogljivost.
              </p>
            </TechnicalCard>
          </div>
        </section>

        <section className="lt-container lt-section">
          <SectionHeading
            eyebrow="04 / Dejanski proces"
            title="Pri FGF je priprava materiala del tehnologije."
          />
          <ImageSequence
            ariaLabel="Proces FGF 3D tiska iz granulata"
            items={[
              {
                image: fgfPelletPrint,
                alt: "Nanos termoplastičnega granulata z ekstruderjem Dyze Pulsar ATOM",
                label: "EKSTRUZIJA",
                title: "Stabilen pretok in enakomerna sled",
                text: "Temperatura in pretok se uskladita s hitrostjo gibanja ter širino sledi.",
              },
              {
                image: largePartInfill,
                alt: "Velika notranja struktura FGF 3D natisnjenega kosa",
                label: "VELIK KOS",
                title: "Geometrija za dejanski proces",
                text: "Prehodi, stene in polnilo morajo biti načrtovani glede na šobo ter pričakovane obremenitve.",
              },
            ]}
          />
        </section>

        <section id="proces" className="lt-band">
          <div className="lt-container lt-section">
            <SectionHeading
              eyebrow="05 / Procesni razvoj"
              title="Od suhega granulata do potrjene komponente."
            />
            <ProcessFlow steps={process} />
          </div>
        </section>

        <CTASection
          title="Imate granulat ali velik kos za FGF izdelavo?"
          text="Pošljite tehnični list materiala, podatke o obliki peletov, CAD-model, zunanje mere, količino in zahteve uporabe. Najprej preverimo, ali je FGF smiselna pot."
          action="Preverite izvedljivost FGF tiska"
        />

        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": "https://laztek.si/storitve/fgf-3d-tisk-granulat#service",
            name: "FGF 3D tisk iz granulata",
            alternateName: ["Pellet 3D printing", "Granulatni 3D tisk"],
            serviceType: "Fused Granulate Fabrication (FGF)",
            description:
              "Industrijski 3D tisk velikih tehničnih kosov neposredno iz termoplastičnega granulata.",
            url: "https://laztek.si/storitve/fgf-3d-tisk-granulat",
            provider: { "@id": "https://laztek.si/#organization" },
            areaServed: ["Slovenija", "Evropska unija"],
          }}
        />
      </main>
    </>
  );
}
