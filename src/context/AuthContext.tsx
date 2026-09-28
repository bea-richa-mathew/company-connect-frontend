import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { AuthContextType, User } from "../types";
import { mockUsers } from "../data/mockData";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface StoredAccount {
  user: User;
  password: string;
}

const storedAccounts: StoredAccount[] = [
  {
    user: mockUsers[0],
    password: "employee123",
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("company_user");

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser) as User;
    } catch {
      localStorage.removeItem("company_user");
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("company_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("company_user");
    }
  }, [user]);

  const login = (email: string, password: string): boolean => {
    const account = storedAccounts.find(
      (item) =>
        item.user.email.toLowerCase() === email.toLowerCase() &&
        item.password === password,
    );

    if (!account) {
      return false;
    }

    setUser(account.user);
    return true;
  };

  const register = (name: string, email: string, _password: string): boolean => {
    const alreadyExists = storedAccounts.some(
      (item) => item.user.email.toLowerCase() === email.toLowerCase(),
    );

    if (alreadyExists) {
      return false;
    }

    const newUser: User = {
      id: `EMP${Date.now()}`,
      name,
      email,
      phone: "",
      department: "Technology",
      designation: "Employee",
      role: "employee",
      joinDate: new Date().toISOString().split("T")[0],
      location: "Kerala",
    };

    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}