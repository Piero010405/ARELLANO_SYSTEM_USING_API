"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

import { User } from "@/lib/types/auth";
import StoresTableProyectadas from "@/components/arellano/StoresTableProyectadas";
import { withAuthProtection } from "@/hoc/withAuthProtection";

function TodasMisTiendas() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const navigateToLogin = useCallback(() => {
    router.push("/login");
  }, [router]);

  useEffect(() => {
    const checkSession = async () => {
      const res = await fetch("/api/session");
      const data = await res.json();

      if (!res.ok || !data.user) {
        navigateToLogin();
      } else {
        setUser(data.user);
      }
    };
    checkSession();
  }, [navigateToLogin]);

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="pb-5">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white/90">{user && <p>📈 Mis Tiendas Proyectadas</p>}</h1>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6">
          <StoresTableProyectadas />
        </div>
      </div>
    </>
  )
}

export default withAuthProtection(TodasMisTiendas);