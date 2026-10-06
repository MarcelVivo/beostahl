import { ArrowUpRight } from 'lucide-react';
import { Seo } from '@/seo/Seo';
import { JsonLd } from '@/seo/JsonLd';
import { site } from '@/data/site';
import { getLeistung } from '@/data/leistungen';
import { FONTANA_SLUG, FONTANA_URL, fontanaFakten, fontanaKategorien, fontanaLeistungen, fontanaProdukte } from '@/data/fontana';
import { Hero } from '@/components/sections/Hero';
import { CtaBlock } from '@/components/sections/CtaBlock';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Img } from '@/components/ui/Img';
import { Reveal } from '@/components/ui/Reveal';
import { KonstruktionsFigur } from '@/components/zeichnungen/KonstruktionsFigur';

export function FontanaPage() {
  const kombi = ['terrassenueberdachungen', 'wintergaerten', 'sonderkonstruktionen', 'stahlbau'].map(getLeistung).filter((l) => l !== undefined);
  return (
    <>
      <Seo
        title="Fontana Forni: Pizzaöfen, Grills und Aussenküchen"
        description="BEO Stahl & Glasbau ist offizieller Vertriebspartner von Fontana Forni. Pizzaöfen, Holzöfen, Grills und Aussenküchen Ignes: Beratung, Verkauf, Montage und Service im Berner Oberland."
        image="/images/fontana/fontana-hero.webp"
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Fontana Forni: Verkauf, Montage und Service',
          serviceType: 'Vertrieb, Montage und Wartung von Pizzaöfen, Grills und Aussenküchen',
          url: `${site.url}/${FONTANA_SLUG}`,
          provider: { '@id': `${site.url}/#unternehmen` },
          brand: { '@type': 'Brand', name: 'Fontana Forni', url: FONTANA_URL },
          areaServed: { '@type': 'AdministrativeArea', name: 'Berner Oberland' },
        }}
      />

      <Hero
        overlay="soft"
        image="/images/fontana/fontana-hero.webp"
        imageAlt="Aussenküche Ignes von Fontana Forni mit rotem Pizzaofen auf einer Terrasse"
        top={<Breadcrumbs items={[{ label: 'Fontana Forni', to: `/${FONTANA_SLUG}` }]} />}
        eyebrow="Offizieller Vertriebspartner"
        title={
          <>
            <span className="sr-only">Fontana Forni</span>
            <img src="/brand/partner/fontana-white.svg" alt="" width={148} height={14} className="h-7 w-auto sm:h-9 lg:h-11" />
            <span className="mt-5 block text-xl sm:text-2xl lg:text-3xl">Pizzaöfen, Grills und Aussenküchen</span>
          </>
        }
        subtitle="Italienische Handwerkskunst seit 1946. Wir beraten, liefern, montieren und warten. Und wir bauen das Dach, den Unterbau und den Rauchabzug gleich mit."
      >
        <Button to={`/anfrage?loesung=${FONTANA_SLUG}`} arrow>
          Beratung anfragen
        </Button>
        <Button to="#sortiment" variant="outline-light">
          Sortiment ansehen
        </Button>
      </Hero>

      {/* Über Fontana */}
      <section aria-labelledby="fontana-title" className="section on-light">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <SectionHeading id="fontana-title" eyebrow="Die Marke" title="Feuer, Stahl und Leidenschaft aus Italien." />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-graphite">
              <p>
                Fontana Forni baut seit 1946 Öfen und Grills aus Stahl, in der dritten Generation und mit Werkstatt in den Marken.
                Die Produkte stehen heute in über 40 Ländern.
              </p>
              <p>
                Als offizieller Vertriebspartner bringt BEO Stahl & Glasbau Fontana ins Berner Oberland. Von der Beratung über die Montage
                bis zum Service.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <dl className="grid gap-px overflow-hidden bg-line ring-1 ring-line sm:grid-cols-3 lg:grid-cols-1">
              {fontanaFakten.map(([zahl, text]) => (
                <div key={zahl} className="bg-white p-6">
                  <dt className="font-display text-2xl text-steel">{zahl}</dt>
                  <dd className="mt-2 text-sm text-graphite">{text}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Sortiment */}
      <section id="sortiment" aria-labelledby="sortiment-title" className="section scroll-mt-20 bg-concrete on-light">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              id="sortiment-title"
              eyebrow="Sortiment"
              title="Vom Pizzaofen bis zur ganzen Aussenküche"
              intro="Eine Auswahl aus dem Fontana-Sortiment. Wir liefern das ganze Programm, inklusive Zubehör."
            />
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {fontanaKategorien.map((k) => (
              <li key={k.titel}>
                <a href={k.url} target="_blank" rel="noopener" className="group flex h-full flex-col bg-white p-6 ring-1 ring-line transition-colors hover:ring-gold">
                  <span className="flex items-start justify-between">
                    <span className="font-display text-[0.8125rem] tracking-[0.1em] text-steel uppercase">{k.titel}</span>
                    <ArrowUpRight aria-hidden strokeWidth={1.5} className="size-4 text-graphite/60 group-hover:text-gold-text" />
                  </span>
                  <span className="mt-3 text-sm leading-relaxed text-graphite">{k.text}</span>
                  <span className="sr-only"> (Fontana-Website, neuer Tab)</span>
                </a>
              </li>
            ))}
          </ul>

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fontanaProdukte.map((p, i) => (
              <li key={p.name}>
                <Reveal delay={(i % 3) * 70} className="h-full">
                  <article className="flex h-full flex-col bg-white ring-1 ring-line">
                    <div className="aspect-square overflow-hidden bg-white p-6">
                      <Img src={p.bild} alt={`Fontana ${p.name}, ${p.kategorie}`} width={800} height={800} deferred className="h-full w-full object-contain" />
                    </div>
                    <div className="flex flex-1 flex-col border-t border-line p-6">
                      <p className="eyebrow text-gold-text">
                        {p.kategorie} · {p.brennstoff}
                      </p>
                      <h3 className="mt-3 text-[0.9375rem] text-steel">{p.name}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-graphite">{p.text}</p>
                      <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-line pt-4 text-sm">
                        {p.fakten.map(([k, v]) => (
                          <div key={k}>
                            <dt className="text-xs text-graphite">{k}</dt>
                            <dd className="mt-1 text-steel">{v}</dd>
                          </div>
                        ))}
                      </dl>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener"
                        className="group mt-auto inline-flex min-h-11 items-center gap-2 pt-5 font-display text-[0.625rem] tracking-[0.16em] text-gold-text uppercase"
                      >
                        Details bei Fontana
                        <ArrowUpRight aria-hidden strokeWidth={1.5} className="size-4" />
                        <span className="sr-only"> zu {p.name} (neuer Tab)</span>
                      </a>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-graphite">Angaben gemäss Fontana Forni. Modelle, Grössen und Ausführungen beraten wir gerne persönlich.</p>
        </div>
      </section>

      {/* Leistungen BEO */}
      <section aria-labelledby="leistung-title" className="section on-light">
        <div className="container-site">
          <Reveal>
            <SectionHeading id="leistung-title" eyebrow="Was BEO leistet" title="Alles aus einer Hand. Auch beim Feuer." />
          </Reveal>
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {fontanaLeistungen.map((l, i) => (
              <li key={l.title}>
                <Reveal delay={i * 80} className="h-full border-l border-gold pl-6">
                  <l.icon aria-hidden strokeWidth={1.25} className="size-8 text-gold-text" />
                  <h3 className="mt-5 text-[0.8125rem] text-steel">{l.title}</h3>
                  <p className="mt-3 leading-relaxed text-graphite">{l.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Technik */}
      <section aria-labelledby="einbau-title" className="section bg-concrete on-light">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              id="einbau-title"
              eyebrow="Technik"
              title="Einbau unter dem eigenen Dach"
              intro="Unsere Stärke: Ofen, Unterbau und Überdachung kommen von einem Partner. Statik, Rauchabzug und Anschlüsse sind aufeinander abgestimmt."
            />
          </Reveal>
          <Reveal className="mt-12">
            <KonstruktionsFigur
              zeichnung="aussenkueche"
              titel="Aussenküche mit Pizzaofen unter Terrassenüberdachung"
              legende={[
                { text: 'Pizzaofen, z. B. Fontana', anker: 'ofen' },
                { text: 'Rauchrohr mit Aufsatz', anker: 'rauchrohr' },
                { text: 'Dachdurchführung', anker: 'durchfuehrung' },
                { text: 'Arbeitsfläche Edelstahl', anker: 'arbeitsplatte' },
                { text: 'Unterbau Stahl, mit Holzlager und Stauraum', anker: 'unterbau' },
                { text: 'Gasanschluss (bei Gas- und Hybridöfen)', anker: 'anschluss' },
                { text: 'Terrassenüberdachung aus Stahl und Glas', anker: 'dach' },
                { text: 'Fundament und Bodenplatte', anker: 'fundament' },
              ]}
              hinweis="Nicht massstäblich. Abstände zu brennbaren Teilen, Rauchabzug und Anschlüsse planen wir nach Herstellerangaben und Vorschriften."
            />
          </Reveal>
        </div>
      </section>

      {/* Kombinationen */}
      <section aria-labelledby="kombi-title" className="section on-light">
        <div className="container-site">
          <Reveal>
            <SectionHeading id="kombi-title" eyebrow="Kombinieren" title="Der passende Rahmen für Ihr Feuer" />
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {kombi.map((l) => (
              <li key={l.slug} className="ring-1 ring-line">
                <ServiceCard l={l} />
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-graphite">
            Mehr zu Fontana Forni auf{' '}
            <a href={FONTANA_URL} target="_blank" rel="noopener" className="text-gold-text underline underline-offset-4">
              fontanaforni.com<span className="sr-only"> (neuer Tab)</span>
            </a>
            .
          </p>
        </div>
      </section>

      <CtaBlock
        preselect={FONTANA_SLUG}
        title="Pizza, Grill oder ganze Aussenküche?"
        text="Erzählen Sie uns von Ihrem Platz und Ihren Wünschen. Wir beraten Sie zu Modell, Standort und Einbau."
      />
    </>
  );
}
