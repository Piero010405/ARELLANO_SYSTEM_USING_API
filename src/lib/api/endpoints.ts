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
    FALTANTES: '/api/stores/stores-faltantes',
    PROYECTADAS: '/api/stores/stores-proyectadas',
    BY_ID: (id: string) => `/api/stores/${id}`,
  },
  LAST_UPDATE: {
    E2E: '/api/last-update/e2e',
  },
} as const;

export const INTERNAL_API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh-token',
    VALIDATE: '/api/auth/validate',
  },
  METRICAS: '/api/metricas',
  PROYECCIONES: '/api/proyecciones',
  SESSION: '/api/session',
  STORES: {
    BASE: '/api/stores',
    FALTANTES: '/api/stores/stores_faltantes',
    PROYECTADAS: '/api/stores/stores_proyectadas',
    EXPORT: '/api/stores/export',
    BY_ID: (id: string | number) => `/api/stores/${id}`,
  },
  LAST_UPDATE: {
    E2E: '/api/last-update/e2e',
  }
} as const;