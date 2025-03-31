'use client'
import UserAddressCard from "@/components/user-profile/UserAddressCard";
import UserInfoCard from "@/components/user-profile/UserInfoCard";
import UserMetaCard from "@/components/user-profile/UserMetaCard";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/interfaces/user";


export default function Profile() {
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
        <div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
            Mi Perfil
            </h3>
            <div className="space-y-6">
            <UserMetaCard user={user} />
            <UserInfoCard />
            <UserAddressCard />
            </div>
        </div>
        </div>
    );
}
