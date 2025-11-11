// src/Routes/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../Hooks/Redux-Toolkit/ReduxHooks";


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector((state) => state.auth.user);
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
