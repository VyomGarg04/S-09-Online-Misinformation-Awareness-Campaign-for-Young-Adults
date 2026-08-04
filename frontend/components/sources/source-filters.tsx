"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SourceFiltersProps {
  search: string;
  onSearchChange: (val: string) => void;
  factual: string;
  onFactualChange: (val: string) => void;
  bias: string;
  onBiasChange: (val: string) => void;
  onReset: () => void;
}

export function SourceFilters({
  search,
  onSearchChange,
  factual,
  onFactualChange,
  bias,
  onBiasChange,
  onReset,
}: SourceFiltersProps) {
  const hasActive = search || factual !== "ALL" || bias !== "ALL";

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-card p-4 rounded-xl border border-amber-200/50 dark:border-amber-900/30 shadow-xs">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search news outlets by name or domain..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 bg-background/80"
          />
        </div>

        {/* Factual Filter */}
        <Select value={factual} onValueChange={(val) => onFactualChange(val || "ALL")}>
          <SelectTrigger className="w-full sm:w-[170px] bg-background/80">
            <SelectValue placeholder="Factual Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Accuracy</SelectItem>
            <SelectItem value="HIGH">High / Very High</SelectItem>
            <SelectItem value="MIXED">Mixed Accuracy</SelectItem>
            <SelectItem value="LOW">Low Accuracy</SelectItem>
          </SelectContent>
        </Select>

        {/* Bias Filter */}
        <Select value={bias} onValueChange={(val) => onBiasChange(val || "ALL")}>
          <SelectTrigger className="w-full sm:w-[170px] bg-background/80">
            <SelectValue placeholder="Bias Spectrum" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Biases</SelectItem>
            <SelectItem value="CENTER">Center (Least Biased)</SelectItem>
            <SelectItem value="CENTER_LEFT">Center-Left</SelectItem>
            <SelectItem value="CENTER_RIGHT">Center-Right</SelectItem>
            <SelectItem value="LEFT">Left Bias</SelectItem>
            <SelectItem value="RIGHT">Right Bias</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {hasActive && (
        <Button
          variant="ghost"
          onClick={onReset}
          className="self-end sm:self-auto text-xs text-muted-foreground hover:text-foreground"
        >
          <X className="mr-1 h-3.5 w-3.5" />
          Reset Filters
        </Button>
      )}
    </div>
  );
}
