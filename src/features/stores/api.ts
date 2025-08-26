// src/features/stores/api.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CreateProjectionDto } from './types';
import { fetchJson } from '@/lib/api/fetcher';
import type { Store } from '@/lib/types/global';

export async function getStoresFaltantes(): Promise<Store[]> {
  return fetchJson<Store[]>('/api/stores/stores_faltantes', { cache: 'no-store' as any });
}

export async function getStoreByCodigo(codigo: number): Promise<Store> {
  return fetchJson<Store>(`/api/stores/${codigo}`, { cache: 'no-store' as any });
}

export async function createProjection(dto: CreateProjectionDto): Promise<{ ok: true }> {
  return fetchJson<{ ok: true }>('/api/proyecciones', {
    json: dto,
  });
}
