// src/lib/middleware/rateLimiting.ts
// Simple in-memory limiter (para desarrollo)

const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

export function rateLimiter(ip: string, limit = 20, windowMs = 60000): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  const diff = now - entry.timestamp;

  if (diff > windowMs) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (entry.count < limit) {
    entry.count++;
    return true;
  }

  return false;
}
