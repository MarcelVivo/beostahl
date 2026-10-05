import { projektablauf } from '@/data/projektablauf';
import { Reveal } from '@/components/ui/Reveal';
import { nr } from '@/lib';

/** Projektablauf als nummerierte Schrittfolge. */
export function ProcessSteps({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const dark = tone === 'dark';
  return (
    <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
      {projektablauf.map((s, i) => (
        <li key={s.title}>
          <Reveal delay={(i % 5) * 60} className="h-full">
            <div className={dark ? 'border-t border-gold/60 pt-5' : 'border-t border-gold pt-5'}>
              <span className={dark ? 'font-display text-sm text-gold' : 'font-display text-sm text-gold-text'} aria-hidden>
                {nr(i + 1)}
              </span>
              <h3 className={dark ? 'mt-3 text-[0.8125rem] text-white' : 'mt-3 text-[0.8125rem] text-steel'}>{s.title}</h3>
              <p className={dark ? 'mt-3 text-sm leading-relaxed text-white/70' : 'mt-3 text-sm leading-relaxed text-graphite'}>{s.text}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
