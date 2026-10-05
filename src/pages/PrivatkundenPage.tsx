import { Seo } from '@/seo/Seo';
import { getLeistung } from '@/data/leistungen';
import { getProdukt } from '@/data/produkte';
import { Hero } from '@/components/sections/Hero';
import { CtaBlock } from '@/components/sections/CtaBlock';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { ProductCard } from '@/components/cards/ProductCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Flame, Handshake, PencilRuler, SunMedium } from 'lucide-react';

const leistungSlugs = ['carports', 'terrassenueberdachungen', 'wintergaerten', 'anbaubalkone', 'vordaecher', 'ganzglasgelaender', 'gelaender', 'treppen', 'sicht-windschutz', 'renovationen'];
const produktSlugs = ['drive-d2-pro', 'living-w20-pro', 'terrace-t6-solar-glass', 'balcony-b1-pure', 'glass-g1-pure', 'entry-v2-solar'];

const punkte = [
  { icon: PencilRuler, title: 'Passend zu Ihrem Haus', text: 'Gebäude, Gelände und Wünsche sind verschieden. Wir planen die Lösung für Ihr Objekt.' },
  { icon: SunMedium, title: 'Strom vom eigenen Dach', text: 'Carport, Terrassendach oder Vordach können mit Photovoltaik gleichzeitig Energie produzieren.' },
  { icon: Flame, title: 'Wohnraum für alle Jahreszeiten', text: 'Ein Wintergarten mit Pellet- oder Holzofen wird auch in den kalten Monaten zum Wohnraum.' },
  { icon: Handshake, title: 'Ein Ansprechpartner', text: 'Von der Beratung bis zur Montage. Sie müssen keine verschiedenen Firmen koordinieren.' },
];

export function PrivatkundenPage() {
  const leistungen = leistungSlugs.map(getLeistung).filter((x) => x !== undefined);
  const produkte = produktSlugs.map(getProdukt).filter((x) => x !== undefined);
  return (
    <>
      <Seo
        title="Für Privatkunden: Carport, Wintergarten, Balkon und Terrasse"
        description="Für Hauseigentümer im Berner Oberland: Solar-Carports, Wintergärten, Terrassenüberdachungen, Anbaubalkone und Ganzglasgeländer. Individuell geplant, alles aus einer Hand."
      />
      <Hero
        overlay="soft"
        image="/images/seiten/privatkunden-hero.webp"
        imageAlt="Visualisierung: Wintergarten aus Stahl und Glas mit Lounge und Essplatz im Abendlicht"
        top={<Breadcrumbs items={[{ label: 'Für Privatkunden', to: '/privatkunden' }]} />}
        eyebrow="Für Privatkunden"
        title="Mehr Wert für Ihr Zuhause."
        subtitle="Aussenräume werden zu Wohnräumen, Dächer produzieren Strom. Wir planen und bauen Lösungen aus Stahl, Glas und Solar für Ihr Haus."
      >
        <Button to="/anfrage?kundentyp=privat" arrow>Projekt anfragen</Button>
        <Button to="#loesungen" variant="outline-light">Lösungen ansehen</Button>
      </Hero>

      <section aria-labelledby="punkte-title" className="section on-light">
        <div className="container-site">
          <Reveal>
            <SectionHeading id="punkte-title" eyebrow="Ihre Vorteile" title="Individuell statt Massenware" />
          </Reveal>
          <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {punkte.map((p, i) => (
              <li key={p.title}>
                <Reveal delay={i * 80} className="h-full border-l border-gold pl-6">
                  <p.icon aria-hidden strokeWidth={1.25} className="size-8 text-gold-text" />
                  <h3 className="mt-5 text-[0.8125rem] text-steel">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-graphite">{p.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="loesungen" aria-labelledby="loesungen-title" className="section scroll-mt-20 bg-concrete on-light">
        <div className="container-site">
          <Reveal>
            <SectionHeading id="loesungen-title" eyebrow="Leistungen" title="Lösungen für Haus und Garten" />
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {leistungen.map((l) => (
              <li key={l.slug} className="ring-1 ring-line">
                <ServiceCard l={l} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="produkte-title" className="section on-light">
        <div className="container-site">
          <Reveal>
            <SectionHeading id="produkte-title" eyebrow="Produkte" title="Beliebte Ausgangspunkte" />
          </Reveal>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {produkte.map((p) => (
              <li key={p.slug}>
                <ProductCard p={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBlock title="Erzählen Sie uns von Ihrem Vorhaben." />
    </>
  );
}
