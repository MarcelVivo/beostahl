import { Seo } from '@/seo/Seo';
import { referenzen } from '@/data/referenzen';
import { PageHeader } from '@/components/sections/PageHeader';
import { CtaBlock } from '@/components/sections/CtaBlock';
import { ReferenzCard } from '@/components/cards/ReferenzCard';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function ReferenzenPage() {
  return (
    <>
      <Seo
        title="Referenzen"
        description="Projekte von BEO Stahl & Glasbau: Carport-Anlagen, Stahlbau und Konstruktionen aus Stahl, Glas und Solar. Mit Plänen, Massen und Materialangaben."
      />
      <PageHeader
        crumbs={[{ label: 'Referenzen', to: '/referenzen' }]}
        eyebrow="Referenzen"
        title="Projekte aus Stahl, Glas und Solar."
        intro="Einblick in unsere Projekte: von der ersten Konzeptzeichnung über Statik und Fundation bis zur Materialplanung."
      />
      <section aria-labelledby="projekte-title" className="section bg-concrete on-light">
        <div className="container-site">
          <Reveal>
            <SectionHeading id="projekte-title" eyebrow="Projekte" title="Ausgewählte Projekte" />
          </Reveal>
          <ul className="mt-12 grid gap-8">
            {referenzen.map((r) => (
              <li key={r.slug}>
                <Reveal>
                  <ReferenzCard r={r} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBlock title="Planen Sie ein ähnliches Projekt?" text="Senden Sie uns Pläne und Eckdaten. Wir erarbeiten ein Konzept mit Massen, Fundation und Materialplanung." />
    </>
  );
}
