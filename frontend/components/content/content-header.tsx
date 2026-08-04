"use client";

import { Plus, Database, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContentHeaderProps {
  onAddClick: () => void;
  onBatchClick?: () => void;
  totalCount?: number;
}

export function ContentHeader({
  onAddClick,
  onBatchClick,
  totalCount,
}: ContentHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-6">
      <div>
        <div className="flex items-center gap-2">
          <Database className="h-6 w-6 text-amber-600 dark:text-amber-500" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Content Library
          </h1>
          {typeof totalCount === "number" && (
            <span className="rounded-full bg-amber-100 dark:bg-amber-900/40 px-2.5 py-0.5 text-xs font-semibold text-amber-800 dark:text-amber-300">
              {totalCount} items
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage submitted content, monitor fact-checking statuses, and trigger AI credibility analysis.
        </p>
      </div>

      <div className="flex items-center gap-2">
        {onBatchClick && (
          <Button
            variant="outline"
            onClick={onBatchClick}
            className="text-xs font-semibold gap-1.5"
          >
            <Layers className="h-4 w-4 text-amber-600" />
            Batch Import
          </Button>
        )}

        <Button
          onClick={onAddClick}
          className="bg-amber-700 hover:bg-amber-800 text-white dark:bg-amber-600 dark:hover:bg-amber-700 shadow-sm text-xs font-semibold"
        >
          <Plus className="mr-1.5 h-4 w-4" />
          Add Content
        </Button>
      </div>
    </div>
  );
}
