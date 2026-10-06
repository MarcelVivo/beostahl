/**
 * Auswählbare Lösungen im Anfrageformular, ohne Icons und Texte.
 * Wird von Formular und Server-Funktion gemeinsam genutzt.
 * scripts/check-katalog.ts prüft beim Build, dass die Liste zu src/data passt.
 */
export const LEISTUNGEN_KATALOG = [
  { slug: 'carports', label: 'Carports und Solar-Carports' },
  { slug: 'terrassenueberdachungen', label: 'Terrassenüberdachungen' },
  { slug: 'vordaecher', label: 'Vordächer' },
  { slug: 'wintergaerten', label: 'Wintergärten und Glasanbauten' },
  { slug: 'anbaubalkone', label: 'Anbaubalkone und Balkonanlagen' },
  { slug: 'ganzglasgelaender', label: 'Ganzglasgeländer' },
  { slug: 'solar-balkongelaender', label: 'Solar-Balkongeländer' },
  { slug: 'gelaender', label: 'Geländer' },
  { slug: 'treppen', label: 'Treppen' },
  { slug: 'stahlbau', label: 'Stahlbau' },
  { slug: 'hallen-gewerbebau', label: 'Hallen- und Gewerbebau' },
  { slug: 'laermschutzwaende', label: 'Lärmschutzwände' },
  { slug: 'laermschutz-photovoltaik', label: 'Lärmschutz mit Photovoltaik' },
  { slug: 'sicht-windschutz', label: 'Sicht- und Windschutzsysteme' },
  { slug: 'solarkonstruktionen', label: 'Solarkonstruktionen' },
  { slug: 'sonderkonstruktionen', label: 'Sonderkonstruktionen' },
  { slug: 'renovationen', label: 'Renovationen und Modernisierungen' },
] as const;

export const PRODUKTE_KATALOG = [
  { slug: 'living-w20-pro', label: 'BEO Living W20 Pro' },
  { slug: 'drive-d2-pro', label: 'BEO Drive D2 Pro' },
  { slug: 'terrace-t6-solar-glass', label: 'BEO Terrace T6 Solar Glass' },
  { slug: 'balcony-m3-system', label: 'BEO Balcony M3 System' },
  { slug: 'glass-g1-pure', label: 'BEO Glass G1 Pure' },
  { slug: 'entry-v2-solar', label: 'BEO Entry V2 Solar' },
  { slug: 'balcony-b1-pure', label: 'BEO Balcony B1 Pure' },
] as const;

const ALLE = new Map<string, string>([...LEISTUNGEN_KATALOG, ...PRODUKTE_KATALOG].map((x) => [x.slug, x.label]));
export const loesungLabel = (slug: string) => ALLE.get(slug);
export const istLoesung = (slug: string) => ALLE.has(slug);
