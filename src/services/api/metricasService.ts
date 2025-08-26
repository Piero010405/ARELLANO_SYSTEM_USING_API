// src/services/api/metricasService.ts
import axiosBackend from "@/lib/api/client";
import { Metrics } from "@/lib/api/types";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

export const metricasService = {
  async getMetrics(accessToken?: string): Promise<Metrics> {
    const response = await axiosBackend.get(API_ENDPOINTS.METRICAS, {
      headers: {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    });
    return response.data;
  },
};