// src/features/last-update/api.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchJson } from '@/lib/api/fetcher';
import { INTERNAL_API_ENDPOINTS } from '@/lib/api/endpoints';
import type { LastUpdateFile } from '@/lib/api/types';

export async function getLastUpdateE2E(): Promise<LastUpdateFile> {
  return fetchJson<LastUpdateFile>(INTERNAL_API_ENDPOINTS.LAST_UPDATE.E2E, { cache: 'no-store' as any });
}
