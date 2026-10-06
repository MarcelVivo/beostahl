/**
 * Zeichensystem für schematische Konstruktionszeichnungen.
 * Einheitliche Farben und Bausteine, Koordinatensystem viewBox 520 × 340, Terrain bei y = 300.
 */
import type { ReactNode } from 'react';

export type Pt = [number, number];

export const C = {
  linie: '#3A3F45',
  hilfslinie: '#8A9097',
  modul: '#1C2A44',
  zelle: '#33476A',
  glas: '#CFE3EE',
  alu: '#B9C0C7',
  stahl: '#5E666E',
  stahlHell: '#8E979F',
  edelstahl: '#D3D8DC',
  holz: '#C9925A',
  holzMaser: '#AE7743',
  holzDunkel: '#A86F3C',
  beton: '#D9D9D5',
  belag: '#A9AEB3',
  gummi: '#222326',
  akustik: '#9AA1A8',
  gruen: '#6E9B5E',
  gruenDunkel: '#557D48',
  stoff: '#E4DCCB',
  kabel: '#4A5058',
  led: '#D9A55B',
  wasser: '#5B8FB0',
};

/** Muster-IDs, je SVG eindeutig */
export interface Ids {
  beton: string;
  mauer: string;
  erde: string;
  akustik: string;
}

export const Defs = ({ ids }: { ids: Ids }) => (
  <defs>
    <pattern id={ids.beton} width="10" height="10" patternUnits="userSpaceOnUse">
      <rect width="10" height="10" fill={C.beton} />
      <circle cx="2" cy="3" r="0.8" fill="#A7A7A2" />
      <circle cx="7" cy="7" r="0.6" fill="#A7A7A2" />
    </pattern>
    <pattern id={ids.mauer} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="8" height="8" fill="#ECEDEE" />
      <line x1="0" y1="0" x2="0" y2="8" stroke="#B8BDC2" strokeWidth="1.2" />
    </pattern>
    <pattern id={ids.erde} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="10" stroke="#C9CDD1" strokeWidth="1" />
    </pattern>
    <pattern id={ids.akustik} width="8" height="8" patternUnits="userSpaceOnUse">
      <rect width="8" height="8" fill={C.akustik} />
      <circle cx="4" cy="4" r="1.2" fill="#7D848B" />
    </pattern>
  </defs>
);

const sw = 0.7;

export const Rect = ({ x, y, w, h, f, s = C.linie, o, dash }: { x: number; y: number; w: number; h: number; f: string; s?: string; o?: number; dash?: string }) => (
  <rect x={x} y={y} width={w} height={h} fill={f} stroke={s} strokeWidth={sw} opacity={o} strokeDasharray={dash} />
);

export const Poly = ({ pts, f, s = C.linie, o, dash }: { pts: Pt[]; f: string; s?: string; o?: number; dash?: string }) => (
  <polygon points={pts.map((p) => p.join(',')).join(' ')} fill={f} stroke={s} strokeWidth={sw} opacity={o} strokeDasharray={dash} />
);

export const Linie = ({ a, b, s = C.linie, w = 1, dash, o }: { a: Pt; b: Pt; s?: string; w?: number; dash?: string; o?: number }) => (
  <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={s} strokeWidth={w} strokeDasharray={dash} opacity={o} strokeLinecap="round" />
);

/** Terrain mit Schraffur */
export const Terrain = ({ ids, x1 = 30, x2 = 490, y = 300 }: { ids: Ids; x1?: number; x2?: number; y?: number }) => (
  <g>
    <rect x={x1} y={y} width={x2 - x1} height={14} fill={`url(#${ids.erde})`} />
    <Linie a={[x1, y]} b={[x2, y]} w={1.2} />
  </g>
);

/** Fundament (Beton) */
export const Fundament = ({ ids, x, y = 300, w = 30, h = 30 }: { ids: Ids; x: number; y?: number; w?: number; h?: number }) => (
  <Rect x={x} y={y} w={w} h={h} f={`url(#${ids.beton})`} />
);

/** Geschnittene Wand (schraffiert) */
export const Wand = ({ ids, x, y, w, h }: { ids: Ids; x: number; y: number; w: number; h: number }) => <Rect x={x} y={y} w={w} h={h} f={`url(#${ids.mauer})`} />;

