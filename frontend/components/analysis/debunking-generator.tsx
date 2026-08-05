"use client";

import { useState } from "react";
import { Share2, MessageSquare, Copy, Check, Sparkles, Send, FileText, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ContentItem } from "@/types/content";
import { AnalysisResponse } from "@/types/analysis";
import { getArticleSummaryText } from "./analysis-result-view";

interface DebunkingGeneratorProps {
  contentItem: ContentItem;
  analysis: AnalysisResponse;
}

type PlatformTab = "whatsapp" | "twitter" | "graphic";

export function DebunkingGenerator({
  contentItem,
  analysis,
}: DebunkingGeneratorProps) {
  const [tab, setTab] = useState<PlatformTab>("whatsapp");
  const [copied, setCopied] = useState(false);

  const score = Math.round(analysis.credibility_score);
  const articleSummary = getArticleSummaryText(contentItem, analysis);

  const whatsappText = `🛡️ *MediaShield Fact Check & Summary Response*
*Claim / Article:* "${contentItem.title}"
*Source:* ${contentItem.source || contentItem.author || "Online Media"}
*Verdict:* ${analysis.fact_check_status} (Credibility Rating: ${score}%)

📌 *Article & Claim Summary:*
${articleSummary}

🔍 *AI Fact Audit Breakdown:*
${analysis.explanation}

Verified via MediaShield AI Credibility Engine. Verify before sharing! 💡`;

  const twitterText = `1/3 🛡️ FACT CHECK & SUMMARY: "${contentItem.title}"

📌 ARTICLE SUMMARY: ${articleSummary.slice(0, 180)}...

2/3 🔍 VERDICT: ${analysis.fact_check_status} (Rating: ${score}%)
EVIDENCE AUDIT: ${analysis.explanation.slice(0, 160)}... #FactCheck #MediaShield

3/3 💡 Check primary sources & stay informed online! 🔍`;

  const textToCopy = tab === "whatsapp" ? whatsappText : twitterText;

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Share2 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">
              AI Social Debunking Response Generator
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Create shareable counter-fact replies with embedded claim summaries to combat misinformation.
            </p>
          </div>
        </div>

        <Badge className="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 gap-1 text-xs self-start sm:self-auto">
          <Sparkles className="h-3.5 w-3.5" />
          One-Click Debunk Copy
        </Badge>
      </div>

      {/* Article Summary Box */}
      <div className="p-3.5 rounded-xl bg-muted/40 border space-y-1 text-xs">
        <span className="font-semibold text-foreground flex items-center gap-1.5">
          <FileText className="h-3.5 w-3.5 text-amber-600" />
          Integrated Article & Claim Summary:
        </span>
        <p className="text-muted-foreground leading-relaxed">
          {articleSummary}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex rounded-xl bg-muted p-1 gap-1">
        <button
          type="button"
          onClick={() => setTab("whatsapp")}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            tab === "whatsapp"
              ? "bg-background text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
          <span>WhatsApp Reply</span>
        </button>

        <button
          type="button"
          onClick={() => setTab("twitter")}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            tab === "twitter"
              ? "bg-background text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Send className="h-3.5 w-3.5 text-sky-500" />
          <span>X / Twitter Thread</span>
        </button>

        <button
          type="button"
          onClick={() => setTab("graphic")}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            tab === "graphic"
              ? "bg-background text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Share2 className="h-3.5 w-3.5 text-amber-600" />
          <span>Social Card Preview</span>
        </button>
      </div>

      {/* Tab Content */}
      {tab !== "graphic" ? (
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-muted/40 border font-mono text-xs text-foreground/90 leading-relaxed whitespace-pre-wrap">
            {textToCopy}
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleCopy}
              className="bg-amber-700 hover:bg-amber-800 text-white dark:bg-amber-600 text-xs gap-1.5 shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Copied to Clipboard!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy Debunking Response
                </>
              )}
            </Button>
          </div>
        </div>
      ) : (
        /* Redesigned Graphic Card Preview */
        <div className="w-full max-w-md mx-auto rounded-2xl bg-slate-950 p-6 text-white border border-amber-500/30 shadow-2xl space-y-4 overflow-hidden">
          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-amber-400" />
              <span className="font-bold text-xs tracking-wider text-amber-400 uppercase">
                MediaShield Fact Check
              </span>
            </div>
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-400/30 text-[10px] px-2 py-0.5">
              OFFICIAL VERIFICATION
            </Badge>
          </div>

          {/* Headline & Score */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-base text-white leading-snug">
              &quot;{contentItem.title}&quot;
            </h4>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-black text-amber-400">{score}%</span>
                <span className="text-xs text-white/80 font-bold uppercase tracking-wider">
                  {analysis.fact_check_status}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                {contentItem.source || "Web News"}
              </span>
            </div>
          </div>

          {/* Article Summary Box inside Card */}
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-slate-200 leading-relaxed space-y-1">
            <strong className="text-amber-300 block text-[11px] uppercase tracking-wider">
              Article Content Summary:
            </strong>
            <p className="text-slate-200 text-xs leading-normal">
              {articleSummary}
            </p>
          </div>

          {/* Explanation Finding */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 leading-relaxed">
            <strong className="text-white block text-[11px] mb-0.5">Fact Audit Finding:</strong>
            {analysis.explanation}
          </div>

          {/* Footer */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>Verified via AI Credibility Engine</span>
            <span>mediashield.org</span>
          </div>
        </div>
      )}
    </div>
  );
}
