"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ArellanoLoader from "@/components/arellano/ArellanoLoader";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100 dark:bg-gray-900">
      <ArellanoLoader />
    </div>
  );

}
