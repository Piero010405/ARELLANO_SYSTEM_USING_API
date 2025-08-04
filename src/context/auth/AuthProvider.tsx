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
      const result = await authService.validateSession();
      if (result?.user) {
        setUser(result.user);
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
      const response = await authService.login({ email, password });
      if (response.user) {
        setUser(response.user);
      }
    } catch (error) {
      throw error;
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

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};