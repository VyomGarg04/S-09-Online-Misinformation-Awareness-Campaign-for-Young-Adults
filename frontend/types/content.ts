export type ContentType =
  | "NEWS"
  | "BLOG"
  | "SOCIAL_POST"
  | "WHATSAPP_FORWARD"
  | "VIDEO_TRANSCRIPT"
  | "X_POST";

export type FactCheckStatus =
  | "PENDING"
  | "VERIFIED"
  | "MISLEADING"
  | "FALSE"
  | "unverifiable"
  | "UNVERIFIABLE";

export interface ContentItem {
  id: number;
  title: string;
  content: string;
  content_type: ContentType;
  author: string | null;
  source: string | null;
  theme: string | null;
  subtheme: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  credibility_score: number | null;
  fact_check_status: FactCheckStatus;
  analysis_summary: string | null;
}

export interface ContentCreateInput {
  title: string;
  content: string;
  content_type: ContentType;
  author?: string | null;
  source?: string | null;
  theme?: string | null;
  subtheme?: string | null;
  published_at?: string | null;
}

export interface ContentUpdateInput {
  title?: string | null;
  content?: string | null;
  author?: string | null;
  source?: string | null;
  theme?: string | null;
  subtheme?: string | null;
}

export interface ContentListParams {
  page?: number;
  page_size?: number;
  theme?: string;
  content_type?: ContentType;
  status?: FactCheckStatus;
  search?: string;
}

export interface ThemeStatistic {
  theme: string;
  count: number;
}
