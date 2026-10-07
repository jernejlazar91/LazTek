import {EditableTitle} from '@/components/engineering/CmsContent';
import {getPageEditor, editableMetadata} from '@/sanity/pageEditor';
import SiteHeader from "@/components/CmsSiteHeader";
import engineeringWorkshop from "@/assets/laztek-v2/linex/linex-development-stage.webp";
import { pageMetadata } from "@/lib/seo";
import { client } from "@/sanity/client";
import { Cpu, DraftingCompass, ScanLine, Wrench } from "lucide-react";

export async function generateMetadata() { return editableMetadata("/o-podjetju", pageMetadata(
  "O podjetju",
  "Laztek Engineering združuje strojniško konstruiranje, 3D tisk, reverse engineering, 3D skeniranje in prototipizacijo za funkcionalne tehnične kose.",
  "/o-podjetju",
)); }

async function getPageData() {
  return client.fetch(`{
    "siteSettings": *[_type == "siteSettings"][0]{
      brandName,
      email,
      phone,
      location,
      logo
    },
    "aboutSection": *[_type == "aboutSection"][0]{
      title,
      text1,
      text2,
      highlights
    }
  }`, {}, {next: {revalidate: 60}});
}

const defaultPillars = [
  {
    title: "Inženirski pristop",
    text: "Fokus ni samo na lepem modelu ali hitrem tisku, ampak na funkcionalnem kosu, ki ima smiseln material, geometrijo in namen uporabe.",
    icon: DraftingCompass,
  },
  {
    title: "Od kosa do rešitve",
    text: "Obstoječ kos, poškodovan del, skica ali ideja se lahko pretvori v CAD model, prototip, nadomestni del ali manjšo serijo.",
    icon: ScanLine,
  },
  {
    title: "Tehnični materiali",
    text: "Velik poudarek je na materialih, kot so PA6 CF/GF, PETG CF, ASA, PC, TPU in drugih polimerih za realno uporabo.",
    icon: Cpu,
  },
  {
    title: "Praktična izvedba",
    text: "Cilj je, da naročnik dobi uporaben kos, ne samo datoteke. Po potrebi se izvedejo popravki, testiranje in iteracije.",
    icon: Wrench,
  },
];

const defaultDifferentiators = [
  "lastna velikoformatna FDM/FGF platforma LINEX HT v1",
  "razvoj mehansko in temperaturno obremenjenih polimernih komponent",
  "scan → CAD → redesign → proizvodnja workflow",
  "svetovanje pri izbiri tehničnih termoplastov in kompozitov",
  "kombiniranje aditivne izdelave, meritev in klasične obdelave",
  "razvoj funkcionalnih prototipov in maloserijskih tehničnih kosov",
];

const defaultWorkFlow = [
  "razumevanje problema, kosa ali aplikacije",
  "izbira tehnologije, materiala in konstrukcijske smeri",
  "CAD priprava, skeniranje, modeliranje ali optimizacija",
  "izdelava prototipa oziroma funkcionalnega kosa",
  "pregled rezultata in po potrebi naslednja iteracija",
];

import {
  ActionLink,
  CapabilityGrid,
  CTASection,
  PageHero,
  ProcessFlow,
  SectionHeading,
  TechnicalBadge,
  TechnicalCard,
  TechnicalImage,
} from "@/components/engineering/DesignSystem";

