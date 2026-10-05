import { del, list } from '@vercel/blob';
import { DATEI } from '../shared/anfrage.js';
import { json } from './_lib/http.js';

/** Hochgeladen, aber nie abgeschickt: nach dieser Zeit löschen */
const MAX_ALTER_MS = 24 * 60 * 60 * 1000;

/**
 * Täglicher Cron-Job (vercel.json): löscht verwaiste Uploads.
 * Vercel sendet automatisch «Authorization: Bearer <CRON_SECRET>».
 */
export async function GET(request: Request): Promise<Response> {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return json({ error: 'Nicht erlaubt.' }, 401);
  }
  const grenze = Date.now() - MAX_ALTER_MS;
  let cursor: string | undefined;
  let geloescht = 0;
  do {
    const res = await list({ prefix: DATEI.ordner, cursor, limit: 1000 });
    const alt = res.blobs.filter((b) => new Date(b.uploadedAt).getTime() < grenze).map((b) => b.pathname);
    if (alt.length) {
      await del(alt);
      geloescht += alt.length;
    }
    cursor = res.hasMore ? res.cursor : undefined;
  } while (cursor);
  return json({ ok: true, geloescht });
}
