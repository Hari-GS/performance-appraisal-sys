import axios from "axios";
import { BASE_URL } from "../utils/config";
import { getAuthToken } from "./axios_helpers";
const axiosInstance = axios.create({
  baseURL: BASE_URL, // backend API URL
  headers: { "Content-Type": "application/json" },
});
const NO_AUTH_APIS = ["/auth/login", "/auth/register"];
axiosInstance.interceptors.request.use(
  (config) => {
    const currentUrl = config.url || "";
    const shouldSkipAuth = NO_AUTH_APIS.some((api) => currentUrl.startsWith(api));
    if (!shouldSkipAuth) {
      const authTokens = getAuthToken();
      if (authTokens?.access_token) {
        config.headers.Authorization = `Bearer ${authTokens.access_token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      console.error("Unauthorized — please login again");
      // Optionally: clear storage and redirect
    } else if (error?.response?.status === 403) {
      console.error("Access forbidden");
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;