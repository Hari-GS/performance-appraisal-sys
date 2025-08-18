// context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { request } from "../helpers/axios_helpers";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // NEW

  const fetchUser = async () => {
    try {
      const res = await request("GET", "/auth/me");
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user", err);
      setUser(null);
    } finally {
      setLoading(false); // mark loading as complete
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading , fetchUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
