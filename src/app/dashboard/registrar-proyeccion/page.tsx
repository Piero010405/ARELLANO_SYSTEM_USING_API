"use client";
import { useAuth } from '@/hooks/useAuth';
import FormProyeccion from "@/components/arellano/FormProyeccion";

function MisTiendasFaltantes() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="pb-5">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white/90">{user && <p>📝 Registrar Proyección</p>}</h1>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6">
          <FormProyeccion />
        </div>
      </div>
    </>
  )
}

export default MisTiendasFaltantes;