"use client";

import { useState } from "react";
import { Cpu, Eye, Layers, RefreshCw, Upload, Crosshair, ZoomIn, ShieldCheck, HelpCircle, Info, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const SAMPLE_IMAGES = [
  {
    id: "news_press",
    label: "News Press Photo",
    url: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80",
    description: "Verified news agency press conference photo frame.",
    syntheticScore: 8,
    facialRisk: "Low Risk (1.2%)",
    spectralNoise: "99.1% Genuine",
  },
  {
    id: "social_screenshot",
    label: "Viral Social Media Screenshot",
    url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80",
    description: "Social media post screenshot submitted for artifact inspection.",
    syntheticScore: 24,
    facialRisk: "Moderate Noise (6.4%)",
    spectralNoise: "91.8% Authentic",
  },
  {
    id: "anchor_frame",
    label: "Broadcast Video Frame",
    url: "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=800&q=80",
    description: "Extracted video frame analyzed for lipsync and facial deepfake synthesis.",
    syntheticScore: 14,
    facialRisk: "Low Risk (2.1%)",
    spectralNoise: "97.4% Genuine",
  },
];

type InspectionMode = "heatmap" | "ela" | "original";

export function DeepfakeInspector() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [mode, setMode] = useState<InspectionMode>("heatmap");
  const [isScanning, setIsScanning] = useState(false);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [showExplanation, setShowExplanation] = useState(true);

  const currentSample = SAMPLE_IMAGES[selectedImageIndex];
  const activeImage = customImage || currentSample.url;

  const handleRunScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          setCustomImage(evt.target.result as string);
          handleRunScan();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setMousePos({ x, y });
  };

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Cpu className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-foreground">
                Deepfake & Media Forensic Inspector
              </h3>
              <Badge variant="outline" className="text-[10px] gap-1 font-mono py-0 text-emerald-600 border-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Scanner
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Pixel manipulation, Error Level Analysis (ELA), and synthetic image detection.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowExplanation(!showExplanation)}
            className="text-xs text-amber-700 dark:text-amber-400 gap-1"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>{showExplanation ? "Hide Guide" : "Why Check Images?"}</span>
            {showExplanation ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </Button>

          <label className="cursor-pointer inline-flex items-center justify-center rounded-lg border border-input bg-background hover:bg-muted text-foreground px-2.5 py-1.5 text-xs font-medium gap-1.5 transition-colors shadow-2xs">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <Upload className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
            <span>Upload Custom Image</span>
          </label>

          <Button
            onClick={handleRunScan}
            disabled={isScanning}
            variant="outline"
            size="sm"
            className="text-xs gap-1.5"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isScanning ? "animate-spin" : ""}`} />
            {isScanning ? "Scanning..." : "Re-run Forensic Scan"}
          </Button>
        </div>
      </div>

      {/* Explanatory Guide Box */}
      {showExplanation && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-foreground space-y-2 animate-in fade-in">
          <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300">
            <Info className="h-4 w-4 shrink-0 text-amber-600" />
            <span>What does the Deepfake & Media Forensic Inspector do?</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Online misinformation often relies on <strong>edited photos, AI-generated images (DALL-E/Midjourney), or fake face swaps</strong> attached to real news headlines. This tool analyzes visual media alongside text claims to verify whether an image is authentic or synthesized.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-sans text-[11px]">
            <div className="p-2 rounded bg-background/60 border">
              <strong className="text-foreground block">1. Heatmap Overlay:</strong>
              <span className="text-muted-foreground">Highlights compression shifts & edited hotspots.</span>
            </div>
            <div className="p-2 rounded bg-background/60 border">
              <strong className="text-foreground block">2. ELA Error Analysis:</strong>
              <span className="text-muted-foreground">Reveals re-saved photoshopped pixels.</span>
            </div>
            <div className="p-2 rounded bg-background/60 border">
              <strong className="text-foreground block">3. Facial Risk & Noise:</strong>
              <span className="text-muted-foreground">Detects AI face-swaps & synthetic noise.</span>
            </div>
          </div>
        </div>
      )}

      {/* Frame Selection Dropdown & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-muted-foreground">Select Frame Source:</span>
          <div className="flex rounded-lg bg-muted p-1 gap-1">
            {SAMPLE_IMAGES.map((sample, idx) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => {
                  setCustomImage(null);
                  setSelectedImageIndex(idx);
                  handleRunScan();
                }}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                  !customImage && selectedImageIndex === idx
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-lg border">
          <button
            type="button"
            onClick={() => setMode("heatmap")}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
              mode === "heatmap"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Heatmap Overlay
          </button>
          <button
            type="button"
            onClick={() => setMode("ela")}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
              mode === "ela"
                ? "bg-purple-600 text-white shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            ELA Error Analysis
          </button>
          <button
            type="button"
            onClick={() => setMode("original")}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
              mode === "original"
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Original View
          </button>
        </div>
      </div>

      {/* Main Forensic Scanner Display Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Forensic Frame Container */}
        <div className="lg:col-span-2 space-y-2">
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePos(null)}
            className="relative aspect-video rounded-2xl border bg-black overflow-hidden group cursor-crosshair shadow-md"
          >
            {/* Base Image */}
            <img
              src={activeImage}
              alt="Forensic Frame Source"
              className={`w-full h-full object-cover transition-all duration-300 ${
                mode === "ela" ? "filter contrast-200 brightness-75 grayscale" : ""
              }`}
            />

            {/* Heatmap Overlay Simulation */}
            {mode === "heatmap" && (
              <div className="absolute inset-0 pointer-events-none mix-blend-color-dodge opacity-75 bg-gradient-to-tr from-emerald-500/30 via-transparent to-amber-500/40 animate-pulse">
                {/* Simulated Heatmap Hotspots */}
                <div className="absolute top-1/4 left-1/3 w-32 h-32 rounded-full bg-amber-500/40 blur-xl" />
                <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-emerald-400/30 blur-lg" />
              </div>
            )}

            {/* ELA Mode Overlay */}
            {mode === "ela" && (
              <div className="absolute inset-0 pointer-events-none opacity-60 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:16px_16px]" />
            )}

            {/* Target Reticle Overlay */}
            <div className="absolute inset-0 pointer-events-none border border-white/10 p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/10 self-start">
                <span className="flex items-center gap-1.5">
                  <Crosshair className="h-3 w-3 animate-spin text-amber-400" />
                  SPECTRAL RESOLUTION: 4K • SCANNER ID #8920
                </span>
              </div>

              {/* Center Crosshair Marker */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-16 h-16 border border-amber-400/50 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <div className="absolute -top-3 text-[9px] font-mono text-amber-300 uppercase">
                    Focus Target
                  </div>
                </div>
              </div>

              {/* Bottom Info Bar inside Frame */}
              <div className="flex items-center justify-between text-[10px] font-mono text-white/90 bg-black/70 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/10">
                <span>
                  MODE: <strong className="text-amber-400 uppercase">{mode}</strong>
                </span>
                {mousePos ? (
                  <span className="text-emerald-400">
                    CURSOR POS [X: {mousePos.x}%, Y: {mousePos.y}%] • NOISE DELTA: 0.014
                  </span>
                ) : (
                  <span className="text-muted-foreground">HOVER FRAME TO INSPECT PIXELS</span>
                )}
              </div>
            </div>

            {/* Scanning Overlay Animation */}
            {isScanning && (
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-2">
                <div className="h-1.5 w-48 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-amber-500 animate-pulse w-full" />
                </div>
                <span className="text-xs font-mono text-amber-300 animate-pulse">
                  Executing Pixel Error Level Analysis...
                </span>
              </div>
            )}
          </div>

          <p className="text-[11px] text-muted-foreground italic flex items-center gap-1">
            <ZoomIn className="h-3 w-3 text-amber-600" />
            {customImage
              ? "Custom image frame uploaded for forensic artifact analysis."
              : currentSample.description}
          </p>
        </div>

        {/* Forensic Scores & Metrics Panel */}
        <div className="space-y-4 flex flex-col justify-center">
          {/* Synthetic Generation Likelihood */}
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-300">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" />
                Synthetic Generation Likelihood
              </span>
              <span className="text-base font-extrabold">{currentSample.syntheticScore}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-emerald-200 dark:bg-emerald-950 overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald-600 dark:bg-emerald-400 transition-all duration-500"
                style={{ width: `${currentSample.syntheticScore}%` }}
              />
            </div>
            <span className="text-[11px] text-emerald-600/90 dark:text-emerald-400 block font-medium">
              Authenticity Rating: High Genuine Structural Integrity
            </span>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-muted/40 border space-y-1">
              <span className="text-muted-foreground block text-[11px]">Facial Artifact Risk:</span>
              <span className="font-bold text-foreground text-xs block">{currentSample.facialRisk}</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400">No Deepfake Swaps</span>
            </div>

            <div className="p-3 rounded-lg bg-muted/40 border space-y-1">
              <span className="text-muted-foreground block text-[11px]">Spectral Noise Consistency:</span>
              <span className="font-bold text-foreground text-xs block">{currentSample.spectralNoise}</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400">Uniform Sensor Pattern</span>
            </div>

            <div className="p-3 rounded-lg bg-muted/40 border space-y-1">
              <span className="text-muted-foreground block text-[11px]">Lighting Alignment:</span>
              <span className="font-bold text-foreground text-xs block">Matched Shadows</span>
              <span className="text-[10px] text-muted-foreground">3D Specular Valid</span>
            </div>

            <div className="p-3 rounded-lg bg-muted/40 border space-y-1">
              <span className="text-muted-foreground block text-[11px]">Compression Frequency:</span>
              <span className="font-bold text-foreground text-xs block">Standard JPEG</span>
              <span className="text-[10px] text-muted-foreground">Single Quality Layer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
