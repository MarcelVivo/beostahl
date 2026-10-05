import type { DetailBild } from '@/data/types';
import { Img } from '@/components/ui/Img';
import { Reveal } from '@/components/ui/Reveal';
import { nr } from '@/lib';

/** Raster mit sechs Detailbildern und kurzer Beschriftung. */
export function DetailGrid({ items }: { items: DetailBild[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-6">
      {items.map((d, i) => (
        <li key={d.file} className="min-w-0">
          <Reveal delay={(i % 3) * 80}>
            <figure>
              <div className="aspect-square overflow-hidden bg-steel">
                <Img
                  src={`/images/produkte/${d.file}`}
                  alt={d.alt}
                  width={800}
                  height={800}
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 flex items-baseline gap-3 border-t border-gold pt-3">
                <span aria-hidden className="font-display text-[0.6875rem] text-gold-text">{nr(i + 1)}</span>
                <span lang="de-CH" className="min-w-0 font-display text-[0.625rem] leading-relaxed tracking-[0.1em] break-words hyphens-auto text-steel uppercase sm:text-[0.6875rem] sm:tracking-[0.14em]">
                  {d.title}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
