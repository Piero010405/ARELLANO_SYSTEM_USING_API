// src/services/api/storesService.ts
import axiosBackend from "@/lib/api/client";
import { Store } from "@/lib/api/types";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

export const storesService = {
  async getStores(accessToken?: string, pageSize = 10, offset = 0): Promise<{ stores: Store[]; total: number }> {
    const response = await axiosBackend.get(`${API_ENDPOINTS.STORES.BASE}?pageSize=${pageSize}&offset=${offset}`, {
      headers: {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    });
    return response.data;
  },

  async getAllStores(accessToken?: string): Promise<Store[]> {
    const PAGE_SIZE = 10000;
    let offset = 0;
    let total = 0;

    const stores: Store[] = [];
    do {
      const page = await storesService.getStores(
        accessToken,
        PAGE_SIZE,
        offset
      );
      const currentStores = page.stores || [];
      stores.push(...currentStores);
      total = page.total || stores.length;
      if (currentStores.length === 0) {
        break;
      }
      offset += currentStores.length;
    } while (stores.length < total);
    return stores;
  },

  async getStoreById(codigo: string, accessToken?: string): Promise<Store> {
    const response = await axiosBackend.get(API_ENDPOINTS.STORES.BY_ID(codigo), {
      headers: {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    });
    return response.data;
  },

  async getStoresFaltantes(accessToken?: string): Promise<Store[]> {
    const response = await axiosBackend.get(API_ENDPOINTS.STORES.FALTANTES, {
      headers: {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    });
    return response.data;
  },

  async getStoresProyectadas(accessToken?: string): Promise<Store[]> {
    const response = await axiosBackend.get(API_ENDPOINTS.STORES.PROYECTADAS, {
      headers: {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    });
    return response.data;
  },
};

