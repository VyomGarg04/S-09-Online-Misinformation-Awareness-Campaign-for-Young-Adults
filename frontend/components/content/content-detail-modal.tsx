"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ContentItem } from "@/types/content";
import { Sparkles, ExternalLink, Calendar, User, Tag } from "lucide-react";

interface ContentDetailModalProps {
  item: ContentItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAnalyze: (item: ContentItem) => void;
}

export function ContentDetailModal({
  item,
  open,
  onOpenChange,
  onAnalyze,
}: ContentDetailModalProps) {
  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="font-mono text-xs">
              {item.content_type.replace("_", " ")}
            </Badge>
            {item.theme && (
              <Badge className="bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 hover:bg-amber-100">
                {item.theme} {item.subtheme ? `• ${item.subtheme}` : ""}
              </Badge>
            )}
          </div>
          <DialogTitle className="text-xl font-bold text-foreground">
            {item.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Credibility & Status Box */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 rounded-lg bg-muted/40 border">
            <div>
              <span className="text-xs text-muted-foreground block">Fact Check Status</span>
              <span className="font-semibold text-sm capitalize">
                {item.fact_check_status.toLowerCase()}
              </span>
            </div>

            <div>
              <span className="text-xs text-muted-foreground block">Credibility Score</span>
              <span className="font-bold text-base text-amber-600 dark:text-amber-400">
                {item.credibility_score !== null && item.credibility_score !== undefined
                  ? `${Math.round(item.credibility_score)}%`
                  : "Not Analyzed"}
              </span>
            </div>

            <div>
              <span className="text-xs text-muted-foreground block">Submitted Date</span>
              <span className="text-xs font-medium">
                {new Date(item.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Analysis Summary Box (if present) */}
          {item.analysis_summary && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-xs text-amber-700 dark:text-amber-300">
                <Sparkles className="h-4 w-4" />
                AI Analysis Summary
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed">
                {item.analysis_summary}
              </p>
            </div>
          )}

          {/* Content Body */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
              Content Text
            </h4>
            <div className="p-4 rounded-xl bg-muted/20 border text-sm text-foreground leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto font-sans">
              {item.content}
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground border-t pt-3">
            {item.author && (
              <div className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                <span>Author: <strong className="text-foreground">{item.author}</strong></span>
              </div>
            )}

            {item.source && (
              <div className="flex items-center gap-1.5">
                <ExternalLink className="h-3.5 w-3.5" />
                <a
                  href={item.source.startsWith("http") ? item.source : `https://${item.source}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-700 dark:text-amber-400 hover:underline truncate max-w-[200px]"
                >
                  {item.source}
                </a>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button
            onClick={() => {
              onOpenChange(false);
              onAnalyze(item);
            }}
            className="bg-amber-700 hover:bg-amber-800 text-white dark:bg-amber-600 dark:hover:bg-amber-700"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            {item.analysis_summary ? "Re-analyze with AI" : "Analyze with AI"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