export default async function AboutPage() {
  const editor = await getPageEditor("/o-podjetju");
  const pillars = editor.data("s01.f001", defaultPillars);
  const differentiators = editor.data("s02.f002", defaultDifferentiators);
  const workFlow = editor.data("s03.f003", defaultWorkFlow);

  const data = await getPageData();
  const site = data?.siteSettings;
  const about = editor.exists ? null : data?.aboutSection;
  return (
    <>
      <SiteHeader brandName={site?.brandName} basePath="/" />
      <main id="vsebina" tabIndex={-1} className="lt-theme lt-o-podjetju">
        <PageHero
          eyebrow={editor.text("s04.f004", "LazTek Engineering / Rovte")}
          breadcrumb="O podjetju"
          title={
            about?.title || (
              <EditableTitle first={editor.text("s04.f005", "Od razvoja")} second={editor.text("s04.f006", "do izvedbe.")} />
            )
          }
          description={editor.text("s04.f007", about?.text1 ||
            "Združujemo strojniško konstruiranje, 3D skeniranje, povratni inženiring in aditivno izdelavo funkcionalnih delov.")}
          visual={
            <TechnicalImage
              image={editor.image("s04.f008", engineeringWorkshop)}
              alt={editor.text("s04.f009", "Razvoj platforme LINEX v delavnici LazTek Engineering v Rovtah")}
              label={editor.text("s04.f010", "ROVTE / DEVELOPMENT WORKSHOP")}
              caption={editor.text("s04.f011", "Lasten razvoj, konstrukcija in aditivna izdelava na enem mestu")}
              priority
            />
          }
          secondary={editor.data("s04.f012", { href: "/projekti", label: "Oglejte si projekte" })}
        />
        <section className="lt-container lt-section lt-split">
          <div>
            <TechnicalBadge>{editor.text("s03.f013", "01 / Pristop")}</TechnicalBadge>
            <h2 className="lt-statement">{editor.text("s03.f014", "Od razumevanja problema do kosa, ki opravi svojo nalogo.")}</h2>
            <p className="lt-muted">
              {editor.text("s03.f015", about?.text2 ||
                "Najprej razumemo namen kosa. Nato izberemo tehnologijo, material in konstrukcijsko rešitev.")}
            </p>
            <p className="lt-signature">{editor.text("s03.f016", "Jernej Lazar")}{" "}
              <span>{editor.text("s03.f017", "Lazar engineering Tech s.p. / LazTek Engineering")}</span>
            </p>
          </div>
          <ProcessFlow steps={workFlow} vertical />
        </section>
        <section className="lt-band">
          <div className="lt-container lt-section">
            <SectionHeading
              eyebrow={editor.text("s01.f018", "02 / Inženirska osnova")}
              title={editor.text("s01.f019", "Znanje konstrukcije. Razumevanje materiala. Lastna izvedba.")}
            />
            <div className="lt-grid lt-grid-two">
              {pillars.map((item, i) => (
                <TechnicalCard
                  key={item.title}
                  index={`0${i + 1}`}
                  title={item.title}
                >
                  <p>{item.text}</p>
                </TechnicalCard>
              ))}
            </div>
          </div>
        </section>
        <section className="lt-container lt-section lt-split">
          <div>
            <SectionHeading
              eyebrow={editor.text("s02.f020", "03 / Lasten razvoj")}
              title={editor.text("s02.f021", "LINEX povezuje razvoj stroja in razvoj procesa.")}
              text={editor.text("s02.f022", "Praktične izkušnje z lastno FDM / FGF platformo uporabljamo pri pripravi tehničnih komponent.")}
            />
            <ActionLink href={editor.text("s02.f023", "/linex")} secondary>{editor.text("s02.f024", "Spoznajte LINEX")}</ActionLink>
          </div>
          <CapabilityGrid
            items={
              Array.isArray(about?.highlights) &&
              about.highlights.some((item: unknown) => typeof item === "string")
                ? about.highlights.filter(
                    (item: unknown) => typeof item === "string",
                  )
                : differentiators
            }
          />
        </section>
        <CTASection title={editor.text("s05.f025", "Pogovorimo se o vašem tehničnem izzivu.")} text={editor.text("s05.ctatext", "Pošljite model, osnovne mere ali opis uporabe. Skupaj določimo smiselno pot do izdelave.")} action={editor.text("s05.ctaaction", "Predstavite projekt")} />
      </main>
    </>
  );
}
