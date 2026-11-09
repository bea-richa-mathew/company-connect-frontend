
/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import api from "../services/api";

export type Role = "user" | "employee";

interface EmployeeDetails {
  department: string;
  designation: string;
  phone: string;
}

interface AuthContextValue {
  isAuthenticated: boolean;
  loading: boolean;
  isLoading: boolean;
  userRole: Role | null;
  login: (email: string, password: string) => Promise<Role>;
  register: (
    name: string,
    email: string,
    password: string,
    role: Role,
    employeeDetails?: EmployeeDetails
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => localStorage.getItem("employeeToken") !== null
  );

  const [userRole, setUserRole] = useState<Role | null>(() => {
    const savedRole = localStorage.getItem("employeeRole");

    return savedRole === "employee" || savedRole === "user"
      ? savedRole
      : null;
  });

  const [loading] = useState<boolean>(false);

  // Log in an existing user or employee.
  const login = async (
    email: string,
    password: string
  ): Promise<Role> => {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const result = response.data.data ?? response.data;

    const loggedUser = result.user as {
      role: string;
    };

    const token = result.token as string | undefined;

    if (
      loggedUser.role !== "employee" &&
      loggedUser.role !== "user"
    ) {
      throw new Error(
        "Admin accounts must use the separate admin portal."
      );
    }

    if (!token) {
      throw new Error("Login failed: authentication token is missing.");
    }

    const role: Role = loggedUser.role;

    localStorage.setItem("employeeToken", token);
    localStorage.setItem("employeeRole", role);

    setUserRole(role);
    setIsAuthenticated(true);

    return role;
  };

  // Register a new user or employee.
  const register = async (
    name: string,
    email: string,
    password: string,
    role: Role,
    employeeDetails?: EmployeeDetails
  ): Promise<void> => {
    if (
      role === "employee" &&
      (!employeeDetails?.department.trim() ||
        !employeeDetails?.designation.trim() ||
        !employeeDetails?.phone.trim())
    ) {
      throw new Error(
        "Department, designation, and phone number are required for employees."
      );
    }

    const requestBody = {
      name,
      email,
      password,
      role,
      ...(role === "employee"
        ? {
            department: employeeDetails!.department.trim(),
            designation: employeeDetails!.designation.trim(),
            phone: employeeDetails!.phone.trim(),
          }
        : {}),
    };

    const response = await api.post("/auth/register", requestBody);

    const result = response.data.data ?? response.data;

    const registeredUser = result.user as {
      role: string;
    };

    const token = result.token as string | undefined;

    if (
      registeredUser.role !== "employee" &&
      registeredUser.role !== "user"
    ) {
      throw new Error("Invalid account role.");
    }

    if (registeredUser.role !== role) {
      throw new Error(
        "The registered account role does not match the selected role."
      );
    }

    if (!token) {
      throw new Error(
        "Registration succeeded, but the authentication token is missing."
      );
    }

    const registeredRole: Role = registeredUser.role;

    localStorage.setItem("employeeToken", token);
    localStorage.setItem("employeeRole", registeredRole);

    setUserRole(registeredRole);
    setIsAuthenticated(true);
  };

  // Log out and clear the saved authentication details.
  const logout = (): void => {
    localStorage.removeItem("employeeToken");
    localStorage.removeItem("employeeRole");

    setUserRole(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        isLoading: loading,
        userRole,
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
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
