import RequireAuth from "@/features/auth/RequireAuth";
import DashboardView from "@/features/dashboard/DashboardView";

export const metadata = {
  title: "TA Dashboard | Interview Management Dashboard",
  description: "TA Member dashboard for managing interviews and candidates.",
};

export default function TADashboard() {
  return (
    <RequireAuth allowedRoles={["ta_member"]}>
      <DashboardView />
    </RequireAuth>
  );
}
