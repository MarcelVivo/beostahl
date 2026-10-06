import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import type { Referenz } from '@/data/types';
import { Img } from '@/components/ui/Img';

/** Referenzkarte mit Planausschnitt. Ganze Karte klickbar. */
export function ReferenzCard({ r }: { r: Referenz }) {
  return (
    <article className="group relative flex h-full flex-col bg-white ring-1 ring-line transition-shadow duration-300 hover:shadow-xl lg:flex-row">
      <div className="relative aspect-[4/3] overflow-hidden bg-concrete lg:w-1/2">
        <Img
          src={`/images/referenzen/${r.slug}-teaser.webp`}
          alt={r.bilder[0]?.alt ?? r.title}
          width={624}
          height={468}
          deferred
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
        <span className="absolute top-4 left-4 bg-steel px-3 py-1.5 font-display text-[0.625rem] tracking-[0.16em] text-gold uppercase">
          {r.status}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8 lg:p-10">
        <p className="eyebrow text-gold-text">Referenz · {r.objekt}</p>
        <h3 className="mt-4 text-[0.9375rem] leading-snug text-steel sm:text-base">
          <Link
            to={`/referenzen/${r.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-gold-text"
          >
            {r.title}
          </Link>
        </h3>
        <p className="mt-4 leading-relaxed text-graphite">{r.teaser}</p>
        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6">
          {r.kennzahlen.map((k) => (
            <div key={k.title}>
              <dt className="text-xs text-graphite">{k.text}</dt>
              <dd className="mt-1 font-display text-sm text-steel">{k.title}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-auto flex items-center gap-2 pt-8 font-display text-[0.6875rem] tracking-[0.16em] text-gold-text uppercase">
          Projekt ansehen
          <ArrowRight aria-hidden strokeWidth={1.5} className="size-4 transition-transform group-hover:translate-x-1" />
        </p>
      </div>
    </article>
  );
}
