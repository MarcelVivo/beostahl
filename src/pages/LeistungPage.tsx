import { useParams } from 'react-router';
import { Seo } from '@/seo/Seo';
import { JsonLd } from '@/seo/JsonLd';
import { site } from '@/data/site';
import { getLeistung, leistungen } from '@/data/leistungen';
import { getProdukt } from '@/data/produkte';
import { referenzenFuer } from '@/data/referenzen';
import { ReferenzCard } from '@/components/cards/ReferenzCard';
import { Hero } from '@/components/sections/Hero';
import { CtaBlock } from '@/components/sections/CtaBlock';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { ProductCard } from '@/components/cards/ProductCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CheckList } from '@/components/ui/CheckList';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { NotFoundPage } from './NotFoundPage';
import { KonstruktionsFigur } from '@/components/zeichnungen/KonstruktionsFigur';
import { LEISTUNG_ZEICHNUNG } from '@/components/zeichnungen/konfig';

const EINSATZ = 'Einsatzbereiche';

export function LeistungPage() {
  const { slug = '' } = useParams();
  const l = getLeistung(slug);
  if (!l) return <NotFoundPage />;

  const ausfuehrungen = l.lists.filter((b) => b.title !== EINSATZ);
  const einsatz = l.lists.find((b) => b.title === EINSATZ);
  const produkte = l.produkte.map(getProdukt).filter((p) => p !== undefined);
  const verwandt = leistungen.filter((x) => x.group === l.group && x.slug !== l.slug);
  const refs = referenzenFuer(l.slug);
  const konstruktion = LEISTUNG_ZEICHNUNG[l.slug];

  return (
    <>
      <Seo title={l.seo.title} description={l.seo.description} image={`/images/leistungen/${l.slug}-hero.webp`} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: l.title,
          serviceType: l.title,
          description: l.seo.description,
          url: `${site.url}/leistungen/${l.slug}`,
          provider: { '@id': `${site.url}/#unternehmen` },
          areaServed: { '@type': 'AdministrativeArea', name: 'Berner Oberland' },
        }}
      />

      <Hero
        overlay="soft"
        image={`/images/leistungen/${l.slug}-hero.webp`}
        imageAlt={`Visualisierung: ${l.title}`}
        top={<Breadcrumbs items={[{ label: 'Leistungen', to: '/leistungen' }, { label: l.title, to: `/leistungen/${l.slug}` }]} />}
        eyebrow={l.group}
        title={l.title}
        subtitle={l.teaser}
      >
        <Button to={`/anfrage?loesung=${l.slug}`} arrow>Projekt anfragen</Button>
        <Button to="/leistungen" variant="outline-light">Alle Leistungen</Button>
      </Hero>

      {/* Einleitung und Ausführungen */}
      <section aria-labelledby="ueberblick-title" className="section on-light">
        <div className="container-site grid gap-14 lg:grid-cols-[5fr_7fr] lg:gap-24">
          <Reveal>
            <SectionHeading id="ueberblick-title" eyebrow="Überblick" title="Was wir für Sie umsetzen" />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-graphite">
              {l.intro.map((t) => <p key={t}>{t}</p>)}
            </div>
            <l.icon aria-hidden strokeWidth={1} className="mt-12 hidden size-16 text-gold-text lg:block" />
          </Reveal>
          <div className="space-y-12">
            {ausfuehrungen.map((b, i) => (
              <Reveal key={b.title} delay={i * 80}>
                <h2 className="eyebrow mb-6 border-b border-line pb-4 text-gold-text">{b.title}</h2>
                <CheckList items={b.items} columns={b.items.length > 5 ? 2 : 1} />
              </Reveal>
            ))}
            {l.outro && (
              <Reveal>
                <div className="border-l-2 border-gold bg-concrete p-6 sm:p-8">
                  {l.outro.map((t) => (
                    <p key={t} className="text-lg leading-relaxed text-steel">{t}</p>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* Konstruktionsprinzip */}
      {konstruktion && (
        <section aria-labelledby="konstruktion-title" className="section bg-concrete on-light">
          <div className="container-site">
            <Reveal>
              <SectionHeading id="konstruktion-title" eyebrow="Technik" title="Konstruktionsprinzip" />
            </Reveal>
            <Reveal className="mt-12">
              <KonstruktionsFigur
                zeichnung={konstruktion.zeichnung}
                titel={konstruktion.titel}
                legende={konstruktion.legende.map(([text, anker]) => ({ text, anker }))}
              />
            </Reveal>
          </div>
        </section>
      )}

      {/* Einsatzbereiche */}
      {einsatz && (
        <section aria-labelledby="einsatz-title" className="bg-steel py-16 text-white lg:py-20">
          <div className="container-site">
            <h2 id="einsatz-title" className="eyebrow text-gold">{EINSATZ}</h2>
            <ul className="mt-8 flex flex-wrap gap-3">
              {einsatz.items.map((t) => (
                <li key={t} className="border border-white/20 px-4 py-2 text-sm text-white/85">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Passende Produkte */}
      {produkte.length > 0 && (
        <section aria-labelledby="produkte-title" className="section bg-concrete on-light">
          <div className="container-site">
            <Reveal>
              <SectionHeading
                id="produkte-title"
                eyebrow="Passende Produkte"
                title="Systeme für diese Leistung"
                intro="Unsere Produktlinien sind Ausgangspunkte. Masse und Ausstattung passen wir Ihrem Projekt an."
              />
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
      )}

      {/* Referenzen */}
      {refs.length > 0 && (
        <section aria-labelledby="referenz-title" className="section on-light">
          <div className="container-site">
            <Reveal>
              <SectionHeading id="referenz-title" eyebrow="Referenz" title="Aus der Praxis" />
            </Reveal>
            <ul className="mt-12 grid gap-8">
              {refs.map((r) => (
                <li key={r.slug}>
                  <ReferenzCard r={r} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Verwandte Leistungen */}
      <section aria-labelledby="verwandt-title" className={refs.length > 0 ? 'section bg-concrete on-light' : 'section on-light'}>
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

      <CtaBlock preselect={l.slug} title={`${l.title} für Ihr Projekt?`} />
    </>
  );
}
