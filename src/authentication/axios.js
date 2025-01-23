import axios from "axios";

const API = axios.create({
  baseURL: "https://your-backend-url.com/api",
});

// Add request interceptor to attach access token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
