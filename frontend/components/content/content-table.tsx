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
  PlusCircle,
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
import { Skeleton } from "@/components/ui/skeleton";
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
  onAddClick?: () => void;
  hasFilters?: boolean;
}

export function ContentTable({
  items,
  isLoading,
  onView,
  onAnalyze,
  onEdit,
  onDelete,
  onAddClick,
  hasFilters = false,
}: ContentTableProps) {
  // Skeleton Loader State
  if (isLoading) {
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
            {Array.from({ length: 5 }).map((_, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </TableCell>
                <TableCell><Skeleton className="h-5 w-16 rounded-full" /></TableCell>
                <TableCell><Skeleton className="h-5 w-20 rounded-full" /></TableCell>
                <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto rounded-lg" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  // Empty State
  if (items.length === 0) {
    return (
      <div className="flex h-72 flex-col items-center justify-center rounded-xl border border-dashed bg-card/50 p-6 text-center shadow-xs">
        <HelpCircle className="h-10 w-10 text-amber-600/70 dark:text-amber-400/70 mb-3" />
        <h3 className="text-lg font-bold text-foreground">No content found</h3>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-md mt-1 mb-4">
          {hasFilters
            ? "No articles match your active search and filter criteria. Try resetting filters."
            : "Your content database is empty. Create your first article to begin tracking and AI fact-checking claims."}
        </p>
        {onAddClick && !hasFilters && (
          <Button
            onClick={onAddClick}
            className="bg-amber-700 hover:bg-amber-800 text-white dark:bg-amber-600 dark:hover:bg-amber-700 text-xs font-semibold gap-1.5 shadow-sm"
          >
            <PlusCircle className="h-4 w-4" />
            Create First Article
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <Table className="min-w-[700px]">
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
                    <DropdownMenuTrigger className="inline-flex size-8 items-center justify-center rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                      <MoreVertical className="h-4 w-4" />
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
