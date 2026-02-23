import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8000", // update to your backend URL
});

// Automatically attach token to every request
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default http;
