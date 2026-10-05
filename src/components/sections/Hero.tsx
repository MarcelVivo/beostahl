import type { ReactNode } from 'react';
import { Img } from '@/components/ui/Img';
import { cx } from '@/lib';

interface Props {
  image: string;
  imageAlt: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  /** Höhe: gross für Startseite, mittel für Unterseiten */
  size?: 'lg' | 'md';
  top?: ReactNode;
  /** soft: weniger Abdunklung für helle, stimmungsvolle Fotos */
  overlay?: 'strong' | 'soft';
}

/** Dunkler Hero mit Bild und Verlauf. Text steht immer auf dunklem Verlauf (Kontrast). */
export function Hero({ image, imageAlt, eyebrow, title, subtitle, children, size = 'md', top, overlay = 'strong' }: Props) {
  return (
    <section className={cx('relative isolate overflow-hidden bg-steel text-white', size === 'lg' ? 'min-h-[88svh]' : 'min-h-[70svh]')}>
      <Img
        src={image}
        alt={imageAlt}
        width={1920}
        height={1080}
        responsive
        priority
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div
        aria-hidden
        className={cx(
          'absolute inset-0 -z-10',
          overlay === 'soft'
            ? 'bg-gradient-to-t from-steel/95 from-20% via-steel/85 via-60% to-steel/75 lg:bg-gradient-to-r lg:from-steel/95 lg:from-55% lg:via-steel/85 lg:via-70% lg:to-steel/20 lg:to-100% xl:from-40% xl:via-55% xl:to-transparent xl:to-85%'
            : 'bg-gradient-to-t from-steel via-steel/80 to-steel/30 lg:bg-gradient-to-r lg:from-steel lg:via-steel/75 lg:to-steel/10',
        )}
      />
      <div className={cx('container-site flex flex-col justify-end pt-20 pb-16 lg:pb-24', size === 'lg' ? 'min-h-[88svh]' : 'min-h-[70svh]')}>
        {top && <div className="mb-auto pb-10">{top}</div>}
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="eyebrow mb-6 text-gold">
              {/* Dunkle Unterlegung: bleibt lesbar, auch wenn helle Bildstellen dahinter liegen */}
              <span className="box-decoration-clone bg-steel/85 px-2 py-[0.45rem] leading-[2.2]">{eyebrow}</span>
            </p>
          )}
          <h1 className={cx(size === 'lg' ? 'text-[1.75rem] leading-tight sm:text-4xl lg:text-5xl' : 'text-2xl sm:text-3xl lg:text-4xl')}>
            {title}
          </h1>
          <span aria-hidden className="gold-rule mt-8 w-24" />
          {subtitle && <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">{subtitle}</p>}
          {children && <div className="mt-10 flex flex-col gap-3 sm:flex-row">{children}</div>}
        </div>
      </div>
    </section>
  );
}
