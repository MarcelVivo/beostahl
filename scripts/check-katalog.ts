/** Build-Prüfung: Formular-Katalog muss zu den Datendateien passen. */
import { leistungen } from '../src/data/leistungen';
import { produkte } from '../src/data/produkte';
import { LEISTUNGEN_KATALOG, PRODUKTE_KATALOG } from '../shared/katalog';

const fehler: string[] = [];
const vergleiche = (name: string, daten: Array<{ slug: string; label: string }>, katalog: ReadonlyArray<{ slug: string; label: string }>) => {
  if (daten.length !== katalog.length) fehler.push(`${name}: ${daten.length} in src/data, ${katalog.length} im Katalog`);
  daten.forEach((d, i) => {
    const k = katalog[i];
    if (!k || k.slug !== d.slug || k.label !== d.label) fehler.push(`${name}: ${d.slug} / «${d.label}» passt nicht zu ${k?.slug} / «${k?.label}»`);
  });
};
vergleiche('Leistungen', leistungen.map((l) => ({ slug: l.slug, label: l.title })), LEISTUNGEN_KATALOG);
vergleiche('Produkte', produkte.map((p) => ({ slug: p.slug, label: p.name })), PRODUKTE_KATALOG);
if (fehler.length) {
  console.error('Katalog stimmt nicht mit src/data überein:\n' + fehler.join('\n'));
  process.exit(1);
}
console.log('Katalog geprüft: ok');
