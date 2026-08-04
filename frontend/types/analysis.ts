import { FactCheckStatus, ContentType } from "./content";

export interface AnalysisResponse {
  credibility_score: number;
  fact_check_status: FactCheckStatus;
  explanation: string;
  analyzed_at?: string | null;
}

export interface QuickAnalysisInput {
  title: string;
  content: string;
  content_type: ContentType;
  source?: string;
  theme?: string;
}
