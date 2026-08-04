"use client";

import { ShieldCheck, ExternalLink, Globe, Award, AlertTriangle, AlertOctagon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface MediaSource {
  id: string;
  name: string;
  domain: string;
  country: string;
  factualRating: "VERY_HIGH" | "HIGH" | "MIXED" | "LOW";
  biasRating: "LEFT" | "CENTER_LEFT" | "CENTER" | "CENTER_RIGHT" | "RIGHT";
  ownership: string;
  credibilityScore: number;
  description: string;
}

interface SourceCardProps {
  source: MediaSource;
}

export function SourceCard({ source }: SourceCardProps) {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-xs hover:shadow-md transition-all space-y-4">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <h3 className="font-bold text-base text-foreground line-clamp-1">
              {source.name}
            </h3>
          </div>
          <a
            href={`https://${source.domain}`}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 mt-0.5"
          >
            <span>{source.domain}</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <FactualBadge rating={source.factualRating} />
      </div>

      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
        {source.description}
      </p>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t">
        <div>
          <span className="text-muted-foreground block text-[10px] uppercase font-mono tracking-wider">
            Bias Spectrum
          </span>
          <BiasBadge bias={source.biasRating} />
        </div>

        <div>
          <span className="text-muted-foreground block text-[10px] uppercase font-mono tracking-wider">
            Factual Integrity
          </span>
          <span className="font-extrabold text-amber-700 dark:text-amber-400 text-sm">
            {source.credibilityScore}%
          </span>
        </div>
      </div>

      <div className="text-[11px] text-muted-foreground pt-1 border-t flex items-center justify-between">
        <span>Owner: <strong className="text-foreground">{source.ownership}</strong></span>
        <span>Country: <strong className="text-foreground">{source.country}</strong></span>
      </div>
    </div>
  );
}

function FactualBadge({ rating }: { rating: MediaSource["factualRating"] }) {
  switch (rating) {
    case "VERY_HIGH":
    case "HIGH":
      return (
        <Badge className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-300 gap-1 text-[11px] shrink-0">
          <ShieldCheck className="h-3 w-3" />
          High Factuality
        </Badge>
      );
    case "MIXED":
      return (
        <Badge className="bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-300 gap-1 text-[11px] shrink-0">
          <AlertTriangle className="h-3 w-3" />
          Mixed Reliability
        </Badge>
      );
    default:
      return (
        <Badge className="bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border-rose-300 gap-1 text-[11px] shrink-0">
          <AlertOctagon className="h-3 w-3" />
          Low Factuality
        </Badge>
      );
  }
}

function BiasBadge({ bias }: { bias: MediaSource["biasRating"] }) {
  switch (bias) {
    case "LEFT":
      return <span className="font-semibold text-blue-600 dark:text-blue-400">Left Bias</span>;
    case "CENTER_LEFT":
      return <span className="font-semibold text-sky-600 dark:text-sky-400">Center-Left</span>;
    case "CENTER":
      return <span className="font-semibold text-emerald-600 dark:text-emerald-400">Least Biased (Center)</span>;
    case "CENTER_RIGHT":
      return <span className="font-semibold text-amber-600 dark:text-amber-400">Center-Right</span>;
    case "RIGHT":
      return <span className="font-semibold text-red-600 dark:text-red-400">Right Bias</span>;
  }
}