/** Solarmodul als dünne Platte mit Zellteilung, horizontal oder entlang einer Strecke */
export const SolarBand = ({ a, b, d = 7 }: { a: Pt; b: Pt; d?: number }) => {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const ang = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
  const n = Math.floor(len / 22);
  return (
    <g transform={`translate(${a[0]},${a[1]}) rotate(${ang})`}>
      <rect x={0} y={-d} width={len} height={d} fill={C.modul} stroke={C.linie} strokeWidth={sw} />
      {Array.from({ length: n }, (_, i) => (
        <line key={i} x1={(i + 1) * 22} x2={(i + 1) * 22} y1={-d + 1} y2={-1} stroke={C.zelle} strokeWidth={1} />
      ))}
    </g>
  );
};

/** Glasplatte entlang einer Strecke */
export const GlasBand = ({ a, b, d = 6 }: { a: Pt; b: Pt; d?: number }) => {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const ang = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
  return (
    <g transform={`translate(${a[0]},${a[1]}) rotate(${ang})`}>
      <rect x={0} y={-d} width={len} height={d} fill={C.glas} stroke={C.linie} strokeWidth={sw} />
    </g>
  );
};

/** Träger entlang einer Strecke */
export const Traeger = ({ a, b, d = 12, f = C.stahl }: { a: Pt; b: Pt; d?: number; f?: string }) => {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const ang = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
  return (
    <g transform={`translate(${a[0]},${a[1]}) rotate(${ang})`}>
      <rect x={0} y={0} width={len} height={d} fill={f} stroke={C.linie} strokeWidth={sw} />
    </g>
  );
};

export const Led = ({ a, b }: { a: Pt; b: Pt }) => (
  <g>
    <Linie a={a} b={b} s={C.led} w={7} o={0.3} />
    <Linie a={a} b={b} s={C.led} w={2.2} />
  </g>
);

export const Tropfen = ({ x, y1, y2 }: { x: number; y1: number; y2: number }) => (
  <g>
    <Linie a={[x, y1]} b={[x, y2]} s={C.wasser} w={1} dash="2 3" />
    <path d={`M${x},${y2 - 2} q-3,5 0,7 q3,-2 0,-7`} fill={C.wasser} />
  </g>
);

export const Schraube = ({ x, y, r = 2.2 }: { x: number; y: number; r?: number }) => <circle cx={x} cy={y} r={r} fill={C.linie} />;

/** Einfache Fahrzeug-Silhouette (Seitenansicht) */
export const Auto = ({ x, y = 300, w = 110 }: { x: number; y?: number; w?: number }) => {
  const k = w / 110;
  return (
    <g transform={`translate(${x},${y}) scale(${k})`} fill="none" stroke={C.hilfslinie} strokeWidth={1.2}>
      <path d="M6,-8 L6,-22 Q8,-28 18,-30 L34,-31 L46,-44 Q50,-48 58,-48 L78,-48 Q86,-48 90,-42 L98,-31 L104,-29 Q108,-27 108,-20 L108,-8" />
      <circle cx={26} cy={-8} r={8} />
      <circle cx={88} cy={-8} r={8} />
      <path d="M50,-31 L56,-43 L76,-43 L82,-31 Z" />
    </g>
  );
};

/** Kleine Pflanze */
export const Pflanze = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <ellipse cx={0} cy={-14} rx={10} ry={13} fill={C.gruen} stroke={C.gruenDunkel} strokeWidth={0.8} />
    <ellipse cx={-8} cy={-6} rx={7} ry={7} fill={C.gruenDunkel} />
    <ellipse cx={8} cy={-7} rx={7} ry={8} fill={C.gruen} />
  </g>
);

export const Text = ({ x, y, children, anchor = 'middle', size = 11 }: { x: number; y: number; children: ReactNode; anchor?: 'start' | 'middle' | 'end'; size?: number }) => (
  <text x={x} y={y} textAnchor={anchor} fontSize={size} fill={C.hilfslinie}>
    {children}
  </text>
);

/** Rückgabe einer Zeichnung: Grafik plus benannte Ankerpunkte für die Hinweislinien */
export interface Gezeichnet {
  el: ReactNode;
  a: Record<string, Pt>;
}
