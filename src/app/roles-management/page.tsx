import RequireAuth from "@/features/auth/RequireAuth";
import RoleManagement from "@/features/roles/RoleManagement";
import React from "react";

export const metadata = {
  title: "Role Management | Interview Management Dashboard",
  description:
    "Admin dashboard for managing users, roles, and system settings.",
};

function page() {
  return (
    <RequireAuth allowedRoles={["admin"]}>
      <RoleManagement />
    </RequireAuth>
  );
}

export default page;
