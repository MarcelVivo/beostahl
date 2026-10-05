import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { createBrowserRouter, type HydrationState } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import '@fontsource/michroma/latin-400.css';
import '@fontsource/michroma/latin-ext-400.css';
import '@fontsource-variable/inter/wght.css';
import '@fontsource/allura/latin-400.css';
import './styles/index.css';
import { routes } from './routes';

const hydrationData = (window as { __staticRouterHydrationData?: HydrationState }).__staticRouterHydrationData;
const router = createBrowserRouter(routes, { hydrationData });
const app = (
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
const root = document.getElementById('root')!;

// Vorgerenderte Seiten übernehmen (hydrieren), sonst neu rendern (Entwicklung)
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
