import { Redis } from '@upstash/redis';

let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (redis) return redis;

  const url = import.meta.env.UPSTASH_REDIS_REST_URL;
  const token = import.meta.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    console.warn('[cache] UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN not set — caching disabled');
    return null;
  }

  redis = new Redis({ url, token });
  return redis;
}

/**
 * Optimistic cache wrapper.
 * Returns cached data immediately if available, and refreshes in the background
 * when the cache is stale (but not yet expired).
 *
 * TTL layout:
 *   [0 ————— freshTTL ————— staleTTL ————— ∞]
 *    └─ fresh (use cache) ─┘  └─ stale (use cache + bg refresh) ─┘  └─ miss (fetch)
 */
export async function cachedFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: {
    /** Seconds data is considered fresh (no refetch) */
    freshTTL?: number;
    /** Seconds data is kept in cache total (stale window = staleTTL - freshTTL) */
    staleTTL?: number;
  } = {}
): Promise<T> {
  const { freshTTL = 300, staleTTL = 3600 } = options; // 5 min fresh, 1 hour stale
  const r = getRedis();

  if (!r) {
    // No Redis — fall back to direct fetch
    return fetcher();
  }

  const cacheKey = `homepage:${key}`;
  const metaKey = `homepage:${key}:ts`;

  try {
    // Try to get cached data
    const [cached, timestamp] = await Promise.all([
      r.get<T>(cacheKey),
      r.get<number>(metaKey),
    ]);

    const now = Math.floor(Date.now() / 1000);

    if (cached !== null && timestamp !== null) {
      const age = now - timestamp;

      if (age < freshTTL) {
        // Fresh — return cached, no refetch
        return cached;
      }

      if (age < staleTTL) {
        // Stale — return cached immediately, refresh in background
        refreshInBackground(r, cacheKey, metaKey, staleTTL, fetcher);
        return cached;
      }
    }

    // Cache miss or expired — fetch synchronously
    const data = await fetcher();
    await storeInCache(r, cacheKey, metaKey, staleTTL, data);
    return data;

  } catch (err) {
    console.error(`[cache] Error for key "${key}":`, err);
    // On cache error, fall through to direct fetch
    return fetcher();
  }
}

async function storeInCache<T>(
  r: Redis,
  cacheKey: string,
  metaKey: string,
  staleTTL: number,
  data: T
): Promise<void> {
  const now = Math.floor(Date.now() / 1000);
  try {
    await Promise.all([
      r.set(cacheKey, data, { ex: staleTTL }),
      r.set(metaKey, now, { ex: staleTTL }),
    ]);
  } catch (err) {
    console.error(`[cache] Failed to store key "${cacheKey}":`, err);
  }
}

function refreshInBackground<T>(
  r: Redis,
  cacheKey: string,
  metaKey: string,
  staleTTL: number,
  fetcher: () => Promise<T>
): void {
  // Fire-and-forget background refresh
  fetcher()
    .then((data) => storeInCache(r, cacheKey, metaKey, staleTTL, data))
    .catch((err) => console.error(`[cache] Background refresh failed for "${cacheKey}":`, err));
}
