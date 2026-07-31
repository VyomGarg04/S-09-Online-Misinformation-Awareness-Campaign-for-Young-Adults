const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(
    endpoint: string,
    options: RequestInit = {}
) {
    const token =
        typeof window !== "undefined"
            ? localStorage.getItem("token")
            : null;

    const headers = new Headers(options.headers);

    headers.set("Content-Type", "application/json");

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Something went wrong");
    }

    return response.json();
}