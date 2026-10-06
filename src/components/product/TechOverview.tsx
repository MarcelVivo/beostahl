import { Ruler } from 'lucide-react';
import type { Produkt } from '@/data/types';
import { RICHTWERT_HINWEIS } from '@/data/produkte';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { TechDrawing } from './TechDrawing';
import { KonstruktionsFigur } from '@/components/zeichnungen/KonstruktionsFigur';
import { PRODUKT_ZEICHNUNG } from '@/components/zeichnungen/konfig';

/** Block «Technik im Überblick»: Ansichten mit Massen, wie auf den Plakaten. */
export function TechOverview({ p }: { p: Produkt }) {
  const k = PRODUKT_ZEICHNUNG[p.slug];
  return (
    <section id="technik" aria-labelledby="technik-title" className="section scroll-mt-24 bg-white">
      <div className="container-site">
        <SectionHeading id="technik-title" eyebrow="Technik" title="Technik im Überblick" />

        {p.zeichnung && (
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {(['front', 'side', 'top'] as const).map((v, i) => (
              <Reveal key={v} delay={i * 80}>
                <figure className="h-full bg-concrete p-6">
                  <figcaption className="eyebrow mb-6 text-graphite">
                    {{ front: 'Frontansicht', side: 'Seitenansicht', top: 'Draufsicht' }[v]}
                  </figcaption>
                  <TechDrawing z={p.zeichnung!} view={v} />
                </figure>
              </Reveal>
            ))}
          </div>
        )}

        {k && (
          <Reveal className="mt-14">
            <KonstruktionsFigur
              zeichnung={k.zeichnung}
              titel={`Konstruktionsdetail ${p.name}`}
              legende={p.details.map((d, i) => ({ text: d.title, anker: k.anker[i] ?? '' }))}
              zweistellig
              hinweis="Die Nummern entsprechen den Detailbildern oben. Nicht massstäblich, Beispielkonfiguration."
            />
          </Reveal>
        )}

        <dl className="mt-10 grid gap-px overflow-hidden bg-line sm:grid-cols-[repeat(auto-fit,minmax(12rem,1fr))]">
          {p.masse.map((m) => (
            <div key={m.label} className="bg-white p-6">
              <dt className="eyebrow flex items-center gap-4 text-graphite">
                <Ruler aria-hidden strokeWidth={1.25} className="size-6 shrink-0 text-gold-text" />
                {m.label}
              </dt>
              <dd className="mt-1 pl-10 font-display text-sm text-steel">{m.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm text-graphite">{RICHTWERT_HINWEIS}</p>
      </div>
    </section>
  );
}
