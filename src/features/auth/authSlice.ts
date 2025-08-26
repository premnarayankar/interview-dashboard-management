// Redux slice for authentication state and actions.
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserRole = "admin" | "ta_member" | "panelist";
export interface AuthUser {
  id: number;
  username: string;
  role: UserRole;
  token: string;
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.error = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("session");
      }
    },
    setUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("session", JSON.stringify(action.payload));
      }
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { logout, setUser, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
