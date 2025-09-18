// src/lib/api/endpoints.ts
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh-token',
    VALIDATE: '/api/auth/validate',
    REQUEST_RESET: 'api/auth/request-reset',
    RESET_PASSWORD: 'api/auth/reset-password',
  },
  METRICAS: '/api/metricas',
  PROYECCIONES: '/api/proyecciones',
  STORES: {
    BASE: '/api/stores',
    FALTANTES: '/api/stores/stores-faltantes',
    PROYECTADAS: '/api/stores/stores-proyectadas',
    BY_ID: (id: string) => `/api/stores/${id}`,
  },
} as const;

export const INTERNAL_API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh-token',
    VALIDATE: '/api/auth/validate',
    REQUEST_RESET: 'api/auth/request-reset',
    RESET_PASSWORD: 'api/auth/reset-password',
  },
  METRICAS: '/api/metricas',
  PROYECCIONES: '/api/proyecciones',
  SESSION: '/api/session',
  STORES: {
    BASE: '/api/stores',
    FALTANTES: '/api/stores/stores_faltantes',
    PROYECTADAS: '/api/stores/stores_proyectadas',
    BY_ID: (id: string | number) => `/api/stores/${id}`,
  },
} as const;