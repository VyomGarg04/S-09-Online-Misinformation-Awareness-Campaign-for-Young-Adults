"use client";

import { useState } from "react";
import { Link2, FileText, Upload, Sparkles, Database } from "lucide-react";
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

interface AnalysisInputFormProps {
  existingItems: ContentItem[];
  selectedContentId: number | null;
  onSelectExisting: (id: number) => void;
  onAnalyzeNew: (data: {
    title: string;
    content: string;
    content_type: ContentType;
    source?: string;
    theme?: string;
  }) => Promise<void>;
  onAnalyzeExisting: (id: number) => Promise<void>;
  isAnalyzing: boolean;
}

type TabMode = "text" | "url" | "file";

export function AnalysisInputForm({
  existingItems,
  selectedContentId,
  onSelectExisting,
  onAnalyzeNew,
  onAnalyzeExisting,
  isAnalyzing,
}: AnalysisInputFormProps) {
  const [activeTab, setActiveTab] = useState<TabMode>("url");

  // Form states for new submission
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [contentType, setContentType] = useState<ContentType>("NEWS");
  const [theme, setTheme] = useState("");

  const handleRunNew = async (e: React.FormEvent) => {
    e.preventDefault();

    let finalTitle = title.trim();
    let finalContent = content.trim();

    if (activeTab === "url") {
      if (!url.trim()) return;
      if (!finalTitle) {
        try {
          const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
          finalTitle = `Analysis of ${parsed.hostname}`;
        } catch {
          finalTitle = `Article from ${url}`;
        }
      }
      if (!finalContent) {
        finalContent = `URL submitted for credibility verification: ${url}`;
      }
    }

    if (!finalTitle || !finalContent) return;

    await onAnalyzeNew({
      title: finalTitle,
      content: finalContent,
      content_type: contentType,
      source: url || undefined,
      theme: theme || undefined,
    });
  };

  const handleRunExisting = async () => {
    if (selectedContentId) {
      await onAnalyzeExisting(selectedContentId);
    }
  };

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-xs space-y-6">
      {/* Existing Content Item Selector */}
      {existingItems.length > 0 && (
        <div className="p-4 rounded-xl bg-muted/40 border space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <Database className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <span>Option 1: Analyze an item from your Content Library</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Select
              value={selectedContentId ? String(selectedContentId) : ""}
              onValueChange={(val) => onSelectExisting(Number(val))}
            >
              <SelectTrigger className="flex-1 bg-background">
                <SelectValue placeholder="Choose a content item from database..." />
              </SelectTrigger>
              <SelectContent>
                {existingItems.map((item) => (
                  <SelectItem key={item.id} value={String(item.id)}>
                    {item.title} ({item.content_type}) - {item.fact_check_status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={handleRunExisting}
              disabled={!selectedContentId || isAnalyzing}
              className="w-full sm:w-auto bg-amber-700 hover:bg-amber-800 text-white dark:bg-amber-600 dark:hover:bg-amber-700 shrink-0"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {isAnalyzing ? "Analyzing..." : "Analyze Item"}
            </Button>
          </div>
        </div>
      )}

      {/* New Input Section Header */}
      <div>
        <h3 className="text-base font-bold text-foreground">
          {existingItems.length > 0 ? "Option 2: Analyze New Content" : "Submit Content for AI Analysis"}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Paste a URL, raw text, or upload a claim screenshot.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex rounded-xl bg-muted p-1 gap-1">
        <button
          type="button"
          onClick={() => setActiveTab("url")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === "url"
              ? "bg-background text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Link2 className="h-4 w-4 text-amber-600" />
          <span>URL Link</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("text")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === "text"
              ? "bg-background text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <FileText className="h-4 w-4 text-amber-600" />
          <span>Paste Text</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("file")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === "file"
              ? "bg-background text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Upload className="h-4 w-4 text-amber-600" />
          <span>Media / Screenshot</span>
        </button>
      </div>

      {/* Form Body */}
      <form onSubmit={handleRunNew} className="space-y-4">
        {/* Tab 1: URL */}
        {activeTab === "url" && (
          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="url">Article or Social Media URL *</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://news.example.com/article-123"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="title_url">Title (Optional)</Label>
                <Input
                  id="title_url"
                  placeholder="Auto-extracted if blank..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="type_url">Content Type</Label>
                <Select
                  value={contentType}
                  onValueChange={(val) => setContentType(val as ContentType)}
                >
                  <SelectTrigger id="type_url">
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
            </div>
          </div>
        )}

        {/* Tab 2: Raw Text */}
        {activeTab === "text" && (
          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="title_text">Claim Title or Headline *</Label>
              <Input
                id="title_text"
                placeholder="e.g. Viral claim about new medical discovery..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="content_text">Claim Content / Text *</Label>
              <Textarea
                id="content_text"
                placeholder="Paste full message, claim body, or social media post text here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="type_text">Content Type</Label>
                <Select
                  value={contentType}
                  onValueChange={(val) => setContentType(val as ContentType)}
                >
                  <SelectTrigger id="type_text">
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

              <div className="space-y-1">
                <Label htmlFor="theme_text">Topic / Theme</Label>
                <Input
                  id="theme_text"
                  placeholder="e.g. Health, Politics, Technology"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Media Upload Simulation */}
        {activeTab === "file" && (
          <div className="space-y-3">
            <div className="border-2 border-dashed rounded-xl p-6 text-center hover:bg-muted/30 transition-colors">
              <Upload className="mx-auto h-8 w-8 text-amber-600 dark:text-amber-400 mb-2" />
              <p className="text-sm font-medium text-foreground">
                Drop screenshot, image, or document here
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG, PDF up to 10MB. OCR will extract text claims automatically.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-3 text-xs"
                onClick={() => {
                  setTitle("Screenshot claim verification");
                  setContent("Extracted OCR text: Breaking news report shared on messaging group claiming unverified health miracle remedy.");
                }}
              >
                Use Sample OCR Screenshot Text
              </Button>
            </div>

            {content && (
              <div className="p-3 rounded-lg bg-muted/40 text-xs text-foreground">
                <strong>Extracted Text Preview:</strong> {content}
              </div>
            )}
          </div>
        )}

        {/* Submit button */}
        <Button
          type="submit"
          disabled={isAnalyzing}
          className="w-full h-11 text-sm font-semibold bg-amber-700 hover:bg-amber-800 text-white dark:bg-amber-600 dark:hover:bg-amber-700 shadow-md"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          {isAnalyzing ? "Running AI Credibility Engine..." : "Analyze Credibility with AI"}
        </Button>
      </form>
    </div>
  );
}
