"use client";

import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import StoresTablesFaltantes from "@/components/arellano/StoresTableFaltantes";
import StoresTable from "@/components/arellano/StoresTable";
import { useAuth } from '@/hooks/useAuth';

function DashboardPage() {
  const { user } = useAuth();
  
  if (!user) {
    return null;
  }
  
  return (
    <>
      <div className="pb-5">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white/90">{user && <p>Bienvenido(a), {user.name} 👋</p>}</h1>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">

        <div className="col-span-12 xl:col-span-7 space-y-6">
          <MonthlySalesChart username={user.name} />
          <StoresTable />
        </div>
        
        <div className="col-span-12 xl:col-span-5 flex flex-col gap-y-6">
          <StoresTablesFaltantes />
          <MonthlyTarget />
        </div>
      </div>
    </>
  )
}

export default DashboardPage;
