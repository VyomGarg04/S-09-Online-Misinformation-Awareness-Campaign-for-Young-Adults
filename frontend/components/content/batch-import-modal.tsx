"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Layers, Sparkles, CheckCircle2 } from "lucide-react";
import { createContent } from "@/services/content";
import { ContentType } from "@/types/content";
import { toast } from "sonner";

interface BatchImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function BatchImportModal({
  open,
  onOpenChange,
  onSuccess,
}: BatchImportModalProps) {
  const [rawText, setRawText] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [importedCount, setImportedCount] = useState<number | null>(null);

  const handleImport = async () => {
    const lines = rawText
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length === 0) return;

    setIsImporting(true);
    setImportedCount(null);

    let count = 0;
    try {
      for (const line of lines) {
        let isUrl = false;
        try {
          new URL(line.startsWith("http") ? line : `https://${line}`);
          isUrl = line.includes(".");
        } catch {
          isUrl = false;
        }

        const title = isUrl ? `Article URL: ${line}` : line.slice(0, 60);
        const content = isUrl ? `Submitted URL for bulk verification: ${line}` : line;

        await createContent({
          title,
          content,
          content_type: (isUrl ? "NEWS" : "SOCIAL_POST") as ContentType,
          source: isUrl ? line : undefined,
          theme: "Batch Import",
        });

        count++;
      }

      setImportedCount(count);
      toast.success(`Successfully imported ${count} content items!`);
      setRawText("");
      onSuccess();
    } catch (err: any) {
      console.error("Batch import error:", err);
      toast.error(err?.message || "Batch import failed");
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <DialogTitle className="text-xl font-bold">
              Batch Claim & URL Importer
            </DialogTitle>
          </div>
          <DialogDescription>
            Paste multiple news URLs or claim headlines (one per line) for bulk intake.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="batch-text">Claims or URLs (One per line) *</Label>
            <Textarea
              id="batch-text"
              placeholder={`https://news.example.com/article-1\nhttps://news.example.com/article-2\nViral claim about new health regulation...`}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              rows={6}
              className="font-mono text-xs"
            />
          </div>

          {importedCount !== null && (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-300 font-semibold">
              <CheckCircle2 className="h-4 w-4" />
              <span>Imported {importedCount} claims into database!</span>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          <Button
            onClick={handleImport}
            disabled={isImporting || !rawText.trim()}
            className="bg-amber-700 hover:bg-amber-800 text-white dark:bg-amber-600 text-xs gap-1.5"
          >
            <Sparkles className="h-4 w-4" />
            {isImporting ? "Importing Items..." : "Batch Import Claims"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
