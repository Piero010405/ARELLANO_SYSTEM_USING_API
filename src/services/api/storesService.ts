// src/services/api/storesService.ts
import axiosBackend from "@/lib/api/client";
import { Store } from "@/lib/types/global";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

export const storesService = {
  async getStores(): Promise<Store[]> {
    const response = await axiosBackend.get(API_ENDPOINTS.STORES.BASE);
    return response.data;
  },

  async getStoreById(codigo: string): Promise<Store> {
    const response = await axiosBackend.get(API_ENDPOINTS.STORES.BY_ID(codigo));
    return response.data;
  },

  async getStoresFaltantes(): Promise<Store[]> {
    const response = await axiosBackend.get(API_ENDPOINTS.STORES.FALTANTES);
    return response.data;
  },

  async getStoresProyectadas(): Promise<Store[]> {
    const response = await axiosBackend.get(API_ENDPOINTS.STORES.PROYECTADAS);
    return response.data;
  },
};

