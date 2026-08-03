import LoginForm from "@/components/auth/login-form";
import AuthCard from "../auth-card";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <AuthCard
        title="Welcome back"
        description="Sign in to continue using MediaShield."
      >
        <LoginForm />
      </AuthCard>
    </main>
  );
}