/**
 * Rendert alle Seiten beim Build zu statischem HTML (für SEO, Link-Vorschauen und schnelle Ladezeit).
 * Ablauf: vite build (Client) → vite build --ssr (Server-Bundle) → dieses Skript.
 * Ergebnis: dist/<pfad>.html, dist/404.html, dist/sitemap.xml
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');
const SITE = 'https://beostahlbau.ch';

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const { render, sitemapPaths } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

/** React 19 stellt <title>, <meta> und <link> an den Anfang. Diesen Block in den <head> verschieben. */
function splitHead(html) {
  const re = /^(?:<title>[^<]*<\/title>|<meta\b[^>]*\/?>|<link\b[^>]*\/?>)/;
  let head = '';
  let rest = html;
  for (let m = rest.match(re); m; m = rest.match(re)) {
    head += m[0];
    rest = rest.slice(m[0].length);
  }
  return { head, body: rest };
}

/** JavaScript mit niedriger Priorität laden: Die Seite ist vorgerendert, Bilder und Layout haben Vorrang. */
function niedrigePrioritaet(html) {
  return html
    .replace(/<script type="module" crossorigin src=/g, '<script type="module" crossorigin fetchpriority="low" src=')
    .replace(/<link rel="modulepreload" crossorigin href=/g, '<link rel="modulepreload" crossorigin fetchpriority="low" href=');
}

function page(html) {
  const { head, body } = splitHead(html);
  if (!head.includes('<title>')) throw new Error('Seite ohne <title>');
  return niedrigePrioritaet(template.replace('<!--app-head-->', head).replace('<!--app-html-->', body));
}

function outFile(p) {
  if (p === '/') return path.join(dist, 'index.html');
  return path.join(dist, `${p.slice(1)}.html`);
}

let count = 0;
for (const { path: p } of sitemapPaths) {
  const { html } = await render(p);
  const file = outFile(p);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, page(html));
  count++;
}

// 404-Seite (Vercel liefert sie automatisch für unbekannte Pfade aus)
const notFound = await render('/__404');
fs.writeFileSync(path.join(dist, '404.html'), page(notFound.html));

// Sitemap
const heute = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapPaths
  .map(({ path: p, priority }) => `  <url><loc>${SITE}${p === '/' ? '/' : p}</loc><lastmod>${heute}</lastmod><priority>${priority.toFixed(1)}</priority></url>`)
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`Vorgerendert: ${count} Seiten + 404.html, sitemap.xml mit ${sitemapPaths.length} Einträgen`);
