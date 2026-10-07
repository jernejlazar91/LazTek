import {EditableTitle} from '@/components/engineering/CmsContent';
import {getPageEditor, editableMetadata} from '@/sanity/pageEditor';
import {CmsPageHero, CmsServiceBody} from '@/components/engineering/CmsContent';
import {getEditablePage, serviceMetadata} from '@/sanity/content';
import fgfPelletPrint from "@/assets/laztek-v2/services/industrial-print/fgf-granulate-print.webp";
import largePartInfill from "@/assets/laztek-v2/services/industrial-print/large-part-infill.webp";
import linexPlatform from "@/assets/laztek-v2/linex/linex-ht-platform.webp";
import {
  CapabilityGrid,
  CTASection,
  ImageSequence,
  JumpNav,
  Metric,
  ProcessFlow,
  SectionHeading,
  TechnicalCard,
  TechnicalImage,
} from "@/components/engineering/DesignSystem";
import JsonLd from "@/components/engineering/JsonLd";
import SiteHeader from "@/components/CmsSiteHeader";
import { client } from "@/sanity/client";

export async function generateMetadata() {
  return editableMetadata("/storitve/velikoformatni-3d-tisk", await serviceMetadata(
    "Velikoformatni 3D tisk velikih kosov",
    "Velikoformatni industrijski 3D tisk velikih prototipov, ohišij, kalupov, priprav in funkcionalnih komponent do 1030 × 737 × 715 mm.",
    "/storitve/velikoformatni-3d-tisk",
  ));
}

async function getPageData() {
  return client.fetch(`*[_type == "siteSettings"][0]{brandName}`, {}, {next: {revalidate: 60}});
}

const defaultApplications = [
  "veliki funkcionalni prototipi in preverjanje sestave",
  "ohišja, pokrovi, zaščite in kanali",
  "kalupi, modeli in orodja za nadaljnje postopke",
  "vpenjala, šablone in proizvodni pripomočki",
  "nadomestni deli, ki jih ni več mogoče dobaviti",
  "unikatne in maloserijske tehnične komponente",
];

const defaultProcess = [
  {
    title: "Pregled geometrije in namena",
    text: "Preverimo mere, obremenitve, montažo, vidne površine, količino in okolje uporabe.",
  },
  {
    title: "Odločitev: en kos ali segmenti",
    text: "Model po potrebi prilagodimo delovnemu volumnu, smeri slojev, spojem in naknadni obdelavi.",
  },
  {
    title: "Material in proces",
    text: "Določimo tehnologijo FDM ali FGF, šobo, širino sledi, orientacijo, podpore in procesne temperature.",
  },
  {
    title: "Izdelava in preverjanje",
    text: "Pri zahtevnih kosih najprej izdelamo kritični odsek ali testni vzorec, nato končno komponento.",
  },
];

const defaultLimits = [
  "Največji volumen ne pomeni, da je vsaka geometrija avtomatično izvedljiva v enem kosu.",
  "Pri velikih tehničnih delih so krčenje, ravnost, smer slojev in temperaturna stabilnost pomembnejši od same zunanje mere.",
  "Tesne tolerance, izvrtine, naležne površine in navoji lahko zahtevajo konstrukcijski dodatek ali naknadno obdelavo.",
  "Za zelo velike serije ali geometrije z zahtevano brizgano površino je lahko primernejši drug proizvodni postopek.",
];

