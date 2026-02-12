import type React from "react";
import { Navigate, useLocation } from "react-router";

type Props = { children: React.ReactNode };
export const RequireAuth = ({children}:Props) => {
  const token = localStorage.getItem("token"); // o "access_token"
  const location = useLocation();

  if (!token) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
