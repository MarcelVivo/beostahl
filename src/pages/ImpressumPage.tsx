import { Seo } from '@/seo/Seo';
import { site } from '@/data/site';
import { PageHeader } from '@/components/sections/PageHeader';
import { Prose } from '@/components/ui/Prose';

export function ImpressumPage() {
  return (
    <>
      <Seo title="Impressum" description="Impressum von BEO Stahl & Glasbau: Anbieter, Kontakt, Handelsregister und Haftungshinweise." />
      <PageHeader crumbs={[{ label: 'Impressum', to: '/impressum' }]} title="Impressum" />
      <section className="section on-light">
        <div className="container-site">
          <Prose>
            <h2>Anbieter</h2>
            <p>
              {site.legalName}
              <br />
              {site.address.street}
              <br />
              {site.address.zip} {site.address.city}
              <br />
              {site.address.country}
            </p>
            <p>
              Telefon: {site.phone}
              <br />
              E-Mail: {site.email}
            </p>

            <h2>Vertretungsberechtigte Person(en)</h2>
            <p>[NAME, FUNKTION]</p>

            <h2>Handelsregister</h2>
            <p>
              Eingetragen im Handelsregister des Kantons [KANTON]
              <br />
              Unternehmens-Identifikationsnummer (UID): [CHE-XXX.XXX.XXX]
              <br />
              Mehrwertsteuernummer: [CHE-XXX.XXX.XXX MWST]
            </p>

            <h2>Haftungsausschluss</h2>
            <p>
              Wir prüfen die Inhalte dieser Website sorgfältig. Für Richtigkeit, Vollständigkeit und Aktualität übernehmen wir jedoch keine
              Gewähr. Alle Masse und Kennzahlen sind Richtwerte von Beispielkonfigurationen. Massgebend sind die Angaben in der jeweiligen
              Offerte.
            </p>
            <p>
              Haftungsansprüche gegen uns wegen Schäden materieller oder immaterieller Art, die aus dem Zugriff auf die veröffentlichten
              Informationen, durch Missbrauch der Verbindung oder durch technische Störungen entstanden sind, werden ausgeschlossen, soweit
              gesetzlich zulässig.
            </p>

            <h2>Haftung für Links</h2>
            <p>
              Verweise auf Websites Dritter liegen ausserhalb unseres Verantwortungsbereichs. Wir lehnen jede Verantwortung für solche
              Websites ab. Der Zugriff und die Nutzung erfolgen auf eigene Gefahr.
            </p>

            <h2>Urheberrechte</h2>
            <p>
              Texte, Bilder, Grafiken und weitere Inhalte dieser Website gehören {site.name} oder den genannten Rechteinhabern. Für jede
              Verwendung ist die schriftliche Zustimmung erforderlich.
            </p>
            <p>Bildnachweis: [FOTOGRAFIN / FOTOGRAF, QUELLE]</p>
            <p>Schriften: Michroma, Inter und Allura unter der SIL Open Font License.</p>
          </Prose>
        </div>
      </section>
    </>
  );
}
