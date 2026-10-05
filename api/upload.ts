import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { DATEI } from '../shared/anfrage.js';
import { clientKey, json, sameOrigin } from './_lib/http.js';
import { rateLimit } from './_lib/ratelimit.js';

/**
 * Gibt dem Browser ein kurzlebiges Token, um eine Datei direkt in den
 * privaten Blob-Speicher hochzuladen. Die Datei läuft nicht durch diese Funktion,
 * dadurch gilt das 4.5-MB-Limit der Vercel Functions nicht.
 */
export async function POST(request: Request): Promise<Response> {
  if (!sameOrigin(request)) return json({ error: 'Nicht erlaubt.' }, 403);
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('BLOB_READ_WRITE_TOKEN fehlt');
    return json({ error: 'Der Upload ist zurzeit nicht verfügbar.' }, 500);
  }
  let body: HandleUploadBody;
  try {
    body = (await request.json()) as HandleUploadBody;
  } catch {
    return json({ error: 'Ungültige Anfrage.' }, 400);
  }
  if (body.type === 'blob.generate-client-token' && !(await rateLimit('upload', clientKey(request), 30, 600))) {
    return json({ error: 'Zu viele Uploads. Bitte versuchen Sie es später erneut.' }, 429);
  }
  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        const endung = pathname.toLowerCase().slice(pathname.lastIndexOf('.'));
        if (!pathname.startsWith(DATEI.ordner) || pathname.includes('..') || !DATEI.endungen.includes(endung)) {
          throw new Error('Ungültiger Dateipfad');
        }
        return {
          allowedContentTypes: DATEI.typen,
          maximumSizeInBytes: DATEI.maxBytes,
          addRandomSuffix: true,
          validUntil: Date.now() + 10 * 60 * 1000,
        };
      },
    });
    return json(result);
  } catch (e) {
    console.error('Upload-Token abgelehnt', e);
    return json({ error: 'Der Upload wurde abgelehnt.' }, 400);
  }
}
