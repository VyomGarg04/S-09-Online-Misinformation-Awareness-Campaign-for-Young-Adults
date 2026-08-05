"use client";

import { useState } from "react";
import { Share2, MessageSquare, Copy, Check, Sparkles, Send, FileText } from "lucide-react";
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
        /* Graphic Card Preview */
        <div className="p-6 rounded-2xl bg-gradient-to-br from-neutral-900 via-amber-950 to-neutral-950 text-white border shadow-lg space-y-4 max-w-md mx-auto">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="font-bold text-xs tracking-wider text-amber-400 uppercase">
              MediaShield Fact Check
            </span>
            <Badge className="bg-amber-500/20 text-amber-200 border-amber-400/30 text-[10px]">
              VERIFIED REPORT
            </Badge>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-base text-white line-clamp-2">
              &quot;{contentItem.title}&quot;
            </h4>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-amber-400">{score}%</span>
              <span className="text-xs text-white/80 font-semibold uppercase">
                {analysis.fact_check_status}
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-white/10 text-[11px] text-amber-100/90 leading-relaxed line-clamp-2 border border-white/10">
            <strong>Summary:</strong> {articleSummary}
          </div>

          <p className="text-xs text-amber-100/80 leading-relaxed line-clamp-2">
            {analysis.explanation}
          </p>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-amber-200/60">
            <span>Verified via AI Credibility Engine</span>
            <span>mediashield.org</span>
          </div>
        </div>
      )}
    </div>
  );
}
