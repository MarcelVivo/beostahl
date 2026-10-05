import { Link } from 'react-router';
import { cx } from '@/lib';

interface Props {
  /** Hintergrund, auf dem das Logo steht */
  tone?: 'light' | 'dark';
  /** kompakt: ohne Slogan (Header) · voll: mit Slogan «Stahl. Glas. Solar. Für Generationen.» (Footer) */
  variant?: 'kompakt' | 'voll';
  className?: string;
}

const files = {
  kompakt: { dark: '/brand/logo-kompakt-dunkel.webp', light: '/brand/logo-kompakt-hell.webp', w: 404, h: 120 },
  voll: { dark: '/brand/logo-dunkel.webp', light: '/brand/logo-hell.webp', w: 720, h: 273 },
};

/** Logo als Link zur Startseite. */
export function Logo({ tone = 'dark', variant = 'kompakt', className }: Props) {
  const f = files[variant];
  return (
    <Link to="/" aria-label="BEO Stahl & Glasbau, zur Startseite" className={cx('inline-block shrink-0', className)}>
      <img
        src={tone === 'dark' ? f.dark : f.light}
        alt=""
        width={f.w}
        height={f.h}
        className={variant === 'kompakt' ? 'h-10 w-auto sm:h-12' : 'h-auto w-64 sm:w-80'}
      />
    </Link>
  );
}
