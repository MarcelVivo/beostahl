import {
  Building, Building2, Blocks, Cable, Car, ChartNoAxesColumnIncreasing, DoorOpen, Droplets,
  EvCharger, Eye, Flame, Gauge, Gem, Handshake, Layers, Leaf, Lightbulb, PanelsTopLeft,
  ShieldCheck, Smartphone, Snowflake, SolarPanel, Sprout, Thermometer, Umbrella, Wifi,
  Wind, Wrench, Zap,
} from 'lucide-react';
import type { DetailBild, IconText, Produkt } from './types';

/** Gemeinsamer Vorteil aller Produkte (aus «Alles aus einer Hand») */
const ausEinerHand: IconText = {
  icon: Handshake,
  title: 'Alles aus einer Hand',
  text: 'Planung, Statik, Produktion und Montage mit einem Ansprechpartner.',
};

/** Erzeugt die sechs Detailbilder nach Namensschema <slug>-detail-<n>.webp */
const details = (slug: string, name: string, titles: string[]): DetailBild[] =>
  titles.map((title, i) => ({
    file: `${slug}-detail-${i + 1}.webp`,
    title,
    alt: `Visualisierung ${name}: Detailansicht ${title}`,
  }));

export const produkte: Produkt[] = [
  {
    slug: 'living-w20-pro',
    name: 'BEO Living W20 Pro',
    shortName: 'Living W20 Pro',
    subtitle: 'Wintergarten für ganzjähriges Wohnen',
    category: 'Wintergarten',
    masseKurz: '6.00 × 4.00 m, Höhe 2.80 m',
    heroAlt: 'Visualisierung: Wintergarten BEO Living W20 Pro mit Glasdach und Schiebeelementen, abends beleuchtet, Blick auf See und Berge',
    vorteile: [
      { icon: Sprout, title: 'Zusätzlicher Lebensraum', text: 'Aus der Terrasse wird ein hochwertiger Wohnraum.' },
      { icon: Flame, title: 'Auch im Winter', text: 'Mit Pellet- oder Holzofen auch in den kalten Monaten nutzbar.' },
      { icon: Gem, title: 'Grosse Glasflächen', text: 'Dachverglasung und Schiebeelemente öffnen den Raum nach aussen.' },
      ausEinerHand,
    ],
    details: details('living-w20-pro', 'BEO Living W20 Pro', [
      'Stahlknoten', 'Schiebeelemente', 'Dachverglasung', 'Verdeckte Entwässerung', 'Klima und Beschattung', 'Fundamentanschluss',
    ]),
    masse: [
      { label: 'Breite', value: '6.00 m' },
      { label: 'Tiefe', value: '4.00 m' },
      { label: 'Höhe', value: '2.80 m' },
    ],
    zeichnung: { kind: 'rahmen', breite: 6.0, tiefe: 4.0, hoehe: 2.8 },
    kennzahlen: [
      { icon: Thermometer, title: 'Ganzjahreskomfort' },
      { icon: Gauge, title: 'Uw bis 0.8', text: 'W/m²K' },
      { icon: Blocks, title: 'Modular erweiterbar' },
      { icon: Smartphone, title: 'Smart steuerbar' },
    ],
    leistungen: ['wintergaerten', 'terrassenueberdachungen', 'solarkonstruktionen'],
    seo: {
      title: 'BEO Living W20 Pro: Wintergarten für ganzjähriges Wohnen',
      description: 'Wintergarten aus Stahl und Glas mit Schiebeelementen, Dachverglasung, Klima und Beschattung. Beispielkonfiguration 6.00 × 4.00 m, Uw bis 0.8.',
    },
  },
  {
    slug: 'drive-d2-pro',
    name: 'BEO Drive D2 Pro',
    shortName: 'Drive D2 Pro',
    subtitle: 'Solar-Carport für 2 Fahrzeuge',
    category: 'Solar-Carport',
    masseKurz: '5.80 × 5.20 m, Höhe 2.80 m',
    heroAlt: 'Visualisierung: Solar-Carport BEO Drive D2 Pro mit Photovoltaik-Dach, LED-Lichtprofil und Wallbox, darunter zwei Fahrzeuge',
    vorteile: [
      { icon: SolarPanel, title: 'Energiefläche statt Unterstand', text: 'Das Solar-Glasdach macht aus dem Carport eine Energiefläche.' },
      { icon: EvCharger, title: 'Laden unter dem eigenen Dach', text: 'Der Energiekern mit Wallbox ist Teil der Konstruktion.' },
      { icon: Gem, title: 'Klare Architektur', text: 'Klare Linien, Stahl und Glas, hochwertige Oberflächen.' },
      ausEinerHand,
    ],
    details: details('drive-d2-pro', 'BEO Drive D2 Pro', [
      'Stahlknoten', 'Integrierte Entwässerung', 'LED-Lichtprofil', 'Energiekern mit Wallbox', 'Solar-Glasdach', 'Fundamentanschluss',
    ]),
    masse: [
      { label: 'Breite', value: '5.80 m' },
      { label: 'Tiefe', value: '5.20 m' },
      { label: 'Höhe', value: '2.80 m' },
    ],
    zeichnung: { kind: 'rahmen', breite: 5.8, tiefe: 5.2, hoehe: 2.8 },
    kennzahlen: [
      { icon: Car, title: '2 Ladeplätze' },
      { icon: Zap, title: 'bis 12 kWp', text: 'Solarleistung' },
      { icon: Droplets, title: 'Integrierte Entwässerung' },
      { icon: Blocks, title: 'Modular erweiterbar' },
    ],
    leistungen: ['carports', 'solarkonstruktionen'],
    seo: {
      title: 'BEO Drive D2 Pro: Solar-Carport für 2 Fahrzeuge in Bern',
      description: 'Solar-Carport aus Stahl und Glas für zwei Fahrzeuge, mit Wallbox, LED-Lichtprofil und bis 12 kWp. Geplant und montiert im Berner Oberland.',
    },
  },
  {
    slug: 'terrace-t6-solar-glass',
    name: 'BEO Terrace T6 Solar Glass',
    shortName: 'Terrace T6 Solar Glass',
    subtitle: 'Terrassenüberdachung mit Solar-Glas',
    category: 'Terrassenüberdachung',
    masseKurz: '6.00 × 4.50 m, Höhe 2.60 m',
    heroAlt: 'Visualisierung: Terrassenüberdachung BEO Terrace T6 Solar Glass mit Solar-Glasdach über einem Essplatz auf der Terrasse',
    vorteile: [
      { icon: Umbrella, title: 'Länger draussen', text: 'Die Terrasse bleibt deutlich länger im Jahr nutzbar.' },
      { icon: SolarPanel, title: 'Solar-Glas im Dach', text: 'Das Dach schützt und produziert gleichzeitig Strom.' },
      { icon: Gem, title: 'Beschattung unter Glas', text: 'Die motorisierte Unterglasbeschattung ist im Dach integriert.' },
      ausEinerHand,
    ],
    details: details('terrace-t6-solar-glass', 'BEO Terrace T6 Solar Glass', [
      'Stahlknoten', 'Integriertes Solar-Glas', 'Verdeckte Entwässerung', 'LED-Lichtprofil', 'Motorisierte Unterglasbeschattung', 'Fundamentanschluss',
    ]),
    masse: [
      { label: 'Breite', value: '6.00 m' },
      { label: 'Tiefe', value: '4.50 m' },
      { label: 'Höhe', value: '2.60 m' },
    ],
    zeichnung: { kind: 'rahmen', breite: 6.0, tiefe: 4.5, hoehe: 2.6 },
    kennzahlen: [
      { icon: Zap, title: 'bis 15 kWp', text: 'Solarleistung' },
      { icon: Blocks, title: 'Modular erweiterbar' },
      { icon: Wind, title: 'bis 160 km/h', text: 'Windlast' },
      { icon: Snowflake, title: 'bis 250 kg/m²', text: 'Schneelast' },
    ],
    leistungen: ['terrassenueberdachungen', 'solarkonstruktionen'],
    seo: {
      title: 'BEO Terrace T6 Solar Glass: Terrassenüberdachung mit Solar-Glas',
      description: 'Terrassenüberdachung mit integriertem Solar-Glas bis 15 kWp, Unterglasbeschattung und LED-Licht. Windlast bis 160 km/h, Schneelast bis 250 kg/m².',
    },
  },
  {
    slug: 'balcony-m3-system',
    name: 'BEO Balcony M3 System',
    shortName: 'Balcony M3 System',
    subtitle: 'Mehrere Anbaubalkone übereinander',
    category: 'Balkonanlage',
    masseKurz: 'Breiten 2.4 / 3.0 / 5.8 m',
    heroAlt: 'Visualisierung: Balkonanlage BEO Balcony M3 System mit übereinanderliegenden Balkonen und Glasgeländern an einem Mehrfamilienhaus',
    vorteile: [
      { icon: Building, title: 'Mehr Wohnwert', text: 'Nachträgliche Balkone werten gerade ältere Gebäude deutlich auf.' },
      { icon: Layers, title: 'Über mehrere Geschosse', text: 'Die Balkone werden übereinander zu einem System gestapelt.' },
      { icon: PanelsTopLeft, title: 'Ganzglasgeländer', text: 'Maximale Transparenz zur Umgebung.' },
      ausEinerHand,
    ],
    details: details('balcony-m3-system', 'BEO Balcony M3 System', [
      'Stahlknoten M3', 'Stapelung', 'Ganzglasgeländer', 'Fassadenverankerung', 'Integrierte Entwässerung', 'Stützenfundament',
    ]),
    masse: [
      { label: 'Breiten', value: '2.4 / 3.0 / 5.8 m' },
      { label: 'Geschosshöhe', value: 'individuell, Beispiel 2.80 m' },
    ],
    kennzahlen: [
      { icon: Building2, title: 'Für Mehrfamilienhäuser' },
      { icon: Blocks, title: 'Modulare Bauweise' },
      { icon: ShieldCheck, title: 'Geprüfte Statik' },
      { icon: Leaf, title: 'Nachhaltige Qualität' },
    ],
    leistungen: ['anbaubalkone', 'ganzglasgelaender', 'renovationen'],
    seo: {
      title: 'BEO Balcony M3 System: Balkonanlage für Mehrfamilienhäuser',
      description: 'Mehrere Anbaubalkone übereinander mit Ganzglasgeländer und Fassadenverankerung. Modulare Balkonanlage mit geprüfter Statik für Mehrfamilienhäuser.',
    },
  },
  {
    slug: 'glass-g1-pure',
    name: 'BEO Glass G1 Pure',
    shortName: 'Glass G1 Pure',
    subtitle: 'Rahmenloses Ganzglasgeländer',
    category: 'Ganzglasgeländer',
    masseKurz: 'Höhe 1’000 mm, Länge modular',
    heroAlt: 'Visualisierung: rahmenloses Ganzglasgeländer BEO Glass G1 Pure an einer Terrasse mit Blick auf See und Berge',
    vorteile: [
      { icon: Eye, title: 'Maximale Transparenz', text: 'Freie Sicht ohne störende Pfosten.' },
      { icon: Gem, title: 'Kaum sichtbare Konstruktion', text: 'Das Glas steht in einem schlanken Bodenprofil.' },
      { icon: Lightbulb, title: 'Integrierte LED-Linie', text: 'Licht direkt im Bodenprofil.' },
      { icon: PanelsTopLeft, title: 'Klar, getönt oder matt', text: 'Die Glasvariante passt sich dem Projekt an.' },
    ],
    details: details('glass-g1-pure', 'BEO Glass G1 Pure', [
      'Bodenprofil G1', 'Eckausbildung', 'Integrierte LED-Linie', 'Balkonmontage', 'Terrassenmontage', 'Handlauf optional',
    ]),
    masse: [
      { label: 'Höhe', value: '1’000 mm' },
      { label: 'Bodenprofil', value: '120 × 70 mm' },
      { label: 'Länge', value: 'modular' },
    ],
    kennzahlen: [
      { icon: ShieldCheck, title: 'Geprüfte Sicherheit' },
      { icon: Eye, title: 'Maximale Transparenz' },
      { icon: Blocks, title: 'Modular' },
      { icon: ChartNoAxesColumnIncreasing, title: 'Auch für Treppen' },
    ],
    leistungen: ['ganzglasgelaender', 'gelaender', 'treppen', 'anbaubalkone'],
    seo: {
      title: 'BEO Glass G1 Pure: rahmenloses Ganzglasgeländer',
      description: 'Rahmenloses Ganzglasgeländer mit Bodenprofil 120 × 70 mm und integrierter LED-Linie. Für Balkon, Terrasse und Treppe, modular in der Länge.',
    },
  },
  {
    slug: 'entry-v2-solar',
    name: 'BEO Entry V2 Solar',
    shortName: 'Entry V2 Solar',
    subtitle: 'Solar-Vordach für Private und Gewerbe',
    category: 'Solar-Vordach',
    masseKurz: '3’000 × 1’200 mm',
    heroAlt: 'Visualisierung: Solar-Vordach BEO Entry V2 Solar mit Photovoltaik-Glasdach und LED-Lichtprofil über einem Hauseingang',
    vorteile: [
      { icon: DoorOpen, title: 'Für Private und Gewerbe', text: 'Vom Hauseingang bis zum Geschäftseingang.' },
      { icon: Cable, title: 'Verdeckte Verkabelung', text: 'Die Kabel laufen unsichtbar in der Konstruktion.' },
      { icon: Gem, title: 'Klare Architektur', text: 'Wandkonsole und Glasdach in reduzierter Form.' },
      ausEinerHand,
    ],
    details: details('entry-v2-solar', 'BEO Entry V2 Solar', [
      'Wandkonsole', 'Solar-Glasdach', 'Verdeckte Verkabelung', 'Integrierte Entwässerung', 'LED-Lichtprofil', 'Smart Ready',
    ]),
    masse: [
      { label: 'Breite', value: '3’000 mm' },
      { label: 'Ausladung', value: '1’200 mm' },
    ],
    kennzahlen: [
      { icon: Zap, title: 'bis 300 Wp', text: 'Solarleistung' },
      { icon: Umbrella, title: 'Wetterschutz' },
      { icon: Lightbulb, title: 'LED-Licht' },
      { icon: Wifi, title: 'Smart Ready', text: 'Kamera, Sensorik' },
      { icon: Blocks, title: 'Modular' },
    ],
    leistungen: ['vordaecher', 'solarkonstruktionen'],
    seo: {
      title: 'BEO Entry V2 Solar: Solar-Vordach für Private und Gewerbe',
      description: 'Solar-Vordach 3’000 × 1’200 mm mit bis 300 Wp, LED-Lichtprofil, verdeckter Verkabelung und Smart-Ready-Vorbereitung für Kamera und Sensorik.',
    },
  },
  {
    slug: 'balcony-b1-pure',
    name: 'BEO Balcony B1 Pure',
    shortName: 'Balcony B1 Pure',
    subtitle: 'Einzelner Anbaubalkon',
    category: 'Anbaubalkon',
    masseKurz: '4’000 × 1’600 mm',
    heroAlt: 'Visualisierung: Anbaubalkon BEO Balcony B1 Pure mit Glasgeländer an einem Wohnhaus, Blick auf See und Berge',
    vorteile: [
      { icon: Building, title: 'Mehr Wohnwert', text: 'Ein zusätzlicher Aussenraum für Ihr Haus.' },
      { icon: Wrench, title: 'Auch nachträglich', text: 'Geeignet für bestehende und ältere Gebäude.' },
      { icon: PanelsTopLeft, title: 'Glasgeländer', text: 'Offene Sicht in die Umgebung.' },
      ausEinerHand,
    ],
    details: details('balcony-b1-pure', 'BEO Balcony B1 Pure', [
      'Wandanschluss', 'Stahlknoten', 'Glasgeländer', 'Integrierte Entwässerung', 'LED-Lichtprofil', 'Tragkonsole optional',
    ]),
    masse: [
      { label: 'Breite', value: '4’000 mm' },
      { label: 'Tiefe', value: '1’600 mm' },
      { label: 'Geländerhöhe', value: '1’100 mm' },
    ],
    kennzahlen: [
      { icon: ShieldCheck, title: 'Geprüfte Statik', text: 'SIA, Eurocode' },
      { icon: Lightbulb, title: 'LED-Beleuchtung' },
      { icon: Droplets, title: 'Verdeckte Entwässerung' },
      { icon: Blocks, title: 'Modular' },
    ],
    leistungen: ['anbaubalkone', 'ganzglasgelaender', 'renovationen'],
    seo: {
      title: 'BEO Balcony B1 Pure: Anbaubalkon aus Stahl und Glas',
      description: 'Einzelner Anbaubalkon 4’000 × 1’600 mm mit Glasgeländer, LED-Lichtprofil und verdeckter Entwässerung. Geprüfte Statik nach SIA und Eurocode.',
    },
  },
];

export const getProdukt = (slug: string) => produkte.find((p) => p.slug === slug);

export const RICHTWERT_HINWEIS = 'Beispielkonfiguration, Masse individuell anpassbar. Alle Kennzahlen sind Richtwerte.';
