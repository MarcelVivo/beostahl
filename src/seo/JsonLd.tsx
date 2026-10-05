import { site } from '@/data/site';

/** Strukturierte Daten als JSON-LD. «<» wird maskiert, damit kein Script-Ende entstehen kann. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

const istPlatzhalter = (v: string) => v.startsWith('[');

/** LocalBusiness-Daten. Platzhalter werden weggelassen, damit keine falschen Angaben erscheinen. */
export function localBusiness() {
  const a = site.address;
  const address =
    istPlatzhalter(a.street) || istPlatzhalter(a.zip) || istPlatzhalter(a.city)
      ? { '@type': 'PostalAddress', addressRegion: 'Bern', addressCountry: 'CH' }
      : { '@type': 'PostalAddress', streetAddress: a.street, postalCode: a.zip, addressLocality: a.city, addressRegion: 'Bern', addressCountry: 'CH' };
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${site.url}/#unternehmen`,
    name: site.name,
    url: site.url,
    logo: `${site.url}/brand/logo.png`,
    image: `${site.url}/og-default.jpg`,
    slogan: site.claim,
    description: 'Stahlbau, Glasbau und Solar aus dem Berner Oberland: Carports und Solar-Carports, Wintergärten, Anbaubalkone, Ganzglasgeländer, Lärmschutzwände mit Photovoltaik.',
    address,
    areaServed: { '@type': 'AdministrativeArea', name: 'Berner Oberland' },
    ...(istPlatzhalter(site.phone) ? {} : { telephone: site.phone }),
    ...(istPlatzhalter(site.email) ? {} : { email: site.email }),
  };
}
