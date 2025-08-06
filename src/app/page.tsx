'use client'
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import { LoginButton } from "@/components/arellano/LoginButton";

function Home(){
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  return(
    <>
      <div ref={headerRef} className="flex items-center justify-between px-10 py-4 sticky top-0 bg-white border-gray-200 z-99999 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
          <LoginButton />
          <div className="flex-grow flex justify-center">
            <Image
              src="/images/logo/LOGO-ARELLANO-ICON.png"
              alt="Logo"
              width={50}
              height={50}
              className="rounded-sm"
            />
          </div>
          <ThemeToggleButton />
      </div>
      <div className="flex justify-center items-center flex-col w-full h-screen gap-y-5" style={{ marginTop: `-${headerHeight}px` }}>
        <Image
          className="dark:hidden"
          src="/images/logo/ARELLANO-WHITE-CUT-DIM.png"
          alt="Logo"
          width={400}
          height={120}
        />
        <Image
          className="hidden dark:block"
          src="/images/logo/LOGO-ARELLANO-BLACK.png"
          alt="Logo"
          width={450}
          height={120}
        />
        <a href="/login" className="text-gray-500 text-2xl transition-colors bg-white border border-gray-200 rounded-md px-3 py-1 hover:text-dark-900 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white">Iniciar Sesión</a>
      </div>
    </>
  )
}

export default Home