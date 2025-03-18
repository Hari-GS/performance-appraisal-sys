import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Using `useAuth` instead of `AuthContext`

  return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
