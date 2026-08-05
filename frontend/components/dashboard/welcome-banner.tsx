"use client";

import { useEffect, useState } from "react";
import { Sparkles, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function WelcomeBanner() {
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    // Set formatted timestamp on client side
    const now = new Date();
    setLastUpdated(
      now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    );
  }, []);

  return (
    <section className="relative overflow-hidden rounded-3xl border bg-card p-6 sm:p-8 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              Workspace Overview
            </span>
            <Badge variant="outline" className="text-[10px] gap-1 py-0 px-2 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live AI Protection
            </Badge>
          </div>

          <h1 className="mt-2 text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
            MediaShield Dashboard
          </h1>

          <p className="mt-2 max-w-2xl text-sm sm:text-base text-muted-foreground">
            Monitor misinformation trends, verify claim authenticity, and analyze media credibility in real time.
          </p>
        </div>

        {lastUpdated && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground self-start sm:self-auto bg-muted/40 px-3 py-1.5 rounded-full border">
            <Clock className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
            <span>Updated: {lastUpdated}</span>
          </div>
        )}
      </div>
    </section>
  );
}