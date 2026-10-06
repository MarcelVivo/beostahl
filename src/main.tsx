import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { createBrowserRouter, matchRoutes, type HydrationState } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import '@fontsource/michroma/latin-400.css';
import '@fontsource-variable/inter/wght.css';
import './styles/index.css';
import { routes } from './routes';

const hydrationData = (window as { __staticRouterHydrationData?: HydrationState }).__staticRouterHydrationData;
const root = document.getElementById('root')!;

async function start() {
  // Code der aktuellen Seite vor dem Hydrieren laden, damit das vorgerenderte HTML nicht flackert
  const lazyMatches = matchRoutes(routes, window.location)?.filter((m) => m.route.lazy) ?? [];
  await Promise.all(
    lazyMatches.map(async (m) => {
      const mod = await (m.route.lazy as () => Promise<Record<string, unknown>>)();
      Object.assign(m.route, { ...mod, lazy: undefined });
    }),
  );

  const router = createBrowserRouter(routes, { hydrationData });
  const app = (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
  // Vorgerenderte Seiten übernehmen (hydrieren), sonst neu rendern (Entwicklung)
  if (root.firstElementChild) hydrateRoot(root, app);
  else createRoot(root).render(app);
}

void start();

// Schreibschrift (nur für den Claim weiter unten) erst nach dem Laden der Seite holen
const ladeSchreibschrift = () => void import('@fontsource/allura/latin-400.css');
if (document.readyState === 'complete') ladeSchreibschrift();
else window.addEventListener('load', ladeSchreibschrift, { once: true });
