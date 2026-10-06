import { useEffect, useRef, useState } from 'react';

const bewegungReduziert = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Einmaliger Aufbau einer Zeichnung, sobald sie ins Bild kommt.
 * Liefert eine Klasse: '' (fertig, auch ohne JavaScript), 'zg-pending' (wartet), 'zg-run' (baut sich auf).
 * Zeichnungen, die beim Laden schon sichtbar sind, werden nicht versteckt.
 */
export function useAufbau<T extends Element>() {
  const ref = useRef<T>(null);
  const [zustand, setZustand] = useState<'' | 'zg-pending' | 'zg-run'>('');

  useEffect(() => {
    const el = ref.current;
    if (!el || bewegungReduziert() || !('IntersectionObserver' in window)) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;
    setZustand('zg-pending');
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          // ein Frame warten, damit der Ausgangszustand gemalt ist und die Übergänge laufen
          requestAnimationFrame(() => setZustand('zg-run'));
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, klasse: zustand };
}

/**
 * Scroll-Fortschritt einer Zeichnung als CSS-Variable --p (0 = zusammengesetzt, 1 = aufgefächert).
 * Ohne JavaScript oder bei «Bewegung reduzieren» bleibt --p ungesetzt (= 1, fertige Ansicht).
 */
export function useScrollFortschritt<T extends HTMLElement | SVGElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || bewegungReduziert()) return;
    let frame = 0;
    let aktiv = false;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // beginnt, wenn die Oberkante bei 90 % der Fensterhöhe ist, fertig bei 40 %
      const p = Math.min(1, Math.max(0, (vh * 0.9 - r.top) / (vh * 0.5)));
      el.style.setProperty('--p', p.toFixed(3));
    };
    const onScroll = () => {
      if (aktiv && !frame) frame = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([e]) => {
      aktiv = !!e?.isIntersecting;
      if (aktiv) update();
    }, { rootMargin: '200px 0px' });
    update();
    io.observe(el);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}
