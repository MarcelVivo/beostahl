import type { ComponentType } from 'react';
import type { RouteObject } from 'react-router';
import { Layout } from '@/components/layout/Layout';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { referenzen } from '@/data/referenzen';
import { leistungen } from '@/data/leistungen';
import { produkte } from '@/data/produkte';

/** Seite erst bei Bedarf laden (eigene JS-Datei pro Seite) */
const lazy = (load: () => Promise<Record<string, unknown>>, name: string) => async () => ({ Component: (await load())[name] as ComponentType });

/** Alle Routen. Als Array definiert, damit sie beim Build vorgerendert werden. */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, lazy: lazy(() => import('@/pages/HomePage'), 'HomePage') },
      { path: 'leistungen', lazy: lazy(() => import('@/pages/LeistungenPage'), 'LeistungenPage') },
      { path: 'leistungen/solar-balkongelaender', lazy: lazy(() => import('@/pages/SolarBalkongelaenderPage'), 'SolarBalkongelaenderPage') },
      { path: 'leistungen/:slug', lazy: lazy(() => import('@/pages/LeistungPage'), 'LeistungPage') },
      { path: 'produkte', lazy: lazy(() => import('@/pages/ProduktePage'), 'ProduktePage') },
      { path: 'produkte/:slug', lazy: lazy(() => import('@/pages/ProductPage'), 'ProductPage') },
      { path: 'referenzen', lazy: lazy(() => import('@/pages/ReferenzenPage'), 'ReferenzenPage') },
      { path: 'referenzen/:slug', lazy: lazy(() => import('@/pages/ReferenzPage'), 'ReferenzPage') },
      { path: 'fontana-forni', lazy: lazy(() => import('@/pages/FontanaPage'), 'FontanaPage') },
      { path: 'projektablauf', lazy: lazy(() => import('@/pages/ProjektablaufPage'), 'ProjektablaufPage') },
      { path: 'warum-beo', lazy: lazy(() => import('@/pages/WarumBeoPage'), 'WarumBeoPage') },
      { path: 'privatkunden', lazy: lazy(() => import('@/pages/PrivatkundenPage'), 'PrivatkundenPage') },
      { path: 'fachpartner', lazy: lazy(() => import('@/pages/FachpartnerPage'), 'FachpartnerPage') },
      { path: 'anfrage', lazy: lazy(() => import('@/pages/AnfragePage'), 'AnfragePage') },
      { path: 'kontakt', lazy: lazy(() => import('@/pages/KontaktPage'), 'KontaktPage') },
      { path: 'ueber-uns', lazy: lazy(() => import('@/pages/UeberUnsPage'), 'UeberUnsPage') },
      { path: 'impressum', lazy: lazy(() => import('@/pages/ImpressumPage'), 'ImpressumPage') },
      { path: 'datenschutz', lazy: lazy(() => import('@/pages/DatenschutzPage'), 'DatenschutzPage') },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];

/** Alle öffentlichen Pfade für Vorrendern und Sitemap. noindex-Seiten sind markiert. */
export const sitemapPaths: Array<{ path: string; priority: number }> = [
  { path: '/', priority: 1.0 },
  { path: '/leistungen', priority: 0.9 },
  ...leistungen.map((l) => ({ path: `/leistungen/${l.slug}`, priority: 0.8 })),
  { path: '/produkte', priority: 0.9 },
  ...produkte.map((p) => ({ path: `/produkte/${p.slug}`, priority: 0.8 })),
  { path: '/referenzen', priority: 0.7 },
  ...referenzen.map((r) => ({ path: `/referenzen/${r.slug}`, priority: 0.7 })),
  { path: '/fontana-forni', priority: 0.7 },
  { path: '/projektablauf', priority: 0.6 },
  { path: '/warum-beo', priority: 0.6 },
  { path: '/privatkunden', priority: 0.7 },
  { path: '/fachpartner', priority: 0.7 },
  { path: '/anfrage', priority: 0.8 },
  { path: '/kontakt', priority: 0.6 },
  { path: '/ueber-uns', priority: 0.5 },
  { path: '/impressum', priority: 0.2 },
  { path: '/datenschutz', priority: 0.2 },
];
