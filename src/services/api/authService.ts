// src/services/api/authService.ts
import axiosBackend  from "@/lib/api/client";
import { LoginCredentials, AuthResponse } from "@/lib/types/auth";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await axiosBackend.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
        return response.data;
    },

    async logout(): Promise<void> {
        await axiosBackend.post(API_ENDPOINTS.AUTH.LOGOUT);
    },

    async refreshToken(): Promise<{ accessToken: string }> {
        const response = await axiosBackend.get(API_ENDPOINTS.AUTH.REFRESH);
        return response.data;
    },

    async validateSession(): Promise<boolean> {
        try {
            const res = await axiosBackend.get(API_ENDPOINTS.AUTH.VALIDATE);
            return res.status === 200;
        } catch {
            return false;
        }
    },
};
