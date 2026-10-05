/**
 * Regeln für das Anfrageformular. Gilt im Browser und in der Server-Funktion.
 */
import { istLoesung } from './katalog.js';

export const KUNDENTYPEN = [
  { value: 'privat', label: 'Privat' },
  { value: 'firma', label: 'Firma' },
  { value: 'architekt', label: 'Architekt' },
  { value: 'verwaltung', label: 'Verwaltung' },
  { value: 'oeffentlich', label: 'Öffentliche Hand' },
] as const;

export const ZEITRAEUME = ['So bald wie möglich', 'In den nächsten 3 Monaten', 'In 3 bis 6 Monaten', 'In 6 bis 12 Monaten', 'Später oder noch offen'] as const;

export const BUDGETS = ['bis CHF 20’000', 'CHF 20’000 bis 50’000', 'CHF 50’000 bis 100’000', 'über CHF 100’000', 'noch offen'] as const;

export const DATEI = {
  maxAnzahl: 8,
  maxBytes: 10 * 1024 * 1024,
  /** Gesamtgrösse, damit alle Dateien als Anhang in eine E-Mail passen */
  maxGesamtBytes: 25 * 1024 * 1024,
  typen: ['image/jpeg', 'image/png', 'application/pdf'] as string[],
  endungen: ['.jpg', '.jpeg', '.png', '.pdf'],
  /** Ordner im Blob-Speicher */
  ordner: 'anfragen/',
};

/** Mindestzeit in ms zwischen Laden des Formulars und Absenden (Spamschutz) */
export const MIN_AUSFUELLZEIT = 3000;

export interface AnfrageDatei {
  pathname: string;
  name: string;
  size: number;
  contentType: string;
}

export interface AnfrageDaten {
  kundentyp: string;
  loesungen: string[];
  plz: string;
  ort: string;
  masse: string;
  zeitraum: string;
  budget: string;
  beschreibung: string;
  name: string;
  firma: string;
  email: string;
  telefon: string;
  datenschutz: boolean;
  dateien: AnfrageDatei[];
  /** Honeypot: muss leer bleiben */
  website: string;
  /** Zeitstempel beim Laden des Formulars */
  t: number;
}

export type Fehler = Partial<Record<keyof AnfrageDaten, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TELEFON = /^[+()0-9\s/.-]{7,25}$/;
const PLZ = /^[0-9]{4,5}$/;

const len = (s: unknown, max: number) => typeof s === 'string' && s.trim().length <= max;

/** Prüft alle Felder. Leeres Objekt = gültig. */
export function pruefeAnfrage(d: Partial<AnfrageDaten>): Fehler {
  const f: Fehler = {};
  if (!KUNDENTYPEN.some((k) => k.value === d.kundentyp)) f.kundentyp = 'Bitte wählen Sie, wer anfragt.';
  if (!Array.isArray(d.loesungen) || d.loesungen.length === 0) f.loesungen = 'Bitte wählen Sie mindestens eine Lösung.';
  else if (d.loesungen.length > 30 || !d.loesungen.every((s) => typeof s === 'string' && istLoesung(s))) f.loesungen = 'Ungültige Auswahl.';
  if (!d.plz || !PLZ.test(d.plz.trim())) f.plz = 'Bitte geben Sie eine gültige Postleitzahl ein.';
  if (!d.ort || !d.ort.trim() || !len(d.ort, 80)) f.ort = 'Bitte geben Sie den Ort ein.';
  if (!len(d.masse ?? '', 200)) f.masse = 'Bitte höchstens 200 Zeichen.';
  if (d.zeitraum && !(ZEITRAEUME as readonly string[]).includes(d.zeitraum)) f.zeitraum = 'Ungültige Auswahl.';
  if (d.budget && !(BUDGETS as readonly string[]).includes(d.budget)) f.budget = 'Ungültige Auswahl.';
  const b = d.beschreibung?.trim() ?? '';
  if (b.length < 20) f.beschreibung = 'Bitte beschreiben Sie Ihr Projekt in mindestens 20 Zeichen.';
  else if (b.length > 5000) f.beschreibung = 'Bitte höchstens 5000 Zeichen.';
  if (!d.name || d.name.trim().length < 2 || !len(d.name, 100)) f.name = 'Bitte geben Sie Ihren Namen ein.';
  if (!len(d.firma ?? '', 120)) f.firma = 'Bitte höchstens 120 Zeichen.';
  if (!d.email || !EMAIL.test(d.email.trim()) || !len(d.email, 200)) f.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
  if (!d.telefon || !TELEFON.test(d.telefon.trim())) f.telefon = 'Bitte geben Sie eine gültige Telefonnummer ein.';
  if (d.datenschutz !== true) f.datenschutz = 'Bitte bestätigen Sie die Datenschutzerklärung.';
  const dateien = d.dateien ?? [];
  if (!Array.isArray(dateien) || dateien.length > DATEI.maxAnzahl) f.dateien = `Bitte höchstens ${DATEI.maxAnzahl} Dateien.`;
  else if (dateien.reduce((s, x) => s + (x.size || 0), 0) > DATEI.maxGesamtBytes) f.dateien = 'Die Dateien sind zusammen grösser als 25 MB.';
  else if (
    !dateien.every(
      (x) =>
        typeof x.pathname === 'string' &&
        x.pathname.startsWith(DATEI.ordner) &&
        !x.pathname.includes('..') &&
        x.size > 0 &&
        x.size <= DATEI.maxBytes &&
        DATEI.typen.includes(x.contentType) &&
        len(x.name, 200),
    )
  )
    f.dateien = 'Mindestens eine Datei ist ungültig.';
  return f;
}

/** Prüft eine Datei vor dem Upload. null = in Ordnung. */
export function pruefeDatei(file: { name: string; size: number; type: string }): string | null {
  const endung = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
  if (!DATEI.typen.includes(file.type) && !DATEI.endungen.includes(endung)) return `${file.name}: Nur JPG, PNG oder PDF.`;
  if (file.size > DATEI.maxBytes) return `${file.name}: Die Datei ist grösser als 10 MB.`;
  if (file.size === 0) return `${file.name}: Die Datei ist leer.`;
  return null;
}

/** Sicherer Dateiname für den Speicher: nur a–z, 0–9, Bindestrich, Punkt */
export function sichererName(name: string): string {
  const punkt = name.lastIndexOf('.');
  const basis = (punkt > 0 ? name.slice(0, punkt) : name)
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'datei';
  const endung = punkt > 0 ? name.slice(punkt).toLowerCase().replace(/[^a-z.]/g, '') : '';
  return basis + endung;
}