export default async function LargeFormatPrintingPage() {
  const editor = await getPageEditor("/storitve/velikoformatni-3d-tisk");
  const applications = editor.data("s01.f001", defaultApplications);
  const process = editor.data("s02.f002", defaultProcess);
  const limits = editor.data("s03.f003", defaultLimits);

  const service = await getEditablePage('servicePage', 'velikoformatni-3d-tisk');
  const site = await getPageData();

  return (
    <>
      <SiteHeader brandName={site?.brandName} basePath="/" />
      <main id="vsebina" tabIndex={-1} className="lt-theme">
        <CmsPageHero page={editor.exists ? null : service}
          eyebrow={editor.text("s04.f004", "Veliki tehnični kosi / FDM + FGF")}
          breadcrumb="Velikoformatni 3D tisk"
          title={
            <EditableTitle first={editor.text("s04.f005", "Velikoformatni 3D tisk.")} second={editor.text("s04.f006", "Velikost z inženirsko pripravo.")} />
          }
          description={editor.text("s04.f007", "Izdelava večjih prototipov in funkcionalnih komponent na lastni platformi LINEX HT v1. Geometrijo, material in proces določimo glede na uporabo kosa, ne samo glede na njegove zunanje mere.")}
          visual={
            <TechnicalImage
              image={editor.image("s04.f008", linexPlatform)}
              alt={editor.text("s04.f009", "Velikoformatna industrijska 3D platforma LINEX HT v1 v delavnici LazTek Engineering")}
              label={editor.text("s04.f010", "LINEX HT v1 / VELIKI FORMAT")}
              caption={editor.text("s04.f011", "Lastna razvojna platforma za FDM in FGF izdelavo")}
              priority
            />
          }
          action={editor.text("s04.f012", "Pošljite model velikega kosa")}
          secondary={editor.data("s04.f013", { href: "/linex", label: "Tehnične specifikacije" })}
        />
        <CmsServiceBody page={editor.exists ? null : service}>

        <JumpNav
          items={editor.data("s04.f014", [
            { id: "volumen", label: "Delovni volumen" },
            { id: "uporaba", label: "Uporaba" },
            { id: "priprava", label: "Priprava kosa" },
            { id: "omejitve", label: "Realne omejitve" },
          ])}
        />

        <section id="volumen" className="lt-container lt-section">
          <SectionHeading
            eyebrow={editor.text("s06.f015", "01 / Zmogljivost")}
            title={editor.text("s06.f016", "Delovni volumen nad enim metrom.")}
            text={editor.text("s06.f017", "Na voljo sta dva načina dela. MONO zagotavlja največjo širino, IDEX pa omogoča uporabo dveh neodvisnih orodij ter načina kopiranja in zrcaljenja.")}
          />
          <dl className="lt-metrics">
            <Metric
              label={editor.text("s06.f018", "MONO delovni volumen")}
              value="1030 × 737 × 715 mm"
              note="Največji razpoložljivi volumen z enim orodjem"
            />
            <Metric
              label={editor.text("s06.f019", "IDEX delovni volumen")}
              value="1030 × 666 × 715 mm"
              note="Dve neodvisni orodji na skupni osi"
            />
            <Metric
              label={editor.text("s06.f020", "Tehnologiji")}
              value="FDM / FFF + FGF"
              note="Filament ali termoplastični granulat"
            />
          </dl>
        </section>

        <section id="uporaba" className="lt-band">
          <div className="lt-container lt-section lt-split">
            <SectionHeading
              eyebrow={editor.text("s01.f021", "02 / Primerne aplikacije")}
              title={editor.text("s01.f022", "Kadar namizni format ni več dovolj.")}
              text={editor.text("s01.f023", "Velik format ima največjo poslovno vrednost pri kosih, kjer bi deljenje povečalo čas sestave, zmanjšalo togost ali otežilo preverjanje realne geometrije.")}
            />
            <CapabilityGrid items={applications} />
          </div>
        </section>

        <section className="lt-container lt-section">
          <SectionHeading
            eyebrow={editor.text("s07.f024", "03 / Dejanska izdelava")}
            title={editor.text("s07.f025", "Velik kos zahteva nadzor celotnega procesa.")}
            text={editor.text("s07.f026", "Fotografije prikazujejo dejanski razvoj in izdelavo na platformi LazTek.")}
          />
          <ImageSequence
            ariaLabel={editor.text("s07.f027", "Velikoformatni 3D tisk na platformi LINEX HT v1")}
            items={editor.data("s07.f028", [
              {
                image: fgfPelletPrint,
                alt: "FGF 3D tisk velike komponente neposredno iz termoplastičnega granulata",
                label: "FGF / GRANULAT",
                title: "Večji preseki in produktivno nanašanje",
                text: "Granulatni ekstruder je namenjen večjim kosom in razvoju namenskih procesov.",
              },
              {
                image: largePartInfill,
                alt: "Notranja struktura velikega 3D natisnjenega tehničnega kosa",
                label: "GEOMETRIJA / POLNILO",
                title: "Struktura se prilagodi obremenitvi",
                text: "Stene, rebra, polnilo in smer izdelave se določijo glede na funkcijo komponente.",
              },
            ])}
          />
        </section>

        <section id="priprava" className="lt-band">
          <div className="lt-container lt-section">
            <SectionHeading
              eyebrow={editor.text("s02.f029", "04 / Potek")}
              title={editor.text("s02.f030", "Od velikega CAD-modela do uporabnega kosa.")}
            />
            <ProcessFlow steps={process} />
          </div>
        </section>

        <section id="omejitve" className="lt-container lt-section lt-split">
          <SectionHeading
            eyebrow={editor.text("s03.f031", "05 / Inženirska presoja")}
            title={editor.text("s03.f032", "Velikost je samo eden od pogojev.")}
            text={editor.text("s03.f033", "Pred ponudbo preverimo, ali je smiselna izdelava v enem kosu, segmentiranje ali drugačen postopek.")}
          />
          <div className="lt-grid lt-grid-two">
            {limits.map((text, index) => (
              <TechnicalCard
                key={text}
                index={String(index + 1).padStart(2, "0")}
                title={index === 0 ? "Izvedljivost" : index === 1 ? "Stabilnost" : index === 2 ? "Tolerance" : "Ekonomika"}
              >
                <p>{text}</p>
              </TechnicalCard>
            ))}
          </div>
        </section>

        </CmsServiceBody>
        <CTASection
          title={editor.text("s08.f034", service?.ctaTitle?.trim() || "Potrebujete večji prototip ali funkcionalni del?")}
          text={editor.text("s08.f035", service?.ctaText?.trim() || "Pošljite STEP ali STL, zunanje mere, namen uporabe, količino in okolje delovanja. Preverimo izvedljivost, material ter smiselno orientacijo izdelave.")}
          action={editor.text("s08.f036", "Pošljite datoteko za oceno")}
        />

        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": "https://laztek.si/storitve/velikoformatni-3d-tisk#service",
            name: "Velikoformatni 3D tisk",
            serviceType: "Velikoformatna aditivna proizvodnja s tehnologijama FDM/FFF in FGF",
            description:
              "Izdelava velikih funkcionalnih prototipov, ohišij, kalupov, priprav in končnih komponent do 1030 × 737 × 715 mm.",
            url: "https://laztek.si/storitve/velikoformatni-3d-tisk",
            provider: { "@id": "https://laztek.si/#organization" },
            areaServed: ["Slovenija", "Evropska unija"],
          }}
        />
      </main>
    </>
  );
}
