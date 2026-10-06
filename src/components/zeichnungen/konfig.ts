import type { ZeichnungKey } from './zeichnungen';

export interface Konstruktion {
  zeichnung: ZeichnungKey;
  titel: string;
  /** [Beschriftung, Ankerpunkt in der Zeichnung] – Reihenfolge = Nummer */
  legende: Array<[string, string]>;
}

/** Konstruktionsprinzip je Leistung (Legenden aus den Leistungsinhalten) */
export const LEISTUNG_ZEICHNUNG: Record<string, Konstruktion> = {
  carports: {
    zeichnung: 'carport',
    titel: 'Querschnitt Doppelcarport mit Solardach',
    legende: [['Stahlkonstruktion mit Solardach', 'solardach'], ['Stahlträger', 'traeger'], ['Stütze', 'stuetze'], ['Integrierte Entwässerung', 'rinne'], ['LED-Beleuchtung', 'led'], ['Vorbereitung für Ladestation', 'wallbox'], ['Fundament', 'fundament']],
  },
  terrassenueberdachungen: {
    zeichnung: 'terrasse',
    titel: 'Schnitt Terrassenüberdachung an der Hauswand',
    legende: [['Glasdach (Verbundsicherheitsglas oder Solarglas)', 'dach'], ['Stahlträger', 'traeger'], ['Stütze', 'stuetze'], ['Wandanschluss', 'wand'], ['Integrierter Sonnenschutz', 'beschattung'], ['LED-Beleuchtung', 'led'], ['Entwässerung', 'rinne'], ['Seitenverglasung (optional)', 'seitenglas'], ['Fundament', 'fundament']],
  },
  vordaecher: {
    zeichnung: 'vordach',
    titel: 'Schnitt Vordach mit Zugstange',
    legende: [['Glas- oder Solardach', 'dach'], ['Stahlträger', 'traeger'], ['Zugstange', 'zugstange'], ['Wandkonsole', 'konsole'], ['Tropfkante', 'rinne']],
  },
  wintergaerten: {
    zeichnung: 'wintergarten',
    titel: 'Schnitt Wintergarten',
    legende: [['Glasdach', 'dach'], ['Stahlrahmen', 'rahmen'], ['Schiebeelemente', 'schiebe'], ['Beschattungssystem', 'beschattung'], ['Beleuchtung', 'led'], ['Heizlösung, z. B. Pellet- oder Holzofen', 'ofen'], ['Entwässerung', 'rinne'], ['Fundation', 'fundament']],
  },
  anbaubalkone: {
    zeichnung: 'anbaubalkon',
    titel: 'Schnitt Anbaubalkon',
    legende: [['Stütze', 'stuetze'], ['Träger', 'traeger'], ['Bodenaufbau', 'boden'], ['Geländer', 'gelaender'], ['Entwässerung', 'rinne'], ['Fundation', 'fundament'], ['Anschluss an die Fassade', 'wand']],
  },
  ganzglasgelaender: {
    zeichnung: 'glasgelaender',
    titel: 'Schnitte Ganzglasgeländer',
    legende: [['Glas (klar, getönt oder matt)', 'glas'], ['Bodenprofil', 'profil'], ['Montage auf der Platte', 'terrasse'], ['Montage an der Stirnseite', 'balkon'], ['Handlauf (optional)', 'handlauf']],
  },
  gelaender: {
    zeichnung: 'gelaender',
    titel: 'Ansicht Geländer mit verschiedenen Füllungen',
    legende: [['Handlauf, z. B. Holz', 'handlauf'], ['Pfosten Stahl', 'pfosten'], ['Füllung Stahlstäbe', 'fuellung'], ['Füllung Glas', 'glas'], ['Befestigung', 'befestigung']],
  },
  treppen: {
    zeichnung: 'treppe',
    titel: 'Seitenansicht Stahltreppe mit Podest',
    legende: [['Wange Stahl', 'wange'], ['Stufen (Holz, Stahl oder Glas)', 'stufen'], ['Podest', 'podest'], ['Geländer', 'gelaender'], ['Anschluss am Fusspunkt', 'anschluss'], ['Stütze', 'stuetze']],
  },
  stahlbau: {
    zeichnung: 'stahlrahmen',
    titel: 'Ansicht Stahlrahmen',
    legende: [['Stütze', 'stuetze'], ['Träger', 'traeger'], ['Rahmenecke verschraubt', 'ecke'], ['Fussplatte mit Verankerung', 'fussplatte'], ['Aussteifung', 'verband']],
  },
  'hallen-gewerbebau': {
    zeichnung: 'halle',
    titel: 'Querschnitt Halle mit Plattform',
    legende: [['Stahlrahmen', 'rahmen'], ['Dach', 'dach'], ['Lagerüberdachung', 'vordach'], ['Technische Plattform', 'plattform'], ['Treppenanlage', 'treppe'], ['Fundation', 'fundament']],
  },
  laermschutzwaende: {
    zeichnung: 'laermschutz',
    titel: 'Ansicht Lärmschutzwand',
    legende: [['Stahlpfosten', 'pfosten'], ['Akustikelemente', 'akustik'], ['Holz', 'holz'], ['Glas', 'glas'], ['Begrünung', 'begruenung'], ['Fundament', 'fundament']],
  },
  'laermschutz-photovoltaik': {
    zeichnung: 'laermschutzPv',
    titel: 'Ansicht Lärmschutzwand mit Photovoltaik',
    legende: [['Photovoltaik: Energiegewinnung', 'pv'], ['Akustikelemente: Schallschutz', 'akustik'], ['Stahlpfosten', 'pfosten'], ['Fundament', 'fundament'], ['Lärmquelle, z. B. Strasse', 'schall']],
  },
  'sicht-windschutz': {
    zeichnung: 'sichtschutz',
    titel: 'Ansicht Sicht- und Windschutz',
    legende: [['Glas', 'glas'], ['Metall', 'metall'], ['Holz', 'holz'], ['Pfosten', 'pfosten'], ['Pflanzen', 'pflanze']],
  },
  solarkonstruktionen: {
    zeichnung: 'solarHaus',
    titel: 'Wo Solar ins Bauteil passt',
    legende: [['Carport', 'carport'], ['Fassade', 'fassade'], ['Vordach', 'vordach'], ['Terrassenüberdachung', 'terrasse'], ['Lärmschutzwand', 'laerm']],
  },
  sonderkonstruktionen: {
    zeichnung: 'sonder',
    titel: 'Beispiel: freitragendes Dach am Mast',
    legende: [['Mast', 'mast'], ['Kragarm', 'kragarm'], ['Zugstangen', 'zug'], ['Glasdach', 'glas'], ['Knotenpunkt', 'knoten'], ['Fundament', 'fundament']],
  },
  renovationen: {
    zeichnung: 'renovation',
    titel: 'Bestand verstärken und erweitern',
    legende: [['Bestehende Konstruktion', 'bestand'], ['Verstärkung', 'verstaerkung'], ['Erweiterung', 'erweiterung'], ['Neues Geländer, Neuverglasung', 'gelaender'], ['Integration von Solar', 'solar'], ['Neue Stütze', 'stuetze']],
  },
};

