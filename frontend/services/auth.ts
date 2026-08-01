import { apiFetch } from "@/lib/api";
import { RegisterData, LoginData, Token, User } from "@/types/auth";

export function register(data: RegisterData) {
    return apiFetch<User>("/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export function login(data: LoginData) {
    const body = new URLSearchParams();

    body.append("username", data.email);
    body.append("password", data.password);

    return apiFetch<Token>("/auth/login", {
        method: "POST",
        headers: {
            "Content-Type":
                "application/x-www-form-urlencoded",
        },
        body,
    });
}

export function getCurrentUser() {
    return apiFetch<User>("/auth/me");
}