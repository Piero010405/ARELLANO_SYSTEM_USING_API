// src/services/api/proyeccionesService.ts
import axiosBackend from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse } from "@/lib/types/global";

export const proyeccionesService = {
  async postProyeccion(payload: Record<string, unknown>): Promise<ApiResponse> {
    const response = await axiosBackend.post(API_ENDPOINTS.PROYECCIONES, payload);
    return response.data;
  },
};
