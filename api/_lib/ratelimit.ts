/**
 * Einfaches Rate-Limit (feste Zeitfenster).
 * Mit Upstash Redis (über den Vercel Marketplace) gilt das Limit für alle Server-Instanzen.
 * Ohne Redis greift ein Speicher pro Instanz, der nur eingeschränkt schützt.
 */
const memory = new Map<string, { count: number; reset: number }>();

function redisConfig() {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

/** true = Anfrage erlaubt */
export async function rateLimit(scope: string, key: string, max: number, windowSec: number): Promise<boolean> {
  const id = `rl:${scope}:${key}`;
  const redis = redisConfig();
  if (redis) {
    try {
      const res = await fetch(`${redis.url}/pipeline`, {
        method: 'POST',
        headers: { authorization: `Bearer ${redis.token}`, 'content-type': 'application/json' },
        body: JSON.stringify([
          ['INCR', id],
          ['EXPIRE', id, String(windowSec), 'NX'],
        ]),
      });
      if (res.ok) {
        const data = (await res.json()) as Array<{ result?: number }>;
        return (data[0]?.result ?? 0) <= max;
      }
      console.error('Rate-Limit: Redis antwortet mit', res.status);
    } catch (e) {
      console.error('Rate-Limit: Redis nicht erreichbar', e);
    }
  }
  const now = Date.now();
  const entry = memory.get(id);
  if (!entry || entry.reset < now) {
    memory.set(id, { count: 1, reset: now + windowSec * 1000 });
    return true;
  }
  entry.count += 1;
  return entry.count <= max;
}
