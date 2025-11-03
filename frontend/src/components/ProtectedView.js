// ProtectedView.js
import React from "react";
import { useAuth } from "../context/AuthContext";

const ProtectedView = ({ allowedRoles, children }) => {
  const { user } = useAuth();

  if (!user) return null; // or show a loader if user not loaded yet

  return allowedRoles.includes(user.role) ? children : null;
};

export default ProtectedView;
