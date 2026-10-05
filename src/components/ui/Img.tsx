import { cx } from '@/lib';

interface Props {
  /** Pfad zur grossen WebP-Datei, z. B. /images/produkte/drive-d2-pro-hero.webp */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** true: es existiert zusätzlich eine Variante <name>-800.webp */
  responsive?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/** Bild mit Lazy Loading und optionalem srcset nach Namensschema <name>-800.webp */
export function Img({ src, alt, width, height, responsive = false, sizes = '100vw', priority = false, className }: Props) {
  const small = src.replace(/\.webp$/, '-800.webp');
  return (
    <img
      src={src}
      srcSet={responsive ? `${small} 800w, ${src} ${width}w` : undefined}
      sizes={responsive ? sizes : undefined}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      className={cx('block', className)}
    />
  );
}
