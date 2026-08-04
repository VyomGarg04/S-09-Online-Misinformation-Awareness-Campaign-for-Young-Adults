import { apiFetch } from "@/lib/api";
import {
  ContentItem,
  ContentCreateInput,
  ContentUpdateInput,
  ContentListParams,
  ThemeStatistic,
} from "@/types/content";

export function listContent(params: ContentListParams = {}) {
  const query = new URLSearchParams();
  if (params.page) query.append("page", String(params.page));
  if (params.page_size) query.append("page_size", String(params.page_size));
  if (params.theme) query.append("theme", params.theme);
  if (params.content_type) query.append("content_type", params.content_type);
  if (params.status) query.append("status", params.status);
  if (params.search) query.append("search", params.search);

  const queryString = query.toString();
  const endpoint = `/content/${queryString ? `?${queryString}` : ""}`;

  return apiFetch<ContentItem[]>(endpoint);
}

export function getContent(id: number) {
  return apiFetch<ContentItem>(`/content/${id}`);
}

export function createContent(data: ContentCreateInput) {
  return apiFetch<ContentItem>("/content/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateContent(id: number, data: ContentUpdateInput) {
  return apiFetch<ContentItem>(`/content/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteContent(id: number) {
  return apiFetch<{ message: string }>(`/content/${id}`, {
    method: "DELETE",
  });
}

export function getThemeStats() {
  return apiFetch<ThemeStatistic[]>("/content/themes");
}
