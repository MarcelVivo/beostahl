import type { ReactNode } from 'react';
import { cx } from '@/lib';

interface Props {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
  id?: string;
  className?: string;
}

/** Abschnittstitel mit Goldlinie, wie auf den BEO-Plakaten. */
export function SectionHeading({ eyebrow, title, intro, tone = 'light', align = 'left', as: H = 'h2', id, className }: Props) {
  const dark = tone === 'dark';
  return (
    <div className={cx('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <p className={cx('eyebrow mb-5', dark ? 'text-gold' : 'text-gold-text')}>{eyebrow}</p>
      )}
      <H id={id} className={cx('text-xl sm:text-2xl lg:text-[1.75rem]', dark ? 'text-white' : 'text-steel')}>
        {title}
      </H>
      <span aria-hidden className={cx('gold-rule mt-6', align === 'center' && 'mx-auto')} />
      {intro && (
        <div className={cx('mt-6 text-base leading-relaxed sm:text-lg', dark ? 'text-white/75' : 'text-graphite')}>
          {intro}
        </div>
      )}
    </div>
  );
}
