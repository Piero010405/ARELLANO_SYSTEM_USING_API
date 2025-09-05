"use client";

import { useAuth } from '@/hooks/useAuth';
import StoreMetricsChart from "@/components/arellano/StoreMetricsChart";
import StoreComplianceTarget from "@/components/arellano/StoreComplianceTarget";
import StoresTablesFaltantes from "@/components/arellano/StoresTableFaltantes";
import StoresTable from "@/components/arellano/StoresTable";

export default function ArelanoDashboard() {
  const { user } = useAuth();
  
  if (!user) {
    return null;
  }
  
  return (
    <>
      <div className="pb-5">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white/90">{user && <p>Bienvenido(a), {user.name} 👋</p>}</h1>
      </div>

      <div className="grid grid-cols-12 gap-4 lg:gap-6">
        <div className="contents lg:col-span-7 lg:flex lg:flex-col lg:gap-6">
          <div className="col-span-12 order-1 lg:order-1">
            <StoreMetricsChart username={user.name} />
          </div>

          <div className="col-span-12 order-4 lg:order-2">
            <StoresTable />
          </div>
        </div>

        <div className="contents lg:col-span-5 lg:flex lg:flex-col lg:gap-6">
          <div className="col-span-12 order-2 lg:order-1">
            <StoresTablesFaltantes />
          </div>

          <div className="col-span-12 order-3 lg:order-2">
            <StoreComplianceTarget />
          </div>
        </div>
      </div>
    </>
  )
};
