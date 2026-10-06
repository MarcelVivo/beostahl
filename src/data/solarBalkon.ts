import { Cog, Gem, Globe, House, Leaf, ShieldCheck } from 'lucide-react';
import type { IconText } from './types';

/**
 * Solar-Balkongeländer: sechs Varianten.
 * Inhalte wörtlich aus der BEO-Produktgrafik «Solar Balkongeländer».
 * Bilder: public/images/solar-balkongelaender/variante-<n>-<foto|beispiel>.webp
 * Schnitte und Explosionszeichnungen: als SVG in src/components/solar/Zeichnungen.tsx
 */
export interface SolarVariante {
  nr: number;
  name: string;
  zusatz?: string;
  kurz: string;
  schnitt: string;
  /** Legende zum Schnitt, Reihenfolge = Nummern in der Zeichnung */
  legende: string[];
  /** Beschriftungen der Explosionszeichnung */
  explosion: string[];
  beispiel: string;
}

export const SOLAR_BALKON_SLUG = 'solar-balkongelaender';

export const solarClaim = 'Mehr als ein Geländer – Energie für Ihr Zuhause.';

export const solarVarianten: SolarVariante[] = [
  {
    nr: 1,
    name: 'Klassik',
    kurz: 'Robust, bewährt, zeitlos',
    schnitt: 'A',
    legende: [
      'Solarmodul (Glas-Glas, rahmenlos oder mit schmalem Rahmen)',
      'Hinterlüftung (Luftspalt 20–40 mm)',
      'Aluminium- oder Stahlträger (feuerverzinkt)',
      'Distanzhalter Edelstahl',
      'Winddichtung / Abschlussprofil',
      'Holzverkleidung (Lärche / Thermoesche)',
      'Unterkonstruktion (Alu / Stahl)',
      'Befestigung am Balkon (Beton / Stahl)',
      'Kabelkanal (unsichtbar)',
    ],
    explosion: ['Solarmodul', 'Distanzhalter', 'Tragprofil', 'Holzverkleidung', 'Gummidichtung', 'Befestigungswinkel'],
    beispiel: 'Mehrfamilienhaus',
  },
  {
    nr: 2,
    name: 'Ganzglas Premium',
    kurz: 'Minimalistisch, elegant',
    schnitt: 'B',
    legende: [
      'Solarglas (Verbundsicherheitsglas mit integrierten PV-Zellen)',
      'Hinterlüftung 20 mm',
      'Tragprofil Aluminium (pulverbeschichtet)',
      'Gummidichtung',
      'Holzverkleidung innen',
      'Befestigung Konsole (Edelstahl)',
      'Entwässerung',
      'Kabelkanal',
    ],
    explosion: ['Solarglas VSG', 'Tragprofil', 'Dichtung', 'Holzverkleidung', 'Bodenprofil', 'Entwässerung'],
    beispiel: 'Hotel',
  },
  {
    nr: 3,
    name: 'Holz-Design',
    kurz: 'Natürlich, modern',
    schnitt: 'C',
    legende: [
      'Solarmodul',
      'Luftspalt 30 mm',
      'Tragprofil Stahl / Alu',
      'Holzlatten (Lärche / Thermoholz)',
      'Unterkonstruktion Holz',
      'Befestigung',
      'Kabelkanal',
      'Tropfblech',
    ],
    explosion: ['Solarmodul', 'Luftspalt', 'Tragprofil', 'Holzlatten', 'Unterkonstruktion', 'Befestigungswinkel'],
    beispiel: 'Chalet',
  },
  {
    nr: 4,
    name: 'Rahmenlos',
    zusatz: 'unsichtbare Befestigung',
    kurz: 'Maximale Ästhetik',
    schnitt: 'D',
    legende: [
      'Solarglas (rahmenlos, Klemmprofil)',
      'Hinterlüftung 20–30 mm',
      'Unsichtbare Befestigung (Punktlager)',
      'Tragkonstruktion in Balkonplatte integriert',
      'Holzverkleidung',
      'Kabelkanal unsichtbar',
      'Entwässerung',
    ],
    explosion: ['Solarglas', 'Punktbefestigung', 'Tragstruktur', 'Holzverkleidung', 'Kabelkanal'],
    beispiel: 'Moderner Neubau',
  },
  {
    nr: 5,
    name: 'Indachpanel',
    zusatz: 'unsichtbare Konstruktion',
    kurz: 'Premium-Lösung – keine sichtbare Technik',
    schnitt: 'E',
    legende: [
      'Indach-Solarmodul (bündig, ohne Rahmen)',
      'Hinterlüftung 30–50 mm',
      'Tragkonstruktion Aluminium / Stahl (verdeckt)',
      'Wärmedämmung (optional)',
      'Innenverkleidung Holz',
      'Befestigung in Decke / Balkonplatte',
      'Kabelkanal',
      'Entwässerung',
    ],
    explosion: ['Indach-Solarmodul', 'Unterkonstruktion', 'Luftspalt', 'Dämmung (optional)', 'Holzverkleidung', 'Tragprofil (verdeckt)'],
    beispiel: 'Indachpanel',
  },
  {
    nr: 6,
    name: 'Kombination Glas + Solar',
    kurz: 'Individuell, exklusiv',
    schnitt: 'F',
    legende: [
      'Solarmodul',
      'Glasfüllung (VSG)',
      'Hinterlüftung',
      'Tragprofil',
      'Holzverkleidung',
      'Befestigung',
      'Kabelkanal',
      'LED-Beleuchtung (optional)',
    ],
    explosion: ['Solarmodul', 'Glasfüllung', 'Tragprofil', 'Holzverkleidung', 'LED (optional)', 'Kabelkanal'],
    beispiel: 'Kombi',
  },
];

export const solarVorteile: IconText[] = [
  { icon: Leaf, title: 'Eigene Energie erzeugen', text: 'Nachhaltig und zukunftssicher' },
  { icon: Gem, title: 'Modernes Design', text: 'Passt zu jedem Gebäude' },
  { icon: Cog, title: 'Massgeschneiderte Lösungen', text: 'Für Neubau und Sanierung' },
  { icon: ShieldCheck, title: 'Hochwertige Materialien', text: 'Langlebig und witterungsbeständig' },
  { icon: House, title: 'Planung, Produktion, Montage', text: 'Alles aus einer Hand' },
  { icon: Globe, title: 'In der ganzen Schweiz und Europa', text: 'Ihr Partner für innovative Bauprojekte' },
];

export const solarBild = (nr: number, art: 'foto' | 'beispiel') =>
  `/images/solar-balkongelaender/variante-${nr}-${art}.webp`;
