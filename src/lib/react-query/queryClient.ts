// src/lib/react-query/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // evita refetch agresivo y ahorra red
        staleTime: 60_000,           // 1 min "fresco"
        gcTime: 10 * 60_000,         // cache 10 min
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        retry: 2,
      },
      mutations: {
        retry: 1,
      },
    },
  });
}
