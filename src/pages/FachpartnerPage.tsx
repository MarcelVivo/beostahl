import { ClipboardList, FileText, Layers, Network } from 'lucide-react';
import { Seo } from '@/seo/Seo';
import { getLeistung } from '@/data/leistungen';
import { getProdukt } from '@/data/produkte';
import { referenzen } from '@/data/referenzen';
import { ReferenzCard } from '@/components/cards/ReferenzCard';
import { Hero } from '@/components/sections/Hero';
import { CtaBlock } from '@/components/sections/CtaBlock';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { ProductCard } from '@/components/cards/ProductCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

const zielgruppen = [
  'Architekten', 'Generalunternehmen', 'Immobilienverwaltungen', 'Hotels', 'Gastronomie', 'Industrie', 'Gewerbe',
  'Gemeinden', 'Öffentliche Auftraggeber', 'Wohnbaugesellschaften',
];

const angebote = [
  { icon: ClipboardList, title: 'Planungsunterstützung', text: 'Wir unterstützen Sie bei Konstruktion, Materialwahl, Statik und technischen Abklärungen bereits in der Planung.' },
  { icon: Layers, title: 'Serienlösungen', text: 'Modulare Systeme wie das BEO Balcony M3 System für mehrere Einheiten und Geschosse.' },
  { icon: Network, title: 'Projektkoordination', text: 'Wir übernehmen die Schnittstellen zwischen Stahlbau, Glas, Solar und Montage. Ein Ansprechpartner für alle Gewerke.' },
  { icon: FileText, title: 'Technische Unterlagen', text: 'Masse, Details und Unterlagen für Ihre Planung erhalten Sie auf Anfrage.' },
];

const leistungSlugs = ['anbaubalkone', 'ganzglasgelaender', 'stahlbau', 'hallen-gewerbebau', 'laermschutzwaende', 'laermschutz-photovoltaik', 'solarkonstruktionen', 'sonderkonstruktionen'];
const produktSlugs = ['balcony-m3-system', 'glass-g1-pure', 'drive-d2-pro', 'terrace-t6-solar-glass'];

export function FachpartnerPage() {
  const leistungen = leistungSlugs.map(getLeistung).filter((x) => x !== undefined);
  const produkte = produktSlugs.map(getProdukt).filter((x) => x !== undefined);
  return (
    <>
      <Seo
        title="Für Fachpartner: Architekten, Generalunternehmen, Verwaltungen"
        description="Planungsunterstützung, Serienlösungen wie das BEO Balcony M3 System, Projektkoordination und technische Unterlagen. Stahl, Glas und Solar für Grossprojekte."
      />
      <Hero
        overlay="soft"
        image="/images/seiten/fachpartner-hero.webp"
        imageAlt="Visualisierung: Mehrfamilienhaus mit übereinanderliegenden Balkonen und Glasgeländern"
        top={<Breadcrumbs items={[{ label: 'Für Fachpartner', to: '/fachpartner' }]} />}
        eyebrow="Für Fachpartner"
        title="Ein Partner für Stahl, Glas und Solar."
        subtitle="Für Architekten, Generalunternehmen, Verwaltungen, Hotels, Gewerbe und öffentliche Auftraggeber. Wir planen mit und übernehmen die Schnittstellen."
      >
        <Button to="/anfrage?kundentyp=architekt" arrow>Projekt besprechen</Button>
        <Button to="#angebot" variant="outline-light">Unser Angebot</Button>
      </Hero>

      <section id="angebot" aria-labelledby="angebot-title" className="section scroll-mt-20 on-light">
        <div className="container-site">
          <Reveal>
            <SectionHeading id="angebot-title" eyebrow="Zusammenarbeit" title="Was wir für Ihr Projekt leisten" />
          </Reveal>
          <ul className="mt-14 grid gap-px overflow-hidden bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-4">
            {angebote.map((a, i) => (
              <li key={a.title} className="bg-white">
                <Reveal delay={i * 80} className="h-full p-8">
                  <a.icon aria-hidden strokeWidth={1.25} className="size-8 text-gold-text" />
                  <h3 className="mt-6 text-[0.8125rem] text-steel">{a.title}</h3>
                  <p className="mt-3 leading-relaxed text-graphite">{a.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="zielgruppen-title" className="bg-steel py-16 text-white lg:py-20">
        <div className="container-site">
          <h2 id="zielgruppen-title" className="eyebrow text-gold">Unsere Konzepte richten sich an</h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {zielgruppen.map((z) => (
              <li key={z} className="border border-white/20 px-4 py-2 text-sm text-white/85">{z}</li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="produkte-title" className="section bg-concrete on-light">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              id="produkte-title"
              eyebrow="Systeme"
              title="Modulare Produkte für grössere Projekte"
              intro="Das BEO Balcony M3 System stapelt Anbaubalkone über mehrere Geschosse. Weitere Linien lassen sich modular erweitern."
            />
          </Reveal>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {produkte.map((p) => (
              <li key={p.slug}>
                <ProductCard p={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="referenz-title" className="section on-light">
        <div className="container-site">
          <Reveal>
            <SectionHeading id="referenz-title" eyebrow="Referenz" title="Projektbeispiel Gewerbe" />
          </Reveal>
          <div className="mt-12">{referenzen[0] && <ReferenzCard r={referenzen[0]} />}</div>
        </div>
      </section>

      <section aria-labelledby="leistungen-title" className="section bg-concrete on-light">
        <div className="container-site">
          <Reveal>
            <SectionHeading id="leistungen-title" eyebrow="Leistungen" title="Für Wohnbau, Gewerbe und Infrastruktur" />
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {leistungen.map((l) => (
              <li key={l.slug} className="ring-1 ring-line">
                <ServiceCard l={l} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBlock title="Planen Sie ein Projekt?" text="Senden Sie uns Pläne und Eckdaten. Wir melden uns persönlich und klären die nächsten Schritte mit Ihnen." />
    </>
  );
}
