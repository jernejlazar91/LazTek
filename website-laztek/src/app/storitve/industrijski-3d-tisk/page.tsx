import JsonLd from "@/components/engineering/JsonLd";
import SiteHeader from "@/components/SiteHeader";
import fgfPelletPrint from "@/assets/laztek/fgf-pellet-print.webp";
import functionalParts from "@/assets/laztek/functional-parts.webp";
import smallSeries from "@/assets/laztek/small-series.webp";
import { pageMetadata } from "@/lib/seo";
import { client } from "@/sanity/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = pageMetadata(
  "Industrijski 3D tisk",
  "Industrijski 3D tisk funkcionalnih prototipov, nadomestnih delov in manjših serij iz tehničnih materialov, kot so PA6 CF/GF, PPA, PPS, ASA, ABS, PC, PETG in TPU.",
  "/storitve/industrijski-3d-tisk",
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
  "funkcionalni prototipi za preverjanje oblike, montaže in delovanja",
  "nadomestni plastični deli in izboljšane verzije obstoječih kosov",
  "majhne serije, kjer izdelava orodja še ni smiselna",
  "industrijski pripomočki, šablone, vpenjala, adapterji in zaščitni pokrovi",
  "večji kosi in deli z zahtevnejšimi dimenzijami",
  "prilagoditev modela za boljši tisk, manj deformacij in boljšo trdnost",
];

const useCases = [
  {
    title: "Prototipi za razvoj izdelka",
    text: "Za hitro preverjanje oblike, montaže, ergonomije, prostora za vijake, kablovje, vložke in realno uporabo kosa.",
  },
  {
    title: "Nadomestni in izboljšani deli",
    text: "Ko originalen del ni več dobavljiv, je predrag ali ima konstrukcijsko šibko točko, ki jo je smiselno popraviti.",
  },
  {
    title: "Manjše serije in namenski pripomočki",
    text: "Za serije, kjer brizganje plastike nima smisla, ali za proizvodne pripomočke, ki so narejeni točno za določen proces.",
  },
];

const materialGroups = [
  {
    name: "PETG / PCTG / PETG CF",
    use: "univerzalni tehnični deli, prototipi, ohišja, nosilci",
    note: "dobra izbira za veliko projektov, kjer ni ekstremne temperature",
  },
  {
    name: "ABS / ASA",
    use: "ohišja, zunanji deli, funkcionalni kosi, ki potrebujejo večjo temperaturno odpornost kot PETG",
    note: "ASA je posebej uporaben za UV in zunanjo uporabo",
  },
  {
    name: "PA6 / PA6 CF / PA6 GF",
    use: "mehansko obremenjeni kosi, nosilci, vpenjala, tehnični adapterji",
    note: "zahteva pravilno sušenje in premišljeno konstrukcijo",
  },
  {
    name: "PPA / PPA CF / PPA GF",
    use: "zahtevnejši tehnični deli z višjo temperaturo in boljšo dimenzijsko stabilnostjo",
    note: "primeren za bolj industrijske aplikacije kot klasičen PA6",
  },
  {
    name: "PPS / PPS GF / PPS CF",
    use: "visokotemperaturni, kemično odpornejši in dimenzijsko stabilnejši deli",
    note: "za projekte, kjer navadni materiali niso več dovolj",
  },
  {
    name: "TPU / TPE",
    use: "elastični vložki, blažilci, zaščite, tesnilom podobni elementi",
    note: "trdota, geometrija in način uporabe močno vplivajo na rezultat",
  },
];

const process = [
  {
    title: "Pregled zahteve",
    text: "Pošljete model, slike, mere ali opis problema. Najprej se preveri, kaj mora kos dejansko prenašati.",
  },
  {
    title: "Izbira materiala in izvedbe",
    text: "Predlaga se material, orientacija, debeline sten, polnilo, tolerance in morebitni popravki modela.",
  },
  {
    title: "Izdelava in preverjanje",
    text: "Kos se izdela kot prototip, nadomestni del ali serija. Pri zahtevnejših kosih je smiselna iteracija po testu.",
  },
  {
    title: "Nadgradnja za serijo",
    text: "Če se kos obnese, se lahko optimizira za krajši čas izdelave, večjo ponovljivost ali boljšo mehansko zanesljivost.",
  },
];

const requestChecklist = [
  "STEP ali STL datoteko, če jo imate",
  "slike kosa, mesta poškodbe ali vgradnje",
  "osnovne mere ali zahteve glede tolerance",
  "temperaturo okolja in morebiten stik s kemikalijami, oljem, UV ali vlago",
  "koliko kosov potrebujete in do kdaj",
  "ali mora biti kos lep na pogled, mehansko močan ali oboje",
];

import {
  ActionLink,
  CapabilityGrid,
  CTASection,
  ImageSequence,
  JumpNav,
  PageHero,
  ProcessFlow,
  SectionHeading,
  TechnicalCard,
  TechnicalImage,
} from "@/components/engineering/DesignSystem";

