// src/services/internal/cacheService.ts
interface CacheEntry<T> {
  value: T;
  expires: number;
}

const cache = new Map<string, CacheEntry<unknown>>();

export const setCache = <T>(key: string, value: T, ttl = 60_000) => {
  cache.set(key, { value, expires: Date.now() + ttl });
};

export const getCache = <T>(key: string): T | null => {
  const data = cache.get(key) as CacheEntry<T> | undefined;
  if (!data) {
    return null;
  }
  if (Date.now() > data.expires) {
    cache.delete(key);
    return null;
  }
  return data.value;
};

export const clearCache = () => {
  cache.clear();
};
