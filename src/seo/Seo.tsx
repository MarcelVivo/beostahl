import { useLocation } from 'react-router';
import { site } from '@/data/site';

interface Props {
  title: string;
  description: string;
  image?: string;
  /** Titel ohne Zusatz «| BEO Stahl & Glasbau» */
  bare?: boolean;
}

/**
 * Seitentitel, Beschreibung, Canonical und Open Graph.
 * React 19 hebt <title>, <meta> und <link> automatisch in den <head>.
 */
export function Seo({ title, description, image = '/og-default.jpg', bare = false }: Props) {
  const { pathname } = useLocation();
  const fullTitle = bare ? title : `${title} | ${site.name}`;
  const url = `${site.url}${pathname === '/' ? '' : pathname}`;
  const img = image.startsWith('http') ? image : `${site.url}${image}`;
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="de_CH" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
}
