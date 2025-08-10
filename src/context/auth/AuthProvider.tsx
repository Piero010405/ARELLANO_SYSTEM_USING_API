// src/contexts/auth/AuthProvider.tsx
"use client";

import { useState, ReactNode } from "react";
import AuthContext, { AuthContextType } from "./AuthContext";
import LoadingOverlay from "@/components/arellano/LoadingOverlay";
import { User } from "@/lib/types/auth";

interface AuthProviderProps {
  children: ReactNode;
  initialUser?: User | null;
}

export const AuthProvider = ({ children, initialUser = null }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(initialUser);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Error de login");
      }

      // Esperar a que iron-session esté lista
      const res = await fetch("/api/auth/validate", {
        credentials: "include",
      });
      const text = await res.text();
      
      let dataValidate;
      try {
        dataValidate = JSON.parse(text);
      } catch (err) {
        console.error("Error al parsear la respuesta:", err);
        console.error("No se pudo parsear la respuesta:", text);
        throw new Error("Respuesta inválida del backend");
      }

      if (res.ok && dataValidate.user) {
        setUser(dataValidate.user);
      } else {
        throw new Error("No se pudo autenticar sesión");
      }
    
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Error de logout");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      window.location.href = "/login";
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading && <LoadingOverlay />}
      {children}
    </AuthContext.Provider>
  );
};