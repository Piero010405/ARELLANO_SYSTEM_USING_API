// src/services/api/metricasService.ts
import axiosBackend from "@/lib/api/client";
import { Metrics } from "@/lib/types/global";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

export const metricasService = {
  async getMetrics(): Promise<Metrics> {
    const response = await axiosBackend.get(API_ENDPOINTS.METRICAS);
  return response.data;
  },
};