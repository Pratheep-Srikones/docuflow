import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000", // Update this if your API URL is different
  headers: {
    "Content-Type": "application/json",
  },
});

export { axiosInstance };
