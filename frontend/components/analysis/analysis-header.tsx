"use client";

import { Brain, ShieldCheck, Sparkles, Zap } from "lucide-react";

export function AnalysisHeader() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-900/90 via-amber-800 to-amber-950 p-6 sm:p-8 text-white shadow-md">
      <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-amber-500/20 blur-2xl pointer-events-none" />
      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-200 border border-amber-400/30">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Credibility Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Misinformation & Media Literacy Analysis
          </h1>
          <p className="text-sm text-amber-100/80 leading-relaxed">
            Verify claims, social posts, news articles, and media forwards. Our multi-agent AI system evaluates source integrity, checks factual accuracy, and provides evidence-backed explanations.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 shrink-0">
          <div className="flex items-center gap-2 rounded-xl bg-amber-900/60 p-3 border border-amber-700/50">
            <ShieldCheck className="h-5 w-5 text-amber-400 shrink-0" />
            <div>
              <div className="text-xs font-semibold">Transparency</div>
              <div className="text-[11px] text-amber-200/70">Evidence-backed</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-amber-900/60 p-3 border border-amber-700/50">
            <Zap className="h-5 w-5 text-amber-400 shrink-0" />
            <div>
              <div className="text-xs font-semibold">Real-time</div>
              <div className="text-[11px] text-amber-200/70">Instant evaluation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
