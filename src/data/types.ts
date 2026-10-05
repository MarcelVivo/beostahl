import type { LucideIcon } from 'lucide-react';

export interface ListBlock {
  title: string;
  items: string[];
}

export interface Leistung {
  slug: string;
  title: string;
  /** Kurzer Teaser für Karten und Mega-Menü */
  teaser: string;
  /** Gruppe im Mega-Menü */
  group: LeistungsGruppe;
  icon: LucideIcon;
  intro: string[];
  lists: ListBlock[];
  /** Zielsatz oder Abschluss aus dem Firmentext */
  outro?: string[];
  /** Slugs passender Produkte */
  produkte: string[];
  seo: { title: string; description: string };
}

export type LeistungsGruppe =
  | 'Überdachungen und Carports'
  | 'Wohnen mit Glas'
  | 'Stahl, Treppen und Geländer'
  | 'Lärmschutz, Solar und Spezial';

export interface IconText {
  icon: LucideIcon;
  title: string;
  text?: string;
}

export interface DetailBild {
  /** Dateiname ohne Pfad, z. B. drive-d2-pro-detail-1.webp */
  file: string;
  title: string;
  alt: string;
}

export interface Mass {
  label: string;
  value: string;
}

/** Grundlage für die schematischen Ansichten (Masse in Metern) */
export interface Zeichnung {
  kind: 'rahmen';
  breite: number;
  tiefe: number;
  hoehe: number;
}

export interface Produkt {
  slug: string;
  name: string;
  /** Kurzname ohne «BEO», z. B. «Drive D2 Pro» */
  shortName: string;
  subtitle: string;
  category: string;
  /** Massangabe als Kurztext für Karten */
  masseKurz: string;
  heroAlt: string;
  vorteile: IconText[];
  details: DetailBild[];
  masse: Mass[];
  zeichnung?: Zeichnung;
  /** Zusätzliche Hinweise zum Technik-Block, z. B. variable Breiten */
  technikHinweis?: string;
  kennzahlen: IconText[];
  leistungen: string[];
  seo: { title: string; description: string };
}

export interface Schritt {
  title: string;
  text: string;
}

export interface Grund extends IconText {
  text: string;
  /** Auf der Startseite zeigen */
  home?: boolean;
}

export interface Materialposition {
  beschreibung: string;
  spezifikation: string;
  menge: string;
}

export interface Referenz {
  slug: string;
  title: string;
  /** Bauherrschaft oder Objekt, wie es genannt werden darf */
  objekt: string;
  ort: string;
  /** z. B. «Vorprojekt», «Ausgeführt» */
  status: string;
  stand: string;
  teaser: string;
  intro: string[];
  kennzahlen: IconText[];
  technik: Array<{ title: string; items: Mass[] }>;
  material: Materialposition[];
  /** Ausschnitte der Konzeptgrafik, Dateiname ohne Pfad */
  bilder: DetailBild[];
  /** Gesamtgrafik, Dateiname ohne Pfad */
  plan: { file: string; alt: string; width: number; height: number };
  hinweis: string;
  leistungen: string[];
  seo: { title: string; description: string };
}
