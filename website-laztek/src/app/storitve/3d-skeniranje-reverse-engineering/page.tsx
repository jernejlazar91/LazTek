import JsonLd from "@/components/engineering/JsonLd";
import SiteHeader from "@/components/SiteHeader";
import clioCad from "@/assets/laztek/clio-cad.webp";
import clioFinishedSet from "@/assets/laztek/clio-finished-set.webp";
import clioScan from "@/assets/laztek/clio-scan.webp";
import scanSurface from "@/assets/laztek/scan-surface.webp";
import { pageMetadata } from "@/lib/seo";
import { client } from "@/sanity/client";
import {
  FileScan,
  Layers3,
  RefreshCw,
  Ruler,
  ScanLine,
  Wrench,
} from "lucide-react";

export const metadata = pageMetadata(
  "3D skeniranje, reverse engineering in obnova plastičnih kosov",
  "3D skeniranje, reverse engineering, CAD rekonstrukcija, obnova poškodovanih plastičnih kosov in izdelava nadomestnih delov.",
  "/storitve/3d-skeniranje-reverse-engineering",
);

async function getPageData() {
  return client.fetch(`{
    "siteSettings": *[_type == "siteSettings"][0]{
      brandName,
      email,
      phone,
      location,
      logo
    }
  }`);
}

const useCases = [
  {
    title: "Kos obstaja, dokumentacije pa ni",
    text: "Obstoječ del se izmeri, skenira in pretvori v digitalni model, ki ga lahko uporabimo za ponovno izdelavo ali nadaljnje spremembe.",
    icon: FileScan,
  },
  {
    title: "Poškodovan plastični del",
    text: "Pri zlomljenih kosih se rekonstruira prvotna oblika, nato pa se kritična mesta po potrebi ojačajo ali konstrukcijsko izboljšajo.",
    icon: Wrench,
  },
  {
    title: "Nadomestni del ali izboljšana verzija",
    text: "Kos lahko ostane oblikovno podoben originalu, hkrati pa dobi boljši material, debelejša rebra, močnejše pritrdilne točke ali lažjo montažo.",
    icon: RefreshCw,
  },
];

const comparison = [
  {
    title: "3D skeniranje",
    text: "Najbolj uporabno za organske oblike, ulite kose, ohišja, pokrove in dele, kjer je veliko krivin ali površin, ki jih je težko ročno izmeriti.",
    icon: ScanLine,
  },
  {
    title: "Ročno merjenje in CAD",
    text: "Primerno za tehnične kose, kjer so pomembne luknje, razdalje, ravnine, navoji, naležne površine in funkcionalne tolerance.",
    icon: Ruler,
  },
  {
    title: "Kombiniran pristop",
    text: "V praksi je pogosto najboljša kombinacija: sken za obliko, ročne meritve za funkcionalne dimenzije in CAD rekonstrukcija za čist model.",
    icon: Layers3,
  },
];

const deliverables = [
  "STL za 3D tisk",
  "STEP model za nadaljnjo konstrukcijo",
  "popravljen ali izboljšan CAD model",
  "funkcionalen nadomestni kos",
  "predlog materiala glede na namen uporabe",
  "osnovna priporočila za montažo ali izboljšavo",
];

import {
  CapabilityGrid,
  CTASection,
  ImageSequence,
  PageHero,
  SectionHeading,
  TechnicalCard,
  TechnicalImage,
} from "@/components/engineering/DesignSystem";

