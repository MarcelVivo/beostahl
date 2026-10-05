import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';
import { JsonLd } from '@/seo/JsonLd';
import { site } from '@/data/site';

export interface Crumb {
  label: string;
  to: string;
}

/** Brotkrumen-Navigation inkl. strukturierter Daten (BreadcrumbList). Letzter Eintrag = aktuelle Seite. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ label: 'Start', to: '/' }, ...items];
  return (
    <>
      <nav aria-label="Brotkrumen">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-white/70">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.to} className="flex items-center gap-2">
                {i > 0 && <ChevronRight aria-hidden className="size-3.5" />}
                {last ? (
                  <span aria-current="page" className="text-white">{c.label}</span>
                ) : (
                  <Link to={c.to} className="inline-flex min-h-8 items-center hover:text-gold">{c.label}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: all.map((c, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: c.label,
            item: `${site.url}${c.to === '/' ? '' : c.to}`,
          })),
        }}
      />
    </>
  );
}
