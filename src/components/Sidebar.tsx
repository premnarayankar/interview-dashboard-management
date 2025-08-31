// Sidebar navigation with role-based menu items.
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import LogoutButton from "@/features/auth/LogoutButton";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navLinks = [
  { href: "/dashboard/admin", label: "Admin Dashboard", roles: ["admin"] },
  { href: "/dashboard/ta", label: "TA Dashboard", roles: ["ta", "ta_member"] },
  {
    href: "/dashboard/panelist",
    label: "Panelist Dashboard",
    roles: ["panelist"],
  },
  {
    href: "/candidates",
    label: "Candidates",
    roles: ["admin", "panelist", "ta", "ta_member"],
  },
  { href: "/roles-management", label: "Role Management", roles: ["admin"] },
];

export default function Sidebar() {
  const { user } = useSelector((state: RootState) => state.auth);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // Ensure sidebar is always closed on mount (e.g., after login)
  useEffect(() => {
    !user && setOpen(false);
  }, [user]);
  if (!user) return null;
  return (
    <>
      {/* Hamburger for all screens */}
      <button
        className="fixed top-4 right-4 z-50 bg-white border border-blue-100 rounded-full p-2 shadow-md"
        aria-label="Open sidebar"
        onClick={() => setOpen(true)}
        style={{ display: open ? "none" : "block" }}
      >
        <Bars3Icon className="w-6 md:w-12 h-6 md:h-12 text-blue-700" />
      </button>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full bg-white border-r border-blue-100 shadow-md flex flex-col py-6 px-4 gap-2 min-h-[100dvh] transition-transform duration-200
        w-[80vw] max-w-xs md:w-[35vw] md:max-w-xs
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Close button for all screens */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-700 tracking-tight px-2">
            Interview Dashboard
          </div>
          <button
            className="p-2 ml-2"
            aria-label="Close sidebar"
            onClick={() => setOpen(false)}
          >
            <XMarkIcon className="w-6 h-6 text-blue-700" />
          </button>
        </div>
        <UserCard />
        <nav className="mt-8 flex flex-col gap-2 flex-1">
          {navLinks
            .filter((link) => link.roles.includes(user.role))
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium px-3 py-2 rounded transition-colors ${
                  pathname === link.href
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                // onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
        </nav>
        <LogoutButton />
      </aside>
      {/* Overlay for all screens when sidebar is open */}
      {open && (
        <div
          className="fixed inset-0 bg-black opacity-10 z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
