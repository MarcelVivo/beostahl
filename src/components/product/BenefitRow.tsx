import type { IconText } from '@/data/types';
import { Reveal } from '@/components/ui/Reveal';

/** Vier Vorteile mit Icons, unter dem Hero. */
export function BenefitRow({ items }: { items: IconText[] }) {
  return (
    <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      {items.map((v, i) => (
        <li key={v.title}>
          <Reveal delay={i * 80} className="h-full border-l border-gold pl-6">
            <v.icon aria-hidden strokeWidth={1.25} className="size-8 text-gold-text" />
            <h3 className="mt-5 text-[0.8125rem] text-steel">{v.title}</h3>
            {v.text && <p className="mt-3 leading-relaxed text-graphite">{v.text}</p>}
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
