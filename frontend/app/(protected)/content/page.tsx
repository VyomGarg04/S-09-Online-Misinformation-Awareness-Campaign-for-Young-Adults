"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ContentHeader } from "@/components/content/content-header";
import { ContentFilters } from "@/components/content/content-filters";
import { ContentTable } from "@/components/content/content-table";
import { ContentDialog } from "@/components/content/content-dialog";
import { ContentDetailModal } from "@/components/content/content-detail-modal";
import { BatchImportModal } from "@/components/content/batch-import-modal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import {
  listContent,
  createContent,
  updateContent,
  deleteContent,
} from "@/services/content";
import { ContentItem, ContentType, FactCheckStatus } from "@/types/content";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ContentPage() {
  const router = useRouter();

  // Data states
  const [items, setItems] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter states
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [contentType, setContentType] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [theme, setTheme] = useState("");
  const [sortBy, setSortBy] = useState("created_at_desc");

  // Dialog & Modal states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isBatchOpen, setIsBatchOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [detailItem, setDetailItem] = useState<ContentItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<ContentItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch items
  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const params: Parameters<typeof listContent>[0] = {
        page,
        page_size: 10,
      };

      if (search) params.search = search;
      if (contentType && contentType !== "ALL") {
        params.content_type = contentType as ContentType;
      }
      if (status && status !== "ALL") {
        params.status = status as FactCheckStatus;
      }
      if (theme) params.theme = theme;

      const data = await listContent(params);
      setItems(data);
    } catch (err: any) {
      console.error("Failed to load content:", err);
      toast.error(err?.message || "Failed to load content items");
    } finally {
      setIsLoading(false);
    }
  }, [page, search, contentType, status, theme]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Client-side dynamic sorting
  const sortedItems = useMemo(() => {
    const copy = [...items];
    switch (sortBy) {
      case "created_at_asc":
        return copy.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      case "created_at_desc":
        return copy.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      case "credibility_desc":
        return copy.sort((a, b) => (b.credibility_score ?? -1) - (a.credibility_score ?? -1));
      case "credibility_asc":
        return copy.sort((a, b) => (a.credibility_score ?? 999) - (b.credibility_score ?? 999));
      case "title_asc":
        return copy.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return copy;
    }
  }, [items, sortBy]);

  // Reset page when filters change
  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleContentTypeChange = (val: string) => {
    setContentType(val);
    setPage(1);
  };

  const handleStatusChange = (val: string) => {
    setStatus(val);
    setPage(1);
  };

  const handleThemeChange = (val: string) => {
    setTheme(val);
    setPage(1);
  };

  const handleResetFilters = () => {
    setSearch("");
    setContentType("ALL");
    setStatus("ALL");
    setTheme("");
    setSortBy("created_at_desc");
    setPage(1);
  };

  // Create / Update handler
  const handleSaveContent = async (formData: {
    title: string;
    content: string;
    content_type: ContentType;
    author?: string;
    source?: string;
    theme?: string;
    subtheme?: string;
  }) => {
    setIsSaving(true);
    try {
      if (editingItem) {
        await updateContent(editingItem.id, formData);
        toast.success("Content item updated successfully!");
      } else {
        await createContent(formData);
        toast.success("Content item created successfully!");
      }
      setIsDialogOpen(false);
      setEditingItem(null);
      fetchItems();
    } catch (err: any) {
      console.error("Failed to save content:", err);
      toast.error(err?.message || "Failed to save content item");
    } finally {
      setIsSaving(false);
    }
  };

  // Delete handler
  const handleDeleteConfirm = async () => {
    if (!deletingItem) return;
    setIsDeleting(true);
    try {
      await deleteContent(deletingItem.id);
      toast.success("Content deleted successfully!");
      setDeletingItem(null);
      fetchItems();
    } catch (err: any) {
      console.error("Failed to delete content:", err);
      toast.error(err?.message || "Failed to delete content");
    } finally {
      setIsDeleting(false);
    }
  };

  // Action handlers
  const handleOpenAdd = () => {
    setEditingItem(null);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (item: ContentItem) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleViewDetails = (item: ContentItem) => {
    setDetailItem(item);
  };

  const handleAnalyze = (item: ContentItem) => {
    router.push(`/analysis?id=${item.id}`);
  };

  const hasActiveFilters = Boolean(search || (contentType && contentType !== "ALL") || (status && status !== "ALL") || theme);

  return (
    <div className="space-y-6">
      {/* Header */}
      <ContentHeader
        onAddClick={handleOpenAdd}
        onBatchClick={() => setIsBatchOpen(true)}
        totalCount={items.length}
      />

      {/* Filters Bar */}
      <ContentFilters
        search={search}
        onSearchChange={handleSearchChange}
        contentType={contentType}
        onContentTypeChange={handleContentTypeChange}
        status={status}
        onStatusChange={handleStatusChange}
        theme={theme}
        onThemeChange={handleThemeChange}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        onReset={handleResetFilters}
      />

      {/* Table */}
      <ContentTable
        items={sortedItems}
        isLoading={isLoading}
        onView={handleViewDetails}
        onAnalyze={handleAnalyze}
        onEdit={handleOpenEdit}
        onDelete={(item) => setDeletingItem(item)}
        onAddClick={handleOpenAdd}
        hasFilters={hasActiveFilters}
      />

      {/* Simple Pagination Footer */}
      {!isLoading && items.length > 0 && (
        <div className="flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
          <span>
            Page <strong className="text-foreground">{page}</strong> (Showing up to 10 items)
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => p + 1)}
              disabled={items.length < 10}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* Add / Edit Dialog */}
      <ContentDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingItem(null);
        }}
        onSubmit={handleSaveContent}
        initialData={editingItem}
        isLoading={isSaving}
      />

      {/* Batch Import Modal */}
      <BatchImportModal
        open={isBatchOpen}
        onOpenChange={setIsBatchOpen}
        onSuccess={fetchItems}
      />

      {/* Detail Viewer Modal */}
      <ContentDetailModal
        item={detailItem}
        open={Boolean(detailItem)}
        onOpenChange={(open) => {
          if (!open) setDetailItem(null);
        }}
        onAnalyze={handleAnalyze}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={Boolean(deletingItem)}
        onOpenChange={(open) => {
          if (!open) setDeletingItem(null);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-rose-600">
              Delete Content Item
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{deletingItem?.title}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0 mt-4">
            <Button
              variant="outline"
              onClick={() => setDeletingItem(null)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Permanently"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}