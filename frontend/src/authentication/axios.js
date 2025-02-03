// src/authentication/axios.js
import axios from "axios";

const Instance = axios.create({
  baseURL: "http://localhost:5000/api/auth", // Backend server URL
  withCredentials: true, // Allows cookies (optional, based on backend setup)
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach access token to every request
Instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default Instance;
