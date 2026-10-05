import { Seo } from '@/seo/Seo';
import { site } from '@/data/site';
import { Hero } from '@/components/sections/Hero';
import { CtaBlock } from '@/components/sections/CtaBlock';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { anspruch } from './WarumBeoPage';

/** Platzhalter-Block: deutlich als offen erkennbar */
function Offen({ children }: { children: React.ReactNode }) {
  return <p className="border border-dashed border-gold-text/60 bg-white p-6 text-graphite">{children}</p>;
}

export function UeberUnsPage() {
  return (
    <>
      <Seo
        title="Über uns"
        description="BEO Stahl & Glasbau aus dem Berner Oberland verbindet Metallbau-Handwerk mit moderner Architektur, hochwertigem Design und zukunftsorientierter Energietechnik."
      />
      <Hero
        overlay="soft"
        image="/images/seiten/ueber-uns-hero.webp"
        imageAlt="Visualisierung: Halle mit Stahlprofilen und grossen Fenstern mit Blick auf See und Berge"
        top={<Breadcrumbs items={[{ label: 'Über uns', to: '/ueber-uns' }]} />}
        eyebrow="Über uns"
        title="Stahl. Glas. Solar. Design."
        subtitle="BEO Stahl & Glasbau steht für moderne, langlebige und individuell geplante Lösungen aus Stahl, Glas und Solar."
      />

      <section aria-labelledby="wer-title" className="section on-light">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <SectionHeading id="wer-title" eyebrow="Wer wir sind" title="Metallbau-Handwerk trifft Architektur und Energie." />
          </Reveal>
          <Reveal delay={100} className="space-y-6 text-lg leading-relaxed text-graphite">
            <p>
              Wir verbinden klassisches Metallbau-Handwerk mit moderner Architektur, hochwertigem Design und zukunftsorientierter
              Energietechnik.
            </p>
            <p>
              Unser Anspruch ist nicht, einfach Bauteile zu verkaufen. Wir entwickeln komplette Lösungen: von der ersten Idee über
              Planung und Konstruktion bis zur Lieferung, Montage und Fertigstellung.
            </p>
            <p>
              Ob Einfamilienhaus, Mehrfamilienhaus, Hotel, Gewerbebau oder grössere Überbauung: Wir planen jedes Projekt passend zum
              Gebäude, zum Kunden und zur Umgebung.
            </p>
            <p className="claim-script pt-2 text-5xl text-steel">{site.signature}</p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="anspruch-title" className="section bg-steel text-white">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <SectionHeading
              id="anspruch-title"
              tone="dark"
              eyebrow="Unser Anspruch"
              title="Nicht einfach eine weitere Metallbaufirma."
              intro="BEO Stahl & Glasbau entwickelt moderne Lebensräume und Konstruktionen aus Stahl, Glas und Energie."
            />
          </Reveal>
          <Reveal delay={100}>
            <ul className="space-y-6 border-l border-gold/60 pl-8">
              {anspruch.map((t) => (
                <li key={t} className="text-lg leading-relaxed text-white/85">{t}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="team-title" className="section bg-concrete on-light">
        <div className="container-site grid gap-12 lg:grid-cols-3">
          <div>
            <h2 id="team-title" className="eyebrow text-gold-text">Geschichte</h2>
            <div className="mt-6"><Offen>[GESCHICHTE: Gründungsjahr, Entwicklung, Meilensteine]</Offen></div>
          </div>
          <div>
            <h2 className="eyebrow text-gold-text">Team</h2>
            <div className="mt-6"><Offen>[TEAM: Namen, Funktionen und Fotos der Ansprechpersonen]</Offen></div>
          </div>
          <div>
            <h2 className="eyebrow text-gold-text">Standort</h2>
            <div className="mt-6"><Offen>[STANDORT: Werkstatt und Büro, {site.address.zip} {site.address.city}]</Offen></div>
          </div>
        </div>
        <div className="container-site mt-12">
          <Button to="/warum-beo" variant="outline-dark" arrow>Warum BEO</Button>
        </div>
      </section>

      <CtaBlock />
    </>
  );
}
