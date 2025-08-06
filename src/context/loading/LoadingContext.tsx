// src/context/LoadingContext.tsx
"use client";

import { createContext, useContext, useState } from "react";
import LoadingOverlay from "@/components/arellano/LoadingOverlay";

interface LoadingContextType {
  show: () => void;
  hide: () => void;
}

const LoadingContext = createContext<LoadingContextType>({
  show: () => {},
  hide: () => {},
});

export const useLoading = () => useContext(LoadingContext);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  const show = () => setIsLoading(true);
  const hide = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ show, hide }}>
      {isLoading && <LoadingOverlay />}
      {children}
    </LoadingContext.Provider>
  );
}
