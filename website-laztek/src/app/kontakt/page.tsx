import {getPageEditor, editableMetadata} from '@/sanity/pageEditor';
import ContactForm from '@/components/ContactForm'
import LocationMap from '@/components/LocationMap'
import SiteHeader from '@/components/CmsSiteHeader'
import {pageMetadata} from '@/lib/seo'
import {client} from '@/sanity/client'

export async function generateMetadata() { return editableMetadata("/kontakt", pageMetadata(
  'Kontakt',
  'Pošljite povpraševanje za 3D tisk, 3D skeniranje, reverse engineering, CAD modeliranje, prototipizacijo ali obnovo plastičnih kosov.',
  '/kontakt',
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
    "contactSection": *[_type == "contactSection"][0]{
      title,
      text,
      email,
      phone,
      location
    }
  }`, {}, {next: {revalidate: 60}})
}

function getValidEmail(...values: unknown[]) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

  for (const value of values) {
    if (typeof value !== 'string') {
      continue
    }

    const cleaned = value
      .trim()
      .replace(/^mailto:/i, '')
      .replace(/\s+/g, '')

    if (
      cleaned &&
      cleaned.toLowerCase() !== 'null' &&
      cleaned.toLowerCase() !== 'undefined' &&
      emailRegex.test(cleaned)
    ) {
      return cleaned
    }
  }

  return 'jernej.lazar91@gmail.com'
}

import {
  Breadcrumbs,
  TechnicalBadge,
} from '@/components/engineering/DesignSystem'
export default async function ContactPage() {
  const editor = await getPageEditor("/kontakt");
  

  const data = await getPageData()

  const site = data?.siteSettings
  const contact = data?.contactSection

  const email = getValidEmail(
    site?.email,
    contact?.email,
    'jernej.lazar91@gmail.com',
  )

  const phone = site?.phone || contact?.phone

  const emailSubject = 'Povpraševanje – LazTek Engineering'

  const emailHref = `mailto:${email}?subject=${encodeURIComponent(emailSubject)}`

  return (
    <>
      <SiteHeader brandName={site?.brandName} basePath="/" />
      <main id="vsebina" tabIndex={-1} className="lt-theme">
        <div className="lt-container">
          <Breadcrumbs items={editor.data("s01.f001", [{label: 'Kontakt'}])} />
          <div className="lt-contact-grid">
            <section className="lt-contact-copy">
              <TechnicalBadge>{editor.text("s02.f002", "Kontakt / Tehnično povpraševanje")}</TechnicalBadge>
              <h1>{editor.text("s02.f003", contact?.title || 'Začnimo z vašim projektom.')}</h1>
              <p className="lt-lead">
                {editor.text("s02.f004", contact?.text ||
                  'Pošljite model, opišite kos ali predstavite tehnični izziv. Skupaj določimo naslednji korak.')}
              </p>
              <div className="lt-contact-links">
                <a href={emailHref}>
                  <span>{editor.text("s02.f005", "E-POŠTA")}</span>
                  {email}
                </a>
                {phone && (
                  <a href={`tel:${phone.replace(/\s/g, '')}`}>
                    <span>{editor.text("s02.f006", "TELEFON")}</span>
                    {phone}
                  </a>
                )}
              </div>
              <div className="lt-contact-notes">
                <h2>{editor.text("s02.f007", "Kaj pomaga pri oceni?")}</h2>
                <p>{editor.text("s02.f008", "Namen uporabe, osnovne mere, količina, obremenitve in želeni rok. Obstoječ model je dobrodošel, ni pa pogoj za začetek.")}</p>
                <p>{editor.text("s02.f009", "V obrazcu lahko naložite STEP, STP, STL in OBJ. Fotografije, PDF ali DXF pošljite po e-pošti.")}</p>
              </div>
            </section>
            <section className="lt-form-panel" aria-labelledby="povprasevanje">
              <h2 id="povprasevanje">{editor.text("s03.f010", "Pošljite povpraševanje")}</h2>
              <p>{editor.text("s03.f011", "Polja z zvezdico so obvezna. Datoteke lahko dodate spodaj.")}</p>
              <ContactForm />
            </section>
          </div>
        </div>
        <section className="lt-band">
          <div className="lt-container lt-section lt-split">
            <div>
              <TechnicalBadge>{editor.text("s04.f012", "Lokacija / Osebni stik")}</TechnicalBadge>
              <h2 className="lt-statement">{editor.text("s04.f013", "Obisk in predaja kosa.")}</h2>
              <p className="lt-muted">{editor.text("s04.f014", "Za obisk ali predajo fizičnega kosa se predhodno dogovorite po telefonu ali e-pošti.")}</p>
            </div>
            <LocationMap />
          </div>
        </section>
      </main>
    </>
  )
}
