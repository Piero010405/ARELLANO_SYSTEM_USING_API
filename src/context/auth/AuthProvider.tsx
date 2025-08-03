// src/contexts/auth/AuthProvider.tsx
"use client";

import { useState, useEffect, ReactNode } from "react";
import AuthContext, { AuthContextType } from "./AuthContext";
import { authService } from "@/services";
import { User } from "@/lib/types/auth";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    validateSession();
  }, []);

  const validateSession = async () => {
    try {
      const valid = await authService.validateSession();
      if (valid) {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          // Puedes también hacer un endpoint tipo `/api/auth/me` para devolver `User`
          // setUser(await authService.getProfile());
        }
      }
    } catch (error) {
      console.warn("No active session", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await authService.login({ email, password });
      localStorage.setItem("accessToken", res.accessToken);
      setUser(res.user);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("accessToken");
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
