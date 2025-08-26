// Custom hook for authentication logic using Redux.
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RootState, AppDispatch } from "@/lib/store";
import {
  logout,
  setUser,
  setError,
  setLoading,
  UserRole,
  AuthUser,
} from "./authSlice";
import { apiLogin } from "@/lib/api";
import { sampleRoleUserName } from "@/lib/constants";

export function useAuthRedux() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const error = useSelector((state: RootState) => state.auth.error);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!user) {
      const session = localStorage.getItem("session");
      if (session) {
        try {
          dispatch(setUser(JSON.parse(session)));
        } catch {}
      }
    }
  }, [user, dispatch]);

  const login = async (username: string, password: string, role: UserRole) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const res = await apiLogin(username, password);
      const user = res.data;
      if (sampleRoleUserName[role] === user.username) {
        const userObj = {
          id: user.id,
          username: user.username,
          role,
          token: user.token,
        };
        dispatch(setUser(userObj));
        return "Pass";
      } else {
        return "Fail";
      }
    } catch (err: any) {
      dispatch(setError(err.response?.data?.message || "Login failed"));
    } finally {
      dispatch(setLoading(false));
    }
  };
  const logoutUser = () => dispatch(logout());
  const setUserSession = (user: AuthUser) => dispatch(setUser(user));

  return {
    user,
    loading,
    error,
    login,
    logout: logoutUser,
    setUser: setUserSession,
  };
}
