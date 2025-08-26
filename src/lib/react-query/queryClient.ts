// src/lib/react-query/queryClient.ts
import { QueryClient } from '@tanstack/react-query';
import { queryConfig } from './config';

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // evita refetch agresivo y ahorra red
        staleTime: queryConfig.default.staleTime,    // => min "fresco"
        gcTime: queryConfig.default.gcTime,         // => cache min
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        retry: queryConfig.default.retry,
      },
      mutations: {
        retry: queryConfig.mutation.retry,
      },
    },
  });
}
