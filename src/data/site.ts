/**
 * Firmendaten. Alle Werte in eckigen Klammern sind Platzhalter
 * und müssen vor dem Livegang ersetzt werden.
 */
export const site = {
  name: 'BEO Stahl & Glasbau',
  legalName: '[FIRMENNAME MIT RECHTSFORM]',
  url: 'https://beostahlbau.ch',
  claim: 'Stahl. Glas. Solar. Für Generationen.',
  claimLong: 'Stahl für Stabilität. Glas für Architektur. Solar für die Zukunft.',
  signature: 'Mehr Werte schaffen.',
  region: 'Berner Oberland',
  address: {
    street: '[STRASSE NR.]',
    zip: '[PLZ]',
    city: '[ORT]',
    country: 'Schweiz',
  },
  phone: '[TELEFON]',
  phoneHref: '', // z. B. 'tel:+41330000000' sobald bekannt
  email: '[E-MAIL]',
  emailHref: '', // z. B. 'mailto:info@beostahlbau.ch' sobald bekannt
} as const;

export const mainNav = [
  { label: 'Leistungen', to: '/leistungen', mega: true },
  { label: 'Produkte', to: '/produkte' },
  { label: 'Referenzen', to: '/referenzen' },
  { label: 'Projektablauf', to: '/projektablauf' },
  { label: 'Warum BEO', to: '/warum-beo' },
  { label: 'Kontakt', to: '/kontakt' },
] as const;
