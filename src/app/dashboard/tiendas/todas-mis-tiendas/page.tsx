"use client";
import { useAuth } from '@/hooks/useAuth';
import StoresTable from "@/components/arellano/StoresTable";

function TodasMisTiendas() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="pb-5">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white/90">{user && <p>🏪 Todas Mis Tiendas</p>}</h1>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6">
          <StoresTable pageSize={50}/>
        </div>
      </div>
    </>
  )
}

export default TodasMisTiendas;