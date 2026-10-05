import type { Zeichnung } from '@/data/types';

type View = 'front' | 'side' | 'top';

const S = 100; // 1 m = 100 Einheiten
const fmt = (m: number) => `${m.toFixed(2)} m`;

const LINE = { stroke: 'currentColor', vectorEffect: 'non-scaling-stroke' as const };

/** Masslinie mit Architektur-Schrägstrichen an den Enden */
function Dim({ x1, y1, x2, y2, label, vertical = false }: { x1: number; y1: number; x2: number; y2: number; label: string; vertical?: boolean }) {
  const t = 9;
  return (
    <g className="text-graphite">
      <line x1={x1} y1={y1} x2={x2} y2={y2} {...LINE} strokeWidth={1} />
      <line x1={x1 - t} y1={y1 + t} x2={x1 + t} y2={y1 - t} {...LINE} strokeWidth={1.5} />
      <line x1={x2 - t} y1={y2 + t} x2={x2 + t} y2={y2 - t} {...LINE} strokeWidth={1.5} />
      <text
        x={vertical ? x1 + 18 : (x1 + x2) / 2}
        y={vertical ? (y1 + y2) / 2 + 10 : y1 + 40}
        textAnchor={vertical ? 'start' : 'middle'}
        fontSize={28}
        fill="currentColor"
        fontFamily="var(--font-sans)"
      >
        {label}
      </text>
    </g>
  );
}

/** Hilfslinie (gestrichelt) vom Bauteil zur Masslinie */
const Ext = ({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) => (
  <line x1={x1} y1={y1} x2={x2} y2={y2} {...LINE} strokeWidth={0.75} strokeDasharray="4 4" className="text-mist" />
);

/** Schematische Ansicht einer Rahmenkonstruktion (Carport, Terrasse, Wintergarten). */
export function TechDrawing({ z, view }: { z: Zeichnung; view: View }) {
  const H = z.hoehe * S;
  const W = (view === 'side' ? z.tiefe : z.breite) * S;
  const D = z.tiefe * S;
  const pad = { l: 30, r: 150, t: 30, b: 90 };
  const contentH = view === 'top' ? D : H;
  const vb = `${-pad.l} ${-pad.t} ${W + pad.l + pad.r} ${contentH + pad.t + pad.b}`;

  const labels: Record<View, string> = {
    front: `Frontansicht, Breite ${fmt(z.breite)}, Höhe ${fmt(z.hoehe)}`,
    side: `Seitenansicht, Tiefe ${fmt(z.tiefe)}, Höhe ${fmt(z.hoehe)}`,
    top: `Draufsicht, Breite ${fmt(z.breite)}, Tiefe ${fmt(z.tiefe)}`,
  };

  const post = 14;
  const roof = 22;

  return (
    <svg viewBox={vb} role="img" aria-label={labels[view]} className="h-auto w-full text-steel">
      {view !== 'top' ? (
        <>
          {/* Boden */}
          <line x1={-20} y1={H} x2={W + 20} y2={H} {...LINE} strokeWidth={1} className="text-graphite" />
          {/* Dach (Seitenansicht leicht geneigt) */}
          {view === 'front' ? (
            <rect x={0} y={0} width={W} height={roof} fill="currentColor" />
          ) : (
            <polygon points={`0,0 ${W},8 ${W},${roof + 8} 0,${roof}`} fill="currentColor" />
          )}
          {/* LED-Profil */}
          <rect x={post + 6} y={roof} width={W - 2 * post - 12} height={4} fill="var(--color-gold)" />
          {/* Stützen */}
          {view === 'front' ? (
            <>
              <rect x={2} y={roof} width={post} height={H - roof} fill="currentColor" />
              <rect x={W - post - 2} y={roof} width={post} height={H - roof} fill="currentColor" />
            </>
          ) : (
            <>
              <rect x={30} y={roof} width={post} height={H - roof} fill="currentColor" />
              <rect x={W - post - 40} y={roof + 6} width={post} height={H - roof - 6} fill="currentColor" />
            </>
          )}
          {/* Masse */}
          <Ext x1={0} y1={H} x2={0} y2={H + 50} />
          <Ext x1={W} y1={H} x2={W} y2={H + 50} />
          <Dim x1={0} y1={H + 40} x2={W} y2={H + 40} label={fmt(view === 'front' ? z.breite : z.tiefe)} />
          <Ext x1={W} y1={0} x2={W + 50} y2={0} />
          <Dim x1={W + 40} y1={0} x2={W + 40} y2={H} label={fmt(z.hoehe)} vertical />
        </>
      ) : (
        <>
          {/* Dachfläche mit Glasfeldern */}
          <rect x={0} y={0} width={W} height={D} fill="var(--color-concrete)" stroke="currentColor" strokeWidth={2} vectorEffect="non-scaling-stroke" />
          {Array.from({ length: Math.max(2, Math.round(z.breite)) - 1 }, (_, i) => {
            const felder = Math.max(2, Math.round(z.breite));
            const x = ((i + 1) * W) / felder;
            return <line key={i} x1={x} y1={0} x2={x} y2={D} {...LINE} strokeWidth={0.75} className="text-mist" />;
          })}
          {/* Stützen */}
          {[
            [2, 2],
            [W - post - 2, 2],
            [2, D - post - 2],
            [W - post - 2, D - post - 2],
          ].map(([x, y]) => (
            <rect key={`${x}-${y}`} x={x} y={y} width={post} height={post} fill="currentColor" />
          ))}
          <Ext x1={0} y1={D} x2={0} y2={D + 50} />
          <Ext x1={W} y1={D} x2={W} y2={D + 50} />
          <Dim x1={0} y1={D + 40} x2={W} y2={D + 40} label={fmt(z.breite)} />
          <Ext x1={W} y1={0} x2={W + 50} y2={0} />
          <Ext x1={W} y1={D} x2={W + 50} y2={D} />
          <Dim x1={W + 40} y1={0} x2={W + 40} y2={D} label={fmt(z.tiefe)} vertical />
        </>
      )}
    </svg>
  );
}
