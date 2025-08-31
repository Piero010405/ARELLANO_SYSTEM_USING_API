// src/features/stores/hooks.ts
'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createProjection, getStoreByCodigo, getStoresFaltantes, getStoresProyectadas} from './api';
import type { CreateProjectionDto } from './types';
import { storeKeys } from './keys';
import { metricsKeys } from '../metrics/keys';
import type { Store, Metrics } from '@/lib/api/types';
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
      // ---- Stores faltantes ----
      await qc.cancelQueries({ queryKey: storeKeys.missing() });
      const prevStores = qc.getQueryData<Store[]>(storeKeys.missing());

      if (prevStores) {
        qc.setQueryData<Store[]>(
          storeKeys.missing(),
          prevStores.filter(s => s.CODIGO !== dto.SMS_ID)
        );
      }

      // ---- Métricas ----
      await qc.cancelQueries({ queryKey: metricsKeys.all });
      const prevMetrics = qc.getQueryData<Metrics>(metricsKeys.all);

      if (prevMetrics) {
        qc.setQueryData<Metrics>(metricsKeys.all, {
          ...prevMetrics,
          tiendasFaltantes: prevMetrics.tiendasFaltantes - 1, // 👈 baja 1
        });
      }

      return { prevStores, prevMetrics };
    },

    // Rollback si falla
    onError: (_err, _dto, ctx) => {
      if (ctx?.prevStores) qc.setQueryData(storeKeys.missing(), ctx.prevStores);
      if (ctx?.prevMetrics) qc.setQueryData(metricsKeys.all, ctx.prevMetrics);
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
