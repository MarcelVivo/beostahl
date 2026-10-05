import type { RouteObject } from 'react-router';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { LeistungenPage } from '@/pages/LeistungenPage';
import { LeistungPage } from '@/pages/LeistungPage';
import { ProduktePage } from '@/pages/ProduktePage';
import { ProductPage } from '@/pages/ProductPage';
import { ProjektablaufPage } from '@/pages/ProjektablaufPage';
import { WarumBeoPage } from '@/pages/WarumBeoPage';
import { PrivatkundenPage } from '@/pages/PrivatkundenPage';
import { FachpartnerPage } from '@/pages/FachpartnerPage';
import { AnfragePage } from '@/pages/AnfragePage';
import { KontaktPage } from '@/pages/KontaktPage';
import { UeberUnsPage } from '@/pages/UeberUnsPage';
import { ImpressumPage } from '@/pages/ImpressumPage';
import { DatenschutzPage } from '@/pages/DatenschutzPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ReferenzenPage } from '@/pages/ReferenzenPage';
import { ReferenzPage } from '@/pages/ReferenzPage';
import { referenzen } from '@/data/referenzen';
import { leistungen } from '@/data/leistungen';
import { produkte } from '@/data/produkte';

/** Alle Routen. Als Array definiert, damit sie beim Build vorgerendert werden. */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'leistungen', element: <LeistungenPage /> },
      { path: 'leistungen/:slug', element: <LeistungPage /> },
      { path: 'produkte', element: <ProduktePage /> },
      { path: 'produkte/:slug', element: <ProductPage /> },
      { path: 'referenzen', element: <ReferenzenPage /> },
      { path: 'referenzen/:slug', element: <ReferenzPage /> },
      { path: 'projektablauf', element: <ProjektablaufPage /> },
      { path: 'warum-beo', element: <WarumBeoPage /> },
      { path: 'privatkunden', element: <PrivatkundenPage /> },
      { path: 'fachpartner', element: <FachpartnerPage /> },
      { path: 'anfrage', element: <AnfragePage /> },
      { path: 'kontakt', element: <KontaktPage /> },
      { path: 'ueber-uns', element: <UeberUnsPage /> },
      { path: 'impressum', element: <ImpressumPage /> },
      { path: 'datenschutz', element: <DatenschutzPage /> },
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
