// src/features/stores/api.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchJson } from '@/lib/api/fetcher';
import type { Store } from '@/lib/types/global';

export async function getStoresFaltantes(): Promise<Store[]> {
  return fetchJson<Store[]>('/api/stores/stores_faltantes', { cache: 'no-store' as any });
}

export async function getStoreByCodigo(codigo: number): Promise<Store> {
  return fetchJson<Store>(`/api/stores/${codigo}`, { cache: 'no-store' as any });
}

// DTO para proyección
export type CreateProjectionDto = {
  AS: string | number | null | undefined;
  PERIOD: string | number | null | undefined;
  SMS_ID: number;
  STATUS_PROYECTADO: string;
  RAZON: string;
  COMENTARIO: string;
  SE_ANULARA_PROXIMO_PERIODO: string | null;
  DETALLE_RAZON: string;
};

export async function createProjection(dto: CreateProjectionDto): Promise<{ ok: true }> {
  return fetchJson<{ ok: true }>('/api/proyecciones', {
    json: dto,
    // fetcher agrega headers y manejo de errores
  });
}
