import CandidateDetailTabs from "@/features/candidates/CandidateDetailTabs";

interface CandidateDetailPageProps {
  params: { id: string };
}

export default async function CandidateDetailPage({
  params,
}: CandidateDetailPageProps) {
  const awaitedParams = await params;
  const id = Number(awaitedParams?.id);
  if (!id) return <div className="p-8">Invalid candidate ID</div>;
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <CandidateDetailTabs userId={id} />
      </div>
    </main>
  );
}
