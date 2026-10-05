import { Seo } from '@/seo/Seo';
import { produkte, RICHTWERT_HINWEIS } from '@/data/produkte';
import { Hero } from '@/components/sections/Hero';
import { CtaBlock } from '@/components/sections/CtaBlock';
import { ProductCard } from '@/components/cards/ProductCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

export function ProduktePage() {
  return (
    <>
      <Seo
        title="Produkte: Solar-Carport, Wintergarten, Anbaubalkon, Ganzglasgeländer"
        description="Sieben Produktlinien aus Stahl, Glas und Solar: BEO Drive D2 Pro, Living W20 Pro, Terrace T6 Solar Glass, Balcony M3 System, Glass G1 Pure, Entry V2 Solar und Balcony B1 Pure."
      />
      <Hero
        overlay="soft"
        image="/images/seiten/produkte-hero.webp"
        imageAlt="Visualisierung: Solar-Carport aus Stahl für zwei Fahrzeuge mit Photovoltaik-Dach und Wallbox"
        top={<Breadcrumbs items={[{ label: 'Produkte', to: '/produkte' }]} />}
        eyebrow="Produkte"
        title="Durchdachte Systeme, individuell anpassbar."
        subtitle="Sieben Produktlinien als Ausgangspunkt für Ihr Projekt. Masse, Materialien und Ausstattung passen wir an."
      >
        <Button to="/anfrage" arrow>Projekt anfragen</Button>
      </Hero>

      <section aria-labelledby="alle-produkte" className="section bg-concrete on-light">
        <div className="container-site">
          <Reveal>
            <SectionHeading id="alle-produkte" eyebrow="Übersicht" title="Alle Produktlinien" intro={RICHTWERT_HINWEIS} />
          </Reveal>
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {produkte.map((p, i) => (
              <li key={p.slug}>
                <Reveal delay={(i % 3) * 70} className="h-full">
                  <ProductCard p={p} headingLevel="h3" />
                </Reveal>
              </li>
            ))}
            <li>
              <Reveal delay={140} className="h-full">
                <div className="flex h-full min-h-72 flex-col justify-between bg-steel p-8 text-white">
                  <div>
                    <p className="eyebrow text-gold">Sonderkonstruktion</p>
                    <h3 className="mt-4 text-[0.875rem]">Keine passende Linie?</h3>
                    <p className="mt-4 leading-relaxed text-white/80">
                      Nicht jedes Projekt lässt sich mit einem Standardprodukt lösen. Genau deshalb entwickeln wir individuelle Konstruktionen.
                    </p>
                  </div>
                  <Button to="/leistungen/sonderkonstruktionen" variant="outline-light" arrow className="mt-8">
                    Sonderkonstruktionen
                  </Button>
                </div>
              </Reveal>
            </li>
          </ul>
        </div>
      </section>

      <CtaBlock />
    </>
  );
}
