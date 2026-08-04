"use client";

import { GitCommit, Radio, Share2, ShieldCheck, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const stages = [
  {
    stage: "1. Origin & Seed Claim",
    timeframe: "Hour 0 - 2",
    icon: Radio,
    color: "border-amber-500 text-amber-600 dark:text-amber-400 bg-amber-500/10",
    description: "An unverified rumor, altered photo, or out-of-context quote is posted on messaging groups or forum boards.",
  },
  {
    stage: "2. Peer-to-Peer Amplification",
    timeframe: "Hour 2 - 12",
    icon: Share2,
    color: "border-amber-500 text-amber-600 dark:text-amber-400 bg-amber-500/10",
    description: "The claim is copied into WhatsApp forwards, X threads, and social media reels without source cross-checking.",
  },
  {
    stage: "3. Peak Viral Contagion",
    timeframe: "Hour 12 - 48",
    icon: AlertTriangle,
    color: "border-rose-500 text-rose-600 dark:text-rose-400 bg-rose-500/10",
    description: "Algorithmic recommendations push the claim to mainstream audiences. Illusory truth effect causes widespread belief.",
  },
  {
    stage: "4. AI Verification & Neutralization",
    timeframe: "Fact-Check Phase",
    icon: ShieldCheck,
    color: "border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
    description: "MediaShield AI cross-references primary sources, issues a 0-100% credibility score, and provides debunking context.",
  },
];

export function ClaimJourneyTimeline() {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-xs space-y-6">
      <div>
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <GitCommit className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          The Information Journey: How Misinformation Spreads
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Understanding the 4-phase lifecycle of online claims from seed rumor to verification.
        </p>
      </div>

      <div className="relative border-l-2 border-amber-500/30 ml-4 space-y-6 pl-6 py-2">
        {stages.map((st, i) => {
          const Icon = st.icon;
          return (
            <div key={i} className="relative group">
              {/* Dot */}
              <div className={`absolute -left-[33px] top-0 flex h-7 w-7 items-center justify-center rounded-full border-2 bg-card ${st.color}`}>
                <Icon className="h-3.5 w-3.5" />
              </div>

              <div className="p-4 rounded-xl border bg-muted/20 space-y-1 hover:bg-muted/40 transition-colors">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-foreground">
                    {st.stage}
                  </h4>
                  <Badge variant="outline" className="text-[10px] font-mono">
                    {st.timeframe}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {st.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
