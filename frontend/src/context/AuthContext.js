// import { createContext, useContext, useState, useEffect } from "react";

// // Create Auth Context
// const AuthContext = createContext();

// // Auth Provider Component
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // Load user from localStorage on initial render
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     console.log("Stored user in localStorage:", storedUser); // Debugging

//     if (storedUser) {
//       try {
//         if (storedUser) {
//           setUser(storedUser); // ✅ Ensure it's an object
//           console.log("User set from localStorage:", storedUser); // Debugging
//         }
//       } catch (error) {
//         console.error("Error parsing user data:", error);
//       }
//     }
//   }, []);

//   // Login function
//   const login = (username) => {
//     if (!username) {
//       console.error("No username provided to login function!");
//       return;
//     }

//     const userData = { username };
//     setUser(userData);
//     localStorage.setItem("user", userData.username);

//     console.log("User logged in:", userData); // Debugging
//   };

//   // Logout function
//   const logout = () => {
//     console.log("User logged out");
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom Hook to use Auth
// export const useAuth = () => useContext(AuthContext);
