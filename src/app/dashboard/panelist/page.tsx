import RequireAuth from "@/features/auth/RequireAuth";
import DashboardView from "@/features/dashboard/DashboardView";

export const metadata = {
  title: "Panelist Dashboard | Interview Management Dashboard",
  description:
    "Panelist dashboard for reviewing candidates and providing feedback.",
};

export default function PanelistDashboard() {
  return (
    <RequireAuth allowedRoles={["panelist"]}>
      <DashboardView />
    </RequireAuth>
  );
}
