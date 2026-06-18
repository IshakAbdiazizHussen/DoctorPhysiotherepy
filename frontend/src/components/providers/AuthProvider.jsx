"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { fetchCurrentUser, loginUser, registerUser } from "@/lib/api";

const AUTH_STORAGE_KEY = "doctorphysio-access-token";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function hydrateAuth() {
      const storedToken = window.localStorage.getItem(AUTH_STORAGE_KEY);

      if (!storedToken) {
        if (isMounted) {
          setIsAuthLoading(false);
        }
        return;
      }

      try {
        const user = await fetchCurrentUser(storedToken);
        if (!isMounted) {
          return;
        }
        setToken(storedToken);
        setCurrentUser(user);
      } catch {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
        if (!isMounted) {
          return;
        }
        setToken(null);
        setCurrentUser(null);
      } finally {
        if (isMounted) {
          setIsAuthLoading(false);
        }
      }
    }

    hydrateAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async ({ email, password }) => {
    const tokenPayload = await loginUser({ email, password });
    const nextToken = tokenPayload.access_token;
    const user = await fetchCurrentUser(nextToken);

    window.localStorage.setItem(AUTH_STORAGE_KEY, nextToken);
    setToken(nextToken);
    setCurrentUser(user);

    return user;
  };

  const register = async ({ full_name, email, password }) => {
    await registerUser({ full_name, email, password });
    return login({ email, password });
  };

  const logout = () => {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    setToken(null);
    setCurrentUser(null);
  };

  const value = {
    token,
    currentUser,
    isAuthLoading,
    isAuthenticated: Boolean(token && currentUser),
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
