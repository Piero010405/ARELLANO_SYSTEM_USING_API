// src/lib/react-query/provider.tsx
'use client';

import { PropsWithChildren, useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { makeQueryClient } from './queryClient';

export function QueryProvider({ children }: PropsWithChildren) {
  const [client] = useState(makeQueryClient); // 1 instancia por sesión cliente
  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
