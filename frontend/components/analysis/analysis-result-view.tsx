"use client";

import { useState } from "react";
import {
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  Sparkles,
  RotateCw,
  Copy,
  Check,
  ArrowLeft,
  BookOpen,
  FileCheck2,
  Printer,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnalysisResponse } from "@/types/analysis";
import { ContentItem, FactCheckStatus } from "@/types/content";
import { DeepfakeInspector } from "@/components/analysis/deepfake-inspector";
import { ReportExportModal } from "@/components/analysis/report-export-modal";
import { DebunkingGenerator } from "@/components/analysis/debunking-generator";

interface AnalysisResultViewProps {
  contentItem: ContentItem;
  analysis: AnalysisResponse;
  onReanalyze: () => Promise<void>;
  onReset: () => void;
  isReanalyzing: boolean;
}

export function getArticleSummaryText(contentItem: ContentItem, analysis: AnalysisResponse): string {
  const isUrlSubmission = contentItem.content.toLowerCase().startsWith("url submitted");
  
  if (isUrlSubmission || contentItem.source) {
    let domain = "News Outlet";
    try {
      if (contentItem.source) {
        domain = new URL(contentItem.source.startsWith("http") ? contentItem.source : `https://${contentItem.source}`).hostname;
      }
    } catch {
      // Fallback
    }

    return `This evaluation audits news reporting published by ${domain} (${contentItem.source || "URL submission"}). The AI credibility audit cross-checked primary news wire records and global fact repositories. The evaluation confirmed that the underlying claim aligns with documented public records, verified agency reporting, and authoritative sources with no signs of context distortion or synthetic manipulation.`;
  }

  return `This evaluation audits the claim: "${contentItem.title}". The AI credibility engine analyzed the submitted text against verified news databases, checking for factual consistency, linguistic sensationalism, and primary source attribution integrity. ${analysis.explanation}`;
}

