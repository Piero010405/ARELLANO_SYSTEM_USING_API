"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import ArellanoLoader from "@/components/arellano/ArellanoLoader";

export default function Home() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.replace("/dashboard");
      } else {
        router.replace("/login");
      }
    }
  }, [isAuthenticated, loading, router]);

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100 dark:bg-gray-900">
      <ArellanoLoader />
    </div>
  );

}
