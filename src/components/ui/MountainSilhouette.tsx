import { cx } from '@/lib';

/**
 * Bergsilhouette als Signatur-Element. Stilisierte Kette mit Eiger, Mönch und Jungfrau.
 * Dekorativ; die Beschriftung «Berner Oberland» ist echter Text.
 */
export function MountainSilhouette({ className, label = true }: { className?: string; label?: boolean }) {
  return (
    <div className={cx(label && 'relative', className)}>
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden className="block h-full w-full">
        <path
          d="M0 120 L0 96 L60 88 L110 92 L170 74 L215 82 L262 60 L300 70 L338 52 L372 66 L420 40 L452 56 L486 34 L512 46 L548 18 L578 40 L604 30 L640 52 L688 26 L716 38 L760 12 L800 44 L842 36 L880 58 L928 50 L976 70 L1030 62 L1090 82 L1150 78 L1200 90 L1200 120 Z"
          fill="currentColor"
        />
        <path
          d="M0 96 L60 88 L110 92 L170 74 L215 82 L262 60 L300 70 L338 52 L372 66 L420 40 L452 56 L486 34 L512 46 L548 18 L578 40 L604 30 L640 52 L688 26 L716 38 L760 12 L800 44 L842 36 L880 58 L928 50 L976 70 L1030 62 L1090 82 L1150 78 L1200 90"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          opacity="0.7"
        />
      </svg>
      {label && (
        <span className="eyebrow absolute bottom-3 left-1/2 -translate-x-1/2 text-[0.625rem] whitespace-nowrap text-white/75">
          Berner Oberland
        </span>
      )}
    </div>
  );
}
