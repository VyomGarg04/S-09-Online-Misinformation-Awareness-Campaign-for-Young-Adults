"use client";

import { Search, X, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContentType, FactCheckStatus } from "@/types/content";

interface ContentFiltersProps {
  search: string;
  onSearchChange: (val: string) => void;
  contentType: string;
  onContentTypeChange: (val: string) => void;
  status: string;
  onStatusChange: (val: string) => void;
  theme: string;
  onThemeChange: (val: string) => void;
  onReset: () => void;
}

export function ContentFilters({
  search,
  onSearchChange,
  contentType,
  onContentTypeChange,
  status,
  onStatusChange,
  theme,
  onThemeChange,
  onReset,
}: ContentFiltersProps) {
  const hasActiveFilters = search || (contentType && contentType !== "ALL") || (status && status !== "ALL") || theme;

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-card p-4 rounded-xl border border-amber-200/50 dark:border-amber-900/30 shadow-xs">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search titles, source, or author..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 bg-background/80"
          />
        </div>

        {/* Content Type Filter */}
        <Select value={contentType} onValueChange={(val) => onContentTypeChange(val || "ALL")}>
          <SelectTrigger className="w-full sm:w-[170px] bg-background/80">
            <SelectValue placeholder="Content Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Types</SelectItem>
            <SelectItem value="NEWS">News</SelectItem>
            <SelectItem value="BLOG">Blog</SelectItem>
            <SelectItem value="SOCIAL_POST">Social Post</SelectItem>
            <SelectItem value="X_POST">X (Twitter)</SelectItem>
            <SelectItem value="WHATSAPP_FORWARD">WhatsApp Forward</SelectItem>
            <SelectItem value="VIDEO_TRANSCRIPT">Video Transcript</SelectItem>
          </SelectContent>
        </Select>

        {/* Fact Check Status Filter */}
        <Select value={status} onValueChange={(val) => onStatusChange(val || "ALL")}>
          <SelectTrigger className="w-full sm:w-[170px] bg-background/80">
            <SelectValue placeholder="Fact Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Statuses</SelectItem>
            <SelectItem value="VERIFIED">Verified</SelectItem>
            <SelectItem value="MISLEADING">Misleading</SelectItem>
            <SelectItem value="FALSE">False</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="UNVERIFIABLE">Unverifiable</SelectItem>
          </SelectContent>
        </Select>

        {/* Theme Search/Input */}
        <Input
          placeholder="Filter by Theme..."
          value={theme}
          onChange={(e) => onThemeChange(e.target.value)}
          className="w-full sm:w-[160px] bg-background/80"
        />
      </div>

      {hasActiveFilters && (
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
