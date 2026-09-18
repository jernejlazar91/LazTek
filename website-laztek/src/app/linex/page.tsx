import SiteHeader from "@/components/SiteHeader";
import fgfPelletPrint from "@/assets/laztek/fgf-pellet-print.webp";
import linexCadAssembly from "@/assets/laztek/linex-cad-assembly.webp";
import linexElectronics from "@/assets/laztek/linex-electronics.webp";
import linexPlatform from "@/assets/laztek/linex-platform.webp";
import linexThermalBellows from "@/assets/laztek/linex-thermal-bellows.webp";
import { pageMetadata } from "@/lib/seo";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";

export const metadata = pageMetadata(
  "LINEX HT v1",
  "LINEX HT v1 je lastna velikoformatna razvojna platforma za industrijski 3D tisk funkcionalnih kosov iz tehničnih polimerov.",
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
      title,
      text,
      image,
      stats
    }
  }`);
}

const useCases = [
  "veliki prototipi in funkcionalni vzorci",
  "namenski nosilci, pokrovi, ohišja in zaščite",
  "nadomestni plastični deli, ki jih ni več mogoče kupiti",
  "vpenjala, šablone, priprave in pomožni industrijski kosi",
  "manjše serije tehničnih delov",
  "testiranje materiala, oblike in funkcije pred dražjo proizvodnjo",
];

const technicalSpecs = [
  {
    label: "Delovni volumen",
    value: "1030 × 660 × 715 mm",
    note: "za velike prototipe, pokrove, ohišja, priprave in tehnične kose",
  },
  {
    label: "Ogrevana miza",
    value: "do 200 °C",
    note: "večconsko regulirano ogrevanje za zahtevnejše materiale in večje kose",
  },
  {
    label: "FDM + FGF",
    value: "filament in granulat",
    note: "kombinacija natančnega filamentnega tiska in fleksibilnosti granulata",
  },
  {
    label: "IDEX zasnova",
    value: "2 neodvisni glavi",
    note: "platforma je zasnovana za širši nabor materialov, podpor in razvojnih testov",
  },
  {
    label: "Procesni nadzor",
    value: "remote + video",
    note: "nadzor stroja in tiska na daljavo pri daljših industrijskih ciklih",
  },
  {
    label: "Razvojni fokus",
    value: "DfAM + parametri",
    note: "model, material in nastavitve se prilagodijo konkretni komponenti",
  },
];

const extrusionHighlights = [
  {
    title: "Dyze Typhoon — filament 2.85 mm",
    text: "Za natančnejše funkcionalne dele, kontrolirano ekstruzijo in tehnične materiale, kjer je pomembna ponovljivost.",
  },
  {
    title: "Dyze Atom — direktno iz granulata",
    text: "Za večjo materialno fleksibilnost, razvoj specifičnih formulacij in nižji strošek materiala pri večjih kosih ali testih.",
  },
];

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
          description={
            platform?.text ||
            "Velikoformatna FDM / FGF platforma. Lasten razvoj za funkcionalne komponente, tehnične polimere in nadzorovan proizvodni proces."
          }
          variant="product"
          visual={
            platform?.image ? (
              <figure className="lt-product-media">
                <img
                  src={urlFor(platform.image).width(1100).auto("format").url()}
                  alt={
                    platform.image.alt ||
                    "Industrijska FDM in FGF platforma LINEX HT v1"
                  }
                  width={1100}
                  height={720}
                />
                <figcaption>
                  LINEX HT v1 / FDM + FGF / RAZVOJNA PLATFORMA
                </figcaption>
              </figure>
            ) : (
              <TechnicalImage
                image={linexPlatform}
                alt="Velikoformatna razvojna platforma LINEX HT v1"
                label="LINEX / HT v1"
                caption="Lastna velikoformatna FDM + FGF razvojna platforma"
                priority
              />
            )
          }
          action="Povpraševanje za velik kos"
          secondary={{ href: "#specifikacije", label: "Tehnični pregled" }}
        />
        <JumpNav
          items={[
            { id: "specifikacije", label: "Specifikacije" },
            { id: "ekstruzija", label: "Ekstruzija" },
            { id: "gibanje", label: "Platforma v gibanju" },
            { id: "aplikacije", label: "Aplikacije" },
          ]}
        />
        <section id="specifikacije" className="lt-container lt-section">
          <SectionHeading
            eyebrow="01 / Tehnični pregled"
            title={platform?.title || "Velik format je šele začetek."}
            text="Konstrukcija, material in proces tvorijo celoto. Konfiguracijo in izvedljivost konkretnega kosa potrdimo ob tehničnem pregledu."
          />
          <dl className="lt-metrics">
            {technicalSpecs.slice(0, 3).map((item) => (
              <Metric key={item.label} {...item} />
            ))}
          </dl>
          <dl className="lt-metrics">
            {technicalSpecs.slice(3).map((item) => (
              <Metric key={item.label} {...item} />
            ))}
          </dl>
        </section>
        <section id="ekstruzija" className="lt-band">
          <div className="lt-container lt-section lt-split">
            <SectionHeading
              eyebrow="02 / Materialna fleksibilnost"
              title="Filament in granulat. Na eni razvojni platformi."
            />
            <div className="lt-editorial-rows">
              {extrusionHighlights.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="lt-container lt-section">
          <SectionHeading
            eyebrow="03 / Razvoj platforme"
            title="Mehanika, elektronika in termični koncept kot en sistem."
            text="LINEX ni kupljen katalogski tiskalnik. Platforma je razvita kot celota, zato lahko proces prilagodimo velikim geometrijam, različnim ekstruzijskim sistemom in zahtevnejšemu temperaturnemu okolju."
          />
          <ImageSequence
            ariaLabel="Razvojne faze platforme LINEX HT v1"
            items={[
              {
                image: linexCadAssembly,
                alt: "CAD sestav velikoformatne platforme LINEX HT v1",
                label: "MECHANICAL DESIGN",
                title: "Konstrukcija platforme",
                text: "Razvoj delovnega območja, kinematike, vodil, nosilcev in dostopnosti komponent.",
              },
              {
                image: linexElectronics,
                alt: "Električna omara in krmilna elektronika platforme LINEX",
                label: "CONTROL SYSTEM",
                title: "Krmiljenje in napajanje",
                text: "Industrijska električna arhitektura za nadzor gibanja, gretja in procesnih funkcij.",
              },
              {
                image: linexThermalBellows,
                alt: "Toplotna zaščita delovnega območja platforme LINEX",
                label: "THERMAL SYSTEM",
                title: "Priprava termičnega okolja",
                text: "Zaščita vodil in delovnega območja pri razvoju postopkov za tehnične polimere.",
              },
            ]}
          />
        </section>
        <section id="gibanje" className="lt-container lt-section">
          <SectionHeading
            eyebrow="04 / Razvoj v praksi"
            title="Platforma v gibanju."
          />
          <figure className="lt-product-media">
            <video
              controls
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              aria-label="Video gibanja razvojne platforme LINEX HT v1"
            >
              <source src="/videos/linex-ht-v1-gibanje.mp4" type="video/mp4" />
              Vaš brskalnik ne podpira videa.{" "}
              <a href="/videos/linex-ht-v1-gibanje.mp4">Prenesite video</a>.
            </video>
            <figcaption>
              Preizkušanje gibanja lastne velikoformatne FDM / FGF platforme.
            </figcaption>
          </figure>
        </section>
        <section className="lt-band">
          <div className="lt-container lt-section lt-media-split">
            <TechnicalImage
              image={fgfPelletPrint}
              alt="FGF tisk s peletnim ekstruderjem na platformi LINEX"
              label="FGF / PROCESS"
              caption="Izdelava neposredno iz granulata"
            />
            <SectionHeading
              eyebrow="05 / Proces"
              title="Platforma je orodje. Rezultat določa proces."
              text="Pri velikih kosih so ključni priprava modela, upravljanje toplotnih obremenitev, stabilen pretok materiala in nadzor nad dolgim proizvodnim ciklom."
            />
          </div>
        </section>
        <section id="aplikacije" className="lt-container lt-section lt-split">
          <SectionHeading
            eyebrow="06 / Aplikacije"
            title="Za večje kose in razvojne izzive."
          />
          <CapabilityGrid items={useCases} />
        </section>
        <CTASection
          title="Velik kos potrebuje celovit pristop."
          text="Pošljite mere, model in zahteve. Preverimo material, orientacijo in izvedljivost izdelave na platformi LINEX."
        />
      </main>
    </>
  );
}
