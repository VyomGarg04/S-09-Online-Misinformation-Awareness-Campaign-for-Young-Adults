"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, FileText, Activity, Brain } from "lucide-react";
import { getDashboardStats } from "@/services/dashboard";
import { DashboardStats } from "@/types/dashboard";

export function ProfileStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to load profile stats:", err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const total = stats?.total_content ?? 0;
  const verified = stats?.verified ?? 0;
  const misleadingOrFalse = (stats?.misleading ?? 0) + (stats?.false ?? 0);
  const pending = stats?.pending ?? 0;

  const verifiedPercent = total > 0 ? Math.round((verified / total) * 100) : 0;

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-xs space-y-4">
      <h3 className="text-base font-bold text-foreground">
        Platform Contribution & Fact-Check Activity
      </h3>

      {isLoading ? (
        <div className="h-24 animate-pulse rounded-xl bg-muted/40" />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-muted/40 border space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <FileText className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              Total Claims
            </div>
            <div className="text-2xl font-extrabold text-foreground">{total}</div>
            <div className="text-[11px] text-muted-foreground">Articles & posts</div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-300 font-medium">
              <ShieldCheck className="h-4 w-4" />
              Verified Authentic
            </div>
            <div className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-300">
              {verified}
            </div>
            <div className="text-[11px] text-emerald-600/80 dark:text-emerald-400">
              {verifiedPercent}% credibility rate
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-300 font-medium">
              <Activity className="h-4 w-4" />
              Flagged Items
            </div>
            <div className="text-2xl font-extrabold text-amber-700 dark:text-amber-300">
              {misleadingOrFalse}
            </div>
            <div className="text-[11px] text-amber-600/80 dark:text-amber-400">
              Misleading or False
            </div>
          </div>

          <div className="p-4 rounded-xl bg-muted/40 border space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <Brain className="h-4 w-4 text-purple-500" />
              Pending Analysis
            </div>
            <div className="text-2xl font-extrabold text-foreground">{pending}</div>
            <div className="text-[11px] text-muted-foreground">Awaiting AI check</div>
          </div>
        </div>
      )}
    </div>
  );
}
