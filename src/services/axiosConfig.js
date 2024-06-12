// axiosConfig.js
import axios from "axios";

// Create an instance of axios
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Your API base URL
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
