import { useParams } from 'react-router';
import { Expand } from 'lucide-react';
import { Seo } from '@/seo/Seo';
import { getReferenz } from '@/data/referenzen';
import { getLeistung } from '@/data/leistungen';
import { PageHeader } from '@/components/sections/PageHeader';
import { CtaBlock } from '@/components/sections/CtaBlock';
import { KeyFigures } from '@/components/product/KeyFigures';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Img } from '@/components/ui/Img';
import { Reveal } from '@/components/ui/Reveal';
import { nr } from '@/lib';
import { NotFoundPage } from './NotFoundPage';

export function ReferenzPage() {
  const { slug = '' } = useParams();
  const r = getReferenz(slug);
  if (!r) return <NotFoundPage />;
  const leistungen = r.leistungen.map(getLeistung).filter((l) => l !== undefined);
  const planSrc = `/images/referenzen/${r.plan.file}`;

  return (
    <>
      <Seo title={r.seo.title} description={r.seo.description} image={planSrc} />
      <PageHeader
        crumbs={[{ label: 'Referenzen', to: '/referenzen' }, { label: r.objekt, to: `/referenzen/${r.slug}` }]}
        eyebrow={`Referenz · ${r.status} · Stand ${r.stand}`}
        title={r.title}
        intro={r.teaser}
      />

      {/* Gesamtgrafik */}
      <section aria-labelledby="plan-title" className="bg-concrete py-12 lg:py-16">
        <div className="container-site">
          <h2 id="plan-title" className="sr-only">Konzeptzeichnung</h2>
          <figure>
            <a href={planSrc} target="_blank" rel="noopener" className="group relative block overflow-hidden bg-white ring-1 ring-line">
              <Img
                src={planSrc}
                alt={r.plan.alt}
                width={r.plan.width}
                height={r.plan.height}
                responsive
                sizes="(min-width: 1280px) 1216px, 100vw"
                priority
                className="h-auto w-full"
              />
              <span className="absolute right-4 bottom-4 inline-flex items-center gap-2 bg-steel/90 px-3 py-2 text-xs text-white transition-colors group-hover:bg-steel">
                <Expand aria-hidden strokeWidth={1.5} className="size-4 text-gold" />
                In voller Grösse öffnen<span className="sr-only"> (neuer Tab)</span>
              </span>
            </a>
            <figcaption className="mt-4 text-sm text-graphite">Konzeptzeichnung {r.status}, Stand {r.stand}. Darstellung zeigt eine Konzeptvariante.</figcaption>
          </figure>
        </div>
      </section>

      {/* Projektbeschreibung */}
      <section aria-labelledby="projekt-title" className="section on-light">
        <div className="container-site grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-24">
          <Reveal>
            <SectionHeading id="projekt-title" eyebrow="Das Projekt" title="Eine Anlage, drei Reihen, ein System." />
            <dl className="mt-10 space-y-4 text-sm">
              {[
                ['Objekt', r.objekt],
                ['Ort', r.ort],
                ['Projektstand', `${r.status}, ${r.stand}`],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-6 border-b border-line pb-4">
                  <dt className="w-32 shrink-0 text-graphite">{k}</dt>
                  <dd className="text-steel">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={100} className="space-y-5 text-lg leading-relaxed text-graphite">
            {r.intro.map((t) => <p key={t}>{t}</p>)}
          </Reveal>
        </div>
      </section>

      <KeyFigures items={r.kennzahlen} hinweis={r.hinweis} />

      {/* Planausschnitte */}
      <section aria-labelledby="plaene-title" className="section bg-concrete on-light">
        <div className="container-site">
          <Reveal>
            <SectionHeading id="plaene-title" eyebrow="Pläne" title="Schnitte und Details" />
          </Reveal>
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {r.bilder.map((b, i) => (
              <li key={b.file}>
                <Reveal delay={(i % 2) * 80}>
                  <figure className="bg-white p-4 ring-1 ring-line sm:p-6">
                    <a href={`/images/referenzen/${b.file}`} target="_blank" rel="noopener" className="block">
                      <Img src={`/images/referenzen/${b.file}`} alt={b.alt} width={640} height={480} deferred className="h-56 w-full object-contain sm:h-72" />
                      <span className="sr-only"> (in voller Grösse, neuer Tab)</span>
                    </a>
                    <figcaption className="mt-4 flex items-baseline gap-3 border-t border-gold pt-3">
                      <span aria-hidden className="font-display text-[0.6875rem] text-gold-text">{nr(i + 1)}</span>
                      <span className="font-display text-[0.6875rem] tracking-[0.14em] text-steel uppercase">{b.title}</span>
                    </figcaption>
                  </figure>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Technik */}
      <section aria-labelledby="technik-title" className="section on-light">
        <div className="container-site">
          <Reveal>
            <SectionHeading id="technik-title" eyebrow="Technik" title="Konstruktion im Überblick" />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {r.technik.map((t, i) => (
              <Reveal key={t.title} delay={(i % 2) * 80}>
                <div className="h-full ring-1 ring-line">
                  <h3 className="bg-steel px-6 py-4 text-[0.75rem] text-white">{t.title}</h3>
                  <dl className="divide-y divide-line">
                    {t.items.map((m) => (
                      <div key={m.label} className="grid gap-1 px-6 py-3 text-sm sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-4">
                        <dt className="text-graphite">{m.label}</dt>
                        <dd className="break-words text-steel">{m.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Material */}
      <section aria-labelledby="material-title" className="section bg-concrete on-light">
        <div className="container-site">
          <Reveal>
            <SectionHeading id="material-title" eyebrow="Material" title="Material- und Mengenübersicht" intro="Konzeptstand. Mengen sind ca.-Angaben." />
          </Reveal>
          <div tabIndex={0} role="region" aria-label="Materialtabelle, horizontal scrollbar" className="mt-12 overflow-x-auto bg-white ring-1 ring-line">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <caption className="sr-only">Material- und Mengenübersicht im Konzeptstand</caption>
              <thead className="bg-steel text-white">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Pos.</th>
                  <th scope="col" className="px-4 py-3 font-medium">Beschreibung</th>
                  <th scope="col" className="px-4 py-3 font-medium">Spezifikation</th>
                  <th scope="col" className="px-4 py-3 font-medium">Menge (ca.)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {r.material.map((m, i) => (
                  <tr key={m.beschreibung}>
                    <td className="px-4 py-3 text-gold-text">{i + 1}</td>
                    <th scope="row" className="px-4 py-3 font-medium text-steel">{m.beschreibung}</th>
                    <td className="px-4 py-3 text-graphite">{m.spezifikation}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-steel">{m.menge}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-sm text-graphite">{r.hinweis}</p>
        </div>
      </section>

      {/* Leistungen */}
      <section aria-labelledby="leistungen-title" className="section on-light">
        <div className="container-site">
          <Reveal>
            <SectionHeading id="leistungen-title" eyebrow="Leistungen" title="Was in diesem Projekt steckt" />
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

      <CtaBlock preselect="carports" title="Planen Sie ein ähnliches Projekt?" text="Ob Parkfläche, Gewerbeareal oder Wohnüberbauung: Senden Sie uns Pläne und Eckdaten. Wir erarbeiten ein Konzept." />
    </>
  );
}
