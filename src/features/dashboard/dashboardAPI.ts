// API functions for dashboard-related data.
import { apiGet } from "@/lib/api";

export const fetchTodos = (params?: any) => apiGet("/todos", params);
export const fetchPosts = (params?: any) => apiGet("/posts", params);
