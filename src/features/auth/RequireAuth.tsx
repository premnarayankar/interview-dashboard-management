"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthRedux } from "./useAuthRedux";

interface RequireAuthProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export default function RequireAuth({
  children,
  allowedRoles,
}: RequireAuthProps) {
  const { user } = useAuthRedux();
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      if (!user) {
        router.replace("/login");
        return;
      } else if (allowedRoles && !allowedRoles.includes(user.role)) {
        if (user.role === "admin") router.replace("/dashboard/admin");
        else if (user.role === "ta_member") router.replace("/dashboard/ta");
        else router.replace("/dashboard/panelist");
      }
    }, 900);
  }, [user, allowedRoles, router]);

  if (!user) return null;
  if (allowedRoles && !allowedRoles.includes(user.role)) return null;
  return <>{children}</>;
}
