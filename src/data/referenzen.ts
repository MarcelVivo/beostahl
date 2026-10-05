import { Car, Construction, LandPlot, Layers } from 'lucide-react';
import type { Referenz } from './types';

/**
 * Referenzprojekte. Alle Angaben stammen aus den Projektunterlagen.
 * Masse und Mengen sind ca.-Angaben aus der Konzeptphase.
 */
export const referenzen: Referenz[] = [
  {
    slug: 'carport-anlage-occasion-autoplatz',
    title: 'Carport-Anlage für einen Occasion-Autoplatz',
    objekt: 'Occasion-Autoplatz',
    ort: '[ORT]',
    status: 'Vorprojekt',
    stand: '04/2025',
    teaser: 'Stahl-Carports für rund 120 Fahrzeuge: zwei Aussenreihen mit Pultdach und eine Zentralreihe mit Satteldach.',
    intro: [
      'Für einen Occasion-Autoplatz haben wir eine Carport-Anlage für rund 120 Fahrzeuge konzipiert.',
      'Die Aussenreihen mit Pultdach fassen das Gelände auf drei Seiten ein. In der Mitte steht eine Zentralreihe mit Satteldach.',
      'Die Zentralreihe trägt nur über Mittelstützen. Der vordere Bereich der Stellplätze bleibt dadurch frei von Stützen.',
      'Die Stahlstützen stehen auf verzinkten Schraubfundamenten. Das Dach besteht aus beschichtetem Trapezblech auf verzinkten Pfetten.',
    ],
    kennzahlen: [
      { icon: Car, title: 'ca. 120', text: 'Stellplätze überdacht' },
      { icon: Layers, title: 'ca. 5’000 m²', text: 'Dachfläche' },
      { icon: Construction, title: 'ca. 95–125 t', text: 'Stahlkonstruktion' },
      { icon: LandPlot, title: 'ca. 66 × 48 m', text: 'Anlage' },
    ],
    technik: [
      {
        title: 'Aussenreihen (Schnitt A-A)',
        items: [
          { label: 'Carport-Breite', value: '7.00 m' },
          { label: 'Stellplatztiefe', value: '5.00 m' },
          { label: 'Überstand', value: 'je 1.00 m' },
          { label: 'Höhen', value: 'ca. 3.50 m und 2.80 m' },
          { label: 'Dach', value: 'Pultdach, Neigung ca. 5° (≈ 9 %)' },
        ],
      },
      {
        title: 'Zentralreihe (Schnitt B-B)',
        items: [
          { label: 'Gesamtbreite', value: '11.00 m' },
          { label: 'Stellplätze', value: '2 × 5.00 m' },
          { label: 'Mittelzone', value: '1.00 m' },
          { label: 'Höhen', value: 'ca. 3.50 m und 2.80 m' },
          { label: 'Dach', value: 'Satteldach, Neigung je ca. 5° (≈ 9 %)' },
          { label: 'Lastabtragung', value: 'nur über die Mittelstützen' },
        ],
      },
      {
        title: 'Fundation',
        items: [
          { label: 'Fundament', value: 'Schraubfundament verzinkt, z. B. Ø 114 mm' },
          { label: 'Einbindetiefe', value: 'ca. 2.5–3.0 m' },
          { label: 'Tragschicht', value: 'Schotter verdichtet, ca. 20–30 cm' },
          { label: 'Anschluss', value: 'Stahladapter, Kopfplatte mit Schrauben' },
          { label: 'Stütze', value: 'z. B. RHS 200 × 200 mm' },
        ],
      },
      {
        title: 'Dachaufbau und Stahlgüten',
        items: [
          { label: 'Eindeckung', value: 'Trapezblech T55 / T60, 0.75 mm, beschichtet' },
          { label: 'Befestigung', value: 'Kalotten und Dichtschrauben' },
          { label: 'Pfetten', value: 'Z- oder C-Pfetten, verzinkt' },
          { label: 'Optional', value: 'Antikondensvlies' },
          { label: 'Primärstahl', value: 'S355' },
          { label: 'Schrauben', value: '8.8 / 10.9 je nach Anschluss' },
        ],
      },
    ],
    material: [
      { beschreibung: 'Schraubfundamente', spezifikation: 'verzinkt, z. B. Ø 114 mm, L = 2.5–3.0 m', menge: 'ca. 96 Stück' },
      { beschreibung: 'Hauptstützen Aussenreihen', spezifikation: 'Stahlstützen S355, z. B. RHS 200 × 200 × 8 mm', menge: 'ca. 60 Stück' },
      { beschreibung: 'Mittelstützen Zentralreihe', spezifikation: 'Stahlstützen S355, z. B. RHS 220 × 220 × 10 mm', menge: 'ca. 18 Stück' },
      { beschreibung: 'Hauptträger / Längsträger', spezifikation: 'IPE / HEA Stahlträger S355, z. B. HEA 300 / IPE 330', menge: 'ca. 900–1’100 m' },
      { beschreibung: 'Querträger / Pfetten', spezifikation: 'Z- oder C-Pfetten, verzinkt, z. B. Z 200 / Z 220', menge: 'ca. 1’400–1’700 m' },
      { beschreibung: 'Dachverbände / Aussteifungen', spezifikation: 'Rund- oder Flachstahl', menge: 'Satz für gesamte Anlage' },
      { beschreibung: 'Trapezblech Dach', spezifikation: 'Stahltrapezblech T55 oder T60, 0.75 mm, beschichtet', menge: 'ca. 4’800–5’400 m²' },
      { beschreibung: 'Dachrinnen / Fallrohre', spezifikation: 'beschichtetes Stahlblech oder Alu', menge: 'ca. 350–450 m' },
      { beschreibung: 'Verbindungsmittel', spezifikation: 'hochfeste Schrauben, Ankerplatten, Kopfplatten, Laschen', menge: 'kompletter Satz' },
    ],
    bilder: [
      { file: 'carport-anlage-occasion-autoplatz-lageplan.webp', title: 'Lageplan / Draufsicht', alt: 'Lageplan der Carport-Anlage: Aussenreihen auf drei Seiten des Geländes, Zentralreihe in der Mitte, Gesamtmass ca. 66 × 48 m' },
      { file: 'carport-anlage-occasion-autoplatz-schnitt-aussenreihe.webp', title: 'Schnitt Aussenreihe A-A', alt: 'Schnitt durch eine Aussenreihe: Pultdach mit ca. 5° Neigung, Breite 7.00 m, Stellplatz 5.00 m, Überstand je 1.00 m' },
      { file: 'carport-anlage-occasion-autoplatz-schnitt-zentralreihe.webp', title: 'Querschnitt Zentralreihe B-B', alt: 'Querschnitt der Zentralreihe: Satteldach mit Mittelstütze, Breite 11.00 m, zwei Stellplätze à 5.00 m und Mittelzone 1.00 m' },
      { file: 'carport-anlage-occasion-autoplatz-seitenansicht-zentralreihe.webp', title: 'Seitenansicht Zentralreihe', alt: 'Seitenansicht der Zentralreihe: vorderer Bereich frei von Stützen, Lastabtragung nur über die Mittelstützen' },
      { file: 'carport-anlage-occasion-autoplatz-fundament.webp', title: 'Detail Schraubfundament', alt: 'Detail Schraubfundament: Stahlstütze RHS 200 × 200 mm auf verzinktem Schraubfundament Ø 114 mm, Einbindetiefe ca. 2.5 bis 3.0 m' },
      { file: 'carport-anlage-occasion-autoplatz-dachaufbau.webp', title: 'Empfohlener Dachaufbau', alt: 'Dachaufbau: Trapezblech T55 oder T60, Antikondensvlies optional, Kalotten und Dichtschrauben, Z- oder C-Pfetten verzinkt, Rinnenanschluss' },
    ],
    plan: {
      file: 'carport-anlage-occasion-autoplatz-plan.webp',
      alt: 'Konzeptgrafik der Carport-Anlage für ca. 120 Fahrzeuge mit Lageplan, Schnitten, Fundamentdetail, Dachaufbau, Stahlgüten und Materialübersicht',
      width: 1280,
      height: 960,
    },
    hinweis: 'Vorprojekt, Stand 04/2025. Alle Masse und Mengen sind ca.-Angaben aus der Konzeptphase. Statik, Fundation und Ausführung werden objektspezifisch geprüft.',
    leistungen: ['carports', 'stahlbau', 'hallen-gewerbebau', 'sonderkonstruktionen'],
    seo: {
      title: 'Referenz: Carport-Anlage für ca. 120 Fahrzeuge',
      description: 'Vorprojekt von BEO Stahl & Glasbau: Stahl-Carports für rund 120 Fahrzeuge auf einem Occasion-Autoplatz. Schraubfundamente, S355, ca. 5’000 m² Dachfläche.',
    },
  },
];

export const getReferenz = (slug: string) => referenzen.find((r) => r.slug === slug);
export const referenzenFuer = (leistungSlug: string) => referenzen.filter((r) => r.leistungen.includes(leistungSlug));
