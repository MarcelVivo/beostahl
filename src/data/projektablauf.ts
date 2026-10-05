import type { Schritt } from './types';

/** Zehn Schritte gemäss Briefing, Inhalte aus «Komplette Projektabwicklung». */
export const projektablauf: Schritt[] = [
  { title: 'Beratung', text: 'Wir klären Ihre Wünsche, das Gebäude und die Rahmenbedingungen.' },
  { title: 'Besichtigung und Aufmass', text: 'Wir sehen uns die Situation vor Ort an und nehmen die Masse auf.' },
  { title: 'Planung und Konstruktion', text: 'Wir planen die Lösung passend zu Gebäude, Kunde und Umgebung.' },
  { title: 'Materialauswahl', text: 'Stahl, Glas, Oberflächen und Farben stimmen wir gemeinsam ab.' },
  { title: 'Statik und technische Abklärungen', text: 'Wir klären Tragwerk, Lasten und technische Anschlüsse.' },
  { title: 'Produktion', text: 'Die Konstruktion wird nach Plan gefertigt.' },
  { title: 'Transport und Montage', text: 'Wir liefern und montieren vor Ort.' },
  { title: 'Verglasung und Solarintegration', text: 'Glas und Photovoltaik werden in die Konstruktion integriert.' },
  { title: 'Abschluss', text: 'Abschlussarbeiten und Übergabe des fertigen Projekts.' },
  { title: 'Service und Unterhalt', text: 'Auch nach der Montage bleiben wir Ihr Ansprechpartner.' },
];
