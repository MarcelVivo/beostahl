import type { Grund } from '@/data/types';
import { Reveal } from '@/components/ui/Reveal';

/** Gründe mit Icons, dreispaltig ab Desktop. */
export function ReasonsGrid({ items }: { items: Grund[] }) {
  return (
    <ul className="grid gap-px overflow-hidden bg-line sm:grid-cols-2 lg:grid-cols-3">
      {items.map((g, i) => (
        <li key={g.title} className="bg-white">
          <Reveal delay={(i % 3) * 80} className="h-full p-8 lg:p-10">
            <g.icon aria-hidden strokeWidth={1.25} className="size-8 text-gold-text" />
            <h3 className="mt-6 text-[0.8125rem] text-steel">{g.title}</h3>
            <p className="mt-3 leading-relaxed text-graphite">{g.text}</p>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
