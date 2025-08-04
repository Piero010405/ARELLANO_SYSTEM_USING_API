// src/services/api/authService.ts
import axiosBackend  from "@/lib/api/client";
import { LoginCredentials, AuthResponse } from "@/lib/types/auth";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await axiosBackend.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
        return response.data;
    },

    async logout(accessToken?: string): Promise<void> {
        await axiosBackend.post(API_ENDPOINTS.AUTH.LOGOUT, null, {
            headers: {
                ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
            },
        });
    },

    async refreshToken(accessToken?: string): Promise<{ accessToken: string }> {
        const response = await axiosBackend.get(API_ENDPOINTS.AUTH.REFRESH, {
            headers: {
                ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
            },
        });
        return response.data;
    },

    async validateSession(accessToken?: string): Promise<{ user: AuthResponse["user"] } | null> {
        try {
            const res = await axiosBackend.get(API_ENDPOINTS.AUTH.VALIDATE, {
                headers: {
                    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
                },
            });
            
            if (res.status === 200 && res.data.user) {
                return { user: res.data.user };
            }
            return null;
        } catch {
            return null;
        }
    },
};
