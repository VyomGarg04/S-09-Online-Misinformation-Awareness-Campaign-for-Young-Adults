"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { AnalysisHeader } from "@/components/analysis/analysis-header";
import { AnalysisInputForm } from "@/components/analysis/analysis-input-form";
import { AnalysisResultView } from "@/components/analysis/analysis-result-view";

import { listContent, createContent, getContent } from "@/services/content";
import { analyzeContent, reanalyzeContent } from "@/services/ai";
import { ContentItem, ContentType } from "@/types/content";
import { AnalysisResponse } from "@/types/analysis";

function AnalysisPageContent() {
  const searchParams = useSearchParams();
  const queryId = searchParams.get("id");

  // State
  const [existingItems, setExistingItems] = useState<ContentItem[]>([]);
  const [selectedContentId, setSelectedContentId] = useState<number | null>(
    queryId ? Number(queryId) : null
  );

  const [currentContentItem, setCurrentContentItem] = useState<ContentItem | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isReanalyzing, setIsReanalyzing] = useState(false);

  // Load list of existing content items for select dropdown
  const loadExistingItems = useCallback(async () => {
    try {
      const items = await listContent({ page_size: 20 });
      setExistingItems(items);
    } catch (err) {
      console.error("Failed to load existing items:", err);
    }
  }, []);

  useEffect(() => {
    loadExistingItems();
  }, [loadExistingItems]);

  // Handle URL query parameter `?id=123`
  useEffect(() => {
    if (queryId) {
      const idNum = Number(queryId);
      if (!isNaN(idNum)) {
        setSelectedContentId(idNum);
        handleAnalyzeExisting(idNum);
      }
    }
  }, [queryId]);

  // Run AI analysis on an existing item
  const handleAnalyzeExisting = async (id: number) => {
    setIsAnalyzing(true);
    try {
      // 1. Fetch content item detail
      const item = await getContent(id);
      setCurrentContentItem(item);

      // 2. Call AI endpoint
      const result = await analyzeContent(id);
      setAnalysisResult(result);
      toast.success("AI Credibility analysis completed!");
    } catch (err: any) {
      console.error("AI Analysis failed:", err);
      toast.error(err?.message || "AI Analysis failed to process");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Create new content item then run AI analysis on it
  const handleAnalyzeNew = async (data: {
    title: string;
    content: string;
    content_type: ContentType;
    source?: string;
    theme?: string;
  }) => {
    setIsAnalyzing(true);
    try {
      // 1. Create content entry in database
      const createdItem = await createContent(data);
      setCurrentContentItem(createdItem);
      setSelectedContentId(createdItem.id);

      // Refresh list
      loadExistingItems();

      // 2. Run AI analysis
      const result = await analyzeContent(createdItem.id);
      setAnalysisResult(result);
      toast.success("Content created and AI Credibility analysis completed!");
    } catch (err: any) {
      console.error("Failed to submit and analyze:", err);
      toast.error(err?.message || "Failed to analyze content");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Re-analyze existing item
  const handleReanalyze = async () => {
    if (!currentContentItem) return;
    setIsReanalyzing(true);
    try {
      const result = await reanalyzeContent(currentContentItem.id);
      setAnalysisResult(result);

      // Update current content item
      const updatedItem = await getContent(currentContentItem.id);
      setCurrentContentItem(updatedItem);

      toast.success("Fresh AI analysis generated!");
    } catch (err: any) {
      console.error("Reanalysis failed:", err);
      toast.error(err?.message || "Reanalysis failed");
    } finally {
      setIsReanalyzing(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setCurrentContentItem(null);
    setSelectedContentId(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <AnalysisHeader />

      {/* Main Content Area: Input or Result View */}
      {currentContentItem && analysisResult ? (
        <AnalysisResultView
          contentItem={currentContentItem}
          analysis={analysisResult}
          onReanalyze={handleReanalyze}
          onReset={handleReset}
          isReanalyzing={isReanalyzing}
        />
      ) : (
        <AnalysisInputForm
          existingItems={existingItems}
          selectedContentId={selectedContentId}
          onSelectExisting={(id) => setSelectedContentId(id)}
          onAnalyzeNew={handleAnalyzeNew}
          onAnalyzeExisting={handleAnalyzeExisting}
          isAnalyzing={isAnalyzing}
        />
      )}
    </div>
  );
}

export default function AnalysisPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-600 border-t-transparent" />
        </div>
      }
    >
      <AnalysisPageContent />
    </Suspense>
  );
}