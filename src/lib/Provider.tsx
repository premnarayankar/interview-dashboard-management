"use client";
import { ReactNode, useEffect } from "react";
import {
  Provider as ReduxProvider,
  useDispatch,
  useSelector,
} from "react-redux";
import { AppDispatch, RootState, store } from "@/lib/store";
import { setUser } from "@/features/auth/authSlice";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

function HydrateAuth({ onHydrated }: { onHydrated: () => void }) {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
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
    // Always call onHydrated after effect runs
    onHydrated();
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, router, dispatch]);
  return null;
}

export default function Provider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  return (
    <ReduxProvider store={store}>
      {!hydrated && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <span className="text-blue-700 text-lg font-bold animate-pulse">
            Loading...
          </span>
        </div>
      )}
      <HydrateAuth onHydrated={() => setHydrated(true)} />
      {hydrated && children}
    </ReduxProvider>
  );
}
