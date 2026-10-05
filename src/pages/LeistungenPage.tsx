import { Seo } from '@/seo/Seo';
import { leistungen, leistungsGruppen } from '@/data/leistungen';
import { Hero } from '@/components/sections/Hero';
import { CtaBlock } from '@/components/sections/CtaBlock';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

export function LeistungenPage() {
  return (
    <>
      <Seo
        title="Leistungen: Stahlbau, Glasbau und Solar"
        description="Carports und Solar-Carports, Terrassenüberdachungen, Wintergärten, Anbaubalkone, Ganzglasgeländer, Treppen, Stahlbau, Lärmschutzwände mit Photovoltaik und mehr. Alles aus einer Hand."
      />
      <Hero
        overlay="soft"
        image="/images/seiten/leistungen-hero.webp"
        imageAlt="Visualisierung: Terrassenüberdachung mit Solar-Glasdach an einem Wohnhaus mit Bergsicht"
        top={<Breadcrumbs items={[{ label: 'Leistungen', to: '/leistungen' }]} />}
        eyebrow="Leistungen"
        title="Vom Glasvordach bis zur Balkonanlage."
        subtitle="Wir verbinden Metallbau-Handwerk mit moderner Architektur, hochwertigem Design und Energietechnik. Für Privatkunden und Grossprojekte."
      >
        <Button to="/anfrage" arrow>Projekt anfragen</Button>
        <Button to="/produkte" variant="outline-light">Produkte ansehen</Button>
      </Hero>

      {leistungsGruppen.map((gruppe, gi) => {
        const id = `gruppe-${gi}`;
        return (
          <section key={gruppe} aria-labelledby={id} className={gi % 2 ? 'section bg-concrete on-light' : 'section on-light'}>
            <div className="container-site">
              <Reveal>
                <SectionHeading id={id} eyebrow={`0${gi + 1} / 04`} title={gruppe} />
              </Reveal>
              <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {leistungen
                  .filter((l) => l.group === gruppe)
                  .map((l, i) => (
                    <li key={l.slug} className="ring-1 ring-line">
                      <Reveal delay={(i % 4) * 60} className="h-full">
                        <ServiceCard l={l} />
                      </Reveal>
                    </li>
                  ))}
              </ul>
            </div>
          </section>
        );
      })}

      <CtaBlock title="Ihr Projekt passt in keine Kategorie?" text="Nicht jedes Projekt lässt sich mit einem Standardprodukt lösen. Beschreiben Sie uns Ihr Vorhaben, wir entwickeln die passende Konstruktion." />
    </>
  );
}
