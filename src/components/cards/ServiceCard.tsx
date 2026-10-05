import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import type { Leistung } from '@/data/types';

/** Kompakte Leistungskarte ohne Bild, für Raster mit vielen Einträgen. */
export function ServiceCard({ l }: { l: Leistung }) {
  return (
    <article className="group relative flex h-full flex-col bg-white p-6 transition-colors duration-300 hover:bg-concrete lg:p-7">
      <div className="flex items-start justify-between">
        <l.icon aria-hidden strokeWidth={1.25} className="size-7 text-gold-text" />
        <ArrowUpRight aria-hidden strokeWidth={1.5} className="size-4 text-graphite/50 transition-colors group-hover:text-gold-text" />
      </div>
      <h3 className="mt-6 text-[0.75rem] leading-relaxed text-steel">
        <Link to={`/leistungen/${l.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-gold-text">
          {l.title}
        </Link>
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-graphite">{l.teaser}</p>
    </article>
  );
}
