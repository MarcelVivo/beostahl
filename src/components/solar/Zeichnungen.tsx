import { useId, useState, type CSSProperties, type ReactNode } from 'react';
import { useScrollFortschritt } from '@/components/zeichnungen/animation';
import { cx } from '@/lib';
import type { SolarVariante } from '@/data/solarBalkon';

/* ── Farben und Materialien ─────────────────────────────────── */
const C = {
  linie: '#3A3F45',
  modul: '#1C2A44',
  zelle: '#33476A',
  glas: '#CFE3EE',
  alu: '#B9C0C7',
  stahl: '#8E979F',
  edelstahl: '#D3D8DC',
  holz: '#C9925A',
  holzMaser: '#AE7743',
  holzDunkel: '#A86F3C',
  beton: '#D9D9D5',
  belag: '#A9AEB3',
  gummi: '#222326',
  daemmung: '#EAD9A0',
  kabel: '#4A5058',
  led: '#D9A55B',
};

type Pt = [number, number];
interface Teil {
  /** Nummer = Position in der Legende (1-basiert) */
  n: number;
  anker: Pt;
  el: ReactNode;
}

const R = ({ x, y, w, h, f, s = C.linie, sw = 0.6 }: { x: number; y: number; w: number; h: number; f: string; s?: string; sw?: number }) => (
  <rect x={x} y={y} width={w} height={h} fill={f} stroke={s} strokeWidth={sw} />
);

/* Bausteine im Schnitt */
const Modul = (x: number, y: number, h: number, w = 8) => (
  <g>
    <R x={x} y={y} w={w} h={h} f={C.modul} />
    {Array.from({ length: Math.floor(h / 18) }, (_, i) => (
      <line key={i} x1={x + 1} x2={x + w - 1} y1={y + 9 + i * 18} y2={y + 9 + i * 18} stroke={C.zelle} strokeWidth={0.8} />
    ))}
  </g>
);
const SolarGlas = (x: number, y: number, h: number, w = 10) => (
  <g>
    <R x={x} y={y} w={w} h={h} f={C.glas} />
    <rect x={x + w / 2 - 1.5} y={y + 4} width={3} height={h - 8} fill={C.modul} opacity={0.75} />
  </g>
);
const KlarGlas = (x: number, y: number, h: number, w = 8) => <R x={x} y={y} w={w} h={h} f={C.glas} />;
const Holz = (x: number, y: number, h: number, w = 12) => (
  <g>
    <R x={x} y={y} w={w} h={h} f={C.holz} />
    {[0.3, 0.6, 0.85].map((t) => (
      <line key={t} x1={x + w * t} x2={x + w * t} y1={y + 2} y2={y + h - 2} stroke={C.holzMaser} strokeWidth={0.6} />
    ))}
  </g>
);
const Daemmung = (x: number, y: number, h: number, w = 12) => {
  const pts: string[] = [];
  for (let i = 0; i <= h / 6; i++) pts.push(`${x + (i % 2 ? w - 1.5 : 1.5)},${y + i * 6}`);
  return (
    <g>
      <R x={x} y={y} w={w} h={h} f={C.daemmung} />
      <polyline points={pts.join(' ')} fill="none" stroke="#C7B276" strokeWidth={0.8} />
    </g>
  );
};
const Luft = (x: number, y1: number, y2: number) => (
  <g stroke={C.linie} strokeWidth={0.7} fill="none" opacity={0.7}>
    <line x1={x} x2={x} y1={y2} y2={y1} strokeDasharray="3 4" />
    <path d={`M${x - 3},${y1 + 6} L${x},${y1} L${x + 3},${y1 + 6}`} />
  </g>
);
const Tropfen = (x: number, y1: number, y2: number) => (
  <g>
    <line x1={x} x2={x} y1={y1} y2={y2} stroke="#5B8FB0" strokeWidth={0.8} strokeDasharray="2 3" />
    <path d={`M${x},${y2 - 2} q-3,5 0,7 q3,-2 0,-7`} fill="#5B8FB0" />
  </g>
);
const Kabelkanal = (x: number, y: number, w = 14, h = 12) => (
  <g>
    <R x={x} y={y} w={w} h={h} f={C.kabel} />
    <circle cx={x + w / 2 - 2.5} cy={y + h / 2} r={2} fill={C.led} />
    <circle cx={x + w / 2 + 2.5} cy={y + h / 2} r={2} fill="#9BA3AB" />
  </g>
);
/** Winkel von der Konstruktion zur Stirnseite der Balkonplatte (x = 160) */
const Winkel = (x: number, y: number, f = C.stahl) => (
  <g>
    <R x={x} y={y} w={160 - x} h={6} f={f} />
    <R x={154} y={y - 8} w={6} h={34} f={f} />
    <R x={160} y={y + 10} w={28} h={3} f={C.linie} />
  </g>
);

