import { useEffect, useState } from "react";

import { AuthContext } from "./authContext.js";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Check current authenticated user
  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const response = await fetch("/api/auth/me");

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Unable to check current user:", error);

        setUser(null);
      } finally {
        setIsAuthLoading(false);
      }
    };

    checkCurrentUser();
  }, []);

  // Register
  const register = async (email, password) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    setUser(data.user);

    return data;
  };

  // Log in
  const login = async (email, password, rememberMe) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        rememberMe,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    setUser(data.user);

    return data;
  };

  // Log out
  const logout = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    setUser(null);

    return data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthLoading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
