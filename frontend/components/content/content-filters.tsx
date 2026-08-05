"use client";

import { Search, X, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContentFiltersProps {
  search: string;
  onSearchChange: (val: string) => void;
  contentType: string;
  onContentTypeChange: (val: string) => void;
  status: string;
  onStatusChange: (val: string) => void;
  theme: string;
  onThemeChange: (val: string) => void;
  sortBy: string;
  onSortByChange: (val: string) => void;
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
  sortBy,
  onSortByChange,
  onReset,
}: ContentFiltersProps) {
  const hasActiveFilters = search || (contentType && contentType !== "ALL") || (status && status !== "ALL") || theme || (sortBy && sortBy !== "created_at_desc");

  return (
    <div className="flex flex-col gap-3 bg-card p-4 rounded-xl border border-amber-200/50 dark:border-amber-900/30 shadow-xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Search Input */}
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search titles, content, or author..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 bg-background/80"
          />
        </div>

        {/* Content Type Filter */}
        <Select value={contentType} onValueChange={(val) => onContentTypeChange(val || "ALL")}>
          <SelectTrigger className="w-full bg-background/80">
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
          <SelectTrigger className="w-full bg-background/80">
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

        {/* Sort By Dropdown */}
        <Select value={sortBy} onValueChange={(val) => val && onSortByChange(val)}>
          <SelectTrigger className="w-full bg-background/80">
            <div className="flex items-center gap-1.5 truncate">
              <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <SelectValue placeholder="Sort By" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="created_at_desc">Date: Newest First</SelectItem>
            <SelectItem value="created_at_asc">Date: Oldest First</SelectItem>
            <SelectItem value="credibility_desc">Credibility: High to Low</SelectItem>
            <SelectItem value="credibility_asc">Credibility: Low to High</SelectItem>
            <SelectItem value="title_asc">Title: A to Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Filter by Theme..."
            value={theme}
            onChange={(e) => onThemeChange(e.target.value)}
            className="w-48 h-8 text-xs bg-background/80"
          />
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-xs text-muted-foreground hover:text-foreground h-8"
          >
            <X className="mr-1 h-3.5 w-3.5" />
            Reset Filters
          </Button>
        )}
      </div>
    </div>
  );
}
