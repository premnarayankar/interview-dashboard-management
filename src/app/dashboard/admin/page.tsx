import RequireAuth from "@/features/auth/RequireAuth";
import DashboardView from "@/features/dashboard/DashboardView";

export const metadata = {
  title: "Admin Dashboard | Interview Management Dashboard",
  description:
    "Admin dashboard for managing users, roles, and system settings.",
};

export default function AdminDashboard() {
  return (
    <RequireAuth allowedRoles={["admin"]}>
      <DashboardView />
    </RequireAuth>
  );
}
