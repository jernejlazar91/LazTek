import JsonLd from "@/components/engineering/JsonLd";
import SiteHeader from "@/components/SiteHeader";
import atxCad from "@/assets/laztek/atx-cad.webp";
import atxOriginal from "@/assets/laztek/atx-original.webp";
import atxReconstruction from "@/assets/laztek/atx-reconstruction.webp";
import { pageMetadata } from "@/lib/seo";
import { client } from "@/sanity/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = pageMetadata(
  "Obnova plastičnih kosov",
  "Obnova polomljenih, poškodovanih in nedobavljivih plastičnih kosov z 3D skeniranjem, reverse engineeringom, CAD rekonstrukcijo in 3D tiskom.",
  "/storitve/obnova-plasticnih-kosov",
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

const suitableParts = [
  "polomljeni nosilci, pokrovi, ohišja in zaščite",
  "plastični deli, ki jih ni več možno kupiti kot rezervni del",
  "kosi, pri katerih originalna dokumentacija ne obstaja",
  "obrabljeni ali počeni deli, ki jih je smiselno konstrukcijsko izboljšati",
  "adapterji, vodila, sponke, distančniki in posebni tehnični kosi",
  "majhne serije nadomestnih delov za stroje, naprave ali opremo",
];

const limits = [
  "del mora biti tehnično smiseln za obnovo ali ponovno izdelavo",
  "pri zelo obremenjenih varnostnih delih je potreben dodatni tehnični pregled",
  "material se izbere glede na temperaturo, udarce, kemikalije in namen uporabe",
];

const process = [
  {
    title: "1. Pregled kosa",
    text: "Pošljete slike, mere ali fizični kos. Najprej ocenimo, ali je boljša obnova, kopija ali izboljšan nadomestni del.",
  },
  {
    title: "2. Skeniranje in merjenje",
    text: "Kos se po potrebi 3D skenira in dodatno izmeri na kritičnih mestih, kjer morajo biti ujemanja natančna.",
  },
  {
    title: "3. CAD rekonstrukcija",
    text: "Poškodovane dele rekonstruiramo, manjkajočo geometrijo dopolnimo in po potrebi ojačamo šibke točke.",
  },
  {
    title: "4. Izdelava novega kosa",
    text: "Novi kos se izdela iz primernega tehničnega materiala in se po potrebi testira ali dodatno prilagodi.",
  },
];

const materialExamples = [
  "PETG / PCTG za robustne splošne tehnične dele",
  "ASA za zunanje dele in UV obstojnost",
  "PA6 CF/GF za bolj toga in temperaturno odporna ojačana ohišja ali nosilce",
  "TPU/TPE za fleksibilne vložke, blažilce in gumijaste funkcionalne elemente",
];

import {
  CapabilityGrid,
  CTASection,
  EngineeringVisual,
  ImageSequence,
  PageHero,
  ProcessFlow,
  SectionHeading,
} from "@/components/engineering/DesignSystem";

export default async function PlasticPartRepairPage() {
  const data = await getPageData();
  const site = data?.siteSettings;
  return (
    <>
      <SiteHeader brandName={site?.brandName} basePath="/" />
      <main
        id="vsebina"
        tabIndex={-1}
        className="lt-theme lt-obnova-plasticnih-kosov"
      >
        <PageHero
          eyebrow="Rekonstrukcija / Nadomestni deli"
          breadcrumb="Obnova plastičnih kosov"
          title={
            <>
              Ko originala ni več.
              <br />
              <em>Nastane nov del.</em>
            </>
          }
          description="Poškodovan ali nedobavljiv plastični kos je lahko izhodišče za novo izdelavo. Rekonstruiramo geometrijo, preverimo šibke točke in izberemo primeren material."
          visual={<EngineeringVisual mode="repair" />}
          action="Opišite poškodbo ali kos"
        />
        <section className="lt-container lt-section lt-split">
          <SectionHeading
            eyebrow="01 / Izhodišče"
            title="Ohranimo funkcijo. Izboljšamo kritična mesta."
            text="Naležne površine in montaža ostanejo izhodišče. Po potrebi prilagodimo rebra, radije, debeline sten ali material."
          />
          <CapabilityGrid items={suitableParts} />
        </section>
        <section className="lt-band">
          <div className="lt-container lt-section">
            <SectionHeading
              eyebrow="02 / Rekonstrukcija"
              title="Od poškodbe do novega kosa."
            />
            <ProcessFlow steps={process} />
          </div>
        </section>
        <section className="lt-container lt-section">
          <SectionHeading
            eyebrow="03 / Primer rekonstrukcije"
            title="Tomos ATX: original kot osnova za novo geometrijo."
            text="Tudi obrabljen ali deformiran kos lahko zagotovi ključne reference. Scan se očisti, geometrija se simetrizira in pripravi kot konstrukcijsko uporaben model."
          />
          <ImageSequence
            ariaLabel="Rekonstrukcija sprednje maske Tomos ATX"
            items={[
              {
                image: atxOriginal,
                alt: "Obstoječa rdeča sprednja maska Tomos ATX pred rekonstrukcijo",
                label: "01 / ORIGINAL",
                title: "Fizično izhodišče",
                text: "Obstoječ kos poda obliko, priključne mere in informacije o poškodbah oziroma deformacijah.",
              },
              {
                image: atxReconstruction,
                alt: "Digitalno rekonstruirana zunanja geometrija maske Tomos ATX",
                label: "02 / REKONSTRUKCIJA",
                title: "Obnovljene površine",
                text: "Zajeta oblika se geometrijsko uredi ter pripravi za nadaljnje konstruiranje.",
              },
              {
                image: atxCad,
                alt: "Končni CAD model sprednje maske Tomos ATX",
                label: "03 / CAD MODEL",
                title: "Model za naslednji korak",
                text: "Čist CAD model je osnova za prototip, orodje ali izdelavo novega dela.",
              },
            ]}
          />
        </section>
        <section className="lt-container lt-section lt-split">
          <div>
            <SectionHeading
              eyebrow="04 / Material in izvedljivost"
              title="Nadomestni del mora ustrezati uporabi."
            />
            <Link href="/materiali" className="lt-text-link">
              Pregled tehničnih materialov <ArrowRight size={16} />
            </Link>
          </div>
          <div>
            <CapabilityGrid items={materialExamples} />
            <div className="lt-note">
              <h3>Pred izdelavo preverimo</h3>
              <ul>
                {limits.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <CTASection
          title="Začnimo z obstoječim kosom."
          text="V povpraševanju opišite poškodbo, uporabo, obremenitve in osnovne mere. Fotografije lahko pošljete tudi po e-pošti."
        />

        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Obnova plastičnih kosov",
            url: "https://laztek.si/storitve/obnova-plasticnih-kosov",
            provider: { "@id": "https://laztek.si/#organization" },
          }}
        />
      </main>
    </>
  );
}
