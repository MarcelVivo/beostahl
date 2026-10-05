import { Seo } from '@/seo/Seo';
import { projektablauf } from '@/data/projektablauf';
import { Hero } from '@/components/sections/Hero';
import { CtaBlock } from '@/components/sections/CtaBlock';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CheckList } from '@/components/ui/CheckList';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { nr } from '@/lib';

const leistungsumfang = [
  'Beratung', 'Besichtigung und Aufmass', 'Planung', 'Konstruktion', 'Materialauswahl', 'Statik und technische Abklärungen',
  'Produktion', 'Transport', 'Montage', 'Verglasung', 'Solarintegration', 'Abschlussarbeiten', 'Service und Unterhalt',
];

export function ProjektablaufPage() {
  return (
    <>
      <Seo
        title="Projektablauf: von der Beratung bis zum Service"
        description="Beratung, Aufmass, Planung, Statik, Produktion, Montage, Verglasung und Solarintegration: BEO Stahl & Glasbau betreut Ihr Projekt mit einem zentralen Ansprechpartner."
      />
      <Hero
        overlay="soft"
        image="/images/seiten/projektablauf-hero.webp"
        imageAlt="Visualisierung: Montage einer Stahl-Glas-Konstruktion mit Kran, Glasscheiben auf einem Transportgestell"
        top={<Breadcrumbs items={[{ label: 'Projektablauf', to: '/projektablauf' }]} />}
        eyebrow="Projektablauf"
        title="Ein Ansprechpartner statt vieler Firmen."
        subtitle="Wir betreuen Ihr Projekt von der ersten Beratung bis zum Service. Sie müssen nicht selbst Stahlbauer, Glaser, Solartechniker und Monteure koordinieren."
      >
        <Button to="/anfrage" arrow>Projekt anfragen</Button>
      </Hero>

      <section aria-labelledby="schritte-title" className="section on-light">
        <div className="container-site grid gap-14 lg:grid-cols-[4fr_8fr] lg:gap-24">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              id="schritte-title"
              eyebrow="In zehn Schritten"
              title="So entsteht Ihr Projekt"
              intro="Je nach Auftrag übernehmen oder koordinieren wir die einzelnen Schritte. Sie haben dabei immer denselben Ansprechpartner."
            />
          </Reveal>
          <ol className="relative border-l border-line">
            {projektablauf.map((s, i) => (
              <li key={s.title} className="relative pb-12 pl-10 last:pb-0 sm:pl-14">
                <span aria-hidden className="absolute top-1 -left-[5px] size-[9px] rotate-45 bg-gold" />
                <Reveal>
                  <p className="font-display text-sm text-gold-text" aria-hidden>{nr(i + 1)}</p>
                  <h3 className="mt-2 text-[0.9375rem] text-steel">{s.title}</h3>
                  <p className="mt-3 max-w-xl text-lg leading-relaxed text-graphite">{s.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="umfang-title" className="section bg-concrete on-light">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <SectionHeading
              id="umfang-title"
              eyebrow="Komplette Projektabwicklung"
              title="Was wir übernehmen oder koordinieren"
              intro="Ein wesentlicher Vorteil von BEO Stahl & Glasbau ist die Betreuung des gesamten Projekts. Wir übernehmen die Schnittstellen und organisieren das Projekt als Gesamtlösung."
            />
          </Reveal>
          <Reveal delay={100}>
            <CheckList items={leistungsumfang} columns={2} />
          </Reveal>
        </div>
      </section>

      <CtaBlock title="Bereit für den ersten Schritt?" text="Die Beratung ist der Anfang. Beschreiben Sie uns Ihr Vorhaben, gerne mit Fotos oder Plänen." />
    </>
  );
}
