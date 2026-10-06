import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Seo } from '@/seo/Seo';
import { JsonLd, localBusiness } from '@/seo/JsonLd';
import { site } from '@/data/site';
import { produkte } from '@/data/produkte';
import { leistungen } from '@/data/leistungen';
import { gruende } from '@/data/gruende';
import { referenzen } from '@/data/referenzen';
import { ReferenzCard } from '@/components/cards/ReferenzCard';
import { Hero } from '@/components/sections/Hero';
import { CtaBlock } from '@/components/sections/CtaBlock';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { ReasonsGrid } from '@/components/sections/ReasonsGrid';
import { AudienceSplit } from '@/components/sections/AudienceSplit';
import { ProductCard } from '@/components/cards/ProductCard';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Img } from '@/components/ui/Img';
import { Reveal } from '@/components/ui/Reveal';

function TextLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="group inline-flex min-h-11 items-center gap-2 font-display text-[0.6875rem] tracking-[0.16em] text-gold-text uppercase">
      {children}
      <ArrowRight aria-hidden strokeWidth={1.5} className="size-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

export function HomePage() {
  return (
    <>
      <Seo
        bare
        title="BEO Stahl & Glasbau | Stahl, Glas und Solar aus dem Berner Oberland"
        description="Solar-Carports, Wintergärten, Anbaubalkone, Ganzglasgeländer und Lärmschutzwände mit Photovoltaik. Individuell geplant und montiert im Berner Oberland. Alles aus einer Hand."
      />

      <JsonLd data={localBusiness()} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: site.url, inLanguage: 'de-CH' }} />

      {/* 1 Hero */}
      <Hero
        size="lg"
        overlay="soft"
        image="/images/home/home-hero.webp"
        imageAlt="Visualisierung: Terrassenüberdachung aus Stahl und Glas mit warmem LED-Lichtprofil bei Sonnenuntergang, Blick über See und Berge"
        eyebrow={`${site.name} · ${site.region}`}
        title={
          <>
            Stahl. Glas. Solar.
            <br />
            <span className="text-gold lg:whitespace-nowrap">Für Generationen.</span>
          </>
        }
        subtitle="Langlebige, individuell geplante Lösungen aus Stahl, Glas und Solar. Von der ersten Idee bis zur Montage, alles aus einer Hand."
      >
        <Button to="/anfrage" arrow>
          Projekt anfragen
        </Button>
        <Button to="#produkte" variant="outline-light">
          Lösungen entdecken
        </Button>
      </Hero>

      {/* 2 Einleitung */}
      <section aria-labelledby="intro-title" className="section on-light">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <SectionHeading
              id="intro-title"
              eyebrow="Unser Anspruch"
              title="Komplette Lösungen statt einzelner Bauteile."
            />
          </Reveal>
          <Reveal delay={100} className="space-y-6 text-lg leading-relaxed text-graphite">
            <p>
              Wir verbinden klassisches Metallbau-Handwerk mit moderner Architektur, hochwertigem Design und zukunftsorientierter
              Energietechnik.
            </p>
            <p>
              Wir entwickeln komplette Lösungen: von der ersten Idee über Planung und Konstruktion bis zur Lieferung, Montage und
              Fertigstellung.
            </p>
            <p>
              Ob Einfamilienhaus, Mehrfamilienhaus, Hotel, Gewerbebau oder grössere Überbauung: Wir planen jedes Projekt passend zum
              Gebäude, zu Ihnen und zur Umgebung.
            </p>
            <p className="claim-script pt-4 text-5xl text-steel">{site.signature}</p>
          </Reveal>
        </div>
      </section>

      {/* 3 Produkt-Highlights */}
      <section id="produkte" aria-labelledby="produkte-title" className="section scroll-mt-20 bg-concrete on-light">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              id="produkte-title"
              eyebrow="Produkte"
              title="Durchdachte Systeme, individuell anpassbar."
              intro="Sieben Produktlinien als Ausgangspunkt. Masse, Materialien und Ausstattung passen wir Ihrem Projekt an."
            />
          </Reveal>
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {produkte.map((p, i) => (
              <li key={p.slug}>
                <Reveal delay={(i % 4) * 70} className="h-full">
                  <ProductCard p={p} />
                </Reveal>
              </li>
            ))}
            <li>
              <Reveal delay={210} className="h-full">
                <div className="flex h-full min-h-72 flex-col justify-between bg-steel p-6 text-white">
                  <div>
                    <p className="eyebrow text-gold">Sonderkonstruktion</p>
                    <p className="mt-4 leading-relaxed text-white/80">
                      Nicht jedes Projekt lässt sich mit einem Standardprodukt lösen. Wir entwickeln die passende Konstruktion.
                    </p>
                  </div>
                  <div className="mt-8 flex flex-col gap-3">
                    <Button to="/produkte" variant="outline-light" arrow>
                      Alle Produkte
                    </Button>
                  </div>
                </div>
              </Reveal>
            </li>
          </ul>
        </div>
      </section>

      {/* 4 Leistungen */}
      <section aria-labelledby="leistungen-title" className="section on-light">
        <div className="container-site">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionHeading
                id="leistungen-title"
                eyebrow="Leistungen"
                title="Vom Glasvordach bis zur Balkonanlage."
                intro="Vom privaten Wintergarten bis zur gewerblichen Stahlkonstruktion. Vom Carport bis zum energieproduzierenden Lärmschutzsystem."
              />
            </Reveal>
            <TextLink to="/leistungen">Alle Leistungen</TextLink>
          </div>
          <ul className="mt-14 grid gap-px overflow-hidden bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-4">
            {leistungen.map((l) => (
              <li key={l.slug}>
                <ServiceCard l={l} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Referenz */}
      <section aria-labelledby="referenz-title" className="section bg-concrete on-light">
        <div className="container-site">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionHeading
                id="referenz-title"
                eyebrow="Referenz"
                title="Aus der Praxis."
                intro="Vom Konzept bis zur Materialplanung: So planen wir eine Carport-Anlage für rund 120 Fahrzeuge."
              />
            </Reveal>
            <TextLink to="/referenzen">Alle Referenzen</TextLink>
          </div>
          <div className="mt-14">
            {referenzen[0] && <ReferenzCard r={referenzen[0]} />}
          </div>
        </div>
      </section>

      {/* 5 Stahl + Glas + Solar */}
      <section aria-labelledby="kombi-title" className="bg-steel text-white">
        <div className="grid lg:grid-cols-2 [&>*]:min-w-0">
          <div className="relative aspect-[4/3] lg:aspect-auto">
            <Img
              src="/images/home/home-stahl-glas-solar.webp"
              alt="Visualisierung: Solar-Carport mit Photovoltaik-Dach, LED-Lichtprofil und Wallbox, darunter zwei Fahrzeuge"
              width={1600}
              height={1200}
              responsive
              sizes="(min-width: 1024px) 50vw, 100vw"
              deferred
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="px-4 py-20 sm:px-12 lg:px-16 lg:py-32 xl:px-24">
            <Reveal>
              <p className="eyebrow text-gold">Stahl + Glas + Solar</p>
              <h2 id="kombi-title" className="mt-5 text-xl leading-snug sm:text-2xl">
                Ein Carport wird zum Solarkraftwerk.
                <br />
                <span className="text-gold">Eine Lärmschutzwand produziert Strom.</span>
              </h2>
              <span aria-hidden className="gold-rule mt-6" />
              <p className="mt-6 text-lg leading-relaxed text-white/75">
                Eine Terrassenüberdachung wird zum zusätzlichen Wohnraum. Ein Balkon verändert die Architektur eines ganzen Gebäudes. Wir
                entwickeln Bauteile, die mehr als eine Funktion erfüllen.
              </p>
              <dl className="mt-10 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
                {[
                  ['Stahl', 'für Stabilität'],
                  ['Glas', 'für Architektur'],
                  ['Solar', 'für die Zukunft'],
                ].map(([a, b]) => (
                  <div key={a}>
                    <dt className="font-display text-sm tracking-[0.12em] uppercase">{a}</dt>
                    <dd className="mt-1 text-sm text-white/65">{b}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button to="/leistungen/solarkonstruktionen" variant="outline-light" arrow>
                  Solarkonstruktionen
                </Button>
                <Button to="/leistungen/laermschutz-photovoltaik" variant="outline-light" arrow>
                  Lärmschutz mit PV
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6 Projektablauf */}
      <section aria-labelledby="ablauf-title" className="section bg-concrete on-light">
        <div className="container-site">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionHeading
                id="ablauf-title"
                eyebrow="Projektablauf"
                title="Ein Ansprechpartner. Von der Beratung bis zum Service."
                intro="Sie müssen nicht zahlreiche Unternehmen koordinieren. Wir betreuen Ihr Projekt vom ersten Gespräch bis zum Unterhalt."
              />
            </Reveal>
            <TextLink to="/projektablauf">Projektablauf im Detail</TextLink>
          </div>
          <div className="mt-14">
            <ProcessSteps />
          </div>
        </div>
      </section>

      {/* 7 Warum BEO */}
      <section aria-labelledby="warum-title" className="section on-light">
        <div className="container-site">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionHeading id="warum-title" eyebrow="Warum BEO" title="Mehr als Metallbau." />
            </Reveal>
            <TextLink to="/warum-beo">Alle Gründe</TextLink>
          </div>
          <div className="mt-14 ring-1 ring-line">
            <ReasonsGrid items={gruende.filter((g) => g.home)} />
          </div>
        </div>
      </section>

      {/* 8 Zielgruppen */}
      <section aria-labelledby="zielgruppen-title" className="on-light">
        <h2 id="zielgruppen-title" className="sr-only">
          Für Privatkunden und Fachpartner
        </h2>
        <AudienceSplit />
      </section>

      {/* 9 CTA */}
      <CtaBlock />
    </>
  );
}
