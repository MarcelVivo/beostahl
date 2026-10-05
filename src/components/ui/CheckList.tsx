import { Check } from 'lucide-react';
import { cx } from '@/lib';

/** Aufzählung mit goldenen Häkchen. */
export function CheckList({ items, tone = 'light', columns = 1 }: { items: readonly string[]; tone?: 'light' | 'dark'; columns?: 1 | 2 }) {
  const dark = tone === 'dark';
  return (
    <ul className={cx('grid gap-x-8 gap-y-3', columns === 2 && 'sm:grid-cols-2')}>
      {items.map((t) => (
        <li key={t} className={cx('flex gap-3', dark ? 'text-white/85' : 'text-steel')}>
          <Check aria-hidden strokeWidth={1.5} className={cx('mt-0.5 size-5 shrink-0', dark ? 'text-gold' : 'text-gold-text')} />
          <span>{t.charAt(0).toUpperCase() + t.slice(1)}</span>
        </li>
      ))}
    </ul>
  );
}
