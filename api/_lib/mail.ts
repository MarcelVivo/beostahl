import { KUNDENTYPEN, type AnfrageDaten } from '../../shared/anfrage.js';
import { loesungLabel } from '../../shared/katalog.js';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const nl2br = (s: string) => esc(s).replace(/\r?\n/g, '<br>');

export interface Attachment {
  filename: string;
  content: string; // Base64
}

const kundentypLabel = (v: string) => KUNDENTYPEN.find((k) => k.value === v)?.label ?? v;
const loesungenText = (d: AnfrageDaten) => d.loesungen.map((s) => loesungLabel(s) ?? s).join(', ');
const mb = (b: number) => `${(b / 1024 / 1024).toFixed(1)} MB`;

/** Mail an BEO mit allen Angaben. */
export function interneMail(d: AnfrageDaten) {
  const rows: Array<[string, string]> = [
    ['Kundentyp', kundentypLabel(d.kundentyp)],
    ['Gewünschte Lösung', loesungenText(d)],
    ['Projektort', `${d.plz.trim()} ${d.ort.trim()}`],
    ['Ungefähre Masse', d.masse.trim() || '–'],
    ['Zeitraum', d.zeitraum || '–'],
    ['Budgetrahmen', d.budget || '–'],
    ['Name', d.name.trim()],
    ['Firma', d.firma.trim() || '–'],
    ['E-Mail', d.email.trim()],
    ['Telefon', d.telefon.trim()],
    ['Dateien', d.dateien.length ? d.dateien.map((f) => `${f.name} (${mb(f.size)})`).join(', ') : 'keine'],
  ];
  const subject = `Projektanfrage: ${loesungenText(d).slice(0, 80)} – ${d.plz.trim()} ${d.ort.trim()}`;
  const html = `<!doctype html><html lang="de-CH"><body style="font-family:Arial,sans-serif;color:#1E2226;line-height:1.5">
<h1 style="font-size:18px;letter-spacing:.06em;text-transform:uppercase">Neue Projektanfrage</h1>
<table cellpadding="6" style="border-collapse:collapse;font-size:14px">
${rows.map(([k, v]) => `<tr><td style="color:#3A3F45;vertical-align:top;white-space:nowrap"><b>${esc(k)}</b></td><td>${esc(v)}</td></tr>`).join('\n')}
</table>
<h2 style="font-size:15px;margin-top:24px">Beschreibung</h2>
<p style="font-size:14px">${nl2br(d.beschreibung.trim())}</p>
<p style="font-size:12px;color:#3A3F45;margin-top:32px">Gesendet über das Anfrageformular auf beostahlbau.ch. Antworten Sie direkt auf diese E-Mail, um die anfragende Person zu erreichen.</p>
</body></html>`;
  const text = [
    'NEUE PROJEKTANFRAGE',
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    'Beschreibung:',
    d.beschreibung.trim(),
  ].join('\n');
  return { subject, html, text };
}

/**
 * Bestätigung an die anfragende Person.
 * Enthält bewusst keine Freitexte aus dem Formular, damit das Formular
 * nicht zum Versand fremder Inhalte an beliebige Adressen missbraucht werden kann.
 */
export function bestaetigungsMail(d: AnfrageDaten, kontakt: { telefon?: string; website: string }) {
  const subject = 'Ihre Anfrage bei BEO Stahl & Glasbau';
  const auswahl = loesungenText(d);
  const text = [
    'Guten Tag',
    '',
    'Vielen Dank für Ihre Anfrage. Wir haben sie erhalten und melden uns persönlich bei Ihnen.',
    '',
    `Ihre Auswahl: ${auswahl}`,
    '',
    'Freundliche Grüsse',
    'BEO Stahl & Glasbau',
    [kontakt.telefon, kontakt.website].filter(Boolean).join(' · '),
    '',
    'Diese E-Mail wurde automatisch versendet. Falls Sie keine Anfrage gestellt haben, können Sie sie ignorieren.',
  ].join('\n');
  const html = `<!doctype html><html lang="de-CH"><body style="font-family:Arial,sans-serif;color:#1E2226;line-height:1.6;font-size:15px">
<p>Guten Tag</p>
<p>Vielen Dank für Ihre Anfrage. Wir haben sie erhalten und melden uns persönlich bei Ihnen.</p>
<p><b>Ihre Auswahl:</b> ${esc(auswahl)}</p>
<p>Freundliche Grüsse<br>BEO Stahl &amp; Glasbau<br>${esc([kontakt.telefon, kontakt.website].filter(Boolean).join(' · '))}</p>
<p style="font-size:12px;color:#3A3F45;border-top:1px solid #D9A55B;padding-top:12px;margin-top:24px">Diese E-Mail wurde automatisch versendet. Falls Sie keine Anfrage gestellt haben, können Sie sie ignorieren.</p>
</body></html>`;
  return { subject, html, text };
}

/** Versand über die Resend-API. Wirft bei Fehlern. */
export async function sendMail(opts: {
  apiKey: string;
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
  attachments?: Attachment[];
  idempotencyKey?: string;
}) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${opts.apiKey}`,
      'content-type': 'application/json',
      ...(opts.idempotencyKey ? { 'idempotency-key': opts.idempotencyKey } : {}),
    },
    body: JSON.stringify({
      from: opts.from,
      to: [opts.to],
      reply_to: opts.replyTo,
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
      attachments: opts.attachments?.length ? opts.attachments : undefined,
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Resend ${res.status}: ${body.slice(0, 300)}`);
  }
}
