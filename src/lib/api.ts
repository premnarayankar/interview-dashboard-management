// Axios instance and API helper functions for HTTP requests.
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiLogin = (username: string, password: string) =>
  api.post("/auth/login", { username, password });

export const apiGet = (path: string, params?: any) => api.get(path, { params });

export const apiPost = (path: string, data?: any) => api.post(path, data);

export default api;
