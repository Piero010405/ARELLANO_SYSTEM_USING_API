// src/features/stores/hooks.ts
'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createProjection, getStoreByCodigo, getStoresFaltantes, getStoresProyectadas} from './api';
import type { CreateProjectionDto } from './types';
import { storeKeys } from './keys';
import { metricsKeys } from '../metrics/keys';
import type { Store } from '@/lib/api/types';
import { queryConfig } from '@/lib/react-query/config';
import { businessLogicConfig } from '@/lib/react-query/config';

export function useStoresFaltantes() {
  return useQuery({
    queryKey: storeKeys.missing(),
    queryFn: getStoresFaltantes,
    staleTime: queryConfig.stores.staleTime,
  });
}

export function useStoresProyectadas() {
  return useQuery({
    queryKey: storeKeys.proyectadas(),
    queryFn: getStoresProyectadas,
    staleTime: queryConfig.stores.staleTime,
  });
}

export function useStoreByCodigo(codigo?: number) {
  return useQuery({
    queryKey: codigo ? storeKeys.byCodigo(codigo) : ['noop'],
    queryFn: () => getStoreByCodigo(codigo as number),
    enabled: !!codigo,
    staleTime: queryConfig.stores.staleTime,
  });
}

export function useCreateProjectionWithOptimism() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateProjectionDto) => createProjection(dto),

    // * Optimistic update: quita la tienda faltante de la cache inmediatamente
    onMutate: async (dto) => {
      await qc.cancelQueries({ queryKey: storeKeys.missing() });
      const prev = qc.getQueryData<Store[]>(storeKeys.missing());

      if (prev) {
        qc.setQueryData<Store[]>(
          storeKeys.missing(),
          prev.filter(s => s.CODIGO !== dto.SMS_ID)
        );
      }

      return { prev };
    },

    // Rollback si falla
    onError: (_err, _dto, ctx) => {
      if (ctx?.prev) qc.setQueryData(storeKeys.missing(), ctx.prev);
    },

    // Sincronización real con servidor cuando el SP termina (~7s) => maxTimeOutToExecuteProcedure
    onSettled: () => {
      // Opción simple: invalidar con retardo (7s + margen)
      setTimeout(() => {
        qc.invalidateQueries({ queryKey: storeKeys.missing() });
        qc.invalidateQueries({ queryKey: metricsKeys.all });
      }, businessLogicConfig.indicadoresModule.maxTimeOutToExecuteProcedure);
    },
  });
}
