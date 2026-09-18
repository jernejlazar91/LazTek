import SiteHeader from "@/components/SiteHeader";
import engineeringWorkshop from "@/assets/laztek/engineering-workshop.webp";
import { pageMetadata } from "@/lib/seo";
import { client } from "@/sanity/client";
import { Cpu, DraftingCompass, ScanLine, Wrench } from "lucide-react";

export const metadata = pageMetadata(
  "O podjetju",
  "Laztek Engineering združuje strojniško konstruiranje, 3D tisk, reverse engineering, 3D skeniranje in prototipizacijo za funkcionalne tehnične kose.",
  "/o-podjetju",
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
    "aboutSection": *[_type == "aboutSection"][0]{
      title,
      text1,
      text2,
      highlights
    }
  }`);
}

const pillars = [
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

const differentiators = [
  "lastna velikoformatna FDM/FGF platforma LINEX HT v1",
  "razvoj mehansko in temperaturno obremenjenih polimernih komponent",
  "scan → CAD → redesign → proizvodnja workflow",
  "svetovanje pri izbiri tehničnih termoplastov in kompozitov",
  "kombiniranje aditivne izdelave, meritev in klasične obdelave",
  "razvoj funkcionalnih prototipov in maloserijskih tehničnih kosov",
];

const workFlow = [
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
  const data = await getPageData();
  const site = data?.siteSettings;
  const about = data?.aboutSection;
  return (
    <>
      <SiteHeader brandName={site?.brandName} basePath="/" />
      <main id="vsebina" tabIndex={-1} className="lt-theme lt-o-podjetju">
        <PageHero
          eyebrow="LazTek Engineering / Rovte"
          breadcrumb="O podjetju"
          title={
            about?.title || (
              <>
                Od razvoja
                <br />
                <em>do izvedbe.</em>
              </>
            )
          }
          description={
            about?.text1 ||
            "Združujemo strojniško konstruiranje, 3D skeniranje, povratni inženiring in aditivno izdelavo funkcionalnih delov."
          }
          visual={
            <TechnicalImage
              image={engineeringWorkshop}
              alt="Razvojna delavnica LazTek Engineering v Rovtah"
              label="ROVTE / DEVELOPMENT WORKSHOP"
              caption="Lasten razvoj, konstrukcija in aditivna izdelava na enem mestu"
              priority
            />
          }
          secondary={{ href: "/projekti", label: "Oglejte si projekte" }}
        />
        <section className="lt-container lt-section lt-split">
          <div>
            <TechnicalBadge>01 / Pristop</TechnicalBadge>
            <h2 className="lt-statement">
              Od razumevanja problema do kosa, ki opravi svojo nalogo.
            </h2>
            <p className="lt-muted">
              {about?.text2 ||
                "Najprej razumemo namen kosa. Nato izberemo tehnologijo, material in konstrukcijsko rešitev."}
            </p>
            <p className="lt-signature">
              Jernej Lazar{" "}
              <span>Lazar engineering Tech s.p. / LazTek Engineering</span>
            </p>
          </div>
          <ProcessFlow steps={workFlow} vertical />
        </section>
        <section className="lt-band">
          <div className="lt-container lt-section">
            <SectionHeading
              eyebrow="02 / Inženirska osnova"
              title="Znanje konstrukcije. Razumevanje materiala. Lastna izvedba."
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
              eyebrow="03 / Lasten razvoj"
              title="LINEX povezuje razvoj stroja in razvoj procesa."
              text="Praktične izkušnje z lastno FDM / FGF platformo uporabljamo pri pripravi tehničnih komponent."
            />
            <ActionLink href="/linex" secondary>
              Spoznajte LINEX
            </ActionLink>
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
        <CTASection title="Pogovorimo se o vašem tehničnem izzivu." />
      </main>
    </>
  );
}
