"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

import { AnalysisHeader } from "@/components/analysis/analysis-header";
import { AnalysisInputForm, AnalysisHistoryItem } from "@/components/analysis/analysis-input-form";
import { AnalysisResultView } from "@/components/analysis/analysis-result-view";

import { listContent, createContent, getContent } from "@/services/content";
import { analyzeContent, reanalyzeContent } from "@/services/ai";
import { ContentItem, ContentType } from "@/types/content";
import { AnalysisResponse } from "@/types/analysis";

const STORAGE_KEY = "mediashield_analysis_history";

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
  const [history, setHistory] = useState<AnalysisHistoryItem[]>([]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isReanalyzing, setIsReanalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load analysis history from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch {
      // Ignore localStorage parse errors
    }
  }, []);

  // Save new analysis to history
  const saveToHistory = (item: ContentItem, result: AnalysisResponse) => {
    const entry: AnalysisHistoryItem = {
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      item,
      result,
    };

    setHistory((prev) => {
      const updated = [entry, ...prev.filter((h) => h.item.id !== item.id)].slice(0, 10);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore storage errors
      }
      return updated;
    });
  };

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
    setError(null);
    try {
      // 1. Fetch content item detail
      const item = await getContent(id);
      setCurrentContentItem(item);

      // 2. Call AI endpoint
      const result = await analyzeContent(id);
      setAnalysisResult(result);
      saveToHistory(item, result);
      toast.success("AI Credibility analysis completed!");
    } catch (err: any) {
      console.error("AI Analysis failed:", err);
      const msg = err?.message || "AI Analysis failed to process. Please check network connection.";
      setError(msg);
      toast.error(msg);
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
    setError(null);
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
      saveToHistory(createdItem, result);
      toast.success("Content created and AI Credibility analysis completed!");
    } catch (err: any) {
      console.error("Failed to submit and analyze:", err);
      const msg = err?.message || "Failed to analyze content item.";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Re-analyze existing item
  const handleReanalyze = async () => {
    if (!currentContentItem) return;
    setIsReanalyzing(true);
    setError(null);
    try {
      const result = await reanalyzeContent(currentContentItem.id);
      setAnalysisResult(result);

      // Update current content item
      const updatedItem = await getContent(currentContentItem.id);
      setCurrentContentItem(updatedItem);
      saveToHistory(updatedItem, result);

      toast.success("Fresh AI analysis generated!");
    } catch (err: any) {
      console.error("Reanalysis failed:", err);
      const msg = err?.message || "Reanalysis failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsReanalyzing(false);
    }
  };

  const handleSelectHistory = (entry: AnalysisHistoryItem) => {
    setCurrentContentItem(entry.item);
    setAnalysisResult(entry.result);
    setSelectedContentId(entry.item.id);
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setCurrentContentItem(null);
    setSelectedContentId(null);
    setError(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <AnalysisHeader />

      {/* Error Alert Banner */}
      {error && (
        <div className="flex items-center justify-between rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300 shadow-xs">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" />
            <p className="text-sm font-medium">{error}</p>
          </div>
          {selectedContentId && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAnalyzeExisting(selectedContentId)}
              className="border-rose-300 hover:bg-rose-100 dark:border-rose-800 dark:hover:bg-rose-900 gap-1.5 text-xs"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Retry Analysis
            </Button>
          )}
        </div>
      )}

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
          history={history}
          onSelectHistory={handleSelectHistory}
        />
      )}
    </div>
  );
}

export default function AnalysisPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-64 items-center justify-center rounded-2xl border bg-card">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-600 border-t-transparent" />
            <p className="text-sm text-muted-foreground font-medium">Loading AI Credibility Engine...</p>
          </div>
        </div>
      }
    >
      <AnalysisPageContent />
    </Suspense>
  );
}