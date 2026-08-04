"use client";

import { ViralRadar } from "@/components/trends/viral-radar";
import { ClaimJourneyTimeline } from "@/components/trends/claim-journey-timeline";
import { TrendingUp } from "lucide-react";

export default function TrendsPage() {
  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="border-b pb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-amber-600 dark:text-amber-500" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Information Journey & Misinformation Analytics
          </h1>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Monitor channel density, viral contagion patterns, and claim mutation lifecycles across digital media.
        </p>
      </div>

      <ViralRadar />
      <ClaimJourneyTimeline />
    </div>
  );
}
