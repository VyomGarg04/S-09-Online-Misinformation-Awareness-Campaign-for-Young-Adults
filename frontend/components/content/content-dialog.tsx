"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContentItem, ContentType } from "@/types/content";

interface ContentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (formData: {
    title: string;
    content: string;
    content_type: ContentType;
    author?: string;
    source?: string;
    theme?: string;
    subtheme?: string;
  }) => Promise<void>;
  initialData?: ContentItem | null;
  isLoading: boolean;
}

export function ContentDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  isLoading,
}: ContentDialogProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [contentType, setContentType] = useState<ContentType>("NEWS");
  const [author, setAuthor] = useState("");
  const [source, setSource] = useState("");
  const [theme, setTheme] = useState("");
  const [subtheme, setSubtheme] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setContent(initialData.content || "");
      setContentType(initialData.content_type || "NEWS");
      setAuthor(initialData.author || "");
      setSource(initialData.source || "");
      setTheme(initialData.theme || "");
      setSubtheme(initialData.subtheme || "");
    } else {
      setTitle("");
      setContent("");
      setContentType("NEWS");
      setAuthor("");
      setSource("");
      setTheme("");
      setSubtheme("");
    }
  }, [initialData, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    await onSubmit({
      title,
      content,
      content_type: contentType,
      author: author || undefined,
      source: source || undefined,
      theme: theme || undefined,
      subtheme: subtheme || undefined,
    });
  };

  const isEditing = Boolean(initialData);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {isEditing ? "Edit Content" : "Add New Content"}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Update the details for this content entry."
                : "Submit a new article, post, or claim for misinformation checking."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Title */}
            <div className="space-y-1.5">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Article or post headline..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Content Body */}
            <div className="space-y-1.5">
              <Label htmlFor="content">Full Text or Extract *</Label>
              <Textarea
                id="content"
                placeholder="Paste content snippet or full claim text..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                required
              />
            </div>

            {/* Row: Content Type & Author */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="content_type">Content Type *</Label>
                <Select
                  value={contentType}
                  onValueChange={(val) => setContentType(val as ContentType)}
                >
                  <SelectTrigger id="content_type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NEWS">News Article</SelectItem>
                    <SelectItem value="BLOG">Blog Post</SelectItem>
                    <SelectItem value="SOCIAL_POST">Social Post</SelectItem>
                    <SelectItem value="X_POST">X (Twitter)</SelectItem>
                    <SelectItem value="WHATSAPP_FORWARD">WhatsApp Forward</SelectItem>
                    <SelectItem value="VIDEO_TRANSCRIPT">Video Transcript</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="author">Author / Channel</Label>
                <Input
                  id="author"
                  placeholder="e.g. Jane Doe, Reuters"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
            </div>

            {/* Source URL */}
            <div className="space-y-1.5">
              <Label htmlFor="source">Source URL</Label>
              <Input
                id="source"
                type="url"
                placeholder="https://example.com/article..."
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
            </div>

            {/* Row: Theme & Subtheme */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="theme">Category / Theme</Label>
                <Input
                  id="theme"
                  placeholder="e.g. Science, Health, Politics"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="subtheme">Subtheme</Label>
                <Input
                  id="subtheme"
                  placeholder="e.g. Space, Elections, AI"
                  value={subtheme}
                  onChange={(e) => setSubtheme(e.target.value)}
                />
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !title.trim() || !content.trim()}
              className="bg-amber-700 hover:bg-amber-800 text-white dark:bg-amber-600 dark:hover:bg-amber-700"
            >
              {isLoading
                ? "Saving..."
                : isEditing
                ? "Update Content"
                : "Create Content"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
