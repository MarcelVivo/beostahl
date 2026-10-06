import {
  Car, Umbrella, DoorOpen, Sprout, Building, PanelsTopLeft, Fence,
  ChartNoAxesColumnIncreasing, Construction, Warehouse, VolumeX, SolarPanel,
  Wind, SunMedium, PencilRuler, RefreshCw, Sun,
} from 'lucide-react';
import type { Leistung, LeistungsGruppe } from './types';

/**
 * Alle Leistungen. Inhalte aus docs/firmentext.md, für das Web gestrafft.
 * Reihenfolge = Reihenfolge auf der Website.
 */
export const leistungen: Leistung[] = [
  {
    slug: 'carports',
    title: 'Carports und Solar-Carports',
    teaser: 'Vom Einzelcarport bis zur Parkplatzanlage, auf Wunsch mit Photovoltaik im Dach.',
    group: 'Überdachungen und Carports',
    icon: Car,
    intro: [
      'Wir planen und bauen moderne Carports aus Stahl und Glas: vom einzelnen Fahrzeugunterstand bis zu grösseren Anlagen für Mehrfamilienhäuser, Hotels, Gewerbebetriebe und Parkflächen.',
      'Auf Wunsch integrieren wir Photovoltaik direkt in das Dach.',
    ],
    lists: [
      {
        title: 'Unsere Möglichkeiten',
        items: [
          'Einzelcarports', 'Doppelcarports', 'Reihen-Carports', 'freitragende Konstruktionen',
          'Stahlkonstruktionen mit Glasdach', 'Stahlkonstruktionen mit Solardach',
          'integrierte Entwässerung', 'LED-Beleuchtung', 'Vorbereitung für Ladestationen',
          'individuelle Farben und Oberflächen', 'Kombination mit Sicht- und Windschutz',
        ],
      },
      { title: 'Einsatzbereiche', items: ['Einfamilienhäuser', 'Mehrfamilienhäuser', 'Hotels', 'Gewerbebetriebe', 'Parkflächen'] },
    ],
    outro: ['So wird aus einem normalen Autounterstand gleichzeitig eine moderne Energiefläche.'],
    produkte: ['drive-d2-pro'],
    seo: {
      title: 'Carports und Solar-Carports in Bern und im Berner Oberland',
      description: 'Carports aus Stahl und Glas, auf Wunsch als Solar-Carport mit Photovoltaik und Vorbereitung für Ladestationen. Geplant und montiert von BEO Stahl & Glasbau.',
    },
  },
  {
    slug: 'terrassenueberdachungen',
    title: 'Terrassenüberdachungen',
    teaser: 'Stahl, Glas und Solarglas für Terrassen, die Sie länger im Jahr nutzen.',
    group: 'Überdachungen und Carports',
    icon: Umbrella,
    intro: ['Wir entwickeln hochwertige Terrassenüberdachungen für private und gewerbliche Gebäude.'],
    lists: [
      {
        title: 'Mögliche Ausführungen',
        items: [
          'Stahl und Glas', 'Aluminium und Glas', 'Verbundsicherheitsglas', 'Solarglas',
          'teilweise geschlossene Konstruktionen', 'integrierter Sonnenschutz', 'Windschutz',
          'Seitenverglasungen', 'LED-Beleuchtung', 'Entwässerung', 'individuelle Sonderkonstruktionen',
        ],
      },
      { title: 'Einsatzbereiche', items: ['private Gebäude', 'gewerbliche Gebäude'] },
    ],
    outro: ['Das Ziel: Terrassen deutlich länger im Jahr nutzbar machen und gleichzeitig die Architektur des Gebäudes aufwerten.'],
    produkte: ['terrace-t6-solar-glass'],
    seo: {
      title: 'Terrassenüberdachung aus Stahl, Glas und Solarglas',
      description: 'Terrassenüberdachungen aus Stahl und Glas, mit Solarglas, Sonnenschutz, Seitenverglasung und LED-Licht. Individuell geplant für das Berner Oberland.',
    },
  },
  {
    slug: 'vordaecher',
    title: 'Vordächer',
    teaser: 'Vom Hauseingang bis zum repräsentativen Geschäftseingang, nach Mass gefertigt.',
    group: 'Überdachungen und Carports',
    icon: DoorOpen,
    intro: ['Von kleinen Hauseingängen bis zu repräsentativen Geschäftseingängen fertigen wir moderne Vordächer nach Mass.'],
    lists: [
      {
        title: 'Zum Beispiel',
        items: [
          'Glasvordächer', 'Stahl-Glas-Vordächer', 'freitragende Vordächer', 'Vordächer mit Zugstangen',
          'massive Stahlkonstruktionen', 'Solardächer', 'individuelle Speziallösungen',
        ],
      },
      { title: 'Einsatzbereiche', items: ['Hauseingänge', 'Geschäftseingänge'] },
    ],
    outro: ['Jedes Vordach wird auf Gebäude, Belastung und architektonische Situation abgestimmt.'],
    produkte: ['entry-v2-solar'],
    seo: {
      title: 'Vordächer aus Glas und Stahl, auch als Solar-Vordach',
      description: 'Glasvordächer, Stahl-Glas-Vordächer und Solar-Vordächer nach Mass für Hauseingänge und Geschäftseingänge. BEO Stahl & Glasbau, Berner Oberland.',
    },
  },
  {
    slug: 'wintergaerten',
    title: 'Wintergärten und Glasanbauten',
    teaser: 'Zusätzlicher Wohnraum aus Glas und Stahl, ganzjährig nutzbar.',
    group: 'Wohnen mit Glas',
    icon: Sprout,
    intro: [
      'Wir verwandeln Terrassen und Aussenbereiche in zusätzliche Lebensräume.',
      'Unsere Wintergärten verbinden grosszügige Glasflächen mit stabilen Stahl- oder Aluminiumkonstruktionen.',
    ],
    lists: [
      {
        title: 'Möglich sind',
        items: [
          'klassische Wintergärten', 'moderne Flachdach-Wintergärten', 'Glasdächer', 'Ganzglas-Seitenflächen',
          'Schiebeelemente', 'Faltanlagen', 'Beschattungssysteme', 'Beleuchtung', 'Solarintegration',
          'individuelle Heizlösungen',
        ],
      },
      { title: 'Einsatzbereiche', items: ['Terrassen', 'Aussenbereiche'] },
    ],
    outro: [
      'Besonders interessant ist die Kombination mit einem modernen Pellet- oder Holzofen.',
      'So entsteht ein hochwertiger Wohnraum, den Sie auch in den kalten Monaten nutzen.',
    ],
    produkte: ['living-w20-pro'],
    seo: {
      title: 'Wintergarten im Berner Oberland, ganzjährig nutzbar',
      description: 'Wintergärten und Glasanbauten aus Stahl und Glas mit Schiebeelementen, Beschattung und Solarintegration. Mit Pellet- oder Holzofen ganzjährig nutzbar.',
    },
  },
  {
    slug: 'anbaubalkone',
    title: 'Anbaubalkone und Balkonanlagen',
    teaser: 'Einzelne Balkone und mehrgeschossige Anlagen, auch für bestehende Gebäude.',
    group: 'Wohnen mit Glas',
    icon: Building,
    intro: ['Wir planen und bauen einzelne Balkone genauso wie komplette mehrgeschossige Balkonanlagen.'],
    lists: [
      {
        title: 'Ausführungen',
        items: ['Stahl', 'Stahl und Holz', 'Stahl und Glas', 'Stahl mit Ganzglasgeländern', 'pulverbeschichteter oder verzinkter Stahl'],
      },
      {
        title: 'Komplette Konstruktion von',
        items: ['Stützen', 'Trägern', 'Bodenaufbau', 'Geländern', 'Treppen', 'Überdachungen', 'Fundationen', 'Entwässerung'],
      },
    ],
    outro: ['Gerade bei älteren Gebäuden können nachträgliche Balkone den Wohnwert deutlich erhöhen.'],
    produkte: ['balcony-b1-pure', 'balcony-m3-system'],
    seo: {
      title: 'Anbaubalkon und Balkonanlagen aus Stahl',
      description: 'Anbaubalkone aus Stahl, Stahl-Glas oder Stahl-Holz: einzeln oder als mehrgeschossige Balkonanlage, auch nachträglich an bestehenden Gebäuden.',
    },
  },
  {
    slug: 'ganzglasgelaender',
    title: 'Ganzglasgeländer',
    teaser: 'Maximale Transparenz für Balkone, Terrassen, Treppen und Galerien.',
    group: 'Wohnen mit Glas',
    icon: PanelsTopLeft,
    intro: ['Ganzglasgeländer gehören zu unseren hochwertigen Architekturprodukten.'],
    lists: [
      {
        title: 'Geeignet für',
        items: ['Balkone', 'Terrassen', 'Treppen', 'Dachterrassen', 'Galerien', 'Hotels', 'Mehrfamilienhäuser', 'Gewerbebauten'],
      },
      { title: 'Glasvarianten', items: ['klar', 'getönt', 'matt'] },
    ],
    outro: ['Das Ergebnis: moderne Architektur mit maximaler Transparenz und möglichst wenig störenden Konstruktionselementen.'],
    produkte: ['glass-g1-pure'],
    seo: {
      title: 'Ganzglasgeländer für Balkon, Terrasse und Treppe',
      description: 'Rahmenlose Ganzglasgeländer in klarem, getöntem oder mattem Glas für Balkone, Terrassen, Treppen und Galerien. BEO Stahl & Glasbau.',
    },
  },
  {
    slug: 'solar-balkongelaender',
    title: 'Solar-Balkongeländer',
    teaser: 'Balkongeländer mit integrierter Photovoltaik, in sechs Varianten von klassisch bis rahmenlos.',
    group: 'Wohnen mit Glas',
    icon: Sun,
    intro: [
      'Mehr als ein Geländer: Solar-Balkongeländer schützen, gestalten die Fassade und erzeugen Energie für Ihr Zuhause.',
      'Für Neubau und Sanierung, vom Mehrfamilienhaus bis zum Chalet.',
    ],
    lists: [
      {
        title: 'Varianten',
        items: ['Klassik', 'Ganzglas Premium', 'Holz-Design', 'Rahmenlos (unsichtbare Befestigung)', 'Indachpanel (unsichtbare Konstruktion)', 'Kombination Glas + Solar'],
      },
      { title: 'Einsatzbereiche', items: ['Mehrfamilienhäuser', 'Hotels', 'Chalets', 'Neubauten', 'Sanierungen'] },
    ],
    produkte: [],
    seo: {
      title: 'Solar-Balkongeländer: Balkongeländer mit Photovoltaik',
      description: 'Solar-Balkongeländer in sechs Varianten: Klassik, Ganzglas, Holz-Design, rahmenlos, Indachpanel und Glas + Solar. Mit Schnitten und Konstruktionsdetails.',
    },
  },
  {
    slug: 'gelaender',
    title: 'Geländer',
    teaser: 'Stahl, Edelstahl, Glas und Holz: vom Absturzschutz bis zum Designelement.',
    group: 'Stahl, Treppen und Geländer',
    icon: Fence,
    intro: ['Neben Ganzglaslösungen fertigen wir individuelle Geländer.'],
    lists: [
      {
        title: 'Materialien',
        items: ['Stahl', 'Edelstahl', 'Glas', 'Holz', 'Stahl-Holz-Kombinationen', 'Stahl-Glas-Kombinationen'],
      },
    ],
    outro: ['Vom einfachen Absturzschutz bis zum architektonischen Designelement.'],
    produkte: ['glass-g1-pure'],
    seo: {
      title: 'Geländer aus Stahl, Edelstahl, Glas und Holz',
      description: 'Individuelle Geländer aus Stahl, Edelstahl, Glas und Holz: vom einfachen Absturzschutz bis zum architektonischen Designelement.',
    },
  },
  {
    slug: 'treppen',
    title: 'Treppen',
    teaser: 'Stahltreppen für innen und aussen, mit Geländern und Podesten als System.',
    group: 'Stahl, Treppen und Geländer',
    icon: ChartNoAxesColumnIncreasing,
    intro: ['Wir entwickeln individuelle Treppenkonstruktionen für innen und aussen.'],
    lists: [
      {
        title: 'Zum Beispiel',
        items: [
          'gerade Stahltreppen', 'Podesttreppen', 'Fluchttreppen', 'Aussentreppen', 'Industrietreppen',
          'Spindeltreppen', 'Stahl-Holz-Treppen', 'Stahl-Glas-Treppen',
        ],
      },
    ],
    outro: ['Geländer, Podeste und Anschlüsse planen wir als Gesamtsystem.'],
    produkte: ['glass-g1-pure'],
    seo: {
      title: 'Stahltreppen für innen und aussen',
      description: 'Stahltreppen, Podesttreppen, Fluchttreppen, Spindeltreppen sowie Stahl-Holz- und Stahl-Glas-Treppen. Mit Geländern und Podesten als Gesamtsystem.',
    },
  },
  {
    slug: 'stahlbau',
    title: 'Stahlbau',
    teaser: 'Rahmen, Träger, Stützen und Plattformen, bei denen Funktion und Architektur zählen.',
    group: 'Stahl, Treppen und Geländer',
    icon: Construction,
    intro: ['BEO Stahl & Glasbau übernimmt auch klassische Stahlbauarbeiten.'],
    lists: [
      {
        title: 'Dazu gehören',
        items: [
          'Stahlrahmen', 'Trägerkonstruktionen', 'Stützen', 'Unterkonstruktionen', 'kleinere Stahlhallen',
          'Überdachungen', 'Plattformen', 'Podeste', 'Sonderkonstruktionen', 'Tragkonstruktionen',
          'Verstärkungen bestehender Bauwerke',
        ],
      },
    ],
    outro: ['Unser Schwerpunkt: Konstruktionen, bei denen Funktion und Architektur zusammenkommen.'],
    produkte: [],
    seo: {
      title: 'Stahlbau im Berner Oberland',
      description: 'Stahlrahmen, Trägerkonstruktionen, Stützen, Plattformen und Verstärkungen bestehender Bauwerke. Stahlbau mit architektonischem Anspruch.',
    },
  },
  {
    slug: 'hallen-gewerbebau',
    title: 'Hallen- und Gewerbebau',
    teaser: 'Stahlkonstruktionen für Werkhallen, Lager, Plattformen und Wartungszugänge.',
    group: 'Stahl, Treppen und Geländer',
    icon: Warehouse,
    intro: ['Für Gewerbe und Industrie entwickeln wir Stahlkonstruktionen.'],
    lists: [
      {
        title: 'Zum Beispiel für',
        items: [
          'Werkhallen', 'Lagerhallen', 'Produktionsbereiche', 'Unterstände', 'Lagerüberdachungen',
          'technische Plattformen', 'Treppenanlagen', 'Wartungszugänge',
        ],
      },
      { title: 'Einsatzbereiche', items: ['Gewerbe', 'Industrie'] },
    ],
    outro: ['Verschiedene Gewerke führen wir zu einer Gesamtlösung zusammen.'],
    produkte: [],
    seo: {
      title: 'Hallenbau und Gewerbebau in Stahl',
      description: 'Stahlkonstruktionen für Werkhallen, Lagerhallen, Produktionsbereiche, technische Plattformen und Wartungszugänge. Verschiedene Gewerke aus einer Hand.',
    },
  },
  {
    slug: 'laermschutzwaende',
    title: 'Lärmschutzwände',
    teaser: 'Lärmschutz, Sichtschutz und Architektur für Private, Gewerbe und Infrastruktur.',
    group: 'Lärmschutz, Solar und Spezial',
    icon: VolumeX,
    intro: ['BEO Stahl & Glasbau entwickelt moderne Lärmschutzlösungen für private, gewerbliche und infrastrukturelle Anwendungen.'],
    lists: [
      {
        title: 'Mögliche Bestandteile',
        items: ['Stahlkonstruktionen', 'Akustikelemente', 'Betonabsorber', 'Glas', 'Holz', 'Metall', 'Begrünung', 'Photovoltaik'],
      },
      {
        title: 'Einsatzbereiche',
        items: [
          'Einfamilienhäuser', 'Wohnüberbauungen', 'Hotels', 'Industrie', 'Gewerbe', 'Wärmepumpen',
          'technische Anlagen', 'Parkplätze', 'Strassen', 'öffentliche Infrastruktur',
        ],
      },
    ],
    outro: [
      'Eine Lärmschutzwand soll nicht wie eine technische Barriere wirken.',
      'Unser Ziel: Lärmschutz + Sichtschutz + Architektur.',
    ],
    produkte: [],
    seo: {
      title: 'Lärmschutzwände für Private, Gewerbe und Infrastruktur',
      description: 'Lärmschutzwände aus Stahl, Glas, Holz, Akustikelementen und Begrünung, auch für Wärmepumpen und technische Anlagen. Lärmschutz mit Architektur.',
    },
  },
  {
    slug: 'laermschutz-photovoltaik',
    title: 'Lärmschutz mit Photovoltaik',
    teaser: 'Eine Fläche, vier Funktionen: Schallschutz, Sichtschutz, Energie und Design.',
    group: 'Lärmschutz, Solar und Spezial',
    icon: SolarPanel,
    intro: [
      'Eine besonders zukunftsorientierte Lösung verbindet Lärmschutz und Energieproduktion.',
      'Photovoltaikmodule werden Bestandteil der Lärmschutzkonstruktion.',
    ],
    lists: [
      { title: 'Dieselbe Fläche übernimmt', items: ['Schallschutz', 'Sichtschutz', 'Energiegewinnung', 'Design'] },
      { title: 'Besonders interessant für', items: ['grössere Grundstücke', 'Gewerbegebäude', 'Wohnanlagen', 'Infrastruktur'] },
    ],
    produkte: [],
    seo: {
      title: 'Lärmschutzwand mit Photovoltaik',
      description: 'Lärmschutzwand mit Photovoltaik: Schallschutz, Sichtschutz und Energiegewinnung in einer Konstruktion. Für Grundstücke, Gewerbe, Wohnanlagen und Infrastruktur.',
    },
  },
  {
    slug: 'sicht-windschutz',
    title: 'Sicht- und Windschutzsysteme',
    teaser: 'Glas, Metall, Holz und Pflanzen kombiniert für Terrassen, Gärten und Gastronomie.',
    group: 'Lärmschutz, Solar und Spezial',
    icon: Wind,
    intro: ['Wir entwickeln individuelle Sicht- und Windschutzsysteme.'],
    lists: [
      {
        title: 'Für',
        items: ['Terrassen', 'Gärten', 'Balkone', 'Restaurants', 'Hotels', 'Poolbereiche', 'Wohnüberbauungen'],
      },
      { title: 'Materialien', items: ['Glas', 'Metall', 'Holz', 'Pflanzen', 'weitere Materialien nach Projekt'] },
    ],
    produkte: [],
    seo: {
      title: 'Sichtschutz und Windschutz aus Glas, Metall und Holz',
      description: 'Individuelle Sicht- und Windschutzsysteme für Terrassen, Gärten, Balkone, Restaurants, Hotels und Poolbereiche.',
    },
  },
  {
    slug: 'solarkonstruktionen',
    title: 'Solarkonstruktionen',
    teaser: 'Photovoltaik in Carports, Vordächern, Fassaden und Lärmschutzwänden.',
    group: 'Lärmschutz, Solar und Spezial',
    icon: SunMedium,
    intro: ['Photovoltaik muss nicht nur auf einem normalen Hausdach montiert werden.'],
    lists: [
      {
        title: 'Wir integrieren Solar unter anderem in',
        items: [
          'Carports', 'Terrassenüberdachungen', 'Vordächer', 'Wintergärten', 'Fassaden',
          'Lärmschutzwände', 'Parkplatzüberdachungen', 'Sonderkonstruktionen',
        ],
      },
    ],
    outro: ['So werden bauliche Flächen gleichzeitig zu Energieflächen.'],
    produkte: ['drive-d2-pro', 'terrace-t6-solar-glass', 'entry-v2-solar'],
    seo: {
      title: 'Solarkonstruktionen: Photovoltaik im Bauteil',
      description: 'Photovoltaik integriert in Carports, Terrassenüberdachungen, Vordächer, Wintergärten, Fassaden und Lärmschutzwände. Bauliche Flächen werden Energieflächen.',
    },
  },
  {
    slug: 'sonderkonstruktionen',
    title: 'Sonderkonstruktionen',
    teaser: 'Individuelle Lösungen, wenn ein Standardprodukt nicht passt.',
    group: 'Lärmschutz, Solar und Spezial',
    icon: PencilRuler,
    intro: [
      'Nicht jedes Projekt lässt sich mit einem Standardprodukt lösen.',
      'Genau deshalb entwickeln wir individuelle Konstruktionen.',
    ],
    lists: [],
    outro: ['Vom ersten Entwurf bis zur fertigen Montage suchen wir eine technisch sinnvolle und optisch überzeugende Lösung.'],
    produkte: [],
    seo: {
      title: 'Sonderkonstruktionen aus Stahl und Glas',
      description: 'Individuelle Sonderkonstruktionen aus Stahl und Glas: vom ersten Entwurf bis zur fertigen Montage, technisch sinnvoll und optisch überzeugend.',
    },
  },
  {
    slug: 'renovationen',
    title: 'Renovationen und Modernisierungen',
    teaser: 'Sanieren, verstärken, erweitern: Bestehendes muss nicht immer ersetzt werden.',
    group: 'Lärmschutz, Solar und Spezial',
    icon: RefreshCw,
    intro: ['Bestehende Konstruktionen müssen nicht immer komplett ersetzt werden.'],
    lists: [
      {
        title: 'Wir prüfen Möglichkeiten zur',
        items: [
          'Sanierung', 'Verstärkung', 'Erweiterung', 'Neuverglasung', 'Modernisierung',
          'Integration von Solar', 'Erneuerung von Geländern', 'Erweiterung bestehender Balkone und Überdachungen',
        ],
      },
    ],
    produkte: ['glass-g1-pure', 'balcony-b1-pure'],
    seo: {
      title: 'Renovation und Modernisierung von Stahl- und Glaskonstruktionen',
      description: 'Sanierung, Verstärkung, Neuverglasung und Solarintegration bestehender Konstruktionen. Erneuerung von Geländern und Erweiterung von Balkonen.',
    },
  },
];

export const leistungsGruppen: LeistungsGruppe[] = [
  'Überdachungen und Carports',
  'Wohnen mit Glas',
  'Stahl, Treppen und Geländer',
  'Lärmschutz, Solar und Spezial',
];

export const getLeistung = (slug: string) => leistungen.find((l) => l.slug === slug);
