import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import type { Produkt } from '@/data/types';
import { Img } from '@/components/ui/Img';

/** Produktkarte. Die ganze Karte ist klickbar (Link über ::after), der Titel bleibt der Linktext. */
export function ProductCard({ p, headingLevel = 'h3' }: { p: Produkt; headingLevel?: 'h2' | 'h3' }) {
  const H = headingLevel;
  return (
    <article className="group relative flex h-full flex-col bg-white ring-1 ring-line transition-shadow duration-300 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-steel">
        <Img
          src={`/images/produkte/${p.slug}-hero.webp`}
          alt={p.heroAlt}
          width={1920}
          height={1080}
          responsive
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gold" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow text-gold-text">{p.category}</p>
        <H className="mt-3 text-[0.875rem] text-steel">
          <Link to={`/produkte/${p.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-gold-text">
            {p.name}
          </Link>
        </H>
        <p className="mt-2 text-sm text-graphite">{p.subtitle}</p>
        <p className="mt-auto flex items-center justify-between pt-6 text-xs text-graphite">
          <span>{p.masseKurz}</span>
          <ArrowRight aria-hidden strokeWidth={1.5} className="size-4 text-gold-text transition-transform group-hover:translate-x-1" />
        </p>
      </div>
    </article>
  );
}
