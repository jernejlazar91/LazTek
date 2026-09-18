import SiteHeader from "@/components/SiteHeader";
import { pageMetadata } from "@/lib/seo";
import { client } from "@/sanity/client";

export const metadata = pageMetadata(
  "Materiali za industrijski 3D tisk",
  "Izbira tehničnih materialov za funkcionalne 3D tiskane dele: PA6 CF/GF, PPA CF/GF, PPS CF/GF, PETG CF, PCTG, ABS, ASA, PC, TPU/TPE ter svetovanje glede uporabe, geometrije in procesa.",
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
    useCase: "Hiter funkcionalni prototip",
    suggested: "PETG, PCTG, ABS ali PETG CF",
    note: "PETG/PCTG za zanesljiv proces, ABS za obdelavo po tisku in bolj industrijski občutek kosa.",
  },
  {
    useCase: "Tog nosilec ali priprava",
    suggested: "PA6 CF / PA6 GF ali PETG CF",
    note: "Odvisno od obremenitve, velikosti in okolja uporabe.",
  },
  {
    useCase: "Zahtevnejši tehnični kos z višjo temperaturo",
    suggested: "PPA CF/GF, PC ali PPS CF/GF",
    note: "Izbira je odvisna od temperature, obremenitve, geometrije in zahtevane stabilnosti.",
  },
  {
    useCase: "Kos v kemijsko ali toplotno zahtevnejšem okolju",
    suggested: "PPS, PPS GF ali PPS CF",
    note: "Smiselno je preveriti realno okolje uporabe in narediti testni kos.",
  },
  {
    useCase: "Zunanja uporaba",
    suggested: "ASA; ABS samo za notranjo uporabo ali z zaščito",
    note: "ASA je praviloma boljša izbira za sonce in vreme, ABS pa za ohišja in kose, ki se bodo naknadno obdelovali.",
  },
  {
    useCase: "Fleksibilen zaščitni del",
    suggested: "TPU / TPE",
    note: "Treba je izbrati pravo trdoto in preveriti geometrijo kosa.",
  },
  {
    useCase: "Obnova poškodovanega plastičnega kosa",
    suggested: "Material glede na originalni namen kosa",
    note: "Najprej preverimo funkcijo, pritrdilne točke in realne obremenitve.",
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
            "Primerjajte tehnične polimere glede na namen, mehanske zahteve in okolje uporabe. Material izberemo skupaj z geometrijo in procesom."
          }
          variant="editorial"
          action={false}
        />
        <JumpNav
          items={[
            { id: "knjiznica", label: "Materialna knjižnica" },
            { id: "izbira", label: "Izbira po uporabi" },
            { id: "proces", label: "Procesni nadzor" },
          ]}
        />
        <section id="knjiznica" className="lt-container lt-section">
          <SectionHeading
            eyebrow="01 / Raziščite in primerjajte"
            title="Izbira se začne pri funkciji."
          />
          <MaterialLibrary materials={primaryMaterials} />
        </section>
        <section id="izbira" className="lt-band">
          <div className="lt-container lt-section">
            <SectionHeading
              eyebrow="02 / Uporaba"
              title="Izhodišča za vaš projekt."
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
          </div>
        </section>
        <section id="proces" className="lt-container lt-section">
          <SectionHeading
            eyebrow="03 / Proces"
            title="Lastnosti materiala potrebujejo pravilen proces."
          />
          <ProcessFlow steps={processControls} />
        </section>
        <CTASection
          title="Material izberimo glede na vaš kos."
          text="Opišite obremenitve, temperaturo, vlago, kemikalije in količino. Na tej osnovi določimo primerno materialno skupino in izvedbo."
        />
      </main>
    </>
  );
}
