import {EditableTitle} from '@/components/engineering/CmsContent';
import {getPageEditor, editableMetadata} from '@/sanity/pageEditor';
import {CmsPageHero, CmsServiceBody} from '@/components/engineering/CmsContent';
import {getEditablePage, serviceMetadata} from '@/sanity/content';
import JsonLd from "@/components/engineering/JsonLd";
import SiteHeader from "@/components/CmsSiteHeader";
import physicalPrototypeIteration from "@/assets/laztek-v2/services/prototyping/physical-prototype-iteration.webp";
import prototypeIterationSet from "@/assets/laztek-v2/services/prototyping/prototype-iteration-set.webp";
import prototypeFinalSet from "@/assets/laztek-v2/services/prototyping/prototype-final-set.webp";
import { client } from "@/sanity/client";

export async function generateMetadata() {
  return editableMetadata("/storitve/prototipizacija", await serviceMetadata(
    "Prototipizacija in razvoj izdelkov",
    "Razvoj funkcionalnih prototipov, iteracije, testni vzorci in priprava tehničnih kosov za manjšo serijo.",
    "/storitve/prototipizacija",
  ));
}

async function getPageData() {
  return client.fetch(`{
    "siteSettings": *[_type == "siteSettings"][0]{
      brandName,
      email,
      phone,
      location,
      logo
    }
  }`, {}, {next: {revalidate: 60}});
}

const defaultCapabilities = [
  "razvoj ideje v prvi fizični prototip",
  "funkcionalni testni vzorci za preverjanje vgradnje in uporabe",
  "iteracije po testiranju, meritvah ali povratnih informacijah",
  "ohišja, nosilci, adapterji, priprave in mehanski sklopi",
  "kombinacija CAD razvoja, 3D tiska in tehničnega svetovanja",
  "priprava kosa za manjšo serijo ali nadaljnjo proizvodnjo",
];

const defaultBlocks = [
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

const defaultProcess = [
  "Najprej določimo, kaj mora prototip dokazati ali preveriti.",
  "Pripravimo model in izberemo material, ki je smiseln za testiranje.",
  "Izdelamo prototip, ga pregledamo in zabeležimo potrebne spremembe.",
  "Naredimo naslednjo iteracijo ali pripravimo model za končno izdelavo.",
];

import {
  CapabilityGrid,
  CTASection,
  ProcessFlow,
  SectionHeading,
  TechnicalImage,
} from "@/components/engineering/DesignSystem";

export default async function PrototypingPage() {
  const editor = await getPageEditor("/storitve/prototipizacija");
  const capabilities = editor.data("s01.f001", defaultCapabilities);
  const blocks = editor.data("s02.f002", defaultBlocks);
  const process = editor.data("s03.f003", defaultProcess);

  const service = await getEditablePage('servicePage', 'prototipizacija');
  const data = await getPageData();
  const site = data?.siteSettings;
  return (
    <>
      <SiteHeader brandName={site?.brandName} basePath="/" />
      <main id="vsebina" tabIndex={-1} className="lt-theme lt-prototipizacija">
        <CmsPageHero page={editor.exists ? null : service}
          eyebrow={editor.text("s04.f004", "Razvoj izdelkov / Funkcionalni prototipi")}
          breadcrumb="Prototipizacija"
          title={
            <EditableTitle first={editor.text("s04.f005", "Od ideje")} second={editor.text("s04.f006", "do prototipa.")} />
          }
          description={editor.text("s04.f007", "Fizični prototip pokaže, kako se kos sestavi, prilega in obnaša pri uporabi. S CAD razvojem in izdelavo podpremo vsako smiselno iteracijo.")}
          visual={
            <TechnicalImage
              image={editor.image("s04.f008", prototypeIterationSet)}
              alt={editor.text("s04.f009", "Tri razvojne iteracije funkcionalne zračne rešetke na platformi LINEX")}
              label={editor.text("s04.f010", "PROTOTYPE / ITERATION")}
              caption={editor.text("s04.f011", "Zaporedne fizične izvedbe iste komponente")}
              priority
            />
          }
          secondary={editor.data("s04.f012", { href: "#iteracije", label: "Razvojni cikel" })}
        />
        <CmsServiceBody page={editor.exists ? null : service}>
        <section id="iteracije" className="lt-container lt-section lt-split">
          <div className="lt-media-stack">
            <TechnicalImage
              image={editor.image("s02.f013", physicalPrototypeIteration)}
              alt={editor.text("s02.f014", "Prva fizična iteracija zračne rešetke na delovni površini 3D tiskalnika")}
              label={editor.text("s02.f015", "01 / PHYSICAL TEST")}
              caption={editor.text("s02.f016", "Prvi kos za preverjanje oblike in izdelovalnosti")}
            />
            <TechnicalImage
              image={editor.image("s02.f017", prototypeIterationSet)}
              alt={editor.text("s02.f018", "Tri razvojne iteracije iste funkcionalne zračne rešetke")}
              label={editor.text("s02.f019", "02 / ITERATIONS")}
              caption={editor.text("s02.f020", "Primerjava geometrije med zaporednimi izvedbami")}
            />
            <TechnicalImage
              image={editor.image("s02.f021", prototypeFinalSet)}
              alt={editor.text("s02.f022", "Tri izdelane zračne rešetke po zaključenih razvojnih iteracijah")}
              label={editor.text("s02.f023", "03 / VALIDATED SET")}
              caption={editor.text("s02.f024", "Izbrane izvedbe po fizičnem preverjanju")}
            />
          </div>
          <div>
            <SectionHeading
              eyebrow={editor.text("s02.f025", "01 / Iteracije")}
              title={editor.text("s02.f026", "Vsak prototip odgovori na konkretno vprašanje.")}
            />
            <div className="lt-editorial-rows">
              {blocks.map((item, i) => (
                <article key={item.title}>
                  <span className="lt-index">{editor.text("s02.f027", "0")}{i + 1}</span>
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
              eyebrow={editor.text("s03.f028", "02 / Pot do potrditve")}
              title={editor.text("s03.f029", "Najprej cilj testa. Nato model in izdelava.")}
            />
            <ProcessFlow steps={process} />
          </div>
        </section>
        <section className="lt-container lt-section lt-split">
          <SectionHeading
            eyebrow={editor.text("s01.f030", "03 / Razvojna podpora")}
            title={editor.text("s01.f031", "Prototip za vaš naslednji korak.")}
          />
          <CapabilityGrid items={capabilities} />
        </section>
        </CmsServiceBody>
        <CTASection
          title={editor.text("s05.f032", service?.ctaTitle?.trim() || "Kaj mora dokazati vaš prototip?")}
          text={editor.text("s05.f033", service?.ctaText?.trim() || "Montažo, obliko, delovanje ali material? Opišite cilj, da izberemo smiselno izvedbo prvega testa.")}
        action={editor.text("s05.ctaaction", "Predstavite projekt")} />

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
