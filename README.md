# BEO Stahl & Glasbau – Website

Website für beostahlbau.ch. Vite, React 19, TypeScript, Tailwind CSS 4. Alle Seiten werden beim Build vorgerendert. Das Anfrageformular läuft über Vercel Functions, Resend und Vercel Blob.

## Lokal starten

Voraussetzung: Node.js 20 oder neuer.

```bash
npm install
npm run dev        # Entwicklung: http://localhost:5173 (ohne /api)
npm run build      # Prüfungen, Build und Vorrendern nach dist/
```

Das Formular braucht die Server-Funktionen. Lokal laufen sie mit der Vercel CLI:

```bash
npm i -g vercel
vercel link        # einmalig mit dem Vercel-Projekt verbinden
vercel env pull    # Umgebungsvariablen als .env.local holen
vercel dev         # Website und /api lokal
```

## Struktur

| Pfad | Inhalt |
|---|---|
| `src/data/` | Alle Inhalte: Leistungen, Produkte, Projektablauf, Gründe, Firmendaten |
| `src/pages/` | Eine Datei pro Seitentyp |
| `src/components/` | Layout, UI-Bausteine, Abschnitte, Karten, Produkt- und Formular-Komponenten |
| `src/seo/` | Seitentitel, Meta-Tags, strukturierte Daten (JSON-LD) |
| `src/styles/index.css` | Design-Tokens (Farben, Schriften) und Grundstile |
| `src/entry-server.tsx` | Rendern für den Build |
| `shared/` | Formularregeln, die Browser und Server gemeinsam nutzen |
| `api/` | Vercel Functions: `anfrage`, `upload`, `cleanup` |
| `scripts/` | `prerender.mjs` (HTML und Sitemap), `check-katalog.ts` (Build-Prüfung) |
| `public/` | Bilder, Logo, Favicons, robots.txt |
| `docs/` | Firmentext, Eckdaten, Logo-Generator, offene Platzhalter |

## Inhalte ändern

- **Leistung oder Produkt bearbeiten:** `src/data/leistungen.ts` oder `src/data/produkte.ts`. Seiten, Menüs, Footer, Sitemap und Formular übernehmen die Änderung.
- **Neue Leistung oder neues Produkt:** Eintrag in der Datendatei und zusätzlich in `shared/katalog.ts`. Der Build bricht ab, wenn beide nicht übereinstimmen.
- **Firmendaten:** `src/data/site.ts`.
- **Offene Platzhalter:** siehe `docs/offene-platzhalter.md`.

## Bilder

WebP, Namensschema `public/images/<bereich>/<slug>-hero.webp` (1920 × 1080) plus `<slug>-hero-800.webp` (800 × 450). Produktdetails `<slug>-detail-1.webp` bis `-6.webp` (800 × 800). Echte Fotos einfach unter gleichem Namen ersetzen. Details in `docs/offene-platzhalter.md`.

## Anfrageformular: so funktioniert es

1. Der Browser prüft die Eingaben (`shared/anfrage.ts`).
2. Fotos und Pläne gehen direkt vom Browser in einen **privaten** Vercel-Blob-Speicher. `/api/upload` vergibt dafür ein kurzlebiges Token und prüft Typ und Grösse. So gilt das 4.5-MB-Limit der Vercel Functions nicht.
3. `/api/anfrage` prüft alles erneut, liest die Dateien, sendet die Anfrage mit Anhängen an BEO und eine Bestätigung an die Person. Danach werden die Dateien gelöscht.
4. `/api/cleanup` läuft täglich (Vercel Cron) und löscht Uploads von nicht abgeschickten Anfragen nach 24 Stunden.

**Grenzen:** JPG, PNG, PDF. Je Datei 10 MB, höchstens 8 Dateien, zusammen 25 MB (damit alle Anhänge in eine E-Mail passen).

**Spamschutz:** Honeypot-Feld, Mindestausfüllzeit, Herkunftsprüfung, Rate-Limit (5 Anfragen und 30 Uploads je 10 Minuten pro Absender). Die Bestätigungsmail enthält keine Freitexte, damit niemand das Formular zum Versand fremder Inhalte missbrauchen kann.