export default async function IndustrialPrintingPage() {
  const data = await getPageData();
  const site = data?.siteSettings;
  return (
    <>
      <SiteHeader brandName={site?.brandName} basePath="/" />
      <main
        id="vsebina"
        tabIndex={-1}
        className="lt-theme lt-industrijski-3d-tisk"
      >
        <PageHero
          eyebrow="Aditivna proizvodnja / FDM + FGF"
          breadcrumb="Industrijski 3D tisk"
          title={
            <>
              Industrijski 3D tisk.
              <br />
              <em>Za realno uporabo.</em>
            </>
          }
          description="Funkcionalni prototipi, nadomestni deli in manjše serije. Material, geometrijo in proces prilagodimo obremenitvam ter okolju vašega kosa."
          visual={
            <TechnicalImage
              image={fgfPelletPrint}
              alt="FGF 3D tisk velikega tehničnega kosa neposredno iz granulata"
              label="FGF / GRANULAT"
              caption="Dyze Pulsar Atom / razvoj procesnih parametrov"
              priority
            />
          }
          action="Pošljite model za oceno"
          secondary={{ href: "/materiali", label: "Tehnični materiali" }}
        />
        <JumpNav
          items={[
            { id: "tehnologija", label: "FDM / FGF" },
            { id: "zmogljivosti", label: "Zmogljivosti" },
            { id: "materiali", label: "Materiali" },
            { id: "proces", label: "Proces" },
          ]}
        />
        <section id="tehnologija" className="lt-container lt-section">
          <div className="lt-split">
            <SectionHeading
              eyebrow="01 / Tehnologija"
              title="Dve poti do funkcionalne komponente."
              text="Tehnologijo izberemo glede na velikost, detajle, material in količino. Velik format podpira lastna razvojna platforma LINEX HT v1."
            />
            <div className="lt-grid lt-grid-two">
              <TechnicalCard index="FDM" title="Tisk iz filamenta">
                <p>
                  Kontrolirana ekstruzija za tehnične detajle, ohišja, prototipe
                  in funkcionalne dele.
                </p>
              </TechnicalCard>
              <TechnicalCard index="FGF" title="Tisk iz granulata">
                <p>
                  Izdelava neposredno iz granulata za večje kose, materialni
                  razvoj in prilagoditev proizvodnega procesa.
                </p>
              </TechnicalCard>
            </div>
          </div>
          <Link href="/linex" className="lt-text-link">
            Spoznajte platformo LINEX <ArrowRight size={16} />
          </Link>
        </section>
        <section id="zmogljivosti" className="lt-band">
          <div className="lt-container lt-section lt-split">
            <SectionHeading
              eyebrow="02 / Zmogljivosti"
              title="Geometrija, ki rešuje proizvodni problem."
              text="Od namenske priprave do velikega ohišja: model preverimo z vidika izdelave, montaže in uporabe."
            />
            <CapabilityGrid items={capabilities} />
          </div>
        </section>
        <section className="lt-container lt-section">
          <SectionHeading
            eyebrow="03 / Izvedbe"
            title="Dejanski proces. Funkcionalni rezultati."
            text="Različna merila, geometrije in količine zahtevajo različno strategijo izdelave. Fotografije prikazujejo dejanske faze dela na platformi LazTek."
          />
          <ImageSequence
            ariaLabel="Primeri industrijskega 3D tiska LazTek"
            items={[
              {
                image: fgfPelletPrint,
                alt: "Ekstruzija granulata pri izdelavi velikega ravnega tehničnega kosa",
                label: "FGF / VELIK FORMAT",
                title: "Tisk neposredno iz granulata",
                text: "Proces za večje preseke, razvoj materialov in učinkovito izdelavo večjih komponent.",
              },
              {
                image: smallSeries,
                alt: "Manjša serija črnih tehničnih komponent na delovni površini 3D tiskalnika",
                label: "MALA SERIJA",
                title: "Ponovljiva izdelava serije",
                text: "Razporeditev kosov, stabilen proces in nadzor geometrije skozi celoten cikel.",
              },
              {
                image: functionalParts,
                alt: "Več različnih funkcionalnih 3D natisnjenih komponent na platformi LINEX",
                label: "FUNKCIONALNI DELI",
                title: "Različne geometrije in nameni",
                text: "Od ohišij in mrežic do namenskih elementov, prilagojenih konkretni uporabi.",
              },
            ]}
          />
        </section>
        <section className="lt-container lt-section">
          <SectionHeading
            eyebrow="04 / Aplikacije"
            title="Od razvoja do proizvodnega okolja."
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
        <section id="materiali" className="lt-container lt-section lt-split">
          <SectionHeading
            eyebrow="05 / Material + konstrukcija"
            title="Lastnosti določimo pred tiskom."
            text="Mehanske in temperaturne zahteve obravnavamo skupaj z orientacijo slojev, debelinami sten in pritrdilnimi mesti."
          />
          <div>
            <div className="lt-service-list">
              {materialGroups.map((item) => (
                <div className="lt-material-line" key={item.name}>
                  <h3>{item.name}</h3>
                  <p>{item.use}</p>
                </div>
              ))}
            </div>
            <ActionLink href="/materiali" secondary>
              Primerjajte materiale
            </ActionLink>
          </div>
        </section>
        <section id="proces" className="lt-band">
          <div className="lt-container lt-section">
            <SectionHeading
              eyebrow="06 / Izvedba"
              title="Jasen proces. Preverljiv rezultat."
            />
            <ProcessFlow steps={process} />
          </div>
        </section>
        <section className="lt-container lt-section lt-split">
          <SectionHeading
            eyebrow="Priprava povpraševanja"
            title="Kaj potrebujemo za tehnično oceno?"
          />
          <CapabilityGrid items={requestChecklist} />
        </section>
        <CTASection
          title="Iz modela v funkcionalni del."
          text="Pošljite STEP ali STL, količino in zahteve uporabe. Če modela še nimate, začnemo s skico ali obstoječim kosom."
        />

        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Industrijski 3D tisk",
            url: "https://laztek.si/storitve/industrijski-3d-tisk",
            provider: { "@id": "https://laztek.si/#organization" },
          }}
        />
      </main>
    </>
  );
}
