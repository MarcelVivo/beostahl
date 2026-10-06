import { ClipboardList, Flame, Truck, Wrench } from 'lucide-react';
import type { IconText } from './types';

/**
 * Partnerschaft Fontana Forni. BEO ist offizieller Vertriebspartner.
 * Technische Angaben aus fontanaforni.com (Stand 10/2026), Texte eigenständig formuliert.
 * Bilder und Logo: © Fontana Forni, Verwendung durch BEO als Vertriebspartner.
 */
export const FONTANA_SLUG = 'fontana-forni';
export const FONTANA_URL = 'https://fontanaforni.com/de/';

export interface FontanaProdukt {
  name: string;
  kategorie: string;
  brennstoff: string;
  text: string;
  fakten: Array<[string, string]>;
  bild: string;
  url: string;
}

export const fontanaFakten: Array<[string, string]> = [
  ['1946', 'gegründet in San Lorenzo in Campo, Marken (Italien)'],
  ['3.', 'Generation in Familienhand'],
  ['40+', 'Länder mit Fontana-Öfen und -Grills'],
];

export const fontanaKategorien = [
  { titel: 'Pizzaöfen', text: 'Mit Holz, Gas oder hybrid befeuert. Für Terrasse, Garten und Aussenküche.', url: 'https://fontanaforni.com/de/categoria-prodotto/oefen-grills/pizzaoefen/' },
  { titel: 'Holzöfen', text: 'Freistehend oder zum Einbau, mit indirektem Garen für Brot, Braten und Aufläufe.', url: 'https://fontanaforni.com/de/categoria-prodotto/oefen-grills/holzoefen/' },
  { titel: 'Grills', text: 'Holz- und Holzkohlegrills aus starkem Stahl für direktes Grillen.', url: 'https://fontanaforni.com/de/categoria-prodotto/oefen-grills/grill/' },
  { titel: 'Aussenküchen', text: 'Das modulare System Ignes: Grill, Ofen, Spüle und Stauraum frei kombinierbar.', url: 'https://fontanaforni.com/de/categoria-prodotto/aussenkuechen/' },
];

export const fontanaProdukte: FontanaProdukt[] = [
  {
    name: 'Volta',
    kategorie: 'Pizzaofen',
    brennstoff: 'Hybrid: Gas und Holz',
    text: 'Hybridofen mit elektronischer Steuerung und Digitalanzeige. Klassische Ofenform, moderne Bedienung.',
    fakten: [['Garkammer (Volta 70)', '70 × 50 cm'], ['Gedecke', 'bis 4']],
    bild: '/images/fontana/volta.webp',
    url: 'https://fontanaforni.com/de/prodotti/volta/',
  },
  {
    name: 'Mangiafuoco',
    kategorie: 'Pizzaofen',
    brennstoff: 'Holz',
    text: 'Pizzaofen mit Schamotte-Backboden, Innenraum aus Edelstahl und Isolierung aus Keramikfaser.',
    fakten: [['Garkammer', '80 × 60 cm'], ['Gedecke', 'bis 6']],
    bild: '/images/fontana/mangiafuoco.webp',
    url: 'https://fontanaforni.com/de/prodotti/mangiafuoco/',
  },
  {
    name: 'E-Gusto und Rosso',
    kategorie: 'Holzofen',
    brennstoff: 'Holz',
    text: 'Holzofen mit indirektem Garen und digitaler Steuerung. Für grosse Runden und lange Garzeiten.',
    fakten: [['Garkammer (100×65)', '100 × 65 cm'], ['Gedecke', 'bis 25']],
    bild: '/images/fontana/egusto.webp',
    url: 'https://fontanaforni.com/de/prodotti/e-gusto-and-rosso/',
  },
  {
    name: 'Mediterraneo',
    kategorie: 'Grill',
    brennstoff: 'Holz',
    text: 'Offener Grill mit Feuerschale aus 6 mm Stahl, Schutzhaube aus Edelstahl und klappbaren Ablagen.',
    fakten: [['Masse', '157 × 72 × 139 cm'], ['Gedecke', 'bis 8']],
    bild: '/images/fontana/mediterraneo.webp',
    url: 'https://fontanaforni.com/de/prodotti/mediterraneo/',
  },
  {
    name: 'Ignes IGN-Status',
    kategorie: 'Aussenküche',
    brennstoff: 'Flüssiggas',
    text: 'Gasgrill-Modul der Aussenküche Ignes, aus Edelstahl 304 wie in Profiküchen.',
    fakten: [['Kochfläche (Max)', '89 × 49 cm'], ['System', 'modular']],
    bild: '/images/fontana/status.webp',
    url: 'https://fontanaforni.com/de/prodotti/ign-status/',
  },
  {
    name: 'Ignes IGN-Focum',
    kategorie: 'Aussenküche',
    brennstoff: 'Holzkohle',
    text: 'Holzkohle-Modul der Aussenküche Ignes mit Brennstelle aus feuerfesten Steinen.',
    fakten: [['Kochfläche', '60 × 40 cm'], ['System', 'modular']],
    bild: '/images/fontana/focum.webp',
    url: 'https://fontanaforni.com/de/prodotti/ign-focum/',
  },
];

/** Was BEO als Vertriebspartner leistet */
export const fontanaLeistungen: IconText[] = [
  { icon: ClipboardList, title: 'Beratung und Planung', text: 'Welcher Ofen, welcher Grill, welche Küche passt zu Ihnen? Wir planen Standort, Unterbau, Rauchabzug und Anschlüsse.' },
  { icon: Truck, title: 'Verkauf und Lieferung', text: 'Als offizieller Vertriebspartner liefern wir das ganze Fontana-Sortiment, inklusive Zubehör.' },
  { icon: Flame, title: 'Montage und Einbau', text: 'Fundament, Stahl-Unterbau, Rauchrohr durch Dach oder Wand, Gas- und Stromanschluss. Alles aus einer Hand.' },
  { icon: Wrench, title: 'Wartung und Service', text: 'Inbetriebnahme, Einweisung, Wartung und Ersatzteile. Auch Jahre nach dem Kauf.' },
];
