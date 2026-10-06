import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { FONTANA_SLUG } from '@/data/fontana';
import { cx } from '@/lib';

/** Dezenter Hinweis auf die Partnerschaft mit Fontana Forni. */
export function FontanaTeaser({ text, className }: { text?: string; className?: string }) {
  return (
    <section aria-label="Partner Fontana Forni" className={cx('bg-steel text-white', className)}>
      <div className="container-site flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between lg:py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <div>
            <p className="eyebrow text-gold">Offizieller Vertriebspartner</p>
            <img src="/brand/partner/fontana-white.svg" alt="Fontana Forni" width={148} height={14} className="mt-3 h-4 w-auto sm:h-5" loading="lazy" />
          </div>
          <p className="max-w-xl leading-relaxed text-white/80">
            {text ?? 'Pizzaöfen, Holzöfen, Grills und Aussenküchen aus Italien. Wir beraten, liefern, montieren und warten.'}
          </p>
        </div>
        <Link
          to={`/${FONTANA_SLUG}`}
          className="group inline-flex min-h-11 shrink-0 items-center gap-2 font-display text-[0.6875rem] tracking-[0.16em] text-gold uppercase"
        >
          Fontana bei BEO
          <ArrowRight aria-hidden strokeWidth={1.5} className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
