/** Verbindet CSS-Klassen und ignoriert leere Werte. */
export const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(' ');

/** Zweistellige Nummerierung: 1 → «01» */
export const nr = (i: number) => String(i).padStart(2, '0');
