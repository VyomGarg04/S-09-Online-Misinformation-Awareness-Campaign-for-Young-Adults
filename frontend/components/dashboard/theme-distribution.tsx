"use client";

import { useEffect, useState } from "react";
import { getThemeStats } from "@/services/content";
import { ThemeStatistic } from "@/types/content";
import { PieChart, Tag } from "lucide-react";

export function ThemeDistribution() {
  const [themes, setThemes] = useState<ThemeStatistic[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadThemes() {
      try {
        const data = await getThemeStats();
        setThemes(data);
      } catch (err) {
        console.error("Failed to load theme statistics:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadThemes();
  }, []);

  const totalCount = themes.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <section className="rounded-2xl border bg-card p-6 shadow-xs space-y-4">
      <div className="flex items-center gap-2">
        <PieChart className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        <h2 className="text-lg font-bold text-foreground">
          Top Content Themes & Topics
        </h2>
      </div>

      {isLoading ? (
        <div className="h-28 animate-pulse rounded-xl bg-muted/40" />
      ) : themes.length === 0 ? (
        <div className="p-6 text-center text-xs text-muted-foreground border border-dashed rounded-xl">
          No theme statistics available yet. Add content categories to view topic analytics.
        </div>
      ) : (
        <div className="space-y-3">
          {themes.map((t) => {
            const percentage = totalCount > 0 ? Math.round((t.count / totalCount) * 100) : 0;
            return (
              <div key={t.theme} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-foreground flex items-center gap-1.5">
                    <Tag className="h-3 w-3 text-amber-600" />
                    {t.theme || "Uncategorized"}
                  </span>
                  <span className="font-mono text-muted-foreground">
                    {t.count} items ({percentage}%)
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-amber-600 dark:bg-amber-500 transition-all duration-700"
                    style={{ width: `${Math.max(5, percentage)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
