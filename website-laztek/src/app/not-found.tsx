import SiteHeader from "@/components/SiteHeader";
import {
  ActionLink,
  Breadcrumbs,
  TechnicalBadge,
} from "@/components/engineering/DesignSystem";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stran ni najdena",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader basePath="/" />
      <main id="vsebina" tabIndex={-1} className="lt-theme">
        <div className="lt-container">
          <Breadcrumbs items={[{ label: "Stran ni najdena" }]} />
          <section className="lt-section">
            <TechnicalBadge>Napaka 404</TechnicalBadge>
            <div className="lt-project-header">
              <h1>Ta stran ne obstaja ali je bila prestavljena.</h1>
              <p className="lt-lead">
                Do storitev, projektov in tehničnih informacij lahko nadaljujete
                prek spodnjih povezav.
              </p>
              <div className="lt-actions">
                <ActionLink href="/storitve">Pregled storitev</ActionLink>
                <ActionLink href="/projekti" secondary>
                  Projekti
                </ActionLink>
                <Link className="lt-text-link" href="/">
                  Nazaj na naslovnico →
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
