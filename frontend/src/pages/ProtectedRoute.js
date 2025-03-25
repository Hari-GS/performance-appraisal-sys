import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Using `useAuth` instead of `AuthContext`
  console.log("protected : "+user)
  return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
