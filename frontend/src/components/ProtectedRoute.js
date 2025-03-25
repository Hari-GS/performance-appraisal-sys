import React from "react";
import { Navigate } from "react-router-dom";
import { getAuthToken } from "../helpers/axios_helpers";

const ProtectedRoute = ({ children }) => {
  const authToken = getAuthToken();

  return authToken ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
