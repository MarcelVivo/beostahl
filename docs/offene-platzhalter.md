# Offene Platzhalter

Alle Stellen, die vor dem Livegang ersetzt werden müssen. Platzhalter stehen auf der Website in eckigen Klammern.

## Firmendaten (zentral in `src/data/site.ts`)

| Feld | Platzhalter | Wirkt auf |
|---|---|---|
| Firmenname mit Rechtsform | `[FIRMENNAME MIT RECHTSFORM]` | Impressum, Datenschutz |
| Strasse | `[STRASSE NR.]` | Footer, Kontakt, Impressum, Datenschutz, strukturierte Daten |
| PLZ, Ort | `[PLZ]`, `[ORT]` | wie oben, Über uns |
| Telefon | `[TELEFON]` und `phoneHref` | Footer, Kontakt, Anfrage, CTA-Blöcke |
| E-Mail | `[E-MAIL]` und `emailHref` | Footer, Kontakt, Anfrage, Datenschutz |

Sobald Telefon und E-Mail bekannt sind, auch `phoneHref` (z. B. `tel:+41...`) und `emailHref` (`mailto:...`) setzen. Dann werden sie klickbar, und die CTA-Blöcke zeigen «Anrufen».

## Impressum (`src/pages/ImpressumPage.tsx`)

- `[NAME, FUNKTION]` – vertretungsberechtigte Person(en)
- `[KANTON]` – Handelsregister
- `[CHE-XXX.XXX.XXX]` – UID
- `[CHE-XXX.XXX.XXX MWST]` – MWST-Nummer (entfernen, falls nicht MWST-pflichtig)
- `[FOTOGRAFIN / FOTOGRAF, QUELLE]` – Bildnachweis

## Datenschutz (`src/pages/DatenschutzPage.tsx`)

- `[DATUM]` – Stand der Erklärung
- `[NAME, E-MAIL]` – Ansprechperson Datenschutz
- `[AUFBEWAHRUNGSDAUER ERGÄNZEN]`
- `[NUR FALLS AKTIVIERT: … Vercel Web Analytics …]` – Absatz löschen oder Klammern entfernen
- `[FALLS UPSTASH AKTIVIERT: …]` und `[, Upstash]` – je nach Einrichtung
- `[bzw. … Swiss-U.S. Data Privacy Framework]` – je nach Anbieter-Status prüfen

Die Datenschutzerklärung ist eine Vorlage. Bitte vor dem Livegang fachlich prüfen lassen.

## Kontakt und Über uns

- `[ÖFFNUNGSZEITEN]` – `src/pages/KontaktPage.tsx`
- `[GESCHICHTE: …]`, `[TEAM: …]`, `[STANDORT: …]` – `src/pages/UeberUnsPage.tsx`

## Referenz Carport-Anlage (`src/data/referenzen.ts`)

- `[ORT]` – Standort des Projekts
- **Freigabe der Bauherrschaft einholen:** Die Grafik zeigt Name und Slogan des Kunden («Occasion-Autoplatz», «Gute Autos. Gute Wege.»). Vor der Veröffentlichung schriftlich bestätigen lassen, dass Name und Pläne gezeigt werden dürfen.
- **Status nachführen:** Das Projekt ist als «Vorprojekt, Stand 04/2025» beschrieben. Nach der Ausführung `status` ändern und echte Fotos ergänzen.
- Quelle der Grafik: Konzeptzeichnung, Dateien in `public/images/referenzen/` (Gesamtplan und sechs Ausschnitte).

## Bilder

Alle Bilder der Website sind jetzt Visualisierungen statt Platzhalter (Stand 05.10.2026). Die Alternativtexte kennzeichnen sie als «Visualisierung».

- **Originale:** Die PNG-Quelldateien liegen in `bilder-original/` (ausserhalb von `public/`, nicht im Git, rund 266 MB). Nicht löschen, falls Bilder später neu zugeschnitten werden sollen.
- **Rechte:** Nutzungsrechte und kommerzielle Verwendung der Bild-Tools prüfen.
- **Neu erzeugt (05.10.2026):** `stahlbau-hero`, `balcony-m3-system-detail-6`, `glass-g1-pure-detail-4`. Die ersten Fassungen liegen als `-v1` in `bilder-original/generiert/`.
- **Echte Fotos bevorzugt** für «Über uns» und «Projektablauf», sobald vorhanden.

Neue Bilder: im Ordner `public/images/neu/` ablegen (Dateinamen siehe `docs/bild-prompts.md`) und Claude um Übernahme bitten.

## Inhalte zur fachlichen Prüfung (keine Platzhalter, aber abgeleitet)

- Die vier Vorteile pro Produkt (`src/data/produkte.ts`, Feld `vorteile`) sind aus Tabelle und Firmentext abgeleitet.
- «Uw bis 0.8» wurde um die Einheit W/m²K ergänzt.
- Einsatzbereiche bei Carports, Terrassenüberdachungen, Vordächern, Wintergärten und Hallenbau sind aus dem Fliesstext abgeleitet.
- Budget- und Zeitraum-Auswahl im Formular (`shared/anfrage.ts`) sind Vorschläge.
- Technische Zeichnungen sind schematisch und nur für Living W20 Pro, Drive D2 Pro und Terrace T6 vorhanden.
