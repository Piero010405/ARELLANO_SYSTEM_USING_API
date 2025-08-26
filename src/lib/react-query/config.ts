// src/lib/react-query/config.ts
export const queryConfig = {
  default: {
    staleTime: 60_000,
    gcTime: 10 * 60_000,
    retry: 2,
  },
  mutation: {
    retry: 1,
  },
  metrics: {
    staleTime: 15_000,
  },
  stores: {
    staleTime: 60_000,
  },
};

export const fetchConfig = {
  timeoutMs: 20_000,
};

export const businessLogicConfig = {
  indicadoresModule: {
    maxTimeOutToExecuteProcedure: 8_000,
  }
};
