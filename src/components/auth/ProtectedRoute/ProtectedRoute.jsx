import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import { ROUTES } from "../../../routes";

function ProtectedRoute({ children, role }) {
  const { userData } = useAuth();
  const userRole = localStorage.getItem("role");

  if (!userData) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (userRole !== role) {
    // لو دخل على Route مش بتاعه
    switch (userRole) {
      case "Admin":
        return <Navigate to={ROUTES.ADMIN1} />;
      case "Client":
        return <Navigate to={ROUTES.CLIENT} />;
      case "Trainer":
        return <Navigate to={ROUTES.TRAINER} />;
      case "Employee":
        return <Navigate to={ROUTES.EMPLOYEE} />;
      case "Partner":
        return <Navigate to={ROUTES.PARTNER} />;
      default:
        return <Navigate to={ROUTES.NOT_FOUND} />;
    }
  }

  return children;
}

export default ProtectedRoute;
