// src/components/ProtectedRoute.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isTokenExpired, refreshToken } from "../authentication/helperAuths.js";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token || isTokenExpired(token)) {
        try {
          await refreshToken(); // Try refreshing the token
        } catch {
          return setIsAuthenticated(false);
        }
      }
      setIsAuthenticated(true);
    };

    checkAuth();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
