import CandidateList from "@/features/candidates/CandidateList";

export const metadata = {
  title: "Candidates | Interview Management Dashboard",
  description:
    "Browse and manage all candidates in the Interview Management Dashboard.",
};

export default function CandidatesPage() {
  return <CandidateList />;
}