/** Konstruktionsdetail je Produkt: Ankerpunkte in der Reihenfolge der sechs Detailbilder */
export const PRODUKT_ZEICHNUNG: Record<string, { zeichnung: ZeichnungKey; anker: string[] }> = {
  'living-w20-pro': { zeichnung: 'wintergarten', anker: ['knoten', 'schiebe', 'dach', 'rinne', 'beschattung', 'fundament'] },
  'drive-d2-pro': { zeichnung: 'carport', anker: ['knoten', 'rinne', 'led', 'wallbox', 'solardach', 'fundament'] },
  'terrace-t6-solar-glass': { zeichnung: 'terrasseSolar', anker: ['knoten', 'dach', 'rinne', 'led', 'beschattung', 'fundament'] },
  'balcony-m3-system': { zeichnung: 'balkonanlage', anker: ['knoten', 'stapelung', 'glas', 'fassade', 'rinne', 'fundament'] },
  'glass-g1-pure': { zeichnung: 'glasgelaender', anker: ['profil', 'ecke', 'led', 'balkon', 'terrasse', 'handlauf'] },
  'entry-v2-solar': { zeichnung: 'vordachSolar', anker: ['konsole', 'dach', 'kabel', 'rinne', 'led', 'kamera'] },
  'balcony-b1-pure': { zeichnung: 'anbaubalkon', anker: ['wand', 'knoten', 'gelaender', 'rinne', 'led', 'konsole'] },
};
