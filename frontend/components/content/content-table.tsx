"use client";

import {
  MoreVertical,
  Eye,
  Sparkles,
  Edit,
  Trash2,
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  Clock,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ContentItem, FactCheckStatus } from "@/types/content";

interface ContentTableProps {
  items: ContentItem[];
  isLoading: boolean;
  onView: (item: ContentItem) => void;
  onAnalyze: (item: ContentItem) => void;
  onEdit: (item: ContentItem) => void;
  onDelete: (item: ContentItem) => void;
}

export function ContentTable({
  items,
  isLoading,
  onView,
  onAnalyze,
  onEdit,
  onDelete,
}: ContentTableProps) {
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl border bg-card">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-600 border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading content items...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed bg-card/50 p-6 text-center">
        <HelpCircle className="h-10 w-10 text-muted-foreground/60 mb-2" />
        <h3 className="text-lg font-semibold text-foreground">No content found</h3>
        <p className="text-sm text-muted-foreground max-w-sm mt-1">
          No content matches your current search and filter criteria. Try resetting filters or adding new content.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card overflow-hidden shadow-xs">
      <Table>
        <TableHeader className="bg-muted/40">
          <TableRow>
            <TableHead className="w-[300px]">Title & Details</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Credibility</TableHead>
            <TableHead>Source / Author</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-[60px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id} className="hover:bg-muted/30 transition-colors">
              {/* Title & Preview */}
              <TableCell className="font-medium">
                <div className="space-y-1 max-w-[280px]">
                  <button
                    onClick={() => onView(item)}
                    className="font-semibold text-foreground hover:text-amber-600 dark:hover:text-amber-400 text-left line-clamp-1 transition-colors"
                  >
                    {item.title}
                  </button>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {item.content}
                  </p>
                  {item.theme && (
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                      {item.theme} {item.subtheme ? `• ${item.subtheme}` : ""}
                    </span>
                  )}
                </div>
              </TableCell>

              {/* Type */}
              <TableCell>
                <Badge variant="outline" className="text-xs font-mono">
                  {item.content_type.replace("_", " ")}
                </Badge>
              </TableCell>

              {/* Fact Check Status Badge */}
              <TableCell>
                <StatusBadge status={item.fact_check_status} />
              </TableCell>

              {/* Credibility Score */}
              <TableCell>
                {item.credibility_score !== null && item.credibility_score !== undefined ? (
                  <div className="flex items-center gap-1.5 font-bold text-sm">
                    <span className={getCredibilityColor(item.credibility_score)}>
                      {Math.round(item.credibility_score)}%
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground italic">Pending</span>
                )}
              </TableCell>

              {/* Author / Source */}
              <TableCell className="text-xs text-muted-foreground">
                {item.source ? (
                  <a
                    href={item.source.startsWith("http") ? item.source : `https://${item.source}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-amber-700 dark:text-amber-400 hover:underline max-w-[140px] truncate"
                  >
                    <span className="truncate">{item.author || item.source}</span>
                    <ExternalLink className="h-3 w-3 flex-shrink-0" />
                  </a>
                ) : (
                  <span>{item.author || "—"}</span>
                )}
              </TableCell>

              {/* Date */}
              <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                {new Date(item.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </TableCell>

              {/* Actions Dropdown */}
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuItem onClick={() => onView(item)}>
                      <Eye className="mr-2 h-4 w-4 text-blue-500" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onAnalyze(item)}>
                      <Sparkles className="mr-2 h-4 w-4 text-amber-500" />
                      Analyze with AI
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(item)}>
                      <Edit className="mr-2 h-4 w-4 text-gray-500" />
                      Edit Content
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onDelete(item)}
                      className="text-rose-600 focus:text-rose-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function StatusBadge({ status }: { status: FactCheckStatus }) {
  const upperStatus = String(status).toUpperCase();

  switch (upperStatus) {
    case "VERIFIED":
      return (
        <Badge className="bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 border-emerald-200 dark:border-emerald-800 gap-1">
          <ShieldCheck className="h-3 w-3" />
          Verified
        </Badge>
      );
    case "MISLEADING":
      return (
        <Badge className="bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 hover:bg-amber-100 border-amber-200 dark:border-amber-800 gap-1">
          <AlertTriangle className="h-3 w-3" />
          Misleading
        </Badge>
      );
    case "FALSE":
      return (
        <Badge className="bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 hover:bg-rose-100 border-rose-200 dark:border-rose-800 gap-1">
          <AlertOctagon className="h-3 w-3" />
          False
        </Badge>
      );
    case "UNVERIFIABLE":
      return (
        <Badge className="bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 hover:bg-purple-100 border-purple-200 dark:border-purple-800 gap-1">
          <HelpCircle className="h-3 w-3" />
          Unverifiable
        </Badge>
      );
    default:
      return (
        <Badge variant="secondary" className="gap-1">
          <Clock className="h-3 w-3 text-muted-foreground" />
          Pending
        </Badge>
      );
  }
}

function getCredibilityColor(score: number): string {
  if (score >= 75) return "text-emerald-600 dark:text-emerald-400";
  if (score >= 45) return "text-amber-600 dark:text-amber-400";
  return "text-rose-600 dark:text-rose-400";
}
