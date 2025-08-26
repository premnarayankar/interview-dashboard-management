import RequireAuth from "@/features/auth/RequireAuth";

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RequireAuth>{children}</RequireAuth>;
}
