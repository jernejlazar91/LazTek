import JsonLd from "@/components/engineering/JsonLd";
import SiteHeader from "@/components/SiteHeader";
import clioCad from "@/assets/laztek/clio-cad.webp";
import clioFinishedSet from "@/assets/laztek-v2/projects/clio-197/clio-grille-final-set.webp";
import clioScan from "@/assets/laztek-v2/projects/clio-197/clio-grille-scan.webp";
import atxOriginalPart from "@/assets/laztek-v2/projects/atx/atx-original-part.webp";
import atxScanModel from "@/assets/laztek-v2/projects/atx/atx-scan-model.webp";
import atxEngineeredModel from "@/assets/laztek-v2/projects/atx/atx-engineered-model.webp";
import fenderReference from "@/assets/laztek-v2/projects/blatnik/fender-reference-part.webp";
import fenderScan from "@/assets/laztek-v2/projects/blatnik/fender-scan.webp";
import fenderCadModel from "@/assets/laztek-v2/projects/blatnik/fender-cad-model.webp";
import vehicle60L from "@/assets/laztek-v2/projects/60l/60l-vehicle.webp";
import scan60L from "@/assets/laztek-v2/projects/60l/60l-full-scan.webp";
import reconstructed60L from "@/assets/laztek-v2/projects/60l/60l-reconstructed-geometry.webp";
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
            <figure className="lt-technical-image lt-technical-video">
              <span className="lt-media-label">3D SCAN / LIVE CAPTURE</span>
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="/videos/3d-scan-clio-197-poster.webp"
                aria-label="Praktični zajem avtomobilske mrežice z ročnim 3D skenerjem"
              >
                <source
                  src="/videos/3d-scan-clio-197.mp4"
                  type="video/mp4"
                />
                Vaš brskalnik ne podpira predvajanja videa.
              </video>
              <figcaption>
                Zajem fizične geometrije / referenčni markerji / ročno 3D
                skeniranje
              </figcaption>
            </figure>
          }
          action="Predstavite kos"
        />
        <section className="lt-container lt-section">
          <SectionHeading
            eyebrow="01 / Realni projekt"
            title="Od fizičnega kosa do uporabnega CAD modela."
            text="Na konkretnem delu najprej zajamemo obstoječo geometrijo, nato pa iz skena izdelamo čist in konstrukcijsko uporaben model za spremembe ali ponovno izdelavo."
          />
          <ImageSequence
            ariaLabel="Reverse engineering projekta ohišja ATX od fizičnega kosa do CAD rekonstrukcije"
            items={[
              {
                image: atxOriginalPart,
                alt: "Originalno rdeče plastično ohišje ATX pred 3D skeniranjem",
                label: "01 / FIZIČNI KOS",
                title: "Obstoječa komponenta",
                text: "Originalni del določa obliko, vgradni prostor in vse podrobnosti, ki jih mora digitalni model ohraniti.",
              },
              {
                image: atxScanModel,
                alt: "3D sken originalnega plastičnega ohišja ATX",
                label: "02 / 3D SCAN",
                title: "Zajeta površinska geometrija",
                text: "Sken prenese kompleksne krivine, prehode in odprtine v merljivo digitalno referenco.",
              },
              {
                image: atxEngineeredModel,
                alt: "Rekonstruiran CAD model plastičnega ohišja ATX",
                label: "03 / CAD REKONSTRUKCIJA",
                title: "Čist model za nadaljnjo uporabo",
                text: "Rekonstruirana geometrija je pripravljena za konstrukcijske spremembe, preverjanje in ponovno izdelavo.",
              },
            ]}
          />
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
        <section className="lt-band">
          <div className="lt-container lt-section">
            <SectionHeading
              eyebrow="05 / Zajem zahtevne površine"
              title="Blatnik: od fizičnega kosa do urejene geometrije."
              text="Referenčni markerji povežejo posamezne zajeme kompleksne površine. Digitalni rezultat se nato uporabi kot osnova za rekonstrukcijo in nadaljnji razvoj."
            />
            <ImageSequence
              ariaLabel="Proces 3D skeniranja in rekonstrukcije blatnika"
              items={[
                {
                  image: fenderReference,
                  alt: "Plastični blatnik z referenčnimi markerji pred 3D skeniranjem",
                  label: "01 / FIZIČNI KOS",
                  title: "Priprava površine",
                  text: "Markerji omogočajo stabilno povezovanje zajemov na gladki in odsevni geometriji.",
                },
                {
                  image: fenderScan,
                  alt: "Digitalizirana površina blatnika po 3D skeniranju",
                  label: "02 / 3D SCAN",
                  title: "Zajeta geometrija",
                  text: "Sken ohrani kompleksne prehode in obliko originalnega kosa kot merljivo referenco.",
                },
                {
                  image: fenderCadModel,
                  alt: "Urejen CAD model blatnika po rekonstrukciji skenirane geometrije",
                  label: "03 / CAD",
                  title: "Model za nadaljnje delo",
                  text: "Čista geometrija je pripravljena za spremembe, preverjanje ali novo izdelavo.",
                },
              ]}
            />
          </div>
        </section>
        <section className="lt-container lt-section">
          <SectionHeading
            eyebrow="06 / Celovit zajem vozila"
            title="Fiat 60L: od realnega avtomobila do rekonstruirane geometrije."
            text="Pri večjem objektu skeniranje poteka po povezanih območjih. Celovit scan ohrani proporce in površine, rekonstruiran model pa pripravi geometrijo za nadaljnji razvoj komponent."
          />
          <ImageSequence
            ariaLabel="Digitalizacija in rekonstrukcija sprednjega dela avtomobila Fiat 60L"
            items={[
              {
                image: vehicle60L,
                alt: "Fiat 60L kot fizično izhodišče za 3D skeniranje karoserije",
                label: "01 / FIZIČNO IZHODIŠČE",
                title: "Realni objekt",
                text: "Obstoječe vozilo določi razmerja, ključne prehode in območja, ki jih mora zajem povezati v celoto.",
              },
              {
                image: scan60L,
                alt: "Celovit 3D scan sprednjega dela avtomobila Fiat 60L",
                label: "02 / CELOVIT 3D SCAN",
                title: "Povezana površinska referenca",
                text: "Posamezni zajemi so združeni v pregledno digitalno geometrijo sprednjega dela vozila.",
              },
              {
                image: reconstructed60L,
                alt: "Rekonstruirana digitalna geometrija sprednjega dela avtomobila Fiat 60L",
                label: "03 / REKONSTRUKCIJA",
                title: "Osnova za nadaljnji razvoj",
                text: "Urejena geometrija omogoča načrtovanje novih delov, preverjanje ujemanja in konstrukcijske spremembe.",
              },
            ]}
          />
        </section>
        <section className="lt-container lt-section lt-split">
          <SectionHeading
            eyebrow="07 / Predaja"
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
