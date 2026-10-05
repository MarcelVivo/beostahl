import type { IconText } from '@/data/types';
import { RICHTWERT_HINWEIS } from '@/data/produkte';
import { Reveal } from '@/components/ui/Reveal';

/** Kennzahlen mit Icons auf dunklem Band. */
export function KeyFigures({ items, hinweis = RICHTWERT_HINWEIS }: { items: IconText[]; hinweis?: string }) {
  return (
    <section aria-labelledby="kennzahlen-title" className="bg-steel py-16 text-white lg:py-20">
      <div className="container-site">
        <h2 id="kennzahlen-title" className="eyebrow text-gold">
          Kennzahlen
        </h2>
        <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]">
          {items.map((k, i) => (
            <li key={k.title}>
              <Reveal delay={i * 70} className="flex flex-col gap-4">
                <k.icon aria-hidden strokeWidth={1.25} className="size-9 text-gold" />
                <div>
                  <p className="font-display text-sm leading-snug tracking-[0.06em] sm:text-base">{k.title}</p>
                  {k.text && <p className="mt-1 text-sm text-white/65">{k.text}</p>}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-12 border-t border-white/10 pt-6 text-sm text-white/65">{hinweis}</p>
      </div>
    </section>
  );
}
