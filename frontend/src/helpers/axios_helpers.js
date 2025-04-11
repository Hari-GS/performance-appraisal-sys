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

// ===== User ID Handling =====
export const getUser = () => {
  return JSON.parse(window.localStorage.getItem('user'))
};

export const setUser = (user) => {
  if (user !== null) {
    window.localStorage.setItem("user", JSON.stringify(user));
  } else {
    window.localStorage.removeItem("user");
  }
};

export const logout = () => {
  setAuthHeader(null); // Clears token from storage & axios headers
  setUser(null);
  window.location.href = "/"; // Redirect to home/login page
};


axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const request = (method, url, data) => {
  let headers = { 'Content-Type': 'application/json' };

  const token = getAuthToken();
  if (token && token !== "null" && url !== "/login") {
      headers['Authorization'] = `Bearer ${token}`;
  }
  console.log(data);
  
  return axios({ method, url, headers, data });
};