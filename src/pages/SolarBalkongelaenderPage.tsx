import { ArrowDown } from 'lucide-react';
import { Seo } from '@/seo/Seo';
import { JsonLd } from '@/seo/JsonLd';
import { site } from '@/data/site';
import { getLeistung, leistungen } from '@/data/leistungen';
import { SOLAR_BALKON_SLUG, solarBild, solarClaim, solarVarianten, solarVorteile } from '@/data/solarBalkon';
import { CtaBlock } from '@/components/sections/CtaBlock';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Img } from '@/components/ui/Img';
import { Reveal } from '@/components/ui/Reveal';
import { cx, nr } from '@/lib';
import { SolarTechnik } from '@/components/solar/SolarTechnik';

/** Eigene Seite für die Leistung «Solar-Balkongeländer» mit sechs Varianten. */
export function SolarBalkongelaenderPage() {
  const l = getLeistung(SOLAR_BALKON_SLUG)!;
  const verwandt = leistungen.filter((x) => ['anbaubalkone', 'ganzglasgelaender', 'solarkonstruktionen', 'gelaender'].includes(x.slug));

  return (
    <>
      <Seo title={l.seo.title} description={l.seo.description} image={solarBild(1, 'beispiel')} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: l.title,
          serviceType: 'Balkongeländer mit integrierter Photovoltaik',
          description: l.seo.description,
          url: `${site.url}/leistungen/${SOLAR_BALKON_SLUG}`,
          provider: { '@id': `${site.url}/#unternehmen` },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Varianten',
            itemListElement: solarVarianten.map((v) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: `${l.title} ${v.name}` } })),
          },
        }}
      />

      {/* Seitenkopf mit Beispielraster */}
      <section className="bg-steel text-white">
        <div className="container-site pt-10 pb-16 lg:pt-14 lg:pb-24">
          <Breadcrumbs items={[{ label: 'Leistungen', to: '/leistungen' }, { label: l.title, to: `/leistungen/${SOLAR_BALKON_SLUG}` }]} />
          <div className="mt-12 grid items-stretch gap-12 lg:mt-16 lg:grid-cols-[5fr_6fr] lg:gap-14">
            <div>
              <p className="eyebrow mb-6 text-gold">Design · Energie · Qualität</p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl">
                Solar-<wbr />
                Balkon­geländer
              </h1>
              <span aria-hidden className="gold-rule mt-8 w-24" />
              <p className="claim-script mt-8 text-4xl text-white/90 sm:text-5xl">{solarClaim}</p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
                Balkongeländer mit integrierter Photovoltaik: Sie schützen, prägen die Fassade und erzeugen Strom. In sechs Varianten, für
                Neubau und Sanierung.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button to={`/anfrage?loesung=${SOLAR_BALKON_SLUG}`} arrow>Projekt anfragen</Button>
                <Button to="#varianten" variant="outline-light">Varianten ansehen</Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:min-h-[30rem] lg:grid-cols-[3fr_2fr] lg:grid-rows-2">
              {[
                { nr: 2, cls: 'col-span-2 aspect-[4/3] lg:col-span-1 lg:row-span-2 lg:aspect-auto' },
                { nr: 3, cls: 'aspect-[4/3] lg:aspect-auto' },
                { nr: 5, cls: 'aspect-[4/3] lg:aspect-auto' },
              ].map(({ nr: n, cls }, i) => {
                const v = solarVarianten.find((x) => x.nr === n)!;
                return (
                  <figure key={n} className={cx('relative overflow-hidden', cls)}>
                    <Img
                      src={solarBild(n, 'beispiel')}
                      alt={`Visualisierung Solar-Balkongeländer, Beispiel ${v.beispiel}`}
                      width={1600}
                      height={1200}
                      responsive
                      sizes={i === 0 ? '(min-width: 1024px) 30vw, 100vw' : '(min-width: 1024px) 20vw, 50vw'}
                      priority={i === 0}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-steel/85 to-transparent px-4 pt-8 pb-3 font-display text-[0.625rem] tracking-[0.14em] text-white uppercase">
                      {v.beispiel}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Vorteile */}
      <section aria-labelledby="vorteile-title" className="border-b border-line bg-white py-14 lg:py-16">
        <div className="container-site">
          <h2 id="vorteile-title" className="sr-only">Vorteile</h2>
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {solarVorteile.map((v) => (
              <li key={v.title} className="flex gap-4">
                <v.icon aria-hidden strokeWidth={1.25} className="size-8 shrink-0 text-gold-text" />
                <div>
                  <p className="font-display text-[0.6875rem] leading-relaxed tracking-[0.12em] text-steel uppercase">{v.title}</p>
                  <p className="mt-1 text-sm text-graphite">{v.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Variantenübersicht */}
      <section id="varianten" aria-labelledby="varianten-title" className="section scroll-mt-20 bg-concrete on-light">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              id="varianten-title"
              eyebrow="Sechs Varianten"
              title="Für jedes Gebäude die passende Lösung"
              intro="Von der robusten Klassik bis zum unsichtbar integrierten Indachpanel. Wählen Sie eine Variante für Schnitt und Aufbau."
            />
          </Reveal>
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {solarVarianten.map((v, i) => (
              <li key={v.nr}>
                <Reveal delay={(i % 3) * 70} className="h-full">
                  <a href={`#variante-${v.nr}`} className="group flex h-full flex-col bg-white ring-1 ring-line transition-shadow hover:shadow-xl">
                    <div className="relative aspect-[4/3] overflow-hidden bg-steel">
                      <Img
                        src={solarBild(v.nr, 'foto')}
                        alt={`Visualisierung Solar-Balkongeländer Variante ${v.nr}, ${v.name}`}
                        width={1600}
                        height={1200}
                        responsive
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        deferred
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gold" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="eyebrow text-gold-text">Variante {v.nr}</p>
                      <h3 className="mt-3 text-[0.875rem] text-steel">
                        {v.name}
                        {v.zusatz && <span className="mt-1 block text-[0.625rem] tracking-[0.1em] text-graphite">{v.zusatz}</span>}
                      </h3>
                      <p className="mt-2 text-sm text-graphite">{v.kurz}</p>
                      <p className="mt-auto flex items-center gap-2 pt-6 font-display text-[0.625rem] tracking-[0.16em] text-gold-text uppercase">
                        Schnitt und Aufbau
                        <ArrowDown aria-hidden strokeWidth={1.5} className="size-4 transition-transform group-hover:translate-y-0.5" />
                      </p>
                    </div>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Details je Variante */}
      {solarVarianten.map((v, i) => (
        <section
          key={v.nr}
          id={`variante-${v.nr}`}
          aria-labelledby={`variante-${v.nr}-title`}
          className={cx('scroll-mt-20 py-16 lg:py-24 on-light', i % 2 ? 'bg-concrete' : 'bg-white')}
        >
          <div className="container-site">
            <SolarTechnik v={v} />
          </div>
        </section>
      ))}

      {/* Beispiele */}
      <section aria-labelledby="beispiele-title" className="section bg-steel text-white">
        <div className="container-site">
          <Reveal>
            <SectionHeading id="beispiele-title" tone="dark" eyebrow="Beispiele" title="So wirkt es am Gebäude" />
          </Reveal>
          <ul className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
            {solarVarianten.map((v) => (
              <li key={v.nr}>
                <figure>
                  <div className="aspect-[4/3] overflow-hidden">
                    <Img
                      src={solarBild(v.nr, 'beispiel')}
                      alt={`Visualisierung Beispiel ${v.nr}: Solar-Balkongeländer am Objekt ${v.beispiel}`}
                      width={1600}
                      height={1200}
                      responsive
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      deferred
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 flex items-baseline gap-3 border-t border-gold/60 pt-3">
                    <span aria-hidden className="font-display text-[0.6875rem] text-gold">{nr(v.nr)}</span>
                    <span className="font-display text-[0.625rem] tracking-[0.14em] uppercase sm:text-[0.6875rem]">{v.beispiel}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-white/65">
            Visualisierungen und Konzeptdetails. Aufbau, Masse, Statik und elektrische Einbindung werden objektspezifisch geplant.
          </p>
        </div>
      </section>

      {/* Verwandte Leistungen */}
      <section aria-labelledby="verwandt-title" className="section on-light">
        <div className="container-site">
          <Reveal>
            <SectionHeading id="verwandt-title" eyebrow={l.group} title="Weitere Leistungen" />
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {verwandt.map((x) => (
              <li key={x.slug} className="ring-1 ring-line">
                <ServiceCard l={x} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBlock preselect={SOLAR_BALKON_SLUG} title="Welche Variante passt zu Ihrem Balkon?" text="Senden Sie uns Fotos oder Pläne Ihres Gebäudes. Wir beraten Sie zu Variante, Aufbau und Energieertrag." />
    </>
  );
}
