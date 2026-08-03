import { apiFetch } from "@/lib/api";
import { DashboardStats } from "@/types/dashboard";

export function getDashboardStats() {
  return apiFetch<DashboardStats>("/content/stats");
}