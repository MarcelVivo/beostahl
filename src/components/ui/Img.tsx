import { useEffect, useRef, useState } from 'react';
import { cx } from '@/lib';

interface Props {
  /** Pfad zur grossen WebP-Datei, z. B. /images/produkte/drive-d2-pro-hero.webp */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** true: es existieren zusätzlich die Varianten <name>-640.webp und <name>-800.webp */
  responsive?: boolean;
  sizes?: string;
  priority?: boolean;
  /**
   * Bild erst laden, wenn es sich dem sichtbaren Bereich nähert (strenger als loading="lazy").
   * Für Bilder weit unten auf der Seite, damit sie beim Laden keine Bandbreite belegen.
   */
  deferred?: boolean;
  className?: string;
}

/** Bild mit Lazy Loading und optionalem srcset nach Namensschema <name>-640.webp, <name>-800.webp */
export function Img({ src, alt, width, height, responsive = false, sizes = '100vw', priority = false, deferred = false, className }: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const [show, setShow] = useState(!deferred);

  useEffect(() => {
    if (show) return;
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [show]);

  const small = src.replace(/\.webp$/, '-800.webp');
  const xsmall = src.replace(/\.webp$/, '-640.webp');
  const srcSet = responsive ? `${xsmall} 640w, ${small} 800w, ${src} ${width}w` : undefined;
  const common = {
    alt,
    width,
    height,
    sizes: responsive ? sizes : undefined,
    className: cx('block', className),
  };

  return (
    <>
      <img
        ref={ref}
        {...common}
        src={show ? src : undefined}
        srcSet={show ? srcSet : undefined}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : undefined}
      />
      {deferred && (
        <noscript>
          <img {...common} src={src} srcSet={srcSet} loading="lazy" decoding="async" />
        </noscript>
      )}
    </>
  );
}
