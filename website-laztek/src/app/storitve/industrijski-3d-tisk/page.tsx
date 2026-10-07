import {EditableTitle} from '@/components/engineering/CmsContent';
import {getPageEditor, editableMetadata} from '@/sanity/pageEditor';
import {CmsPageHero, CmsServiceBody} from '@/components/engineering/CmsContent';
import {getEditablePage, serviceMetadata} from '@/sanity/content';
import JsonLd from "@/components/engineering/JsonLd";
import SiteHeader from "@/components/CmsSiteHeader";
import fgfPelletPrint from "@/assets/laztek-v2/services/industrial-print/fgf-granulate-print.webp";
import functionalParts from "@/assets/laztek-v2/projects/clio-197/clio-grille-process.webp";
import smallSeries from "@/assets/laztek-v2/services/industrial-print/small-series-production.webp";
import { client } from "@/sanity/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export async function generateMetadata() {
  return editableMetadata("/storitve/industrijski-3d-tisk", await serviceMetadata(
    "Industrijski 3D tisk",
    "Industrijski 3D tisk funkcionalnih prototipov, nadomestnih delov in manjših serij iz tehničnih materialov, kot so PA6 CF/GF, PPA, PPS, ASA, ABS, PC, PETG in TPU.",
    "/storitve/industrijski-3d-tisk",
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
  "funkcionalni prototipi za preverjanje oblike, montaže in delovanja",
  "nadomestni plastični deli in izboljšane verzije obstoječih kosov",
  "majhne serije, kjer izdelava orodja še ni smiselna",
  "industrijski pripomočki, šablone, vpenjala, adapterji in zaščitni pokrovi",
  "večji kosi in deli z zahtevnejšimi dimenzijami",
  "prilagoditev modela za boljši tisk, manj deformacij in boljšo trdnost",
];

const defaultUseCases = [
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

const defaultMaterialGroups = [
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

const defaultProcess = [
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

const defaultRequestChecklist = [
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
  ProcessFlow,
  SectionHeading,
  TechnicalCard,
  TechnicalImage,
} from "@/components/engineering/DesignSystem";

export default async function IndustrialPrintingPage() {
  const editor = await getPageEditor("/storitve/industrijski-3d-tisk");
  const capabilities = editor.data("s01.f001", defaultCapabilities);
  const useCases = editor.data("s02.f002", defaultUseCases);
  const materialGroups = editor.data("s03.f003", defaultMaterialGroups);
  const process = editor.data("s04.f004", defaultProcess);
  const requestChecklist = editor.data("s05.f005", defaultRequestChecklist);

  const service = await getEditablePage('servicePage', 'industrijski-3d-tisk');
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
        <CmsPageHero page={editor.exists ? null : service}
          eyebrow={editor.text("s06.f006", "Aditivna proizvodnja / FDM + FGF")}
          breadcrumb="Industrijski 3D tisk"
          title={
            <EditableTitle first={editor.text("s06.f007", "Industrijski 3D tisk.")} second={editor.text("s06.f008", "Za realno uporabo.")} />
          }
          description={editor.text("s06.f009", "Funkcionalni prototipi, nadomestni deli in manjše serije. Material, geometrijo in proces prilagodimo obremenitvam ter okolju vašega kosa.")}
          visual={
            <TechnicalImage
              image={editor.image("s06.f010", fgfPelletPrint)}
              alt={editor.text("s06.f011", "FGF 3D tisk velikega tehničnega kosa neposredno iz granulata")}
              label={editor.text("s06.f012", "FGF / GRANULAT")}
              caption={editor.text("s06.f013", "Dyze Pulsar Atom / razvoj procesnih parametrov")}
              priority
            />
          }
          action={editor.text("s06.f014", "Pošljite model za oceno")}
          secondary={editor.data("s06.f015", { href: "/materiali", label: "Tehnični materiali" })}
        />
        <CmsServiceBody page={editor.exists ? null : service}>
        <JumpNav
          items={editor.data("s06.f016", [
            { id: "tehnologija", label: "FDM / FGF" },
            { id: "zmogljivosti", label: "Zmogljivosti" },
            { id: "materiali", label: "Materiali" },
            { id: "proces", label: "Proces" },
          ])}
        />
        <section id="tehnologija" className="lt-container lt-section">
          <div className="lt-split">
            <SectionHeading
              eyebrow={editor.text("s08.f017", "01 / Tehnologija")}
              title={editor.text("s08.f018", "Dve poti do funkcionalne komponente.")}
              text={editor.text("s08.f019", "Tehnologijo izberemo glede na velikost, detajle, material in količino. Velik format podpira lastna razvojna platforma LINEX HT v1.")}
            />
            <div className="lt-grid lt-grid-two">
              <TechnicalCard index="FDM" title={editor.text("s08.f020", "Tisk iz filamenta")}>
                <p>{editor.text("s08.f021", "Kontrolirana ekstruzija za tehnične detajle, ohišja, prototipe in funkcionalne dele.")}</p>
              </TechnicalCard>
              <TechnicalCard index="FGF" title={editor.text("s08.f022", "Tisk iz granulata")}>
                <p>{editor.text("s08.f023", "Izdelava neposredno iz granulata za večje kose, materialni razvoj in prilagoditev proizvodnega procesa.")}</p>
              </TechnicalCard>
            </div>
          </div>
          <Link href={editor.text("s08.f024", "/linex")} className="lt-text-link">{editor.text("s08.f025", "Spoznajte platformo LINEX")}{" "}<ArrowRight size={16} />
          </Link>
        </section>
        <section id="zmogljivosti" className="lt-band">
          <div className="lt-container lt-section lt-split">
            <SectionHeading
              eyebrow={editor.text("s01.f026", "02 / Zmogljivosti")}
              title={editor.text("s01.f027", "Geometrija, ki rešuje proizvodni problem.")}
              text={editor.text("s01.f028", "Od namenske priprave do velikega ohišja: model preverimo z vidika izdelave, montaže in uporabe.")}
            />
            <CapabilityGrid items={capabilities} />
          </div>
        </section>
        <section className="lt-container lt-section">
          <SectionHeading
            eyebrow={editor.text("s09.f029", "03 / Izvedbe")}
            title={editor.text("s09.f030", "Dejanski proces. Funkcionalni rezultati.")}
            text={editor.text("s09.f031", "Različna merila, geometrije in količine zahtevajo različno strategijo izdelave. Fotografije prikazujejo dejanske faze dela na platformi LazTek.")}
          />
          <ImageSequence
            ariaLabel={editor.text("s09.f032", "Primeri industrijskega 3D tiska LazTek")}
            items={editor.data("s09.f033", [
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
                alt: "Prototipi in izdelane zračne mrežice Renault Clio 197 na platformi LINEX",
                label: "ITERACIJE / FUNKCIONALNI DELI",
                title: "Od prototipa do uporabnega kosa",
                text: "Zaporedne fizične izvedbe omogočijo preverjanje geometrije pred izdelavo končnega kompleta.",
              },
            ])}
          />
        </section>
        <section className="lt-container lt-section">
          <SectionHeading
            eyebrow={editor.text("s02.f034", "04 / Aplikacije")}
            title={editor.text("s02.f035", "Od razvoja do proizvodnega okolja.")}
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
            eyebrow={editor.text("s03.f036", "05 / Material + konstrukcija")}
            title={editor.text("s03.f037", "Lastnosti določimo pred tiskom.")}
            text={editor.text("s03.f038", "Mehanske in temperaturne zahteve obravnavamo skupaj z orientacijo slojev, debelinami sten in pritrdilnimi mesti.")}
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
            <ActionLink href={editor.text("s03.f039", "/materiali")} secondary>{editor.text("s03.f040", "Primerjajte materiale")}</ActionLink>
          </div>
        </section>
        <section id="proces" className="lt-band">
          <div className="lt-container lt-section">
            <SectionHeading
              eyebrow={editor.text("s04.f041", "06 / Izvedba")}
              title={editor.text("s04.f042", "Jasen proces. Preverljiv rezultat.")}
            />
            <ProcessFlow steps={process} />
          </div>
        </section>
        <section className="lt-container lt-section lt-split">
          <SectionHeading
            eyebrow={editor.text("s05.f043", "Priprava povpraševanja")}
            title={editor.text("s05.f044", "Kaj potrebujemo za tehnično oceno?")}
          />
          <CapabilityGrid items={requestChecklist} />
        </section>
        </CmsServiceBody>
        <CTASection
          title={editor.text("s10.f045", service?.ctaTitle?.trim() || "Iz modela v funkcionalni del.")}
          text={editor.text("s10.f046", service?.ctaText?.trim() || "Pošljite STEP ali STL, količino in zahteve uporabe. Če modela še nimate, začnemo s skico ali obstoječim kosom.")}
        action={editor.text("s10.ctaaction", "Predstavite projekt")} />

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
