// src/lib/api/endpoints.ts
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh-token',
    VALIDATE: '/api/auth/validate',
  },
  METRICAS: '/api/metricas',
  PROYECCIONES: '/api/proyecciones',
  STORES: {
    BASE: '/api/stores',
    FALTANTES: '/api/stores/stores_faltantes',
    PROYECTADAS: '/api/stores/stores_proyectadas',
    BY_ID: (id: string) => `/api/stores/${id}`,
  },
} as const;