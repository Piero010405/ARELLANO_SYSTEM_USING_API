// src/features/stores/keys.ts
export const storeKeys = {
  all: ['stores'] as const,
  missing: () => [...storeKeys.all, 'missing'] as const,
  byCodigo: (codigo: number) => [...storeKeys.all, 'byCodigo', codigo] as const,
};
