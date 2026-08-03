import RegisterForm from "@/components/auth/register-form";
import AuthCard from "../auth-card";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <AuthCard
        title="Create your account"
        description="Start verifying information with MediaShield."
      >
        <RegisterForm />
      </AuthCard>
    </main>
  );
}