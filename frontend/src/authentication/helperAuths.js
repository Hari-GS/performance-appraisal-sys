// src/utils/auth.js
import { jwtDecode } from "jwt-decode";
import axios from "./axios";

// Check if token is expired
export const isTokenExpired = (token) => {
  if (!token) return true;
  const { exp } = jwtDecode(token); // Decode token to get expiry
  return Date.now() >= exp * 1000; // Check if current time > token expiry
};

// Refresh access token using refresh token
export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await axios.post("/auth/refresh", { token: refreshToken });

    const { accessToken } = response.data;
    localStorage.setItem("accessToken", accessToken); // Save new access token
    return accessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    logout();
    throw error;
  }
};

// Logout function
export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "/login"; // Redirect to login
};
