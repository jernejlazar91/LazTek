import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Politika zasebnosti',
  description:
    'Politika zasebnosti spletne strani LazTek Engineering.',
  alternates: {
    canonical: '/politika-zasebnosti',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-24 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <div className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-cyan-300">
            LazTek Engineering
          </div>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Politika zasebnosti
          </h1>

          <p className="mt-6 text-base leading-8 text-white/60">
            Ta politika zasebnosti pojasnjuje, katere osebne podatke
            zbiramo preko spletne strani LazTek Engineering, zakaj jih
            obdelujemo, kako dolgo jih hranimo ter kakšne pravice imate
            v zvezi s svojimi osebnimi podatki.
          </p>

          <p className="mt-4 text-sm text-white/40">
            Zadnja posodobitev: 16. september 2026
          </p>
        </div>

        <div className="mt-14 space-y-10">
          <Section title="1. Upravljavec osebnih podatkov">
            <p>
              Upravljavec osebnih podatkov je:
            </p>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="font-semibold text-white">
                Lazar engineering Tech s.p.
              </p>

              <p className="mt-1 text-white/60">
                LazTek Engineering
              </p>

              <p className="mt-3 text-white/60">
                E-pošta:{' '}
                <a
                  href="mailto:jernej.lazar91@gmail.com"
                  className="text-cyan-300 transition hover:text-cyan-200"
                >
                  jernej.lazar91@gmail.com
                </a>
              </p>

              <p className="mt-1 text-white/60">
                Spletna stran:{' '}
                <a
                  href="https://laztek.si"
                  className="text-cyan-300 transition hover:text-cyan-200"
                >
                  laztek.si
                </a>
              </p>
            </div>
          </Section>

          <Section title="2. Katere osebne podatke zbiramo">
            <p>
              Pri uporabi kontaktnega obrazca lahko zbiramo naslednje
              podatke:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>ime in priimek,</li>
              <li>naziv podjetja, če ga navedete,</li>
              <li>e-poštni naslov,</li>
              <li>telefonsko številko, če jo navedete,</li>
              <li>vsebino vašega sporočila ali povpraševanja,</li>
              <li>
                tehnične oziroma CAD datoteke, ki jih prostovoljno
                priložite,
              </li>
              <li>
                osnovne tehnične podatke, potrebne za varno delovanje
                spletne strani in preprečevanje zlorab.
              </li>
            </ul>
          </Section>

          <Section title="3. Namen obdelave podatkov">
            <p>
              Osebne podatke obdelujemo predvsem za:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>obravnavo vašega povpraševanja,</li>
              <li>
                pripravo ponudbe oziroma odgovora na vaše vprašanje,
              </li>
              <li>
                komunikacijo glede projekta, storitve ali naročila,
              </li>
              <li>
                pregled tehničnih in CAD datotek, ki jih posredujete,
              </li>
              <li>
                zagotavljanje varnosti spletne strani ter preprečevanje
                neželene pošte in avtomatiziranih zlorab.
              </li>
            </ul>
          </Section>

          <Section title="4. Pravna podlaga">
            <p>
              Podatke, ki jih posredujete preko kontaktnega obrazca,
              obdelujemo zato, da lahko odgovorimo na vaše povpraševanje
              oziroma izvedemo aktivnosti na vašo zahtevo pred morebitno
              sklenitvijo poslovnega razmerja.
            </p>

            <p className="mt-4">
              Določene tehnične podatke lahko obdelujemo tudi zaradi
              našega zakonitega interesa za zagotavljanje varnega in
              zanesljivega delovanja spletne strani ter preprečevanje
              zlorab.
            </p>
          </Section>

          <Section title="5. Posredovanje podatkov zunanjim ponudnikom">
            <p>
              Za delovanje spletne strani uporabljamo nekatere zunanje
              ponudnike storitev. Podatki se jim posredujejo samo v
              obsegu, ki je potreben za izvedbo posamezne storitve.
            </p>

            <div className="mt-5 space-y-4">
              <Service
                name="Vercel"
                description="Gostovanje in izvajanje spletne aplikacije."
              />

              <Service
                name="Google Drive"
                description="Shranjevanje CAD in drugih tehničnih datotek, ki jih uporabnik prostovoljno priloži povpraševanju."
              />

              <Service
                name="Resend"
                description="Posredovanje e-poštnih sporočil, ustvarjenih preko kontaktnega obrazca."
              />

              <Service
                name="Cloudflare Turnstile"
                description="Zaščita kontaktnega obrazca in nalaganja datotek pred avtomatiziranimi zlorabami in neželeno pošto."
              />

              <Service
                name="Sanity"
                description="Sistem za upravljanje vsebin spletne strani."
              />
            </div>
          </Section>

          <Section title="6. Cloudflare Turnstile">
            <p>
              Na kontaktnem obrazcu uporabljamo Cloudflare Turnstile.
              Njegov namen je preveriti, ali zahtevo pošilja dejanski
              uporabnik in ne avtomatiziran sistem.
            </p>

            <p className="mt-4">
              Turnstile lahko pri tem obdeluje določene tehnične podatke
              o napravi, povezavi in obisku, ki so potrebni za izvedbo
              varnostnega preverjanja.
            </p>
          </Section>

          <Section title="7. Priložene CAD in tehnične datoteke">
            <p>
              Če kontaktni obrazec uporabljate za pošiljanje datotek,
              se te shranijo v zasebno mapo, namenjeno obravnavi
              posameznega povpraševanja.
            </p>

            <p className="mt-4">
              Posredovane datoteke uporabljamo izključno za pregled,
              pripravo ponudbe, tehnično presojo ali izvedbo storitve, za
              katero ste poslali povpraševanje.
            </p>

            <p className="mt-4">
              Prosimo, da preko obrazca ne pošiljate podatkov ali datotek,
              za katere nimate pravice posredovanja.
            </p>
          </Section>

          <Section title="8. Čas hrambe">
            <p>
              Osebne podatke in datoteke hranimo toliko časa, kolikor je
              potrebno za obravnavo povpraševanja, pripravo ponudbe,
              izvedbo dogovorjene storitve ter morebitne zakonske
              obveznosti.
            </p>

            <p className="mt-4">
              Če do poslovnega sodelovanja ne pride, lahko podatke po
              preteku razumnega obdobja izbrišemo, razen kadar obstaja
              druga zakonita podlaga za njihovo nadaljnjo hrambo.
            </p>
          </Section>

          <Section title="9. Vaše pravice">
            <p>
              V skladu z veljavno zakonodajo o varstvu osebnih podatkov
              lahko glede svojih osebnih podatkov zahtevate:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>dostop do svojih osebnih podatkov,</li>
              <li>popravek netočnih podatkov,</li>
              <li>izbris podatkov, kadar so za to izpolnjeni pogoji,</li>
              <li>omejitev obdelave,</li>
              <li>ugovor obdelavi, kjer je to mogoče,</li>
              <li>
                prenos podatkov, kadar so za to izpolnjeni zakonski
                pogoji.
              </li>
            </ul>

            <p className="mt-4">
              Zahtevo lahko pošljete na{' '}
              <a
                href="mailto:jernej.lazar91@gmail.com"
                className="text-cyan-300 transition hover:text-cyan-200"
              >
                jernej.lazar91@gmail.com
              </a>
              .
            </p>

            <p className="mt-4">
              Pravico imate tudi vložiti pritožbo pri pristojnem
              nadzornem organu za varstvo osebnih podatkov.
            </p>
          </Section>

          <Section title="10. Varnost podatkov">
            <p>
              Uporabljamo ustrezne tehnične in organizacijske ukrepe za
              zaščito osebnih podatkov in naloženih datotek pred
              nepooblaščenim dostopom, izgubo, zlorabo ali
              spreminjanjem.
            </p>

            <p className="mt-4">
              Nalaganje CAD datotek je dodatno zaščiteno z varnostnim
              preverjanjem in časovno omejenimi avtorizacijskimi
              dovoljenji.
            </p>
          </Section>

          <Section title="11. Piškotki">
            <p>
              Spletna stran lahko uporablja tehnično nujne podatke
              oziroma tehnologije, potrebne za pravilno in varno
              delovanje.
            </p>

            <p className="mt-4">
              Če bodo v prihodnosti dodane analitične, marketinške ali
              druge neobvezne tehnologije, bo politika zasebnosti po
              potrebi ustrezno dopolnjena.
            </p>
          </Section>

          <Section title="12. Spremembe politike zasebnosti">
            <p>
              To politiko zasebnosti lahko občasno posodobimo zaradi
              sprememb spletne strani, uporabljenih storitev ali
              zakonskih zahtev.
            </p>

            <p className="mt-4">
              Na tej strani bo vedno objavljena trenutno veljavna
              različica.
            </p>
          </Section>

          <Section title="13. Kontakt">
            <p>
              Za vprašanja glede obdelave osebnih podatkov nas lahko
              kontaktirate na:
            </p>

            <p className="mt-4">
              <a
                href="mailto:jernej.lazar91@gmail.com"
                className="font-medium text-cyan-300 transition hover:text-cyan-200"
              >
                jernej.lazar91@gmail.com
              </a>
            </p>
          </Section>
        </div>
      </section>
    </main>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
      <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
        {title}
      </h2>

      <div className="mt-4 text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
        {children}
      </div>
    </section>
  )
}

function Service({
  name,
  description,
}: {
  name: string
  description: string
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="font-medium text-white">
        {name}
      </div>

      <div className="mt-1 text-sm leading-6 text-white/55">
        {description}
      </div>
    </div>
  )
}