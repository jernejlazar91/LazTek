import JsonLd from "@/components/engineering/JsonLd";
import SiteHeader from "@/components/SiteHeader";
import functionalPrototype from "@/assets/laztek/functional-prototype.webp";
import prototypeCadScreen from "@/assets/laztek/prototype-cad-screen.webp";
import { pageMetadata } from "@/lib/seo";
import { client } from "@/sanity/client";

export const metadata = pageMetadata(
  "Prototipizacija in razvoj izdelkov",
  "Razvoj funkcionalnih prototipov, iteracije, testni vzorci in priprava tehničnih kosov za manjšo serijo.",
  "/storitve/prototipizacija",
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

const capabilities = [
  "razvoj ideje v prvi fizični prototip",
  "funkcionalni testni vzorci za preverjanje vgradnje in uporabe",
  "iteracije po testiranju, meritvah ali povratnih informacijah",
  "ohišja, nosilci, adapterji, priprave in mehanski sklopi",
  "kombinacija CAD razvoja, 3D tiska in tehničnega svetovanja",
  "priprava kosa za manjšo serijo ali nadaljnjo proizvodnjo",
];

const blocks = [
  {
    title: "Hiter prvi prototip",
    text: "Idejo spravimo v fizično obliko, da se lahko preveri velikost, montaža, občutek in osnovna funkcija.",
  },
  {
    title: "Iteracije in izboljšave",
    text: "Po testu se kos popravi. Spremenijo se debeline, luknje, ojačitve, tolerančna mesta ali material.",
  },
  {
    title: "Priprava na uporabo",
    text: "Ko je prototip potrjen, se model pripravi za bolj stabilno izdelavo, manjšo serijo ali drugo tehnologijo.",
  },
];

const process = [
  "Najprej določimo, kaj mora prototip dokazati ali preveriti.",
  "Pripravimo model in izberemo material, ki je smiseln za testiranje.",
  "Izdelamo prototip, ga pregledamo in zabeležimo potrebne spremembe.",
  "Naredimo naslednjo iteracijo ali pripravimo model za končno izdelavo.",
];

import {
  CapabilityGrid,
  CTASection,
  PageHero,
  ProcessFlow,
  SectionHeading,
  TechnicalImage,
} from "@/components/engineering/DesignSystem";

export default async function PrototypingPage() {
  const data = await getPageData();
  const site = data?.siteSettings;
  return (
    <>
      <SiteHeader brandName={site?.brandName} basePath="/" />
      <main id="vsebina" tabIndex={-1} className="lt-theme lt-prototipizacija">
        <PageHero
          eyebrow="Razvoj izdelkov / Funkcionalni prototipi"
          breadcrumb="Prototipizacija"
          title={
            <>
              Od ideje
              <br />
              <em>do prototipa.</em>
            </>
          }
          description="Fizični prototip pokaže, kako se kos sestavi, prilega in obnaša pri uporabi. S CAD razvojem in izdelavo podpremo vsako smiselno iteracijo."
          visual={
            <TechnicalImage
              image={functionalPrototype}
              alt="Izdelava funkcionalnega prototipa šablone na industrijskem 3D tiskalniku"
              label="PROTOTYPE / VALIDATION"
              caption="Fizični prototip za preverjanje geometrije in izdelave"
              priority
            />
          }
          secondary={{ href: "#iteracije", label: "Razvojni cikel" }}
        />
        <section id="iteracije" className="lt-container lt-section lt-split">
          <div className="lt-media-stack">
            <TechnicalImage
              image={prototypeCadScreen}
              alt="CAD razvoj radialne prototipne šablone"
              label="01 / CAD DEVELOPMENT"
              caption="Razvoj testne geometrije in priprava modela"
            />
            <TechnicalImage
              image={functionalPrototype}
              alt="Fizična izdelava radialne prototipne šablone"
              label="02 / PHYSICAL PROTOTYPE"
              caption="Izdelava prvega kosa za preverjanje zasnove"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="01 / Iteracije"
              title="Vsak prototip odgovori na konkretno vprašanje."
            />
            <div className="lt-editorial-rows">
              {blocks.map((item, i) => (
                <article key={item.title}>
                  <span className="lt-index">0{i + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="lt-band">
          <div className="lt-container lt-section">
            <SectionHeading
              eyebrow="02 / Pot do potrditve"
              title="Najprej cilj testa. Nato model in izdelava."
            />
            <ProcessFlow steps={process} />
          </div>
        </section>
        <section className="lt-container lt-section lt-split">
          <SectionHeading
            eyebrow="03 / Razvojna podpora"
            title="Prototip za vaš naslednji korak."
          />
          <CapabilityGrid items={capabilities} />
        </section>
        <CTASection
          title="Kaj mora dokazati vaš prototip?"
          text="Montažo, obliko, delovanje ali material? Opišite cilj, da izberemo smiselno izvedbo prvega testa."
        />

        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Prototipizacija in razvoj izdelkov",
            url: "https://laztek.si/storitve/prototipizacija",
            provider: { "@id": "https://laztek.si/#organization" },
          }}
        />
      </main>
    </>
  );
}
