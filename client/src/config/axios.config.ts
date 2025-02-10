import axios from "axios";
import { decrypt } from "../utils/encrypt";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000", // Update this if your API URL is different
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.url?.includes("/auth")) {
      return config;
    }
    if (config.url?.includes("/organization")) {
      return config;
    }
    const token = decrypt(localStorage.getItem("token")!);
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export { axiosInstance };
