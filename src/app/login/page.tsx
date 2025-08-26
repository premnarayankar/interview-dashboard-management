import LoginForm from "@/features/auth/LoginForm";

export const metadata = {
  title: "Login | Interview Management Dashboard",
  description: "Login to access the Interview Management Dashboard.",
};

export default function LoginPage() {
  return (
    <main className="max-h-screen flex items-center justify-center bg-gray-50">
      <LoginForm />
    </main>
  );
}