## Umgebungsvariablen

Vorlage: `.env.example`. Werte nur in Vercel eintragen, nie committen. Keine Variable mit `VITE_` beginnen lassen.

| Variable | Pflicht | Zweck |
|---|---|---|
| `RESEND_API_KEY` | ja | Mailversand |
| `ANFRAGE_TO` | ja | Empfänger der Anfragen |
| `ANFRAGE_FROM` | ja | Absender, Domain in Resend verifiziert |
| `BLOB_READ_WRITE_TOKEN` | ja | Upload-Speicher, wird von Vercel gesetzt |
| `CRON_SECRET` | ja | Schutz des Bereinigungs-Jobs |
| `KV_REST_API_URL`, `KV_REST_API_TOKEN` | empfohlen | Rate-Limit über alle Instanzen (Upstash) |
| `ANFRAGE_TELEFON` | nein | Telefonnummer in der Bestätigungsmail |
| `RATE_LIMIT_SALT` | nein | Salz für das Hashen der IP-Adressen |

## Demo-Modus (aktuell aktiv)

Die Website ist zurzeit nur als Demo online. In `vercel.json` sendet jede Seite den Header `X-Robots-Tag: noindex, nofollow`, damit Suchmaschinen sie nicht aufnehmen. Das Anfrageformular meldet ohne Resend-Einrichtung, dass der Versand nicht möglich ist.

**Für den echten Livegang:** den Eintrag `X-Robots-Tag` in `vercel.json` entfernen, Platzhalter ersetzen (`docs/offene-platzhalter.md`), Resend und Umgebungsvariablen einrichten.

## Deployment auf Vercel

1. **Repository** auf GitHub anlegen und den Code pushen.
2. **Vercel-Projekt** erstellen: «Add New → Project», Repository wählen. Framework «Vite» wird erkannt. Build-Befehl `npm run build`, Ausgabe `dist` (Standard).
3. **Blob-Speicher:** Projekt → Storage → «Create» → Blob → mit dem Projekt verbinden. `BLOB_READ_WRITE_TOKEN` wird automatisch gesetzt.
4. **Rate-Limit (empfohlen):** Projekt → Storage → Marketplace → «Upstash for Redis» → verbinden. Die `KV_REST_API_*`-Variablen werden gesetzt.
5. **Resend:** Konto anlegen, Domain `beostahlbau.ch` hinzufügen, die angezeigten DNS-Einträge (SPF, DKIM) beim Domain-Anbieter eintragen, verifizieren. API-Key erstellen.
6. **Variablen** aus der Tabelle oben in Vercel eintragen (Production und Preview).
7. **Domain:** Projekt → Settings → Domains → `beostahlbau.ch` und `www.beostahlbau.ch` hinzufügen, DNS gemäss Anleitung setzen. `www` auf die Hauptdomain umleiten.
8. **Testen:** Eine Anfrage mit Foto senden. Prüfen, ob beide Mails ankommen und der Anhang lesbar ist.

`vercel.json` regelt saubere URLs ohne `.html`, Sicherheits-Header, Caching der Bilder und den täglichen Cron-Job.

## Analytics (optional)

Die Website setzt keine Cookies und lädt keine externen Dienste. Für cookielose Statistiken kann Vercel Web Analytics aktiviert werden (Paket `@vercel/analytics`). Dann den entsprechenden Absatz in der Datenschutzerklärung aktivieren.

## Qualität

Gemessen lokal mit Komprimierung wie auf Vercel, Lighthouse 12, 10 Seiten, Handy und Desktop: Performance 97 bis 100, Barrierefreiheit, Best Practices und SEO je 100. axe-core (WCAG 2.1 AA) ohne Befund auf allen 36 Seiten.

## Schriften und Lizenzen

Michroma, Inter und Allura sind selbst gehostet (Fontsource, SIL Open Font License). Icons: Lucide (ISC).
