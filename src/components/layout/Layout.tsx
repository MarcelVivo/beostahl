import { useEffect, useRef } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';

/** Grundgerüst aller Seiten: Skip-Link, Header, Inhalt, Footer. */
export function Layout() {
  const { pathname } = useLocation();
  const main = useRef<HTMLElement>(null);
  const first = useRef(true);

  // Nach einem Seitenwechsel den Fokus auf den Inhalt setzen (Screenreader, Tastatur)
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    main.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <>
      <a
        href="#inhalt"
        className="sr-only z-[100] bg-gold px-4 py-3 font-display text-xs tracking-[0.16em] text-steel uppercase focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Zum Inhalt springen
      </a>
      <Header />
      <main id="inhalt" ref={main} tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  );
}
