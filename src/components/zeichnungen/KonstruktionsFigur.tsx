import { Children, isValidElement, useId, useState, type CSSProperties, type ReactNode } from 'react';
import { C, Defs, type Ids, type Pt } from './kit';
import { ZEICHNUNGEN, type ZeichnungKey } from './zeichnungen';
import { useAufbau } from './animation';
import { cx } from '@/lib';

interface Props {
  zeichnung: ZeichnungKey;
  titel: string;
  /** Beschriftungen in Nummernreihenfolge, je mit Ankerpunkt */
  legende: Array<{ text: string; anker: string }>;
  /** «01» statt «1» (passend zu den Detailbildern) */
  zweistellig?: boolean;
  hinweis?: string;
  className?: string;
}

/** Hinweise einer Seite ohne Überlappung verteilen */
function verteile(ys: number[], min = 28, oben = 16, unten = 326): number[] {
  const order = ys.map((y, i) => ({ y, i })).sort((a, b) => a.y - b.y);
  const pos: number[] = [];
  let prev = oben - min;
  for (const o of order) {
    const y = Math.max(o.y, prev + min);
    pos[o.i] = y;
    prev = y;
  }
  const ueber = Math.max(0, prev - unten);
  return pos.map((y) => y - ueber);
}

/**
 * Schematische Konstruktionszeichnung mit nummerierten Hinweisen und interaktiver Legende.
 * Baut sich beim ersten Erscheinen von unten nach oben auf; Legende und Nummern heben sich gegenseitig hervor.
 */
export function KonstruktionsFigur({ zeichnung, titel, legende, zweistellig = false, hinweis, className }: Props) {
  const uid = useId().replace(/:/g, '');
  const ids: Ids = { beton: `b${uid}`, mauer: `m${uid}`, erde: `e${uid}`, akustik: `a${uid}` };
  const z = ZEICHNUNGEN[zeichnung](ids);
  const { ref, klasse } = useAufbau<HTMLDivElement>();
  const [aktiv, setAktiv] = useState<number | null>(null);
  const nummer = (i: number) => (zweistellig ? String(i + 1).padStart(2, '0') : String(i + 1));

  const punkte = legende.map((l, i) => ({ i, a: (z.a[l.anker] ?? [260, 170]) as Pt }));
  const links = punkte.filter((p) => p.a[0] < 260);
  const rechts = punkte.filter((p) => p.a[0] >= 260);
  const yl = verteile(links.map((p) => p.a[1]));
  const yr = verteile(rechts.map((p) => p.a[1]));
  const callouts = [
    ...links.map((p, k) => ({ ...p, x: -14, y: yl[k]! })),
    ...rechts.map((p, k) => ({ ...p, x: 534, y: yr[k]! })),
  ];
  const label = `${titel}: ${legende.map((l, i) => `${nummer(i)} ${l.text}`).join(', ')}`;
  const umschalten = (i: number) => setAktiv((a) => (a === i ? null : i));
  // Einzelteile der Zeichnung in Zeichnungsreihenfolge (für den schrittweisen Aufbau)
  const stuecke: ReactNode[] = isValidElement<{ children?: ReactNode }>(z.el) ? Children.toArray(z.el.props.children) : [z.el];

  return (
    <figure ref={ref} className={cx('grid gap-8 lg:grid-cols-[3fr_2fr] lg:items-center lg:gap-12', klasse, className)}>
      <div className="bg-white p-4 ring-1 ring-line sm:p-6" onMouseLeave={() => setAktiv(null)}>
        <svg viewBox="-36 0 592 340" role="img" aria-label={label} className={cx('h-auto w-full', aktiv !== null && 'zg-hat-aktiv')} fontFamily="var(--font-sans)">
          <Defs ids={ids} />
          <g>
            {stuecke.map((k, s) => (
              <g key={s} className="zg-stueck" style={{ '--s': s } as CSSProperties}>
                {k}
              </g>
            ))}
          </g>
          {callouts.map((c) => {
            const dx = c.a[0] - c.x;
            const dy = c.a[1] - c.y;
            const d = Math.hypot(dx, dy) || 1;
            const ist = aktiv === c.i;
            return (
              <g
                key={c.i}
                className={cx('zg-callout cursor-pointer', ist && 'is-aktiv')}
                style={{ '--i': c.i } as CSSProperties}
                onMouseEnter={() => setAktiv(c.i)}
                onClick={() => umschalten(c.i)}
              >
                <line
                  className="zg-linie"
                  pathLength={1}
                  x1={c.x + (dx / d) * 13}
                  y1={c.y + (dy / d) * 13}
                  x2={c.a[0]}
                  y2={c.a[1]}
                  stroke={ist ? C.led : C.linie}
                  strokeWidth={ist ? 1.8 : 0.8}
                />
                {ist && <circle className="zg-halo" cx={c.a[0]} cy={c.a[1]} r={9} fill={C.led} />}
                <circle className="zg-punkt" cx={c.a[0]} cy={c.a[1]} r={ist ? 3.4 : 2.4} fill={ist ? C.led : C.linie} />
                <g className="zg-nr">
                  <circle cx={c.x} cy={c.y} r={13} fill={ist ? C.led : '#fff'} stroke={ist ? C.led : C.linie} strokeWidth={1} />
                  <text x={c.x} y={c.y + 4.5} textAnchor="middle" fontSize={zweistellig ? 11.5 : 13} fill={ist ? '#1E2226' : C.linie} fontWeight={ist ? 600 : 400}>
                    {nummer(c.i)}
                  </text>
                </g>
                {/* grössere unsichtbare Trefferfläche für Finger und Maus */}
                <circle cx={c.x} cy={c.y} r={20} fill="transparent" />
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption>
        <p className="eyebrow text-gold-text">Schematische Darstellung</p>
        <p className="mt-3 font-display text-[0.8125rem] leading-relaxed tracking-[0.1em] text-steel uppercase">{titel}</p>
        <ol className="mt-6 space-y-1" onMouseLeave={() => setAktiv(null)}>
          {legende.map((l, i) => {
            const ist = aktiv === i;
            return (
              <li key={l.text}>
                <button
                  type="button"
                  aria-pressed={ist}
                  onMouseEnter={() => setAktiv(i)}
                  onFocus={() => setAktiv(i)}
                  onBlur={() => setAktiv(null)}
                  onClick={() => umschalten(i)}
                  className={cx(
                    'flex min-h-10 w-full items-center gap-4 rounded-sm px-2 py-1.5 text-left transition-colors',
                    ist ? 'bg-white text-steel ring-1 ring-gold' : 'text-steel hover:bg-white/60',
                  )}
                >
                  <span
                    aria-hidden
                    className={cx(
                      'flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full border px-1 text-xs transition-colors',
                      ist ? 'border-gold bg-gold font-semibold text-steel' : 'border-graphite/50 text-graphite',
                    )}
                  >
                    {nummer(i)}
                  </span>
                  <span className="leading-relaxed">
                    {l.text}
                    <span className="sr-only"> in der Zeichnung hervorheben</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        <p className="mt-6 text-sm text-graphite">{hinweis ?? 'Nicht massstäblich. Aufbau, Masse und Statik werden objektspezifisch geplant.'}</p>
      </figcaption>
    </figure>
  );
}
