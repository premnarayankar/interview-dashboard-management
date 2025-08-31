// Global 404 Not Found page for Next.js App Router
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="fixed top-0 z-50 flex flex-col items-center justify-center min-h-[100dvh] min-w-screen bg-gray-50">
      <h1 className="text-5xl font-bold text-blue-700 mb-4">404</h1>
      <p className="text-lg text-gray-700 mb-8">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/" className="text-blue-600 hover:underline font-semibold">
        Go back to Home
      </Link>
    </div>
  );
}
