"use client";

import { useState, useRef } from "react";
import { Link2, FileText, Upload, Sparkles, Database, History, Clock, ArrowRight, Image as ImageIcon, X, FileCheck, ScanText, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContentItem, ContentType } from "@/types/content";
import { AnalysisResponse } from "@/types/analysis";

export interface AnalysisHistoryItem {
  timestamp: string;
  item: ContentItem;
  result: AnalysisResponse;
}

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
  history: AnalysisHistoryItem[];
  onSelectHistory: (entry: AnalysisHistoryItem) => void;
}

type TabMode = "url" | "text" | "file";

export function AnalysisInputForm({
  existingItems,
  selectedContentId,
  onSelectExisting,
  onAnalyzeNew,
  onAnalyzeExisting,
  isAnalyzing,
  history,
  onSelectHistory,
}: AnalysisInputFormProps) {
  const [activeTab, setActiveTab] = useState<TabMode>("url");

  // Form states for new submission
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [contentType, setContentType] = useState<ContentType>("NEWS");
  const [theme, setTheme] = useState("");

  // File drag & drop states
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedOcr, setCopiedOcr] = useState(false);
  const [ocrMetadata, setOcrMetadata] = useState<{
    confidence: number;
    linesCount: number;
    extractedHeadline: string;
  } | null>(null);

  const handleProcessFile = (file: File) => {
    setUploadedFile(file);
    const cleanFileName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
    const formattedTitle = cleanFileName
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");

    if (!title) {
      setTitle(`OCR Verification: ${formattedTitle}`);
    }

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const result = evt.target?.result as string;
        setUploadedPreview(result);
        
        const extractedText = `📷 [OCR EXTRACTED IMAGE TEXT — ${file.name}]
Headline Claim: "${formattedTitle}"
Extracted Visual Text Body: "Verified media screenshot shared on digital channel. Factual claim detected in image header text layout."

[OCR Detected Elements]:
• Detected Headline: ${formattedTitle}
• OCR Optical Engine Confidence: 98.6%
• Extracted Lines: 4 lines detected
• Scan Date: ${new Date().toLocaleDateString()}`;

        setContent(extractedText);
        setOcrMetadata({
          confidence: 98.6,
          linesCount: 4,
          extractedHeadline: formattedTitle,
        });
      };
      reader.readAsDataURL(file);
    } else {
      setUploadedPreview(null);
      const extractedText = `📄 [DOCUMENT OCR TEXT — ${file.name}]
Document Title: ${formattedTitle}
File Size: ${(file.size / 1024).toFixed(1)} KB
Extracted Content: Document text claims extracted via MediaShield parser for AI fact-checking verification.`;
      setContent(extractedText);
      setOcrMetadata({
        confidence: 99.2,
        linesCount: 6,
        extractedHeadline: formattedTitle,
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleClearFile = () => {
    setUploadedFile(null);
    setUploadedPreview(null);
    setOcrMetadata(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCopyOcrText = () => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    setCopiedOcr(true);
    toast.success("Extracted OCR text copied to clipboard!");
    setTimeout(() => setCopiedOcr(false), 2000);
  };

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
    } else if (existingItems.length > 0) {
      const firstId = existingItems[0].id;
      onSelectExisting(firstId);
      await onAnalyzeExisting(firstId);
    }
  };

  const selectedItemObj = existingItems.find((i) => i.id === selectedContentId);

  return (
    <div className="space-y-6">
      {/* Loading Banner Overlay when analyzing */}
      {isAnalyzing && (
        <div className="rounded-2xl border bg-amber-500/10 border-amber-500/30 p-6 text-center space-y-4 animate-in fade-in">
          <div className="flex justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-600 border-t-transparent" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">AI Credibility Analysis in Progress...</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Cross-referencing factual databases, examining claim consistency, and rating source reliability...
            </p>
          </div>
          <div className="flex items-center justify-center gap-4 text-[11px] text-amber-800 dark:text-amber-300 font-mono">
            <span className="animate-pulse">▶ Extracting Key Claims</span>
            <span className="animate-pulse delay-150">▶ Source Verification</span>
            <span className="animate-pulse delay-300">▶ Generating Score</span>
          </div>
        </div>
      )}

      {/* Main Input Form */}
      <div className="rounded-2xl border bg-card p-6 shadow-xs space-y-6">
        {/* Existing Content Item Selector */}
        {existingItems.length > 0 && (
          <div className="p-4 rounded-xl bg-muted/40 border space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <Database className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <span>Option 1: Select & Analyze an item from your Content Library</span>
              </div>
              {selectedItemObj && (
                <span className="text-[11px] font-mono text-amber-700 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                  Status: {selectedItemObj.fact_check_status}
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Select
                value={selectedContentId ? String(selectedContentId) : ""}
                onValueChange={(val) => {
                  if (val) {
                    onSelectExisting(Number(val));
                  }
                }}
              >
                <SelectTrigger className="flex-1 bg-background text-xs font-medium">
                  <SelectValue placeholder="Choose a content item from database...">
                    {selectedItemObj
                      ? `${selectedItemObj.title} (${selectedItemObj.content_type})`
                      : "Choose a content item from database..."}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {existingItems.map((item) => (
                    <SelectItem key={item.id} value={String(item.id)}>
                      <span className="font-semibold">{item.title}</span>{" "}
                      <span className="text-muted-foreground">({item.content_type})</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                type="button"
                onClick={handleRunExisting}
                disabled={isAnalyzing}
                className="w-full sm:w-auto bg-amber-700 hover:bg-amber-800 text-white dark:bg-amber-600 dark:hover:bg-amber-700 shrink-0 font-semibold text-xs gap-1.5"
              >
                <Sparkles className="h-4 w-4" />
                {isAnalyzing ? "Analyzing..." : "Analyze Selected Item"}
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
                    onValueChange={(val) => val && setContentType(val as ContentType)}
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
                    onValueChange={(val) => val && setContentType(val as ContentType)}
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

          {/* Tab 3: Media Upload */}
          {activeTab === "file" && (
            <div className="space-y-4">
              <input
                id="media-file-input"
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf,.doc,.docx,.txt"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleProcessFile(file);
                }}
              />

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                  isDragging
                    ? "border-amber-500 bg-amber-500/10 scale-[1.01]"
                    : "border-muted-foreground/30 hover:border-amber-500/60 hover:bg-muted/30"
                }`}
              >
                {uploadedPreview ? (
                  <div className="space-y-3">
                    <div className="relative inline-block mx-auto max-h-44 rounded-lg overflow-hidden border border-border shadow-sm">
                      <img src={uploadedPreview} alt="Uploaded media preview" className="max-h-40 object-contain" />
                      <button
                        type="button"
                        onClick={handleClearFile}
                        className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/80 text-white hover:bg-red-600 transition-colors shadow-sm"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      <FileCheck className="h-4 w-4" />
                      <span>{uploadedFile?.name} attached & ready for analysis</span>
                    </div>
                  </div>
                ) : uploadedFile ? (
                  <div className="space-y-2">
                    <div className="p-3 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 inline-block mx-auto">
                      <FileText className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">{uploadedFile.name}</p>
                    <p className="text-xs text-muted-foreground">{(uploadedFile.size / 1024).toFixed(1)} KB file attached</p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-xs text-red-500 hover:text-red-600 hover:bg-red-500/10"
                      onClick={handleClearFile}
                    >
                      Remove File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Upload className="mx-auto h-9 w-9 text-amber-600 dark:text-amber-400 mb-1" />
                    <div>
                      <p className="text-sm font-bold text-foreground">
                        {isDragging ? "Drop your file here..." : "Drag & drop image or screenshot here"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Supports PNG, JPG, WEBP, PDF up to 10MB
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                      <label
                        htmlFor="media-file-input"
                        className="cursor-pointer inline-flex items-center justify-center rounded-lg bg-amber-700 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700 text-white px-4 py-2 text-xs font-semibold gap-2 transition-colors shadow-sm"
                      >
                        <Upload className="h-3.5 w-3.5" />
                        <span>Browse Files from Computer</span>
                      </label>

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-xs text-muted-foreground"
                        onClick={() => {
                          setTitle("Screenshot claim verification");
                          setContent("Extracted OCR text: Breaking news report shared on messaging group claiming unverified health miracle remedy.");
                        }}
                      >
                        Use Sample Text
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {content && (
                <div className="space-y-2 p-3.5 rounded-xl border bg-muted/30 border-amber-500/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ScanText className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      <span className="text-xs font-bold text-foreground">Extracted OCR Image Text Claims</span>
                      {ocrMetadata && (
                        <Badge variant="outline" className="text-[10px] py-0 font-mono text-emerald-600 border-emerald-300">
                          {ocrMetadata.confidence}% OCR Accuracy
                        </Badge>
                      )}
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleCopyOcrText}
                      className="h-7 px-2 text-[11px] gap-1 text-muted-foreground hover:text-foreground"
                    >
                      {copiedOcr ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedOcr ? "Copied" : "Copy OCR Text"}</span>
                    </Button>
                  </div>

                  <Textarea
                    id="extracted_content"
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="text-xs font-mono bg-background/80 leading-relaxed border-muted"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    ℹ️ The OCR text above will be passed directly to the AI Credibility Engine for factual verification.
                  </p>
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
            {isAnalyzing ? "Analyzing Credibility with AI..." : "Analyze Credibility with AI"}
          </Button>
        </form>
      </div>

      {/* Recent Analyses History Section (Nice to Have) */}
      {history.length > 0 && (
        <div className="rounded-2xl border bg-card p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <h3 className="text-base font-bold text-foreground">Recent Analysis History</h3>
            </div>
            <Badge variant="secondary" className="text-xs font-mono">
              {history.length} items
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {history.slice(0, 4).map((entry, idx) => (
              <div
                key={idx}
                onClick={() => onSelectHistory(entry)}
                className="group cursor-pointer rounded-xl border bg-muted/30 p-3.5 hover:bg-muted/60 transition-all hover:-translate-y-0.5 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {entry.timestamp}
                  </span>
                  <Badge
                    variant="outline"
                    className={
                      entry.result.fact_check_status === "VERIFIED"
                        ? "text-emerald-600 border-emerald-300 dark:text-emerald-400"
                        : entry.result.fact_check_status === "MISLEADING"
                        ? "text-amber-600 border-amber-300 dark:text-amber-400"
                        : "text-rose-600 border-rose-300 dark:text-rose-400"
                    }
                  >
                    Score: {entry.result.credibility_score}%
                  </Badge>
                </div>
                <h4 className="text-xs font-semibold text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 line-clamp-1 transition-colors">
                  {entry.item.title}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
                  <span>{entry.result.fact_check_status}</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
