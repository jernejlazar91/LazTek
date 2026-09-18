import JsonLd from "@/components/engineering/JsonLd";
import SiteHeader from "@/components/SiteHeader";
import generativeDesign from "@/assets/laztek/generative-design.webp";
import linexCadAssembly from "@/assets/laztek/linex-cad-assembly.webp";
import machineSubassembly from "@/assets/laztek/machine-subassembly.webp";
import topologyOptimization from "@/assets/laztek/topology-optimization.webp";
import { pageMetadata } from "@/lib/seo";
import { client } from "@/sanity/client";
import {
  Boxes,
  DraftingCompass,
  Layers3,
  Settings2,
  Sparkles,
  Wrench,
} from "lucide-react";

export const metadata = pageMetadata(
  "Konstruiranje in 3D modeliranje",
  "CAD konstruiranje, 3D modeliranje, generative design, topology optimization, tehnični razvoj, optimizacija geometrije, priprava modelov za 3D tisk in izdelavo funkcionalnih tehničnih kosov.",
  "/storitve/konstruiranje-3d-modeliranje",
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

const projectTypes = [
  {
    icon: DraftingCompass,
    title: "Celoten sestav stroja",
    text: "Pri zahtevnejših projektih lahko razvijemo celoten 3D sestav: konstrukcijo, nosilce, osi, vpetja, montažne površine in prostor za komponente.",
    image: linexCadAssembly,
    imageAlt: "Celoten 3D sestav industrijskega stroja",
  },
  {
    icon: Wrench,
    title: "Optimizacija teže in oblike",
    text: "Pri nosilcih in adapterjih lahko obliko prilagodimo obremenitvam: odstranimo nepotreben material, ohranimo funkcijo in dobimo lažji, bolj smiseln kos.",
    image: topologyOptimization,
    imageAlt: "Optimizacija teže in oblike tehničnega nosilca",
  },
  {
    icon: Boxes,
    title: "Podsklopi strojev in priprave",
    text: "Modeliramo tudi posamezne podsklope strojev, nosilce, vpetja, šablone, adapterje in priprave, ki morajo biti uporabne za montažo ali proizvodnjo.",
    image: machineSubassembly,
    imageAlt: "3D model podsklopa stroja z vodili in nosilci",
  },
];

const advancedMethods = [
  {
    icon: Sparkles,
    title: "Generative design",
    text: "Namesto ene ročno narisane oblike se določijo cilji in omejitve: kje mora biti kos pritrjen, koliko prostora ima, kje so obremenitve, koliko mase želimo prihraniti in s katero tehnologijo bo izdelan. Na tej osnovi se lahko razvije več možnih konstrukcijskih smeri, ki jih potem tehnično očistimo in pripravimo za realno izdelavo.",
  },
  {
    icon: Layers3,
    title: "Topology optimization",
    text: "Topološka optimizacija je uporabna, ko želimo ohraniti funkcijo in togost, hkrati pa zmanjšati maso ali porabo materiala. Rezultat ni slepo sprejet kot končni model, ampak služi kot osnova za bolj smiselno konstrukcijo z zaokrožitvami, stenami, rebri in detajli, ki jih je mogoče dejansko natisniti ali izdelati.",
  },
  {
    icon: Settings2,
    title: "Praktična konstrukcijska presoja",
    text: "Pri obeh pristopih je pomembno, da rezultat ni samo zanimiva organska oblika. Model mora biti uporaben, merljiv, ponovljiv, primeren za material in dovolj enostaven za montažo, servis ali nadaljnjo proizvodnjo.",
  },
];

const deliverables = [
  "STEP model za nadaljnjo uporabo ali proizvodnjo",
  "STL/3MF model pripravljen za 3D tisk",
  "popravljena ali optimizirana geometrija obstoječega kosa",
  "osnovna tehnična risba ali skica z merami, kjer je to smiselno",
  "predlog materiala in izvedbe glede na uporabo",
  "model pripravljen za prototip, test ali manjšo serijo",
];

const process = [
  {
    title: "Razumevanje problema",
    text: "Najprej določimo, kaj mora kos delati: kje je vgrajen, kaj drži, kaj se premika, kakšne so obremenitve in omejitve prostora.",
  },
  {
    title: "Zasnova in modeliranje",
    text: "Pripravi se začetni 3D model, popravi obstoječa datoteka ali se iz skice oziroma fizičnega kosa razvije nova geometrija.",
  },
  {
    title: "Preverjanje izvedbe",
    text: "Pregledajo se kritični detajli: debeline sten, pritrditve, tolerance, montaža, smer izdelave, material in morebitna potreba po testnem kosu.",
  },
  {
    title: "Datoteka ali prototip",
    text: "Model se preda kot datoteka ali se uporabi za izdelavo prototipa. Pri zahtevnih delih se po prvem testu naredi izboljšana verzija.",
  },
];

import {
  CapabilityGrid,
  CTASection,
  ImageSequence,
  PageHero,
  ProcessFlow,
  SectionHeading,
  TechnicalImage,
} from "@/components/engineering/DesignSystem";

export default async function CADModelingPage() {
  const data = await getPageData();
  const site = data?.siteSettings;
  return (
    <>
      <SiteHeader brandName={site?.brandName} basePath="/" />
      <main
        id="vsebina"
        tabIndex={-1}
        className="lt-theme lt-konstruiranje-3d-modeliranje"
      >
        <PageHero
          eyebrow="CAD / Razvoj / DfAM"
          breadcrumb="Konstruiranje in 3D modeliranje"
          title={
            <>
              Razvoj, pripravljen
              <br />
              <em>za izvedbo.</em>
            </>
          }
          description="Od posamezne komponente do podsklopa ali sestava. CAD razvoj povežemo z materialom, obremenitvami, montažo in izbrano tehnologijo izdelave."
          visual={
            <TechnicalImage
              image={linexCadAssembly}
              alt="Celoten CAD sestav razvojne platforme LINEX"
              label="CAD / MACHINE DEVELOPMENT"
              caption="Konstrukcija sestava, vodil, nosilcev in delovnega območja"
              contain
              priority
            />
          }
          action="Predstavite razvojni izziv"
          secondary={{ href: "#razvoj", label: "Področja razvoja" }}
        />
        <section id="razvoj" className="lt-container lt-section">
          <SectionHeading
            eyebrow="01 / Področja razvoja"
            title="Od sestava stroja do optimizirane komponente."
          />
          {projectTypes.map((item, i) => (
            <article className="lt-feature-row" key={item.title}>
              <TechnicalImage
                image={item.image}
                alt={item.imageAlt}
                label={`0${i + 1} / CAD`}
                contain
              />
              <div>
                <span className="lt-index">0{i + 1} / CAD DEVELOPMENT</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </section>
        <section className="lt-band">
          <div className="lt-container lt-section lt-split">
            <SectionHeading
              eyebrow="02 / Optimizacija"
              title="Manj materiala. Smiselno ohranjena funkcija."
              text="Generativno načrtovanje in topološka optimizacija sta orodji za razvoj. Rezultat preverimo z vidika izdelave, montaže in uporabe."
            />
            <div className="lt-editorial-rows">
              {advancedMethods.map((item) => (
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
            eyebrow="03 / Napredna optimizacija"
            title="Organska oblika postane uporabna šele po inženirski presoji."
            text="Generativni rezultat in topološka optimizacija sta razvojni izhodišči. Končno geometrijo prilagodimo obremenitvam, materialu, izdelavi in montaži."
          />
          <ImageSequence
            ariaLabel="Primer generativnega načrtovanja in topološke optimizacije"
            items={[
              {
                image: generativeDesign,
                alt: "Generativno oblikovan tehnični nosilec",
                label: "GENERATIVE DESIGN",
                title: "Raziskovanje konstrukcijske smeri",
                text: "Algoritemsko iskanje materialno učinkovite oblike ob definiranih vpetjih in obremenitvah.",
              },
              {
                image: topologyOptimization,
                alt: "Topološko optimiziran nosilec z organsko geometrijo",
                label: "TOPOLOGY",
                title: "Optimizirana razporeditev materiala",
                text: "Zmanjšanje mase ob ohranjanju funkcionalnih območij in poti prenosa sil.",
              },
              {
                image: machineSubassembly,
                alt: "Konstrukcijsko izdelan podsklop industrijskega stroja",
                label: "ENGINEERED RESULT",
                title: "Izvedljiva strojna rešitev",
                text: "Končni model upošteva standardne komponente, sestavljivost, servis in realno izdelavo.",
              },
            ]}
          />
        </section>
        <section className="lt-container lt-section">
          <SectionHeading
            eyebrow="04 / Razvojni proces"
            title="Zahteva → konstrukcija → preverjanje → izdelava."
          />
          <ProcessFlow steps={process} />
        </section>
        <section className="lt-container lt-section lt-split">
          <SectionHeading
            eyebrow="05 / Predaja"
            title="Dokumentacija za nadaljnjo uporabo."
            text="Obseg modelov, risb in prototipov prilagodimo fazi vašega projekta."
          />
          <CapabilityGrid items={deliverables} />
        </section>
        <CTASection
          title="Imate zahtevo, skico ali obstoječ model?"
          text="Opišite funkcijo, prostor vgradnje in pričakovane obremenitve. Skupaj določimo razvojni obseg."
        />

        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Konstruiranje in 3D modeliranje",
            url: "https://laztek.si/storitve/konstruiranje-3d-modeliranje",
            provider: { "@id": "https://laztek.si/#organization" },
          }}
        />
      </main>
    </>
  );
}
