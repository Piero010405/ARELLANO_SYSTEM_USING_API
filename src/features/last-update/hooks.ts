// src/features/last-update/hooks.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { getLastUpdateE2E } from './api';
import { lastUpdateKeys } from './keys';
import { queryConfig } from '@/lib/react-query/config';

// Aqui se deberían de ir agregando los demás hooks para más archivos de actualización
export function useLastUpdateE2e() {
  return useQuery({
    queryKey: lastUpdateKeys.e2e,
    queryFn: getLastUpdateE2E,
    staleTime: queryConfig.metrics.staleTime,
  });
}
