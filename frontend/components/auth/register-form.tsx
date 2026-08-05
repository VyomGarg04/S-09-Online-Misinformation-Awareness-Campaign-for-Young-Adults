"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { register } from "@/services/auth";
import { RegisterData } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AlertCircle, Loader2 } from "lucide-react";

const schema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof schema>;

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: RegisterData) {
    try {
      setLoading(true);
      await register(data);
      toast.success("Account created successfully! Please sign in.");
      router.push("/login");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="reg-name">Full Name</Label>
        <Input
          id="reg-name"
          placeholder="Jane Doe"
          {...registerField("full_name")}
          className={errors.full_name ? "border-destructive focus-visible:ring-destructive/20" : ""}
        />
        {errors.full_name && (
          <p className="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            {errors.full_name.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="reg-email">Email Address</Label>
        <Input
          id="reg-email"
          type="email"
          placeholder="name@example.com"
          {...registerField("email")}
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
        <Label htmlFor="reg-password">Password</Label>
        <Input
          id="reg-password"
          type="password"
          placeholder="At least 8 characters..."
          {...registerField("password")}
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
            Creating account...
          </span>
        ) : (
          "Create Account"
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground pt-2">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-amber-700 dark:text-amber-400 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}