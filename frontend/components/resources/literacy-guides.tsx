"use client";

import { useState } from "react";
import { BookOpen, ShieldAlert, CheckCircle2, Search, ArrowRight, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const guides = [
  {
    id: "misinformation-tactics",
    title: "Common Misinformation Tactics",
    category: "Tactics & Framing",
    summary: "Learn how sensationalized claims and rage bait manipulate public perception.",
    points: [
      "Sensationalized Headlines: Using ALL CAPS, alarming punctuation, or outrage triggers.",
      "Out-of-Context Quotes: Truncating statements to reverse original speaker intent.",
      "Fake Expert Endorsements: Citing anonymous or unverified 'leading scientists'.",
      "Manipulated Timestamps: Repurposing old disaster footage as live breaking news.",
    ],
  },
  {
    id: "source-verification",
    title: "5-Step Source Verification Checklist",
    category: "Fact Checking",
    summary: "A quick protocol for evaluating any online news source or social post.",
    points: [
      "1. Check the Domain: Verify if url spoofs real outlets (e.g. .com vs .co-news).",
      "2. Investigate the Author: Look up recent published work and credentials.",
      "3. Cross-Check Primary Evidence: Search for raw transcripts or official filings.",
      "4. Check Fact Check Repositories: Search Snopes, Reuters Fact Check, or PolitiFact.",
      "5. Inspect Reverse Image Search: Check if photos were repurposed from older events.",
    ],
  },
  {
    id: "cognitive-bias",
    title: "Understanding Cognitive Biases",
    category: "Media Literacy",
    summary: "Recognize psychological traps that make false claims feel believable.",
    points: [
      "Confirmation Bias: Seeking information that confirms pre-existing opinions.",
      "Availability Cascade: Believing a claim simply because it is repeated frequently.",
      "Illusory Truth Effect: Repeated exposure to false claims increases perceived truthfulness.",
      "In-Group Favoritism: Trusting unverified forwards from close friends or group chats.",
    ],
  },
];

export function LiteracyGuides() {
  const [activeGuide, setActiveGuide] = useState(guides[0].id);

  const selected = guides.find((g) => g.id === activeGuide) || guides[0];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          Essential Fact-Checking & Media Literacy Guides
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Master the fundamentals of evaluating online credibility and spotting synthetic media.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {guides.map((g) => (
          <button
            key={g.id}
            onClick={() => setActiveGuide(g.id)}
            className={`p-4 rounded-xl border text-left transition-all space-y-2 ${
              activeGuide === g.id
                ? "bg-amber-500/10 border-amber-500/40 ring-2 ring-amber-500/20 shadow-xs"
                : "bg-card hover:bg-muted/40 border-border"
            }`}
          >
            <Badge variant="outline" className="text-[10px]">
              {g.category}
            </Badge>
            <h3 className="font-semibold text-sm text-foreground line-clamp-1">
              {g.title}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {g.summary}
            </p>
          </button>
        ))}
      </div>

      {/* Detail Showcase */}
      <div className="p-6 rounded-2xl bg-card border shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <div>
            <Badge className="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs">
              {selected.category}
            </Badge>
            <h3 className="text-lg font-bold text-foreground mt-1">
              {selected.title}
            </h3>
          </div>
          <Lightbulb className="h-6 w-6 text-amber-500 shrink-0" />
        </div>

        <ul className="space-y-3">
          {selected.points.map((point, i) => (
            <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border text-xs text-foreground/90 leading-relaxed">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