/* Geometrie je Variante: viewBox 340 × 430, Balkonplatte ab x = 160, Oberkante y = 330 */
function teile(nr: number): Teil[] {
  switch (nr) {
    case 1:
      return [
        { n: 1, anker: [74, 90], el: <g>{Modul(70, 46, 290)}<R x={68} y={44} w={12} h={5} f="#2B2F36" /><R x={68} y={334} w={12} h={5} f="#2B2F36" /></g> },
        { n: 2, anker: [85, 140], el: Luft(85, 70, 320) },
        { n: 3, anker: [96, 260], el: <R x={92} y={40} w={8} h={312} f={C.stahl} /> },
        { n: 4, anker: [85, 200], el: <g>{[100, 200, 300].map((y) => <R key={y} x={78} y={y} w={14} h={6} f={C.edelstahl} />)}</g> },
        { n: 5, anker: [112, 37], el: <g><R x={64} y={33} w={72} h={8} f={C.alu} /><R x={64} y={41} w={3} h={8} f={C.alu} /><R x={133} y={41} w={3} h={8} f={C.alu} /></g> },
        { n: 6, anker: [124, 130], el: Holz(118, 49, 275) },
        { n: 7, anker: [110, 230], el: <R x={106} y={49} w={8} h={275} f={C.alu} /> },
        { n: 8, anker: [157, 352], el: Winkel(100, 340) },
        { n: 9, anker: [111, 332], el: Kabelkanal(104, 326) },
      ];
    case 2:
      return [
        { n: 1, anker: [75, 110], el: SolarGlas(70, 46, 292) },
        { n: 2, anker: [92, 170], el: Luft(92, 70, 250) },
        { n: 3, anker: [103, 272], el: <g><R x={62} y={300} w={44} h={6} f={C.alu} /><R x={62} y={258} w={6} h={48} f={C.alu} /><R x={100} y={258} w={6} h={48} f={C.alu} /></g> },
        { n: 4, anker: [82, 285], el: <g><R x={68} y={262} w={2} h={36} f={C.gummi} /><R x={80} y={262} w={3} h={36} f={C.gummi} /></g> },
        { n: 5, anker: [122, 140], el: Holz(116, 49, 268) },
        { n: 6, anker: [132, 303], el: <g><R x={106} y={300} w={54} h={6} f={C.edelstahl} /><R x={154} y={300} w={6} h={60} f={C.edelstahl} /><R x={160} y={345} w={28} h={3} f={C.linie} /></g> },
        { n: 7, anker: [84, 326], el: <g><rect x={82} y={300} width={4} height={6} fill="#fff" />{Tropfen(84, 306, 336)}</g> },
        { n: 8, anker: [94, 289], el: Kabelkanal(87, 282, 12, 14) },
      ];
    case 3:
      return [
        { n: 1, anker: [74, 90], el: <g>{Modul(70, 46, 290)}<R x={68} y={44} w={12} h={5} f="#2B2F36" /><R x={68} y={334} w={12} h={5} f="#2B2F36" /></g> },
        { n: 2, anker: [87, 150], el: Luft(87, 70, 320) },
        { n: 3, anker: [99, 250], el: <R x={96} y={40} w={7} h={312} f={C.alu} /> },
        { n: 4, anker: [126, 110], el: <g>{Holz(118, 44, 280, 16)}{[44, 100, 156, 212, 268].map((y) => <line key={y} x1={118} x2={134} y1={y} y2={y} stroke={C.holzDunkel} strokeWidth={1.2} />)}</g> },
        { n: 5, anker: [112, 150], el: <g>{[70, 150, 230, 300].map((y) => <R key={y} x={106} y={y} w={12} h={12} f={C.holzDunkel} />)}</g> },
        { n: 6, anker: [157, 352], el: Winkel(103, 340) },
        { n: 7, anker: [111, 332], el: Kabelkanal(104, 326) },
        { n: 8, anker: [66, 349], el: <path d="M58,354 L66,346 L100,346" fill="none" stroke={C.stahl} strokeWidth={2.5} /> },
      ];
    case 4:
      return [
        { n: 1, anker: [75, 110], el: <g>{SolarGlas(70, 46, 290)}<R x={66} y={330} w={18} h={16} f={C.alu} /></g> },
        { n: 2, anker: [88, 170], el: Luft(88, 70, 320) },
        { n: 3, anker: [87, 240], el: <g>{[100, 240].map((y) => <g key={y}><circle cx={86} cy={y} r={5} fill={C.edelstahl} stroke={C.linie} strokeWidth={0.6} /><line x1={86} x2={96} y1={y} y2={y} stroke={C.linie} strokeWidth={1.5} /></g>)}</g> },
        { n: 4, anker: [212, 347], el: <g><R x={96} y={60} w={6} h={290} f={C.stahl} /><R x={102} y={344} w={58} h={6} f={C.stahl} /><R x={160} y={344} w={90} h={6} f="#5E666E" /></g> },
        { n: 5, anker: [122, 140], el: Holz(116, 49, 275) },
        { n: 6, anker: [109, 331], el: Kabelkanal(103, 325, 12, 12) },
        { n: 7, anker: [75, 362], el: Tropfen(75, 346, 372) },
      ];
    case 5:
      return [
        { n: 1, anker: [74, 100], el: <g>{Modul(70, 40, 300)}<R x={70} y={34} w={64} h={6} f={C.modul} /></g> },
        { n: 2, anker: [89, 170], el: Luft(89, 70, 290) },
        { n: 3, anker: [103, 260], el: <R x={100} y={44} w={6} h={300} f={C.alu} /> },
        { n: 4, anker: [112, 130], el: Daemmung(106, 44, 280) },
        { n: 5, anker: [124, 210], el: Holz(118, 44, 280) },
        { n: 6, anker: [152, 343], el: <g><R x={106} y={340} w={54} h={6} f={C.stahl} /><R x={160} y={340} w={50} h={6} f="#5E666E" /></g> },
        { n: 7, anker: [90, 307], el: Kabelkanal(83, 300, 13, 14) },
        { n: 8, anker: [74, 360], el: Tropfen(74, 340, 372) },
      ];
    default:
      return [
        { n: 1, anker: [74, 260], el: Modul(70, 188, 148) },
        { n: 2, anker: [74, 110], el: KlarGlas(70, 46, 136) },
        { n: 3, anker: [85, 250], el: Luft(85, 200, 320) },
        { n: 4, anker: [95, 150], el: <R x={92} y={40} w={7} h={312} f={C.alu} /> },
        { n: 5, anker: [124, 250], el: Holz(118, 188, 136) },
        { n: 6, anker: [157, 352], el: Winkel(99, 340) },
        { n: 7, anker: [111, 332], el: Kabelkanal(104, 326) },
        { n: 8, anker: [104, 44], el: <g><rect x={80} y={41} width={48} height={6} fill={C.led} opacity={0.35} /><R x={80} y={41} w={48} h={3} f={C.led} s="none" /></g> },
      ];
  }
}

