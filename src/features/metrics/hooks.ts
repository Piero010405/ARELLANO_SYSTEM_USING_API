// src/features/metrics/hooks.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { getMetrics } from './api';
import { metricsKeys } from './keys';
import { queryConfig } from '@/lib/react-query/config';

export function useMetrics() {
  return useQuery({
    queryKey: metricsKeys.all,
    queryFn: getMetrics,
    staleTime: queryConfig.metrics.staleTime,
  });
}
