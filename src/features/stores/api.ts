// src/features/stores/api.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CreateProjectionDto } from './types';
import { fetchJson } from '@/lib/api/fetcher';
import type { Store } from '@/lib/api/types';
import { API_ENDPOINTS, INTERNAL_API_ENDPOINTS } from '@/lib/api/endpoints';

export async function getStoresFaltantes(): Promise<Store[]> {
  return fetchJson<Store[]>(INTERNAL_API_ENDPOINTS.STORES.FALTANTES, { cache: 'no-store' as any });
}

export async function getStoresProyectadas(): Promise<Store[]> {
  return fetchJson<Store[]>(INTERNAL_API_ENDPOINTS.STORES.PROYECTADAS, { cache: 'no-store' as any });
}

export async function getStoreByCodigo(codigo: number): Promise<Store> {
  return fetchJson<Store>(INTERNAL_API_ENDPOINTS.STORES.BY_ID(codigo), { cache: 'no-store' as any });
}

export async function createProjection(dto: CreateProjectionDto): Promise<{ ok: true }> {
  return fetchJson<{ ok: true }>(API_ENDPOINTS.PROYECCIONES, {
    json: dto,
  });
}

export async function exportStoresExcel(): Promise<void> {
  const response = await fetch(
    INTERNAL_API_ENDPOINTS.STORES.EXPORT,
    {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    }
  );

  if (!response.ok) {
    let message = "Error al exportar las tiendas";
    try {
      const data = await response.json();
      message =
        data.error ||
        data.message ||
        message;
    } catch {
      // response no JSON
    }
    throw new Error(message);
  }

  const blob = await response.blob();

  const contentDisposition =
    response.headers.get("Content-Disposition");

  let fileName = "Arellano_Tiendas.xlsx";

  const fileNameMatch =
    contentDisposition?.match(
      /filename="?([^"]+)"?/i
    );

  if (fileNameMatch?.[1]) {
    fileName = fileNameMatch[1];
  }

  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = fileName;

  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.URL.revokeObjectURL(url);
}