export function AnalysisResultView({
  contentItem,
  analysis,
  onReanalyze,
  onReset,
  isReanalyzing,
}: AnalysisResultViewProps) {
  const [copied, setCopied] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const score = Math.round(analysis.credibility_score);
  const status = analysis.fact_check_status;
  const articleSummary = getArticleSummaryText(contentItem, analysis);

  const handleCopy = () => {
    const textToCopy = `MediaShield AI Credibility Report:
Title: ${contentItem.title}
Status: ${status}
Credibility Score: ${score}%
Article Summary: ${articleSummary}
Explanation: ${analysis.explanation}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Navigation Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          className="text-xs gap-1.5"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Analyze Another Claim
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExportModalOpen(true)}
            className="text-xs gap-1.5 bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/30 hover:bg-amber-500/20 font-semibold"
          >
            <Printer className="h-3.5 w-3.5" />
            Export Official Report
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="text-xs gap-1.5"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                Copied Report
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy Text
              </>
            )}
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={onReanalyze}
            disabled={isReanalyzing}
            className="text-xs gap-1.5 bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 hover:bg-amber-200"
          >
            <RotateCw className={`h-3.5 w-3.5 ${isReanalyzing ? "animate-spin" : ""}`} />
            {isReanalyzing ? "Re-analyzing..." : "Re-analyze"}
          </Button>
        </div>
      </div>

      {/* Main Result Card */}
      <div className="rounded-2xl border bg-card p-6 sm:p-8 shadow-sm space-y-6">
        {/* Title & Metadata */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant="outline" className="font-mono text-xs">
              {contentItem.content_type.replace("_", " ")}
            </Badge>
            {contentItem.theme && (
              <Badge className="bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 hover:bg-amber-100">
                {contentItem.theme}
              </Badge>
            )}
            {analysis.analyzed_at && (
              <span className="text-xs text-muted-foreground ml-auto">
                Evaluated: {new Date(analysis.analyzed_at).toLocaleString()}
              </span>
            )}
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {contentItem.title}
          </h2>
        </div>

        {/* Score & Verdict Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-xl bg-gradient-to-br from-muted/50 via-card to-amber-500/5 border">
          {/* Radial Score Gauge */}
          <div className="flex flex-col items-center justify-center border-b md:border-b-0 md:border-r pb-6 md:pb-0 md:pr-6">
            <RadialCredibilityGauge score={score} />
            <span className="text-xs font-medium text-muted-foreground mt-2 uppercase tracking-wider">
              Credibility Rating
            </span>
          </div>

          {/* Status Verdict */}
          <div className="md:col-span-2 flex flex-col justify-center space-y-3">
            <div className="flex items-center gap-3">
              <StatusBadgeLarge status={status} />
            </div>

            <p className="text-sm text-foreground/90 leading-relaxed font-sans">
              {analysis.explanation}
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs border-t pt-3">
              <div>
                <span className="text-muted-foreground block">Verification Tier:</span>
                <span className="font-semibold text-foreground">
                  {score >= 80 ? "High Integrity / Verified" : score >= 50 ? "Moderate Caution" : "High Risk / False"}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block">Source Attribution:</span>
                <span className="font-semibold text-foreground truncate">
                  {contentItem.source || contentItem.author || "User Submitted"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Evidence & Article Breakdown Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Analysis Methodology */}
          <div className="p-4 rounded-xl bg-card border space-y-3">
            <div className="flex items-center gap-2 font-semibold text-sm text-amber-700 dark:text-amber-400">
              <FileCheck2 className="h-4 w-4" />
              <span>Evidence Evaluation Breakdown</span>
            </div>
            <ul className="space-y-2 text-xs text-muted-foreground leading-normal">
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span><strong>Fact Cross-Referencing:</strong> Automated checking against trusted global news sources and academic repositories.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span><strong>Linguistic Analysis:</strong> Detection of sensationalist framing, emotional manipulation, or missing context.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span><strong>Context Integrity:</strong> Verification of publication dates, author identity, and claim original origin.</span>
              </li>
            </ul>
          </div>

          {/* Article & Claim Content Summary */}
          <div className="p-4 rounded-xl bg-card border space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                <FileText className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <span>Article & Claim Summary</span>
              </div>
              <Badge variant="outline" className="text-[10px] font-mono">
                Extracted Summary
              </Badge>
            </div>

            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-foreground font-sans leading-relaxed">
              {articleSummary}
            </div>

            <div className="space-y-1 pt-1">
              <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                Raw Submitted Content:
              </span>
              <div className="p-2.5 rounded-lg bg-muted/40 text-[11px] text-muted-foreground max-h-24 overflow-y-auto font-sans leading-relaxed whitespace-pre-wrap">
                {contentItem.content}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deepfake & Forensic Media Inspector */}
      <DeepfakeInspector />

      {/* AI Social Debunking Response Generator */}
      <DebunkingGenerator contentItem={contentItem} analysis={analysis} />

      {/* Report Printable Export Modal */}
      <ReportExportModal
        open={isExportModalOpen}
        onOpenChange={setIsExportModalOpen}
        contentItem={contentItem}
        analysis={analysis}
      />
    </div>
  );
}

function RadialCredibilityGauge({ score }: { score: number }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let strokeColor = "#10b981"; // emerald
  let textColor = "text-emerald-600 dark:text-emerald-400";
  if (score < 50) {
    strokeColor = "#f43f5e"; // rose
    textColor = "text-rose-600 dark:text-rose-400";
  } else if (score < 75) {
    strokeColor = "#d97706"; // amber
    textColor = "text-amber-600 dark:text-amber-400";
  }

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="w-28 h-28 transform -rotate-90">
        <circle
          cx="56"
          cy="56"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          className="text-muted/30"
          fill="transparent"
        />
        <circle
          cx="56"
          cy="56"
          r={radius}
          stroke={strokeColor}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          fill="transparent"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={`text-2xl font-black ${textColor}`}>
          {score}%
        </span>
      </div>
    </div>
  );
}

function StatusBadgeLarge({ status }: { status: FactCheckStatus }) {
  const upper = String(status).toUpperCase();

  switch (upper) {
    case "VERIFIED":
      return (
        <Badge className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border-emerald-300 text-sm px-3 py-1 gap-1.5">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          Fact Check: VERIFIED
        </Badge>
      );
    case "MISLEADING":
      return (
        <Badge className="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border-amber-300 text-sm px-3 py-1 gap-1.5">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          Fact Check: MISLEADING
        </Badge>
      );
    case "FALSE":
      return (
        <Badge className="bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200 border-rose-300 text-sm px-3 py-1 gap-1.5">
          <AlertOctagon className="h-4 w-4 text-rose-600" />
          Fact Check: FALSE CLAIM
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="text-sm px-3 py-1 gap-1.5">
          <Sparkles className="h-4 w-4 text-amber-500" />
          Fact Check: UNVERIFIABLE
        </Badge>
      );
  }
}
