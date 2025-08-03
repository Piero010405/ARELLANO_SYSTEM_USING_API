// src/services/api/authService.ts
import apiClient from "@/lib/api/client";
import { LoginCredentials, AuthResponse } from "@/lib/types/auth";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
        return response.data;
    },

    async logout(): Promise<void> {
        await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    },

    async refreshToken(): Promise<{ accessToken: string }> {
        const response = await apiClient.get(API_ENDPOINTS.AUTH.REFRESH);
        return response.data;
    },

    async validateSession(): Promise<boolean> {
        try {
            const res = await apiClient.get(API_ENDPOINTS.AUTH.VALIDATE);
            return res.status === 200;
        } catch {
            return false;
        }
    },
};
