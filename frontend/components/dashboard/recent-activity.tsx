"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { listContent } from "@/services/content";
import { ContentItem } from "@/types/content";
import { Sparkles, ArrowRight, ShieldCheck, AlertTriangle, AlertOctagon, Clock, HelpCircle } from "lucide-react";

export function RecentActivity() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadRecent() {
      try {
        const data = await listContent({ page: 1, page_size: 5 });
        setItems(data);
      } catch (err) {
        console.error("Failed to load recent activity:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadRecent();
  }, []);

  return (
    <section className="rounded-2xl border bg-card p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            Recent Content & Analysis Activity
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Latest items submitted and analyzed across the platform.
          </p>
        </div>

        <Button variant="ghost" size="sm" asChild className="text-xs text-amber-700 dark:text-amber-400 gap-1">
          <Link href="/content">
            View All Content
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-14 animate-pulse rounded-xl bg-muted/40" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="p-8 text-center border border-dashed rounded-xl bg-muted/20">
          <p className="text-sm font-medium text-foreground">No recent activity yet</p>
          <p className="text-xs text-muted-foreground mt-1">Submit your first article or claim to start monitoring media credibility.</p>
          <Button asChild size="sm" className="mt-3 bg-amber-700 text-white hover:bg-amber-800 text-xs">
            <Link href="/analysis">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Analyze First Item
            </Link>
          </Button>
        </div>
      ) : (
        <div className="divide-y">
          {items.map((item) => (
            <div
              key={item.id}
              className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-muted/20 px-2 rounded-lg transition-colors"
            >
              <div className="space-y-1 max-w-xl">
                <Link
                  href={`/analysis?id=${item.id}`}
                  className="font-semibold text-sm text-foreground hover:text-amber-600 dark:hover:text-amber-400 transition-colors line-clamp-1"
                >
                  {item.title}
                </Link>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-mono text-[11px] bg-muted px-1.5 py-0.5 rounded">
                    {item.content_type}
                  </span>
                  <span>•</span>
                  <span>{new Date(item.created_at).toLocaleDateString()}</span>
                  {item.credibility_score !== null && (
                    <>
                      <span>•</span>
                      <span className="font-bold text-amber-700 dark:text-amber-400">
                        {Math.round(item.credibility_score)}% score
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <StatusBadgeSmall status={item.fact_check_status} />
                <Button variant="outline" size="sm" asChild className="h-7 text-xs px-2.5">
                  <Link href={`/analysis?id=${item.id}`}>
                    <Sparkles className="h-3 w-3 text-amber-600 mr-1" />
                    Inspect
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function StatusBadgeSmall({ status }: { status: string }) {
  const upper = String(status).toUpperCase();
  switch (upper) {
    case "VERIFIED":
      return (
        <Badge className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-300 text-[11px] gap-1">
          <ShieldCheck className="h-3 w-3" />
          Verified
        </Badge>
      );
    case "MISLEADING":
      return (
        <Badge className="bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-300 text-[11px] gap-1">
          <AlertTriangle className="h-3 w-3" />
          Misleading
        </Badge>
      );
    case "FALSE":
      return (
        <Badge className="bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border-rose-300 text-[11px] gap-1">
          <AlertOctagon className="h-3 w-3" />
          False
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="text-[11px] gap-1">
          <Clock className="h-3 w-3 text-muted-foreground" />
          Pending
        </Badge>
      );
  }
}