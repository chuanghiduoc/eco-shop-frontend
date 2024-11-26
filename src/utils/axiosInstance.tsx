import axios from "axios";
import { getCookie } from "cookies-next";
import { refreshAccessToken } from "./refreshAccessToken";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  withCredentials: true,
});

// Request interceptor to add the access token
axiosInstance.interceptors.request.use((config) => {
  const token = getCookie("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor to handle 401 and 403 errors
axiosInstance.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;

  if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      // Create a dispatch function using the Redux store
      const newToken = await refreshAccessToken(); 
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      }
    } catch (refreshError) {
      console.error("Failed to refresh token:", refreshError);
      // Optionally, redirect to the login page or handle logout
      // window.location.href = '/login';
      console.log("Chưa có token mới bên axios instance");
    }
  }

  return Promise.reject(error);
});

export default axiosInstance;
