export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <div className="flex-1 flex flex-col max-h-screen">
        <main className="flex-1 flex flex-col items-center justify-start px-4 md:px-8 py-4">
          <div className="w-full max-w-5xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
