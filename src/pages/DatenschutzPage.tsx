import { Link } from 'react-router';
import { Seo } from '@/seo/Seo';
import { site } from '@/data/site';
import { PageHeader } from '@/components/sections/PageHeader';
import { Prose } from '@/components/ui/Prose';

export function DatenschutzPage() {
  return (
    <>
      <Seo
        title="Datenschutzerklärung"
        description="Datenschutzerklärung von BEO Stahl & Glasbau nach dem Schweizer Datenschutzgesetz (DSG): welche Daten wir bearbeiten, wozu und welche Rechte Sie haben."
      />
      <PageHeader
        crumbs={[{ label: 'Datenschutz', to: '/datenschutz' }]}
        title="Datenschutzerklärung"
        intro="Nach dem Schweizer Bundesgesetz über den Datenschutz (DSG). Stand: [DATUM]."
      />
      <section className="section on-light">
        <div className="container-site">
          <Prose>
            <h2>1. Verantwortliche Stelle</h2>
            <p>
              Verantwortlich für die Bearbeitung von Personendaten auf dieser Website ist:
              <br />
              {site.legalName}, {site.address.street}, {site.address.zip} {site.address.city}, {site.address.country}
              <br />
              E-Mail: {site.email}, Telefon: {site.phone}
            </p>
            <p>Ansprechperson für Datenschutzfragen: [NAME, E-MAIL]</p>

            <h2>2. Grundsatz</h2>
            <p>
              Wir bearbeiten Personendaten nur, soweit es für den Betrieb dieser Website, die Beantwortung Ihrer Anfragen und die
              Abwicklung von Projekten nötig ist. Wir verkaufen keine Daten und verwenden sie nicht für Werbung ohne Ihre Einwilligung.
            </p>

            <h2>3. Besuch der Website</h2>
            <p>
              Beim Aufruf der Website verarbeitet unser Hosting-Anbieter technisch notwendige Daten: IP-Adresse, Datum und Uhrzeit,
              aufgerufene Seite, Browser und Betriebssystem. Diese Daten dienen dem sicheren und stabilen Betrieb und werden nach kurzer
              Zeit gelöscht.
            </p>
            <p>
              Hosting: Vercel Inc., San Francisco, USA. Daten können dabei in den USA und weiteren Ländern bearbeitet werden. Vercel
              verwendet Standardvertragsklauseln als Garantie für einen angemessenen Datenschutz.
            </p>

            <h2>4. Keine Cookies, kein Tracking</h2>
            <p>
              Diese Website setzt keine Cookies und verwendet keine Tracking- oder Werbedienste. Schriften und Bilder werden von unserem
              eigenen Server geladen. Es werden keine Daten an Google Fonts oder ähnliche Dienste übertragen.
            </p>
            <p>
              [NUR FALLS AKTIVIERT: Für anonyme Besucherstatistiken nutzen wir Vercel Web Analytics. Der Dienst arbeitet ohne Cookies
              und speichert keine IP-Adressen. Er erfasst aufgerufene Seiten, Herkunftsseite, Land sowie Gerätetyp und Browser in
              aggregierter Form.]
            </p>

            <h2>5. Anfrageformular</h2>
            <p>
              Wenn Sie uns über das <Link to="/anfrage">Anfrageformular</Link> kontaktieren, bearbeiten wir Ihre Angaben: Kundentyp,
              gewünschte Lösung, Projektort, Masse, Zeitraum, Budgetrahmen, Beschreibung, Name, Firma, E-Mail-Adresse, Telefonnummer und
              allfällige Fotos oder Pläne. Wir nutzen diese Daten, um Ihre Anfrage zu beantworten und Ihr Projekt vorzubereiten.
            </p>
            <h3>Versand per E-Mail</h3>
            <p>
              Ihre Anfrage wird über den E-Mail-Dienst Resend (Resend Inc., USA) an uns gesendet. Sie erhalten über denselben Dienst eine
              automatische Bestätigung.
            </p>
            <h3>Fotos und Pläne</h3>
            <p>
              Hochgeladene Dateien werden kurzzeitig in einem nicht öffentlichen Speicher von Vercel abgelegt, als Anhang an uns gesendet
              und danach sofort gelöscht. Dateien von nicht abgeschickten Anfragen löschen wir automatisch nach spätestens 48 Stunden.
            </p>
            <h3>Schutz vor Missbrauch</h3>
            <p>
              Zum Schutz vor Spam begrenzen wir die Anzahl Anfragen pro Absender. Dafür verwenden wir einen verschlüsselten Kennwert
              (Hash) Ihrer IP-Adresse, der nach höchstens zehn Minuten verfällt. [FALLS UPSTASH AKTIVIERT: Dieser Kennwert wird bei
              Upstash Inc., USA, zwischengespeichert.]
            </p>
            <h3>Aufbewahrung</h3>
            <p>
              Anfragen bewahren wir auf, solange es für die Bearbeitung und ein allfälliges Projekt nötig ist, und darüber hinaus nur,
              soweit gesetzliche Aufbewahrungspflichten bestehen. [AUFBEWAHRUNGSDAUER ERGÄNZEN]
            </p>

            <h2>6. Bekanntgabe ins Ausland</h2>
            <p>
              Die genannten Dienstleister (Vercel, Resend [, Upstash]) können Daten in den USA bearbeiten. Die USA verfügen aus Sicht der
              Schweiz nur teilweise über einen angemessenen Datenschutz. Wir stützen uns auf die Standardvertragsklauseln der Anbieter
              [bzw. auf eine Zertifizierung nach dem Swiss-U.S. Data Privacy Framework].
            </p>

            <h2>7. Ihre Rechte</h2>
            <p>Sie haben nach dem DSG insbesondere das Recht:</p>
            <ul>
              <li>Auskunft über Ihre bei uns bearbeiteten Personendaten zu verlangen,</li>
              <li>unrichtige Daten berichtigen zu lassen,</li>
              <li>die Löschung Ihrer Daten zu verlangen, soweit keine Aufbewahrungspflicht besteht,</li>
              <li>der Bearbeitung zu widersprechen,</li>
              <li>die Herausgabe Ihrer Daten in einem gängigen elektronischen Format zu verlangen.</li>
            </ul>
            <p>
              Wenden Sie sich dafür an {site.email}. Sie können sich zudem beim Eidgenössischen Datenschutz- und
              Öffentlichkeitsbeauftragten (EDÖB) beschweren.
            </p>

            <h2>8. Datensicherheit</h2>
            <p>
              Die Website wird ausschliesslich verschlüsselt (HTTPS) übertragen. Wir treffen angemessene technische und organisatorische
              Massnahmen, um Ihre Daten vor Verlust und unberechtigtem Zugriff zu schützen.
            </p>

            <h2>9. Änderungen</h2>
            <p>Wir können diese Datenschutzerklärung anpassen. Es gilt die jeweils auf dieser Website veröffentlichte Fassung.</p>
          </Prose>
        </div>
      </section>
    </>
  );
}
