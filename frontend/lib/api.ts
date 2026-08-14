import { getToken, removeToken } from "@/lib/auth";

const getBaseUrl = (): string => {
  let url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  // Strip trailing /api/v1 or /api/v1/ if present (since backend routes are mounted at root level like /auth, /content, /ai)
  url = url.replace(/\/api\/v1\/?$/, "");
  // Strip trailing slash
  return url.replace(/\/$/, "");
};

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers = new Headers(options.headers);

  // Only set JSON if the caller didn't specify a Content-Type or pass URLSearchParams/FormData
  if (
    !(options.body instanceof FormData) &&
    !(options.body instanceof URLSearchParams) &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const baseUrl = getBaseUrl();
  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const targetUrl = `${baseUrl}${normalizedEndpoint}`;

  let response: Response;
  try {
    response = await fetch(targetUrl, {
      ...options,
      headers,
    });
  } catch (err: any) {
    console.error(`Network fetch failed for ${targetUrl}:`, err);
    throw new Error(
      "Network connection error. Unable to communicate with MediaShield backend. Please check backend server status."
    );
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 401) {
      removeToken();
      if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }
    throw new Error(data?.detail ?? "Something went wrong during API request");
  }

  return data as T;
}