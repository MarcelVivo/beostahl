import { useParams } from 'react-router';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { JsonLd } from '@/seo/JsonLd';
import { site } from '@/data/site';
import { Seo } from '@/seo/Seo';
import { getProdukt, produkte } from '@/data/produkte';
import { getLeistung } from '@/data/leistungen';
import { Hero } from '@/components/sections/Hero';
import { CtaBlock } from '@/components/sections/CtaBlock';
import { BenefitRow } from '@/components/product/BenefitRow';
import { DetailGrid } from '@/components/product/DetailGrid';
import { TechOverview } from '@/components/product/TechOverview';
import { KeyFigures } from '@/components/product/KeyFigures';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { ProductCard } from '@/components/cards/ProductCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { NotFoundPage } from './NotFoundPage';
import { FontanaTeaser } from '@/components/sections/FontanaTeaser';

export function ProductPage() {
  const { slug = '' } = useParams();
  const p = getProdukt(slug);
  if (!p) return <NotFoundPage />;

  const passend = p.leistungen.map(getLeistung).filter((l) => l !== undefined);
  const weitere = produkte.filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <Seo title={p.seo.title} description={p.seo.description} image={`/images/produkte/${p.slug}-hero.webp`} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: p.name,
          description: `${p.subtitle}. ${p.seo.description}`,
          category: p.category,
          image: `${site.url}/images/produkte/${p.slug}-hero.webp`,
          url: `${site.url}/produkte/${p.slug}`,
          brand: { '@type': 'Brand', name: site.name },
          manufacturer: { '@id': `${site.url}/#unternehmen` },
          additionalProperty: p.masse.map((m) => ({ '@type': 'PropertyValue', name: m.label, value: m.value })),
        }}
      />

      <Hero
        overlay="soft"
        image={`/images/produkte/${p.slug}-hero.webp`}
        imageAlt={p.heroAlt}
        top={<Breadcrumbs items={[{ label: 'Produkte', to: '/produkte' }, { label: p.shortName, to: `/produkte/${p.slug}` }]} />}
        eyebrow={p.category}
        title={p.name}
        subtitle={
          <>
            {p.subtitle}
            <span className="mt-3 block text-base text-white/65">Beispielkonfiguration: {p.masseKurz}</span>
          </>
        }
      >
        <Button to={`/anfrage?loesung=${p.slug}`} arrow>
          Projekt anfragen
        </Button>
        <Button to="#technik" variant="outline-light">
          Technik ansehen
        </Button>
      </Hero>

      {/* Vorteile */}
      <section aria-labelledby="vorteile-title" className="section on-light">
        <div className="container-site">
          <Reveal>
            <SectionHeading id="vorteile-title" eyebrow="Vorteile" title="Das Wichtigste auf einen Blick" />
          </Reveal>
          <div className="mt-14">
            <BenefitRow items={p.vorteile} />
          </div>
        </div>
      </section>

      {/* Details */}
      <section aria-labelledby="details-title" className="section bg-concrete on-light">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              id="details-title"
              eyebrow="Details"
              title="Konstruktion im Detail"
              intro="Jedes Detail ist Teil des Gesamtsystems: Tragwerk, Entwässerung, Licht und Energie."
            />
          </Reveal>
          <div className="mt-14">
            <DetailGrid items={p.details} />
          </div>
        </div>
      </section>

      <div className="on-light">
        <TechOverview p={p} />
      </div>

      <KeyFigures items={p.kennzahlen} />

      {/* Passende Leistungen und weitere Produkte */}
      <section aria-labelledby="passend-title" className="section on-light">
        <div className="container-site">
          <Reveal>
            <SectionHeading id="passend-title" eyebrow="Passend dazu" title="Leistungen rund um dieses Produkt" />
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {passend.map((l) => (
              <li key={l.slug} className="ring-1 ring-line">
                <ServiceCard l={l} />
              </li>
            ))}
          </ul>

          <h2 className="mt-24 text-lg text-steel sm:text-xl">Weitere Produkte</h2>
          <span aria-hidden className="gold-rule mt-6" />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {weitere.map((x) => (
              <li key={x.slug}>
                <ProductCard p={x} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {(p.slug === 'living-w20-pro' || p.slug === 'terrace-t6-solar-glass') && <FontanaTeaser className="border-b border-white/10" />}

      <CtaBlock
        preselect={p.slug}
        title={`Interessiert am ${p.name}?`}
        text="Wir passen Masse, Materialien und Ausstattung an Ihr Projekt an. Senden Sie uns Ihre Anfrage, gerne mit Fotos oder Plänen."
      />
    </>
  );
}
