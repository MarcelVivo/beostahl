import { createHash } from 'node:crypto';

export const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

/** Anfragen nur von der eigenen Website annehmen (Origin muss zum Host passen). */
export function sameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/** IP-Adresse nur gehasht verwenden, nie im Klartext speichern. */
export function clientKey(request: Request): string {
  const ip =
    request.headers.get('x-real-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unbekannt';
  const salt = process.env.RATE_LIMIT_SALT ?? 'beo-stahl-glasbau';
  return createHash('sha256').update(salt + ip).digest('hex').slice(0, 32);
}