export default async function ScanningReverseEngineeringPage() {
  const data = await getPageData();
  const site = data?.siteSettings;
  return (
    <>
      <SiteHeader brandName={site?.brandName} basePath="/" />
      <main
        id="vsebina"
        tabIndex={-1}
        className="lt-theme lt-3d-skeniranje-reverse-engineering"
      >
        <PageHero
          eyebrow="Digitalizacija / Povratni inženiring"
          breadcrumb="3D skeniranje in reverse engineering"
          title={
            <>
              Od fizičnega kosa
              <br />
              <em>do uporabnega CAD-a.</em>
            </>
          }
          description="3D skeniranje in reverse engineering povežeta fizično geometrijo z uporabnim CAD modelom. Za ponovno izdelavo, spremembe ali razvoj nadomestnega dela."
          visual={
            <TechnicalImage
              image={scanSurface}
              alt="Digitalizirana površina komponente med 3D skeniranjem"
              label="3D SCAN / POVRŠINA"
              caption="Zajem fizične geometrije za nadaljnjo CAD rekonstrukcijo"
              priority
            />
          }
          action="Predstavite kos"
        />
        <section className="lt-container lt-section">
          <SectionHeading
            eyebrow="01 / Digitalni proces"
            title="Od zajema površine do nove komponente."
            text="Vsaka stopnja ima svoj namen. Obdelan sken in konstrukcijski CAD model sta različna rezultata, ki ju izberemo glede na nadaljnjo uporabo."
          />
          <div className="lt-scan-pipeline">
            {[
              {
                title: "Zajem",
                text: "Skeniranje fizičnega kosa in referenčne meritve.",
              },
              {
                title: "Oblak točk / mreža",
                text: "Urejena zajeta geometrija za nadaljnjo obdelavo.",
              },
              {
                title: "CAD rekonstrukcija",
                text: "Površine, pritrditve in funkcionalne dimenzije.",
              },
              {
                title: "Nova komponenta",
                text: "Model za izdelavo ali funkcionalni nadomestni del.",
              },
            ].map((item, i) => (
              <div key={item.title}>
                <span className="lt-index">0{i + 1}</span>
                <div
                  className={`lt-pipeline-glyph lt-pipeline-glyph-${i}`}
                  aria-hidden="true"
                />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="lt-band">
          <div className="lt-container lt-section lt-split">
            <SectionHeading
              eyebrow="02 / Metoda"
              title="Sken za obliko. Meritve za funkcijo."
              text="Kritične naležne površine, pritrditve in tolerance določimo v okviru projekta. Zajeta površina je izhodišče za konstrukcijsko presojo."
            />
            <div className="lt-editorial-rows">
              {comparison.map((item) => (
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
            eyebrow="03 / Primer procesa"
            title="Renault Clio 197: od zajete geometrije do kompleta mrežic."
            text="Projekt prikazuje razliko med zajetim scanom, rekonstruiranim CAD modelom in fizičnim rezultatom, pripravljenim za uporabo."
          />
          <ImageSequence
            ariaLabel="Reverse engineering proces mrežic Renault Clio 197"
            items={[
              {
                image: clioScan,
                alt: "3D scan mrežice odbijača Renault Clio 197",
                label: "01 / SCAN",
                title: "Zajeta referenčna geometrija",
                text: "Oblika in vgradni prostor sta zajeta kot digitalna referenca za nadaljnje delo.",
              },
              {
                image: clioCad,
                alt: "CAD rekonstrukcija mrežice Renault Clio 197",
                label: "02 / CAD",
                title: "Čist konstrukcijski model",
                text: "Površine, rebra in pritrdilni elementi so ponovno definirani v uporabni geometriji.",
              },
              {
                image: clioFinishedSet,
                alt: "Komplet izdelanih mrežic za Renault Clio 197",
                label: "03 / IZDELAVA",
                title: "Fizični komplet komponent",
                text: "Rekonstruirani modeli so pretvorjeni v ponovljiv komplet funkcionalnih delov.",
              },
            ]}
          />
        </section>
        <section className="lt-container lt-section">
          <SectionHeading
            eyebrow="04 / Primeri uporabe"
            title="Ko dokumentacije ni ali geometrija potrebuje spremembo."
          />
          <div className="lt-grid">
            {useCases.map((item, i) => (
              <TechnicalCard
                key={item.title}
                index={`0${i + 1}`}
                title={item.title}
              >
                <p>{item.text}</p>
              </TechnicalCard>
            ))}
          </div>
        </section>
        <section className="lt-container lt-section lt-split">
          <SectionHeading
            eyebrow="05 / Predaja"
            title="Rezultat, uporaben v naslednjem koraku."
            text="Obseg rekonstrukcije in format datotek določimo pred začetkom. Po potrebi razvoj nadaljujemo do izdelave fizičnega kosa."
          />
          <CapabilityGrid items={deliverables} />
        </section>
        <CTASection
          title="Imate kos brez uporabnega CAD modela?"
          text="Pošljite fotografije, približne mere in namen uporabe. Ocenimo zajem, rekonstrukcijo in naslednje korake."
        />

        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: "3D skeniranje, reverse engineering in obnova plastičnih kosov",
            url: "https://laztek.si/storitve/3d-skeniranje-reverse-engineering",
            provider: { "@id": "https://laztek.si/#organization" },
          }}
        />
      </main>
    </>
  );
}
