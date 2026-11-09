import type { ReactNode } from "react";
import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import { useAuth, type Role } from "../context/AuthContext";

interface ProtectedRouteProps {
  allowedRoles?: Role[];
  children?: ReactNode;
}

export default function ProtectedRoute({
  allowedRoles = ["employee"],
  children,
}: ProtectedRouteProps) {
  const { isAuthenticated, userRole, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08090d] text-gray-300">
        Checking your account...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  // A user without a valid employee role cannot access employee pages.
  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}
