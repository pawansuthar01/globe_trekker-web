import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // In a real app, you would check if the user is authenticated
  // For now, we'll just use a mock isAuthenticated value
  const isAuthenticated = true;

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
