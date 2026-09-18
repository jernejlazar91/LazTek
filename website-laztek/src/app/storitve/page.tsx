import SiteHeader from "@/components/SiteHeader";
import { pageMetadata } from "@/lib/seo";
import { client } from "@/sanity/client";
import {
  ArrowRight,
  Cpu,
  RefreshCw,
  Rocket,
  ScanLine,
  Wrench,
} from "lucide-react";
import Link from "next/link";

async function getServicesPageData() {
  return client.fetch(`{
    "siteSettings": *[_type == "siteSettings"][0]{
      siteTitle,
      brandName,
      tagline,
      email,
      phone,
      location,
      logo
    }
  }`);
}

const serviceGroups = [
  {
    eyebrow: "FDM / FGF / veliki format",
    title: "Industrijski 3D tisk",
    href: "/storitve/industrijski-3d-tisk",
    icon: Cpu,
    text: "Izdelava funkcionalnih prototipov, nadomestnih delov in manjših serij iz tehničnih polimerov. Fokus je na uporabnih kosih, ne samo na lepih modelih.",
    bullets: [
      "funkcionalni prototipi in testni vzorci",
      "večji formati in robustni tehnični deli",
      "materiali kot PA6 CF/GF, PETG, ASA, PC, TPU in sorodni polimeri",
      "priprava modela za tisk, orientacija, podpore in procesne nastavitve",
    ],
  },
  {
    eyebrow: "Skeniranje / CAD rekonstrukcija",
    title: "3D skeniranje & reverse engineering",
    href: "/storitve/3d-skeniranje-reverse-engineering",
    icon: ScanLine,
    text: "Obstoječ kos pretvorimo v uporaben digitalni model. Primerno za poškodovane, izgubljene ali zastarele plastične dele, kjer originalna dokumentacija ne obstaja.",
    bullets: [
      "3D skeniranje obstoječih kosov",
      "rekonstrukcija površin in izdelava CAD modela",
      "obnova pokvarjenih ali poškodovanih plastičnih kosov",
      "izboljšava oblike pred ponovno izdelavo",
    ],
  },
  {
    eyebrow: "Poškodovani / nedobavljivi kosi",
    title: "Obnova plastičnih kosov",
    href: "/storitve/obnova-plasticnih-kosov",
    icon: RefreshCw,
    text: "Rekonstrukcija polomljenih, obrabljenih ali nedobavljivih plastičnih kosov. Kos lahko izdelamo kot izboljšan nadomestni del, ne samo kot kopijo originala.",
    bullets: [
      "obnova polomljenih nosilcev, ohišij, pokrovov in zaščit",
      "izdelava nadomestnih delov, ko original ni več dobavljiv",
      "ojačitev šibkih točk in izboljšava geometrije",
      "izbira materiala glede na temperaturo, togost in namen uporabe",
    ],
  },
  {
    eyebrow: "CAD / tehnični razvoj",
    title: "Konstruiranje & 3D modeliranje",
    href: "/storitve/konstruiranje-3d-modeliranje",
    icon: Wrench,
    text: "Razvoj tehničnih kosov, sklopov in priprav od ideje do izvedljivega modela. Namenjeno podjetjem, ki potrebujejo praktično konstrukcijsko podporo.",
    bullets: [
      "3D modeliranje in konstrukcija v CAD okolju",
      "priprava STEP/STL datotek za proizvodnjo ali 3D tisk",
      "optimizacija oblike glede na obremenitve in namen uporabe",
      "tehnična dokumentacija in priprava za izdelavo",
    ],
  },
  {
    eyebrow: "Ideja → test → izboljšava",
    title: "Prototipizacija in razvoj izdelkov",
    href: "/storitve/prototipizacija",
    icon: Rocket,
    text: "Hitra izdelava in izboljševanje prototipov, ko je treba idejo spraviti v fizično obliko, jo testirati in pripraviti na naslednji razvojni korak.",
    bullets: [
      "razvoj funkcionalnih prototipov",
      "iteracije po testiranju in meritvah",
      "ohišja, nosilci, adapterji, priprave in mehanski deli",
      "priprava za manjšo serijo ali nadaljnjo proizvodnjo",
    ],
  },
];

const workflow = [
  "Pošljete opis, slike, mere ali obstoječe datoteke STEP/STL.",
  "Skupaj določimo namen kosa, obremenitve, material in pričakovani rezultat.",
  "Pripravimo model, proces, prototip ali rekonstrukcijo obstoječega dela.",
  "Po testu se kos po potrebi izboljša in pripravi za končno izdelavo ali serijo.",
];

import {
  CTASection,
  PageHero,
  ProcessFlow,
  SectionHeading,
  TechnicalBadge,
} from "@/components/engineering/DesignSystem";

export default async function ServicesPage() {
  const data = await getServicesPageData();
  const site = data?.siteSettings;
  return (
    <>
      <SiteHeader brandName={site?.brandName} basePath="/" />
      <main id="vsebina" tabIndex={-1} className="lt-theme lt-storitve">
        <PageHero
          eyebrow="Integrirano inženirstvo / LazTek"
          breadcrumb="Storitve"
          title={
            <>
              Od izziva
              <br />
              do <em>rešitve.</em>
            </>
          }
          description="Industrijski 3D tisk, digitalizacija in razvoj v povezanem procesu. Začnemo tam, kjer ste: z modelom, fizičnim kosom ali jasno zahtevo."
          variant="editorial"
          secondary={{ href: "#pregled", label: "Raziščite storitve" }}
        />
        <section id="pregled" className="lt-container lt-section">
          <SectionHeading
            eyebrow="01 / Storitve"
            title="Izberite izhodišče svojega projekta."
          />
          <div className="lt-service-list">
            {serviceGroups.map((service, i) => (
              <article className="lt-service-row" key={service.href}>
                <span className="lt-index">0{i + 1}</span>
                <div>
                  <TechnicalBadge>{service.eyebrow}</TechnicalBadge>
                  <h3>
                    <Link href={service.href}>{service.title}</Link>
                  </h3>
                  <p>{service.text}</p>
                  <Link href={service.href} className="lt-text-link">
                    Več o storitvi <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
                <ul>
                  {service.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
        <section className="lt-band">
          <div className="lt-container lt-section lt-split">
            <SectionHeading
              eyebrow="02 / Povezan proces"
              title="En projekt. Smiselno povezane tehnologije."
              text="Skeniranje, CAD in izdelava so koraki istega razvoja. Kombinacijo prilagodimo geometriji, obremenitvam in namenu uporabe."
            />
            <ProcessFlow steps={workflow} vertical />
          </div>
        </section>
        <CTASection title="Imate model, fizični kos ali šele idejo?" />
      </main>
    </>
  );
}

export const metadata = pageMetadata(
  "Inženirske storitve",
  "Industrijski FDM in FGF 3D tisk, 3D skeniranje, povratni inženiring, konstruiranje in prototipizacija.",
  "/storitve",
);