/** Nummern links anordnen, ohne Überlappung */
function verteile(anker: number[], min = 26, oben = 30, unten = 400): number[] {
  const order = anker.map((y, i) => ({ y, i })).sort((a, b) => a.y - b.y);
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

/** Schnitt durch das Geländer. Nummern entsprechen der Legende; aktives Bauteil wird hervorgehoben. */
export function SchnittZeichnung({ v, aktiv = null, onAktiv }: { v: SolarVariante; aktiv?: number | null; onAktiv?: (n: number | null) => void }) {
  const id = useId().replace(/:/g, '');
  const t = teile(v.nr);
  const ly = verteile(t.map((p) => p.anker[1]));
  const label = `Schnitt ${v.schnitt}, Variante ${v.name}: ${v.legende.map((x, i) => `${i + 1} ${x}`).join(', ')}`;
  return (
    <svg
      viewBox="0 0 340 430"
      role="img"
      aria-label={label}
      className={cx('h-auto w-full', aktiv !== null && 'zg-hat-aktiv')}
      fontFamily="var(--font-sans)"
      onMouseLeave={() => onAktiv?.(null)}
    >
      <defs>
        <pattern id={`beton-${id}`} width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill={C.beton} />
          <circle cx="2" cy="3" r="0.8" fill="#A7A7A2" />
          <circle cx="7" cy="7" r="0.6" fill="#A7A7A2" />
        </pattern>
      </defs>
      <g>
        {/* Balkonplatte mit Belag */}
        <g className="zg-stueck" style={{ '--s': 0 } as CSSProperties}>
          <rect x={160} y={330} width={180} height={44} fill={`url(#beton-${id})`} stroke={C.linie} strokeWidth={0.6} />
          <rect x={160} y={324} width={180} height={6} fill={C.belag} stroke={C.linie} strokeWidth={0.6} />
        </g>
        {[...t]
          .sort((a, b) => b.anker[1] - a.anker[1])
          .map((p, s) => (
            <g key={p.n} className="zg-stueck" style={{ '--s': s + 1 } as CSSProperties}>
              <g className={cx('zg-teil', aktiv === p.n && 'is-aktiv')}>{p.el}</g>
            </g>
          ))}
      </g>
      {/* Hinweislinien und Nummern */}
      {t.map((p, i) => {
        const ist = aktiv === p.n;
        return (
          <g
            key={`n${p.n}`}
            className={cx('zg-callout cursor-pointer', ist && 'is-aktiv')}
            style={{ '--i': i } as CSSProperties}
            onMouseEnter={() => onAktiv?.(p.n)}
            onClick={() => onAktiv?.(ist ? null : p.n)}
          >
            <line className="zg-linie" pathLength={1} x1={36} y1={ly[i]} x2={p.anker[0]} y2={p.anker[1]} stroke={ist ? C.led : C.linie} strokeWidth={ist ? 1.6 : 0.6} />
            {ist && <circle className="zg-halo" cx={p.anker[0]} cy={p.anker[1]} r={8} fill={C.led} />}
            <circle className="zg-punkt" cx={p.anker[0]} cy={p.anker[1]} r={ist ? 3 : 1.8} fill={ist ? C.led : C.linie} />
            <g className="zg-nr">
              <circle cx={26} cy={ly[i]} r={10} fill={ist ? C.led : '#fff'} stroke={ist ? C.led : C.linie} strokeWidth={0.8} />
              <text x={26} y={ly[i]! + 4} textAnchor="middle" fontSize={11} fill={ist ? '#1E2226' : C.linie} fontWeight={ist ? 600 : 400}>
                {p.n}
              </text>
            </g>
            <circle cx={26} cy={ly[i]} r={16} fill="transparent" />
          </g>
        );
      })}
      <text x={78} y={420} textAnchor="middle" fontSize={11} fill={C.linie}>Aussen</text>
      <text x={250} y={420} textAnchor="middle" fontSize={11} fill={C.linie}>Innen</text>
    </svg>
  );
}

/* ── Explosionszeichnung ────────────────────────────────────── */
type Typ = 'pv' | 'pvglas' | 'glas' | 'holz' | 'latten' | 'alu' | 'gummi' | 'befestigung' | 'kabel' | 'daemmung' | 'luft' | 'distanz' | 'led' | 'rinne';

function typ(label: string): Typ {
  const l = label.toLowerCase();
  if (l.includes('solarglas')) return 'pvglas';
  if (l.includes('solar') || l.includes('modul')) return 'pv';
  if (l.includes('glas')) return 'glas';
  if (l.includes('latten')) return 'latten';
  if (l.includes('holz')) return 'holz';
  if (l.includes('dichtung')) return 'gummi';
  if (l.includes('befestigung') || l.includes('winkel') || l.includes('punkt')) return 'befestigung';
  if (l.includes('kabel')) return 'kabel';
  if (l.includes('dämmung')) return 'daemmung';
  if (l.includes('luftspalt')) return 'luft';
  if (l.includes('distanz')) return 'distanz';
  if (l.includes('led')) return 'led';
  if (l.includes('entwässerung') || l.includes('bodenprofil')) return 'rinne';
  return 'alu';
}

/**
 * Explosionszeichnung: Schichten schräg hintereinander, beschriftet.
 * Beim Scrollen fächern sich die Schichten aus der zusammengesetzten Lage auf (CSS-Variable --p).
 */
export function ExplosionZeichnung({ v }: { v: SolarVariante }) {
  const ref = useScrollFortschritt<SVGSVGElement>();
  const [aktiv, setAktiv] = useState<number | null>(null);
  const n = v.explosion.length;
  const pw = 72, ph = 220, sk = 34, y0 = 40, x0 = 16;
  const step = Math.min(34, (200 - pw) / Math.max(1, n - 1) + 14);
  const P = (x: number, u: number, w: number): Pt => [x + u * pw, y0 + sk - u * sk + w * ph];
  const poly = (x: number, u1: number, u2: number, w1: number, w2: number) =>
    [P(x, u1, w1), P(x, u2, w1), P(x, u2, w2), P(x, u1, w2)].map((p) => p.join(',')).join(' ');
  const pathOf = (x: number, u1: number, u2: number, w1: number, w2: number) => {
    const pts = [P(x, u1, w1), P(x, u2, w1), P(x, u2, w2), P(x, u1, w2)];
    return `M${pts.map((p) => p.join(',')).join(' L')} Z`;
  };

  const layer = (t: Typ, x: number): { el: ReactNode; ankerW: number } => {
    const stroke = { stroke: C.linie, strokeWidth: 0.7 };
    switch (t) {
      case 'pv':
      case 'pvglas':
        return {
          ankerW: 0.25,
          el: (
            <g>
              <polygon points={poly(x, 0, 1, 0, 1)} fill={t === 'pv' ? C.modul : C.glas} {...stroke} />
              {t === 'pvglas' && <polygon points={poly(x, 0.08, 0.92, 0.05, 0.95)} fill={C.modul} opacity={0.55} />}
              {[1, 2, 3].map((k) => (
                <line key={`u${k}`} x1={P(x, k / 4, 0.03)[0]} y1={P(x, k / 4, 0.03)[1]} x2={P(x, k / 4, 0.97)[0]} y2={P(x, k / 4, 0.97)[1]} stroke={C.zelle} strokeWidth={0.8} />
              ))}
              {[1, 2, 3, 4, 5, 6, 7].map((k) => (
                <line key={`w${k}`} x1={P(x, 0.03, k / 8)[0]} y1={P(x, 0.03, k / 8)[1]} x2={P(x, 0.97, k / 8)[0]} y2={P(x, 0.97, k / 8)[1]} stroke={C.zelle} strokeWidth={0.8} />
              ))}
            </g>
          ),
        };
      case 'glas':
        return {
          ankerW: 0.3,
          el: (
            <g>
              <polygon points={poly(x, 0, 1, 0, 1)} fill={C.glas} opacity={0.8} {...stroke} />
              <line x1={P(x, 0.15, 0.1)[0]} y1={P(x, 0.15, 0.1)[1]} x2={P(x, 0.55, 0.45)[0]} y2={P(x, 0.55, 0.45)[1]} stroke="#fff" strokeWidth={2} opacity={0.8} />
            </g>
          ),
        };
      case 'holz':
      case 'latten':
        return {
          ankerW: 0.45,
          el: (
            <g>
              <polygon points={poly(x, 0, 1, 0, 1)} fill={C.holz} {...stroke} />
              {Array.from({ length: t === 'latten' ? 5 : 8 }, (_, k) => {
                const u = (k + 1) / (t === 'latten' ? 6 : 9);
                return <line key={k} x1={P(x, u, 0.01)[0]} y1={P(x, u, 0.01)[1]} x2={P(x, u, 0.99)[0]} y2={P(x, u, 0.99)[1]} stroke={t === 'latten' ? C.holzDunkel : C.holzMaser} strokeWidth={t === 'latten' ? 2 : 0.6} />;
              })}
            </g>
          ),
        };
      case 'daemmung':
        return { ankerW: 0.55, el: <polygon points={poly(x, 0, 1, 0, 1)} fill={C.daemmung} {...stroke} /> };
      case 'luft':
        return { ankerW: 0.35, el: <polygon points={poly(x, 0, 1, 0, 1)} fill="none" stroke={C.linie} strokeWidth={0.8} strokeDasharray="4 4" /> };
      case 'gummi':
        return { ankerW: 0.5, el: <path d={`${pathOf(x, 0, 1, 0, 1)} ${pathOf(x, 0.04, 0.96, 0.02, 0.98)}`} fill={C.gummi} fillRule="evenodd" /> };
      case 'distanz':
        return {
          ankerW: 0.2,
          el: (
            <g>
              {[
                [0.1, 0.15], [0.9, 0.15], [0.1, 0.85], [0.9, 0.85],
              ].map(([u, w]) => (
                <polygon key={`${u}${w}`} points={poly(x, u - 0.07, u + 0.07, w - 0.025, w + 0.025)} fill={C.edelstahl} {...stroke} />
              ))}
            </g>
          ),
        };
      case 'befestigung':
        return {
          ankerW: 0.88,
          el: (
            <g>
              {[0.2, 0.8].map((u) => (
                <g key={u}>
                  <polygon points={poly(x, u - 0.08, u + 0.08, 0.8, 0.95)} fill={C.stahl} {...stroke} />
                  <circle cx={P(x, u, 0.87)[0]} cy={P(x, u, 0.87)[1]} r={2} fill={C.linie} />
                </g>
              ))}
            </g>
          ),
        };
      case 'kabel':
        return { ankerW: 0.95, el: <polygon points={poly(x, 0.05, 0.95, 0.91, 0.99)} fill={C.kabel} {...stroke} /> };
      case 'led':
        return {
          ankerW: 0.05,
          el: (
            <g>
              <polygon points={poly(x, 0.02, 0.98, 0.02, 0.07)} fill={C.led} opacity={0.35} />
              <polygon points={poly(x, 0.02, 0.98, 0.035, 0.05)} fill={C.led} />
            </g>
          ),
        };
      case 'rinne':
        return { ankerW: 0.94, el: <polygon points={poly(x, 0, 1, 0.88, 1)} fill={C.stahl} {...stroke} /> };
      default:
        return { ankerW: 0.4, el: <path d={`${pathOf(x, 0, 1, 0, 1)} ${pathOf(x, 0.12, 0.88, 0.05, 0.95)}`} fill={C.alu} fillRule="evenodd" {...stroke} /> };
    }
  };

  const schichten = v.explosion.map((label, i) => {
    const x = x0 + i * step;
    const l = layer(typ(label), x);
    return { label, x, ...l, anker: P(x, 0.9, l.ankerW) };
  });
  const textX = x0 + (n - 1) * step + pw + 26;
  const ly = verteile(schichten.map((s) => s.anker[1]), 30, 36, 290);

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${textX + 130} 310`}
      role="img"
      aria-label={`Explosionszeichnung Variante ${v.name}: ${v.explosion.join(', ')}`}
      className={cx('h-auto w-full', aktiv !== null && 'zg-hat-aktiv')}
      fontFamily="var(--font-sans)"
      onMouseLeave={() => setAktiv(null)}
    >
      {[...schichten].reverse().map((s) => {
        const i = schichten.indexOf(s);
        return (
          <g
            key={s.label}
            className={cx('zg-teil', aktiv === i && 'is-aktiv')}
            style={{ transform: `translateX(calc((1 - var(--p, 1)) * ${-(s.x - x0)}px))` }}
            onMouseEnter={() => setAktiv(i)}
          >
            {s.el}
          </g>
        );
      })}
      <g className="zg-labels">
        {schichten.map((s, i) => {
          const ist = aktiv === i;
          return (
            <g key={`l${s.label}`} className={cx('zg-callout cursor-pointer', ist && 'is-aktiv')} onMouseEnter={() => setAktiv(i)} onClick={() => setAktiv(ist ? null : i)}>
              <line x1={s.anker[0]} y1={s.anker[1]} x2={textX - 6} y2={ly[i]} stroke={ist ? C.led : C.linie} strokeWidth={ist ? 1.4 : 0.6} />
              <circle cx={s.anker[0]} cy={s.anker[1]} r={ist ? 3 : 1.8} fill={ist ? C.led : C.linie} />
              <text x={textX} y={ly[i]! + 4} fontSize={12} fill={C.linie} fontWeight={ist ? 600 : 400}>
                {s.label}
              </text>
              <rect x={textX - 4} y={ly[i]! - 10} width={130} height={20} fill="transparent" />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
