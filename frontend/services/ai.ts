import { apiFetch } from "@/lib/api";
import { AnalysisResponse } from "@/types/analysis";

export function analyzeContent(contentId: number) {
  return apiFetch<AnalysisResponse>(`/ai/${contentId}`, {
    method: "POST",
  });
}

export function reanalyzeContent(contentId: number) {
  return apiFetch<AnalysisResponse>(`/ai/${contentId}/reanalyze`, {
    method: "POST",
  });
}
