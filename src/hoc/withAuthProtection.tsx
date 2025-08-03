'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export const withAuthProtection = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const ProtectedComponent: React.FC<P> = (props) => {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.push("/login");
      }
    }, [loading, isAuthenticated, router]);

    if (loading || !isAuthenticated) {
      return <div className="text-white p-4">Cargando sesión...</div>;
    }

    return <Component {...props} />;
  };

  return ProtectedComponent;
};
