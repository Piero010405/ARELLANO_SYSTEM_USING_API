"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

// import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
// import StatisticsChart from "@/components/ecommerce/StatisticsChart
// import RecentOrders from "@/components/ecommerce/RecentOrders";
// import DemographicCard from "@/components/ecommerce/DemographicCard";

import { User } from "@/interfaces/user";
import StoresTablesFaltantes from "@/components/arellano/StoresTableFaltantes";
import StoresTable from "@/components/arellano/StoresTable";

export default function DashboardPage() {
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
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white/90">{user && <p>Bienvenido(a), {user.name} 👋</p>}</h1>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">

        <div className="col-span-12 xl:col-span-7 space-y-6">
          {/* <EcommerceMetrics /> */}
          <MonthlySalesChart username={user.name} />
          <StoresTable />
        </div>
        
        <div className="col-span-12 xl:col-span-5 flex flex-col gap-y-6">
          <StoresTablesFaltantes />
          <MonthlyTarget />
        </div>

        {/* <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div> */}

        {/* <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div> */}
      </div>
    </>
  )
}
