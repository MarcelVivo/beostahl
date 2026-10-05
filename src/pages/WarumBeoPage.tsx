import { Seo } from '@/seo/Seo';
import { gruende } from '@/data/gruende';
import { Hero } from '@/components/sections/Hero';
import { CtaBlock } from '@/components/sections/CtaBlock';
import { ReasonsGrid } from '@/components/sections/ReasonsGrid';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

export const anspruch = [
  'Von einem kleinen Glasvordach bis zu einer kompletten Balkonanlage.',
  'Vom privaten Wintergarten bis zur gewerblichen Stahlkonstruktion.',
  'Vom klassischen Carport bis zum Solar-Carport.',
  'Von der einfachen Sichtschutzwand bis zum energieproduzierenden Lärmschutzsystem.',
];

export function WarumBeoPage() {
  return (
    <>
      <Seo
        title="Warum BEO Stahl & Glasbau"
        description="Mehr als Metallbau: Stahl, Glas, Solar und Architektur aus einer Hand. Individuell geplant, modernes Design, regionaler Ansprechpartner und Qualität vor billig."
      />
      <Hero
        overlay="soft"
        image="/images/seiten/warum-beo-hero.webp"
        imageAlt="Visualisierung: Dachkante aus Stahl und Glas mit warmem LED-Licht vor See und Bergen"
        top={<Breadcrumbs items={[{ label: 'Warum BEO', to: '/warum-beo' }]} />}
        eyebrow="Warum BEO"
        title="Mehr als Metallbau."
        subtitle="Wir verbinden Stahlbau, Glasbau, Solar, Architektur und Montage. So entstehen Lösungen, die von Anfang an als Gesamtsystem geplant sind."
      >
        <Button to="/anfrage" arrow>Projekt anfragen</Button>
      </Hero>

      <section aria-labelledby="gruende-title" className="section on-light">
        <div className="container-site">
          <Reveal>
            <SectionHeading id="gruende-title" eyebrow="Neun Gründe" title="Was uns ausmacht" />
          </Reveal>
          <div className="mt-14 ring-1 ring-line">
            <ReasonsGrid items={gruende} />
          </div>
        </div>
      </section>

      <section aria-labelledby="anspruch-title" className="section bg-steel text-white">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <SectionHeading
              id="anspruch-title"
              tone="dark"
              eyebrow="Unser Anspruch"
              title="Moderne Lebensräume aus Stahl, Glas und Energie."
              intro="Wir wollen nicht einfach eine weitere Metallbaufirma sein. Wir entwickeln Bauteile, die mehr als eine Funktion erfüllen."
            />
          </Reveal>
          <Reveal delay={100}>
            <ul className="space-y-6 border-l border-gold/60 pl-8">
              {anspruch.map((t) => (
                <li key={t} className="text-lg leading-relaxed text-white/85">{t}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaBlock />
    </>
  );
}
