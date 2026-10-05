import { Award, Gem, Handshake, Layers, MapPin, PencilRuler, Sparkles, Sunrise, Users } from 'lucide-react';
import type { Grund } from './types';

/** «Warum BEO», Inhalte aus dem Firmentext. home = auf der Startseite zeigen. */
export const gruende: Grund[] = [
  {
    icon: Layers,
    title: 'Mehr als Metallbau',
    text: 'Wir verbinden Stahlbau, Glasbau, Solar, Architektur und Montage. So entstehen Lösungen, die von Anfang an als Gesamtsystem geplant sind.',
  },
  {
    icon: PencilRuler,
    title: 'Individuell statt Massenware',
    text: 'Gebäude, Gelände und Wünsche sind verschieden. Darum entwickeln wir Lösungen, die zum jeweiligen Objekt passen.',
    home: true,
  },
  {
    icon: Gem,
    title: 'Modernes Design',
    text: 'Klare Linien, grosse Glasflächen, hochwertige Oberflächen und elegant integrierte Tragkonstruktionen.',
    home: true,
  },
  {
    icon: Handshake,
    title: 'Alles aus einer Hand',
    text: 'Sie müssen nicht selbst Stahlbauer, Glaser, Solartechniker und Monteure koordinieren. Wir übernehmen die Schnittstellen.',
    home: true,
  },
  {
    icon: Sparkles,
    title: 'Stahl + Glas + Solar',
    text: 'Ein Carport wird zum Solarkraftwerk. Eine Lärmschutzwand produziert Strom. Bauteile mit mehr als einer Funktion.',
    home: true,
  },
  {
    icon: Users,
    title: 'Für Privatkunden und Grossprojekte',
    text: 'Für Hauseigentümer genauso wie für Architekten, Generalunternehmen, Verwaltungen, Hotels, Gewerbe und Gemeinden.',
  },
  {
    icon: MapPin,
    title: 'Regionaler Ansprechpartner',
    text: 'Ein persönlicher Ansprechpartner, kurze Entscheidungswege und enger Bezug zur Schweiz.',
    home: true,
  },
  {
    icon: Award,
    title: 'Qualität vor billig',
    text: 'Preis, Qualität, Lebensdauer, Architektur und Funktion sollen zusammenpassen. Auch nach vielen Jahren.',
    home: true,
  },
  {
    icon: Sunrise,
    title: 'Zukunftsorientiert',
    text: 'Flächen produzieren Energie, Aussenräume werden Wohnräume, Bestehendes wird erweitert statt abgerissen.',
  },
];
