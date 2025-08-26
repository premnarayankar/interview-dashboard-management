// Displays the current user's profile info.
"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export default function UserCard() {
  const { user } = useSelector((state: RootState) => state.auth);
  if (!user) return null;
  return (
    <div className="flex items-center justify-between ps-2">
      <span className="font-semibold text-blue-800 text-sm ">
        {user.username.toLocaleUpperCase()}
      </span>
      <div className="w-0.5 h-6 bg-gray-300" />
      <span className="ps-2 font-semibold text-green-800 text-sm">
        {user.role.toLocaleUpperCase()}
      </span>
    </div>
  );
}
