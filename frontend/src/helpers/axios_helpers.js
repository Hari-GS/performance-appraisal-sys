import axios from 'axios';

export const getAuthToken = () => {
  return window.localStorage.getItem('auth_token');
};

export const setAuthHeader = (token) => {
  if (token !== null) {
    window.localStorage.setItem("auth_token", token);
  } else {
    window.localStorage.removeItem("auth_token");
  }
};

// ===== User object Handling =====
export const getUser = () => {
  return JSON.parse(window.localStorage.getItem('user'));
};

export const setUser = (user) => {
  if (user !== null) {
    window.localStorage.setItem("user", JSON.stringify(user));
  } else {
    window.localStorage.removeItem("user");
  }
};

export const logout = () => {
  setAuthHeader(null);
  setUser(null);
  window.location.href = "/";
};

// Default Axios config
axios.defaults.baseURL = 'http://localhost:8080';

export const request = (method, url, data, customConfig = {}) => {
  const token = getAuthToken();
  const isFormData = data instanceof FormData;

  const defaultHeaders = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token && token !== "null" && url !== "/login" ? { 'Authorization': `Bearer ${token}` } : {}),
  };

  const config = {
    method,
    url,
    data,
    headers: {
      ...defaultHeaders,
      ...(customConfig.headers || {}),
    },
    ...customConfig,
  };
  
  return axios(config);
};
