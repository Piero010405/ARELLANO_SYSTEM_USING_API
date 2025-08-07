import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import { SidebarProvider } from "@/context/sidebar/SidebarContext";
import { ThemeProvider } from "@/context/theme/ThemeContext";
import { AuthProvider } from "@/context/auth/AuthProvider";
import { LoadingProvider } from "@/context/loading/LoadingContext";

const outfit = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ARELLANO - AUDITORIA",
  description: "Sistema Interno de Auditoria - Arellano",
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} dark:bg-gray-900`}>
        <ThemeProvider>
          <AuthProvider>
              <LoadingProvider>
                <SidebarProvider>{children}</SidebarProvider>
              </LoadingProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
