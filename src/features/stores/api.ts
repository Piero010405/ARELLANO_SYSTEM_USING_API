// src/features/stores/api.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CreateProjectionDto } from './types';
import { fetchJson } from '@/lib/api/fetcher';
import type { Store } from '@/lib/types/global';
import { API_ENDPOINTS, INTERNAL_API_ENDPOINTS } from '@/lib/api/endpoints';

export async function getStoresFaltantes(): Promise<Store[]> {
  return fetchJson<Store[]>(INTERNAL_API_ENDPOINTS.STORES.FALTANTES, { cache: 'no-store' as any });
}

export async function getStoreByCodigo(codigo: number): Promise<Store> {
  return fetchJson<Store>(INTERNAL_API_ENDPOINTS.STORES.BY_ID(codigo), { cache: 'no-store' as any });
}

export async function createProjection(dto: CreateProjectionDto): Promise<{ ok: true }> {
  return fetchJson<{ ok: true }>(API_ENDPOINTS.PROYECCIONES, {
    json: dto,
  });
}
