import SiteHeader from "@/components/SiteHeader";
import { pageMetadata } from "@/lib/seo";
import { client } from "@/sanity/client";

export const metadata = pageMetadata(
  "Materiali za industrijski 3D tisk | Lastnosti in uporaba",
  "Primerjava materialov za industrijski 3D tisk: PLA, PETG, PETG-CF, PCTG, ABS, ASA, PC, TPU, PA6, PA6-CF/GF, PPA-CF/GF in PPS-CF/GF. Lastnosti, uporaba, prednosti in omejitve.",
  "/materiali",
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
    "materialsSection": *[_type == "materialsSection"][0]{
      title,
      text,
      tags,
      process
    }
  }`);
}

const processControls = [
  {
    title: "Sušenje materiala pred tiskom",
    text: "Pri PA, PPA, PC, TPU in drugih higroskopnih materialih je sušenje kritično. Vlaga lahko povzroči mehurčke, slabšo površino in slabše mehanske lastnosti.",
  },
  {
    title: "Kontrola vlage med procesom",
    text: "Material ni dovolj samo enkrat posušiti. Pri daljših tiskih je pomembno, da ostane suh tudi med izdelavo kosa.",
  },
  {
    title: "Procesni parametri glede na komponento",
    text: "Temperatura, hlajenje, hitrost, širina sledi, orientacija in polnilo se prilagodijo geometriji in funkciji konkretnega kosa.",
  },
  {
    title: "Primerjava modela in rezultata",
    text: "Pri zahtevnejših delih se lahko preverja odstopanje med CAD modelom, tiskanim kosom in skenirano geometrijo.",
  },
];

const comparisonRows = [
  {
    useCase: "Vizualni ali montažni prototip",
    suggested: "PLA",
    note: "Ko so pomembni hitrost, natančna oblika in cena, kos pa ne bo izpostavljen vročini ali močnim udarcem.",
  },
  {
    useCase: "Večji funkcionalni prototip ali ohišje",
    suggested: "PETG, PCTG ali ABS",
    note: "PETG za zanesljiv proces, PCTG za več žilavosti, ABS za višjo temperaturo in naknadno obdelavo.",
  },
  {
    useCase: "Toga proizvodna priprava ali nosilec",
    suggested: "PETG-CF, PA6-CF ali PA6-GF",
    note: "PETG-CF za zmerne pogoje, PA6-CF za največjo togost, PA6-GF za robustnejšo strukturno uporabo.",
  },
  {
    useCase: "Udarna ali obrabna obremenitev",
    suggested: "PCTG, PC, PA6 ali TPU",
    note: "Izbira je odvisna od zahtevane prožnosti, temperature, trenja in načina pritrditve.",
  },
  {
    useCase: "Zunanja uporaba",
    suggested: "ASA",
    note: "Prednostna izbira za UV, sonce in vreme; končno formulacijo preverimo glede na temperaturo ter kemijsko okolje.",
  },
  {
    useCase: "Fleksibilen ali protivibracijski del",
    suggested: "TPU / TPE",
    note: "Trdota, debelina sten in polnilo določajo prožnost, blaženje ter obnašanje pri trajnem stisku.",
  },
  {
    useCase: "Visoka temperatura in toga konstrukcija",
    suggested: "PPA-CF, PPA-GF ali PC",
    note: "PPA za stabilnost in togost pri temperaturi, PC kadar je poleg toplote ključna tudi udarna žilavost.",
  },
  {
    useCase: "Toplotno in kemijsko zelo zahtevno okolje",
    suggested: "PPS-CF ali PPS-GF",
    note: "Specialna izbira za upravičene aplikacije; preverijo se medij, temperatura, obremenitev in tehnični list konkretnega razreda.",
  },
];

const reinforcementNotes = [
  {
    code: "Brez vlaken",
    title: "Več žilavosti in prilagodljivosti",
    text: "Osnovni polimer praviloma ohrani več raztezka in udarne rezerve. Primeren je za zaskočne elemente, gibljive prehode in dele, kjer največja togost ni glavni cilj.",
  },
  {
    code: "CF / Carbon fiber",
    title: "Največ togosti in dimenzijske stabilnosti",
    text: "Karbonska vlakna zmanjšajo krčenje in močno povečajo togost, vendar lahko zmanjšajo duktilnost. Kos ostaja anizotropen, zato sta orientacija slojev in geometrija ključni.",
  },
  {
    code: "GF / Glass fiber",
    title: "Robustna strukturna izvedba",
    text: "Steklena vlakna povečajo togost, nosilnost in temperaturno stabilnost. Pogosto so smiselna za robustna ohišja in nosilne dele, površina pa je lahko bolj groba.",
  },
];

import {
  CTASection,
  JumpNav,
  PageHero,
  ProcessFlow,
  SectionHeading,
} from "@/components/engineering/DesignSystem";
import MaterialLibrary from "@/components/engineering/MaterialLibrary";
import { primaryMaterials } from "@/data/materials";

export default async function MaterialsPage() {
  const data = await getPageData();
  const site = data?.siteSettings;
  const materials = data?.materialsSection;
  return (
    <>
      <SiteHeader brandName={site?.brandName} basePath="/" />
      <main id="vsebina" tabIndex={-1} className="lt-theme">
        <PageHero
          eyebrow="Tehnična knjižnica / Termoplasti + kompoziti"
          breadcrumb="Materiali"
          title={
            materials?.title || (
              <>
                Material.
                <br />
                <em>Izbran za uporabo.</em>
              </>
            )
          }
          description={
            materials?.text ||
            "Primerjajte tehnične polimere glede na togost, žilavost, temperaturo, vlago, kemijsko okolje in namen komponente. Prava izbira vključuje material, geometrijo, orientacijo in proces."
          }
          variant="editorial"
          action={false}
        />
        <JumpNav
          items={[
            { id: "knjiznica", label: "Materialna knjižnica" },
            { id: "ojacitve", label: "Brez vlaken / CF / GF" },
            { id: "izbira", label: "Izbira po uporabi" },
            { id: "proces", label: "Procesni nadzor" },
          ]}
        />
        <section id="knjiznica" className="lt-container lt-section">
          <SectionHeading
            eyebrow="01 / Raziščite in primerjajte"
            title="Kaj posamezni material dejansko omogoča."
          />
          <MaterialLibrary materials={primaryMaterials} />
          <p className="lt-material-disclaimer">
            Prikazane ocene so primerjalno tehnično izhodišče. Natančne
            mehanske, temperaturne in kemijske vrednosti so odvisne od
            proizvajalca, deleža vlaken, vlage, orientacije tiska in procesnih
            parametrov. Za končno izbiro vedno uporabimo tehnični list izbrane
            formulacije in po potrebi izdelamo testni kos.
          </p>
        </section>
        <section id="ojacitve" className="lt-band">
          <div className="lt-container lt-section">
            <SectionHeading
              eyebrow="02 / Razlika, ki je pomembna"
              title="Osnovni polimer, CF ali GF niso ista rešitev."
            />
            <div className="lt-reinforcement-grid">
              {reinforcementNotes.map((item) => (
                <article key={item.code}>
                  <span>{item.code}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="izbira" className="lt-container lt-section">
          <SectionHeading
            eyebrow="03 / Izbira po uporabi"
            title="Najprej določimo, kaj mora kos prenesti."
          />
          <div
            className="lt-table-scroll"
            role="region"
            aria-label="Izbira materiala glede na uporabo"
            tabIndex={0}
          >
            <table className="lt-table">
              <caption>
                Praktična izhodišča; končno izbiro potrdimo glede na konkretne
                zahteve.
              </caption>
              <thead>
                <tr>
                  <th scope="col">Tip projekta</th>
                  <th scope="col">Možna izbira</th>
                  <th scope="col">Kaj preverimo</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.useCase}>
                    <th scope="row">{row.useCase}</th>
                    <td>{row.suggested}</td>
                    <td>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section id="proces" className="lt-band">
          <div className="lt-container lt-section">
            <SectionHeading
              eyebrow="04 / Proces"
              title="Dober material brez pravilnega procesa ni dovolj."
            />
            <ProcessFlow steps={processControls} />
          </div>
        </section>
        <CTASection
          title="Material izberimo glede na vaš kos."
          text="Opišite obremenitve, temperaturo, vlago, kemikalije in količino. Na tej osnovi določimo primerno materialno skupino in izvedbo."
        />
      </main>
    </>
  );
}
