// src/services/api/lastUpdateService.ts
import axiosBackend from "@/lib/api/client";
import { LastUpdateFile } from "@/lib/api/types";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

export const lastUpdateService = {
  async getLastUpdateE2e(accessToken?: string): Promise<LastUpdateFile> {
    const response = await axiosBackend.get(API_ENDPOINTS.LAST_UPDATE.E2E, {
      headers: {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    });
    return response.data;
  },
};