import { useState } from 'react';
import type { SolarVariante } from '@/data/solarBalkon';
import { useAufbau } from '@/components/zeichnungen/animation';
import { cx } from '@/lib';
import { ExplosionZeichnung, SchnittZeichnung } from './Zeichnungen';

/** Aufbau einer Solar-Variante: interaktive Legende, Schnitt und Explosionszeichnung. */
export function SolarTechnik({ v }: { v: SolarVariante }) {
  const [aktiv, setAktiv] = useState<number | null>(null);
  const { ref, klasse } = useAufbau<HTMLDivElement>();

  return (
    <div ref={ref} className={cx('grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16', klasse)}>
      <div>
        <p className="eyebrow text-gold-text">
          Variante {v.nr} · Schnitt {v.schnitt}
        </p>
        <h2 id={`variante-${v.nr}-title`} className="mt-4 text-lg text-steel sm:text-xl">
          {v.name}
        </h2>
        {v.zusatz && <p className="mt-2 text-sm text-graphite">{v.zusatz.charAt(0).toUpperCase() + v.zusatz.slice(1)}</p>}
        <span aria-hidden className="gold-rule mt-6" />
        <p className="mt-6 text-lg text-graphite">{v.kurz}</p>
        <h3 className="mt-10 font-display text-[0.6875rem] tracking-[0.14em] text-steel uppercase">Aufbau im Schnitt {v.schnitt}</h3>
        <ol className="mt-4 space-y-1" onMouseLeave={() => setAktiv(null)}>
          {v.legende.map((t, n) => {
            const nr = n + 1;
            const ist = aktiv === nr;
            return (
              <li key={t}>
                <button
                  type="button"
                  aria-pressed={ist}
                  onMouseEnter={() => setAktiv(nr)}
                  onFocus={() => setAktiv(nr)}
                  onBlur={() => setAktiv(null)}
                  onClick={() => setAktiv(ist ? null : nr)}
                  className={cx(
                    'flex min-h-10 w-full items-center gap-4 rounded-sm px-2 py-1.5 text-left transition-colors',
                    ist ? 'bg-white text-steel ring-1 ring-gold' : 'text-steel hover:bg-black/[0.03]',
                  )}
                >
                  <span
                    aria-hidden
                    className={cx(
                      'flex size-6 shrink-0 items-center justify-center rounded-full border text-xs transition-colors',
                      ist ? 'border-gold bg-gold font-semibold text-steel' : 'border-graphite/50 text-graphite',
                    )}
                  >
                    {nr}
                  </span>
                  <span className="leading-relaxed">
                    {t}
                    <span className="sr-only"> im Schnitt hervorheben</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
      <div className="grid items-start gap-4 sm:grid-cols-2">
        <figure className="bg-white p-4 ring-1 ring-line">
          <SchnittZeichnung v={v} aktiv={aktiv} onAktiv={setAktiv} />
          <figcaption className="mt-3 border-t border-gold pt-3 font-display text-[0.625rem] tracking-[0.14em] text-steel uppercase">
            Schnitt {v.schnitt} · Konstruktionsdetail
          </figcaption>
        </figure>
        <figure className="bg-white p-4 ring-1 ring-line">
          <ExplosionZeichnung v={v} />
          <figcaption className="mt-3 border-t border-gold pt-3 font-display text-[0.625rem] tracking-[0.14em] text-steel uppercase">
            Explosionszeichnung
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
