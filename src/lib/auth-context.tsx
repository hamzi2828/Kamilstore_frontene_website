"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { loginUser, getMe, logoutUser } from "@/app/(auth)/services/authApi";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = useCallback(async (token: string) => {
    try {
      const data = await getMe(token);
      setUser(data);
    } catch {
      localStorage.removeItem("ks_token");
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("ks_token");
    if (token) {
      fetchMe(token).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [fetchMe]);

  const login = async (email: string, password: string) => {
    const json = await loginUser(email, password);
    localStorage.setItem("ks_token", json.token);
    setUser(json.data as User);
  };

  const logout = () => {
    const token = localStorage.getItem("ks_token");
    if (token) logoutUser(token);
    localStorage.removeItem("ks_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
