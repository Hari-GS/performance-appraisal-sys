import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check Authentication on Page Load
  useEffect(() => {
    axios.get("http://localhost:5000/api/check-auth", { withCredentials: true })
      .then(res => setIsAuthenticated(res.data.authenticated))
      .catch(() => setIsAuthenticated(false));
  }, []);

  // Login Function
  const login = async (username, password) => {
    try {
      await axios.post("http://localhost:5000/api/login", { username, password }, { withCredentials: true });
      setIsAuthenticated(true);
    } catch (error) {
      alert("Login Failed");
    }
  };

  // Logout Function
  const logout = async () => {
    await axios.post("http://localhost:5000/api/logout", {}, { withCredentials: true });
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
