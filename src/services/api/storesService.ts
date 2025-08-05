// src/services/api/storesService.ts
import axiosBackend from "@/lib/api/client";
import { Store } from "@/lib/types/global";
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

