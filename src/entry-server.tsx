import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router';
import { routes, sitemapPaths } from './routes';

export { sitemapPaths };

const handler = createStaticHandler(routes);

/** Rendert eine Route zu HTML (für das Vorrendern beim Build). */
export async function render(path: string) {
  const context = await handler.query(new Request(`https://beostahlbau.ch${path}`));
  if (context instanceof Response) throw new Error(`Unerwartete Weiterleitung für ${path}`);
  const router = createStaticRouter(handler.dataRoutes, context);
  const html = renderToString(
    <StrictMode>
      <StaticRouterProvider router={router} context={context} />
    </StrictMode>,
  );
  return { html, status: context.statusCode };
}
