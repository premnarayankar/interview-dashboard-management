"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthRedux } from "@/features/auth/useAuthRedux";

export default function Home() {
  const { user } = useAuthRedux();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else {
      if (user.role === "admin") router.replace("/dashboard/admin");
      else if (user.role === "ta_member") router.replace("/dashboard/ta");
      else router.replace("/dashboard/panelist");
    }
  }, [user, router]);

  return null;
}
