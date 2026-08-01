"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { register } from "@/services/auth";
import { RegisterData } from "@/types/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { toast } from "sonner";

const schema = z.object({
    full_name: z.string().min(2, "Name is required"),
    email: z.email("Invalid email"),
    password: z.string().min(8, "Minimum 8 characters"),
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

            toast.success("Account created successfully");

            router.push("/login");
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Create Account</CardTitle>
            </CardHeader>

            <CardContent>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div>
                        <Input
                            placeholder="Full Name"
                            {...registerField("full_name")}
                        />
                        <p className="text-sm text-red-500">
                            {errors.full_name?.message}
                        </p>
                    </div>

                    <div>
                        <Input
                            placeholder="Email"
                            type="email"
                            {...registerField("email")}
                        />
                        <p className="text-sm text-red-500">
                            {errors.email?.message}
                        </p>
                    </div>

                    <div>
                        <Input
                            placeholder="Password"
                            type="password"
                            {...registerField("password")}
                        />
                        <p className="text-sm text-red-500">
                            {errors.password?.message}
                        </p>
                    </div>

                    <Button
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Register"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}