import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { ChevronDown, Menu, X } from 'lucide-react';
import { mainNav } from '@/data/site';
import { leistungen } from '@/data/leistungen';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { MegaMenu } from './MegaMenu';
import { cx } from '@/lib';

const navLinkCls = ({ isActive }: { isActive: boolean }) =>
  cx(
    'relative inline-flex min-h-11 items-center px-0.5 font-display text-[0.625rem] tracking-[0.12em] whitespace-nowrap uppercase transition-colors',
    isActive ? 'text-gold' : 'text-white/85 hover:text-white',
  );

export function Header() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileLeistungen, setMobileLeistungen] = useState(false);
  const megaId = useId();
  const mobileId = useId();
  const megaWrap = useRef<HTMLLIElement>(null);
  const megaButton = useRef<HTMLButtonElement>(null);
  const mobileButton = useRef<HTMLButtonElement>(null);
  const mobilePanel = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);
  const { pathname } = useLocation();
  const leistungenActive = pathname.startsWith('/leistungen');

  const closeAll = useCallback(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, []);

  // Bei Seitenwechsel alles schliessen
  useEffect(() => closeAll(), [pathname, closeAll]);

  // Escape schliesst und gibt den Fokus an den auslösenden Button zurück
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (megaOpen) {
        setMegaOpen(false);
        megaButton.current?.focus();
      }
      if (mobileOpen) {
        setMobileOpen(false);
        mobileButton.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [megaOpen, mobileOpen]);

  // Klick ausserhalb schliesst das Mega-Menü
  useEffect(() => {
    if (!megaOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!megaWrap.current?.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [megaOpen]);

  // Mobile: Hintergrund sperren, Fokus ins Panel setzen
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    if (mobileOpen) mobilePanel.current?.querySelector<HTMLElement>('a, button')?.focus();
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Hover nur für Maus, mit kurzer Verzögerung gegen versehentliches Öffnen
  const onEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setMegaOpen(true), 120);
  };
  const onLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setMegaOpen(false), 200);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-steel">
      <div className="relative">
        <div className="container-site flex h-18 items-center justify-between gap-4 xl:h-20">
          <Logo tone="dark" />

          {/* Desktop-Navigation */}
          <nav aria-label="Hauptnavigation" className="hidden xl:block">
            <ul className="flex items-center gap-6">
              {mainNav.map((item) =>
                'mega' in item ? (
                  <li key={item.to} ref={megaWrap} onPointerEnter={onEnter} onPointerLeave={onLeave} className="static">
                    <button
                      ref={megaButton}
                      type="button"
                      aria-expanded={megaOpen}
                      aria-controls={megaId}
                      onClick={() => setMegaOpen((o) => !o)}
                      className={navLinkCls({ isActive: leistungenActive || megaOpen }) + ' gap-2'}
                    >
                      {item.label}
                      <ChevronDown aria-hidden strokeWidth={1.5} className={cx('size-3.5 transition-transform', megaOpen && 'rotate-180')} />
                    </button>
                    {megaOpen && <MegaMenu id={megaId} onNavigate={closeAll} />}
                  </li>
                ) : (
                  <li key={item.to}>
                    <NavLink to={item.to} className={navLinkCls}>
                      {item.label}
                    </NavLink>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <Button to="/anfrage" className="px-5">
Projekt anfragen
              </Button>
            </div>
            <button
              ref={mobileButton}
              type="button"
              aria-expanded={mobileOpen}
              aria-controls={mobileId}
              onClick={() => setMobileOpen((o) => !o)}
              className="inline-flex size-12 items-center justify-center text-white xl:hidden"
            >
              <span className="sr-only">{mobileOpen ? 'Menü schliessen' : 'Menü öffnen'}</span>
              {mobileOpen ? <X aria-hidden strokeWidth={1.5} /> : <Menu aria-hidden strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Mobile-Navigation */}
        {mobileOpen && (
          <div
            id={mobileId}
            ref={mobilePanel}
            className="fixed inset-x-0 top-18 bottom-0 overflow-y-auto border-t border-white/10 bg-steel-900 xl:hidden"
          >
            <nav aria-label="Hauptnavigation" className="container-site py-6">
              <ul className="divide-y divide-white/10">
                {mainNav.map((item) =>
                  'mega' in item ? (
                    <li key={item.to}>
                      <button
                        type="button"
                        aria-expanded={mobileLeistungen}
                        onClick={() => setMobileLeistungen((o) => !o)}
                        className="flex min-h-14 w-full items-center justify-between font-display text-xs tracking-[0.16em] text-white uppercase"
                      >
                        {item.label}
                        <ChevronDown aria-hidden strokeWidth={1.5} className={cx('size-4 text-gold transition-transform', mobileLeistungen && 'rotate-180')} />
                      </button>
                      {mobileLeistungen && (
                        <ul className="pb-4">
                          <li>
                            <Link to="/leistungen" className="flex min-h-11 items-center text-[0.9375rem] text-gold">
                              Alle Leistungen im Überblick
                            </Link>
                          </li>
                          <li>
                            <Link to="/fontana-forni" className="flex min-h-11 items-center gap-3 text-[0.9375rem] text-white/80">
                              <span className="eyebrow text-gold">Partner</span> Fontana Forni
                            </Link>
                          </li>
                          {leistungen.map((l) => (
                            <li key={l.slug}>
                              <Link to={`/leistungen/${l.slug}`} className="flex min-h-11 items-center gap-3 text-[0.9375rem] text-white/80">
                                <l.icon aria-hidden strokeWidth={1.5} className="size-4 shrink-0 text-gold/80" />
                                {l.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ) : (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          cx('flex min-h-14 items-center font-display text-xs tracking-[0.16em] uppercase', isActive ? 'text-gold' : 'text-white')
                        }
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ),
                )}
              </ul>
              <div className="mt-8 grid gap-3">
                <Button to="/anfrage" arrow>
                  Projekt anfragen
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button to="/privatkunden" variant="outline-light">
                    Privatkunden
                  </Button>
                  <Button to="/fachpartner" variant="outline-light">
                    Fachpartner
                  </Button>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
