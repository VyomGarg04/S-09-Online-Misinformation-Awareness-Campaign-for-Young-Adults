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

import { toast } from "sonner";

import { saveToken } from "@/lib/auth";

const schema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(8, "Minimum 8 characters"),
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
    console.log("Login submitted", data);
    try {
      setLoading(true);

      const response = await login(data);

      saveToken(response.access_token);

      toast.success("Welcome back!");

      router.push("/dashboard");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Login failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div>
        <Input
          type="email"
          placeholder="Email"
          {...register("email")}
        />

        <p className="text-sm text-red-500">
          {errors.email?.message}
        </p>
      </div>

      <div>
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />

        <p className="text-sm text-red-500">
          {errors.password?.message}
        </p>
      </div>
        <Button
        type="submit"
        className="w-full"
        disabled={loading}
        >
        Login
        </Button>

      {/* <Button
        className="w-full"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Login"}
      </Button> */}

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-primary hover:underline"
        >
          Register
        </Link>
      </p>
    </form>
  );
}