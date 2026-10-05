import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { cx } from '@/lib';

type Variant = 'primary' | 'outline-light' | 'outline-dark';

const styles: Record<Variant, string> = {
  primary: 'bg-gold text-steel hover:bg-[#e4b675] border border-gold',
  'outline-light': 'border border-white/40 text-white hover:border-gold hover:text-gold',
  'outline-dark': 'border border-steel/30 text-steel hover:border-gold-text hover:text-gold-text',
};

interface Props {
  to: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
}

/** Link im Button-Stil. Interne Ziele über den Router, externe (tel:, mailto:, #) als <a>. */
export function Button({ to, children, variant = 'primary', arrow = false, className }: Props) {
  const cls = cx(
    'group inline-flex min-h-12 items-center justify-center gap-3 rounded-sm px-6 py-3',
    'font-display text-[0.6875rem] tracking-[0.16em] text-center uppercase sm:whitespace-nowrap transition-colors duration-300',
    styles[variant],
    className,
  );
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
      )}
    </>
  );
  if (/^(tel:|mailto:|#|https?:)/.test(to)) {
    return <a href={to} className={cls}>{content}</a>;
  }
  return <Link to={to} className={cls}>{content}</Link>;
}
