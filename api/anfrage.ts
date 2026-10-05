import { del, get } from '@vercel/blob';
import { DATEI, MIN_AUSFUELLZEIT, pruefeAnfrage, type AnfrageDaten } from '../shared/anfrage.js';
import { clientKey, json, sameOrigin } from './_lib/http.js';
import { rateLimit } from './_lib/ratelimit.js';
import { bestaetigungsMail, interneMail, sendMail, type Attachment } from './_lib/mail.js';

const MAX_BODY = 64 * 1024;

async function readBlob(pathname: string): Promise<{ buf: Buffer; contentType: string } | null> {
  const res = await get(pathname, { access: 'private', useCache: false });
  if (!res || res.statusCode !== 200 || !res.stream) return null;
  const chunks: Uint8Array[] = [];
  let total = 0;
  const reader = res.stream.getReader();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > DATEI.maxBytes) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  return { buf: Buffer.concat(chunks), contentType: res.blob.contentType };
}

/** Nimmt das Anfrageformular entgegen und versendet zwei E-Mails über Resend. */
export async function POST(request: Request): Promise<Response> {
  if (!sameOrigin(request)) return json({ error: 'Nicht erlaubt.' }, 403);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ANFRAGE_TO;
  const from = process.env.ANFRAGE_FROM;
  if (!apiKey || !to || !from) {
    console.error('Mailversand nicht eingerichtet: RESEND_API_KEY, ANFRAGE_TO oder ANFRAGE_FROM fehlt');
    return json({ error: 'Der Versand ist zurzeit nicht möglich. Bitte kontaktieren Sie uns telefonisch oder per E-Mail.' }, 500);
  }

  if (!(await rateLimit('anfrage', clientKey(request), 5, 600))) {
    return json({ error: 'Zu viele Anfragen in kurzer Zeit. Bitte versuchen Sie es in einigen Minuten erneut.' }, 429);
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY) return json({ error: 'Anfrage zu gross.' }, 413);
  let d: AnfrageDaten;
  try {
    d = JSON.parse(raw) as AnfrageDaten;
  } catch {
    return json({ error: 'Ungültige Anfrage.' }, 400);
  }

  // Spamschutz: Honeypot gefüllt oder Formular zu schnell abgeschickt.
  // Antwort wie bei Erfolg, damit Bots nichts lernen. Es wird nichts versendet.
  if (d.website || typeof d.t !== 'number' || Date.now() - d.t < MIN_AUSFUELLZEIT) {
    console.warn('Anfrage als Spam verworfen');
    return json({ ok: true });
  }

  const fehler = pruefeAnfrage(d);
  if (Object.keys(fehler).length) return json({ error: 'Bitte prüfen Sie Ihre Angaben.', fields: fehler }, 400);

  // Anhänge aus dem privaten Speicher lesen
  const attachments: Attachment[] = [];
  try {
    for (const f of d.dateien) {
      const blob = await readBlob(f.pathname);
      if (!blob || !DATEI.typen.includes(blob.contentType)) {
        return json({ error: `Die Datei «${f.name}» ist nicht mehr verfügbar. Bitte laden Sie sie erneut hoch.`, fields: { dateien: 'Datei fehlt' } }, 400);
      }
      attachments.push({ filename: f.pathname.slice(DATEI.ordner.length), content: blob.buf.toString('base64') });
    }
  } catch (e) {
    console.error('Anhänge konnten nicht gelesen werden', e);
    return json({ error: 'Die Dateien konnten nicht verarbeitet werden. Bitte versuchen Sie es erneut.' }, 502);
  }

  const idem = clientKey(request) + '-' + d.t;
  try {
    const intern = interneMail(d);
    await sendMail({ apiKey, from, to, replyTo: d.email.trim(), ...intern, attachments, idempotencyKey: `intern-${idem}` });
  } catch (e) {
    console.error('Interne Mail fehlgeschlagen', e);
    return json({ error: 'Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.' }, 502);
  }

  try {
    const best = bestaetigungsMail(d, { telefon: process.env.ANFRAGE_TELEFON, website: 'beostahlbau.ch' });
    await sendMail({ apiKey, from, to: d.email.trim(), ...best, idempotencyKey: `best-${idem}` });
  } catch (e) {
    // Die Anfrage ist bei BEO angekommen. Eine fehlende Bestätigung ist kein Fehler für die Person.
    console.error('Bestätigungsmail fehlgeschlagen', e);
  }

  // Dateien nach dem Versand sofort löschen
  if (d.dateien.length) {
    try {
      await del(d.dateien.map((f) => f.pathname));
    } catch (e) {
      console.error('Dateien konnten nicht gelöscht werden (Bereinigung übernimmt)', e);
    }
  }

  return json({ ok: true });
}
