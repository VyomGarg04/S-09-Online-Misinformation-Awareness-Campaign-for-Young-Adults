"use client";

import { ShieldCheck, FileText, Brain, Activity, AlertCircle, RefreshCw } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { DashboardStats } from "@/types/dashboard";
import { getDashboardStats } from "@/services/dashboard";
import { StatsCard } from "@/components/dashboard/stats-card";
import { WelcomeBanner } from "@/components/dashboard/welcome-banner";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { ThemeDistribution } from "@/components/dashboard/theme-distribution";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const [statsData, setStatsData] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getDashboardStats();
      setStatsData(data);
    } catch (err: any) {
      console.error("Failed to load dashboard stats:", err);
      setError(err?.message || "Unable to fetch dashboard statistics.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const stats = [
    {
      title: "Total Content",
      value: statsData?.total_content ?? 0,
      description: "Articles & claims in system",
      icon: FileText,
    },
    {
      title: "Verified Accurate",
      value: statsData?.verified ?? 0,
      description: "Credible sources confirmed",
      icon: ShieldCheck,
    },
    {
      title: "Pending Analysis",
      value: statsData?.pending ?? 0,
      description: "Awaiting AI fact-checking",
      icon: Brain,
    },
    {
      title: "Misleading / False",
      value: statsData ? statsData.misleading + statsData.false : 0,
      description: "Flagged & unverified claims",
      icon: Activity,
    },
  ];

  return (
    <div className="space-y-8">
      <WelcomeBanner />

      {/* Error Alert with Retry */}
      {error && (
        <div className="flex items-center justify-between rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300 shadow-xs">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" />
            <p className="text-sm font-medium">{error}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={loadStats}
            className="border-rose-300 hover:bg-rose-100 dark:border-rose-800 dark:hover:bg-rose-900 gap-1.5 text-xs"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Retry
          </Button>
        </div>
      )}

      {/* Stats Cards Section */}
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl border bg-card p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-9 w-9 rounded-xl" />
                </div>
                <Skeleton className="h-10 w-16" />
                <Skeleton className="h-3 w-32" />
              </div>
            ))
          : stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <StatsCard
                  key={stat.title}
                  title={stat.title}
                  value={String(stat.value)}
                  description={stat.description}
                  icon={<Icon className="h-5 w-5 text-amber-600 dark:text-amber-400" />}
                />
              );
            })}
      </section>

      <QuickActions />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div>
          <ThemeDistribution />
        </div>
      </div>
    </div>
  );
}