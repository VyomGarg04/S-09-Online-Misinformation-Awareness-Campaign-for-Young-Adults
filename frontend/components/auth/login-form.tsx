"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/services/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { saveToken } from "@/lib/auth";
import { AlertCircle, Loader2 } from "lucide-react";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof schema>;

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    try {
      setLoading(true);
      const response = await login(data);
      saveToken(response.access_token);
      toast.success("Welcome back to MediaShield!");
      router.push("/dashboard");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="login-email">Email Address</Label>
        <Input
          id="login-email"
          type="email"
          placeholder="name@example.com"
          {...register("email")}
          className={errors.email ? "border-destructive focus-visible:ring-destructive/20" : ""}
        />
        {errors.email && (
          <p className="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="login-password">Password</Label>
        </div>
        <Input
          id="login-password"
          type="password"
          placeholder="••••••••"
          {...register("password")}
          className={errors.password ? "border-destructive focus-visible:ring-destructive/20" : ""}
        />
        {errors.password && (
          <p className="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            {errors.password.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-amber-700 hover:bg-amber-800 text-white dark:bg-amber-600 dark:hover:bg-amber-700 font-semibold h-10 shadow-xs"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Signing in...
          </span>
        ) : (
          "Sign In"
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground pt-2">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-amber-700 dark:text-amber-400 hover:underline"
        >
          Register for workspace
        </Link>
      </p>
    </form>
  );
}