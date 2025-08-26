// src/features/metrics/api.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchJson } from '@/lib/api/fetcher';
import { INTERNAL_API_ENDPOINTS } from '@/lib/api/endpoints';
import type { Metrics } from '@/lib/types/global';

export async function getMetrics(): Promise<Metrics> {
  return fetchJson<Metrics>(INTERNAL_API_ENDPOINTS.METRICAS, { cache: 'no-store' as any });
}
