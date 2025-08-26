// API functions for fetching candidate data from the backend.
import { apiGet } from "@/lib/api";

export const fetchCandidates = (params?: any) => {
  // Accepts params: { q, sortBy, order, ...pagination }
  if (params && params.q) {
    const { q, sortBy, order, ...rest } = params;
    // Pass sortBy and order to /users/search if present
    return apiGet("/users/search", { q, sortBy, order, ...rest });
  }
  // For /users, pass sortBy and order if present
  if (params && (params.sortBy || params.order)) {
    const { sortBy, order, ...rest } = params;
    return apiGet("/users", { sortBy, order, ...rest });
  }
  return apiGet("/users", params);
};
