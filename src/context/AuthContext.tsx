/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import api from "../services/api";
import type { User } from "../types";

interface AuthContextValue {
  user: User | null;
  loading: boolean;

  login: (
    email: string,
    password: string
  ) => Promise<void>;

  register: (
    name: string,
    email: string,
    password: string,
    role: "user" | "employee"
  ) => Promise<void>;

  logout: () => void;
}

const AuthContext =
  createContext<AuthContextValue | undefined>(
    undefined
  );

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(() => localStorage.getItem(
        "employeeToken"
      ) !== null
    );

  useEffect(() => {
    const token =
      localStorage.getItem("employeeToken");

    if (!token) {
      setTimeout(() => setLoading(false), 0);
      return;
    }

    const checkUser = async () => {
      try {
        const response =
          await api.get("/auth/me");

        const currentUser =
          (response.data.data ?? response.data.user ?? response.data) as User;

        if (
          currentUser.role !== "employee" &&
          currentUser.role !== "user"
        ) {
          throw new Error(
            "Admin accounts must use the separate admin portal."
          );
        }

        setUser(currentUser);

        localStorage.setItem(
          "company_portal_user",
          JSON.stringify(currentUser)
        );
      } catch {
        localStorage.removeItem(
          "employeeToken"
        );

        localStorage.removeItem(
          "company_portal_user"
        );

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<void> => {
    const response =
      await api.post("/auth/login", {
        email,
        password,
      });

    const {
      token,
      user: loggedUser,
    } = (response.data.data ?? response.data) as {
      token: string;
      user: User;
    };

    if (
      loggedUser.role !== "employee" &&
      loggedUser.role !== "user"
    ) {
      throw new Error(
        "Admin accounts must use the separate admin portal."
      );
    }

    localStorage.setItem(
      "employeeToken",
      token
    );

    localStorage.setItem(
      "company_portal_user",
      JSON.stringify(loggedUser)
    );

    setUser(loggedUser);
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: "user" | "employee"
  ): Promise<void> => {
    const response =
      await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

    const {
      token,
      user: registeredUser,
    } = (response.data.data ?? response.data) as {
      token: string;
      user: User;
    };

    if (
      registeredUser.role !== "employee" &&
      registeredUser.role !== "user"
    ) {
      throw new Error(
        "Invalid account role."
      );
    }

    localStorage.setItem(
      "employeeToken",
      token
    );

    localStorage.setItem(
      "company_portal_user",
      JSON.stringify(registeredUser)
    );

    setUser(registeredUser);
  };

  const logout = (): void => {
    localStorage.removeItem(
      "employeeToken"
    );

    localStorage.removeItem(
      "company_portal_user"
    );

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context =
    useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}
