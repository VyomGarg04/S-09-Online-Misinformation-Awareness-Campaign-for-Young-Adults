"use client";

import { useState } from "react";
import { Cpu, Eye, ShieldAlert, Zap, Layers, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function DeepfakeInspector() {
  const [isScanning, setIsScanning] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [scanResult, setScanResult] = useState({
    syntheticProbability: 12,
    facialArtifactScore: "Low Risk (2.4%)",
    spectralNoiseConsistency: "98.1% Genuine",
    lightingAlignment: "Matched",
  });

  const handleRunScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setScanResult({
        syntheticProbability: Math.floor(Math.random() * 25) + 5,
        facialArtifactScore: "Low Risk (1.8%)",
        spectralNoiseConsistency: "99.2% Genuine",
        lightingAlignment: "Matched",
      });
      setIsScanning(false);
    }, 1200);
  };

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
        <div className="flex items-center gap-2">
          <Cpu className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          <div>
            <h3 className="text-base font-bold text-foreground">
              Deepfake & Media Forensic Inspector
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Multi-model pixel manipulation and facial artifact analysis.
            </p>
          </div>
        </div>

        <Button
          onClick={handleRunScan}
          disabled={isScanning}
          variant="outline"
          size="sm"
          className="text-xs gap-1.5 self-start sm:self-auto"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isScanning ? "animate-spin" : ""}`} />
          {isScanning ? "Scanning Pixels..." : "Re-run Forensic Scan"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Heatmap Simulation Container */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-amber-600" />
              Manipulation Heatmap Overlay
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowHeatmap(!showHeatmap)}
              className="text-[11px] h-6 px-2 text-muted-foreground hover:text-foreground"
            >
              {showHeatmap ? "Hide Overlay" : "Show Overlay"}
            </Button>
          </div>

          <div className="relative aspect-video rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-amber-950/40 border overflow-hidden flex items-center justify-center p-4">
            {showHeatmap && (
              <div className="absolute inset-0 bg-radial from-amber-500/20 via-emerald-500/10 to-transparent pointer-events-none animate-pulse" />
            )}

            <div className="text-center space-y-2 z-10">
              <Eye className="mx-auto h-8 w-8 text-amber-400 opacity-80" />
              <div className="text-xs font-semibold text-white">
                Forensic Image Frame
              </div>
              <div className="text-[11px] text-amber-200/80 font-mono">
                {showHeatmap ? "Heatmap Active • Low Error Rate" : "Raw Source View"}
              </div>
            </div>
          </div>
        </div>

        {/* Forensic Scores */}
        <div className="space-y-4 flex flex-col justify-center">
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-300">
              <span>Synthetic Generation Likelihood</span>
              <span className="text-sm font-extrabold">{scanResult.syntheticProbability}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-emerald-200 dark:bg-emerald-950 overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald-600 dark:bg-emerald-400 transition-all duration-500"
                style={{ width: `${scanResult.syntheticProbability}%` }}
              />
            </div>
            <span className="text-[11px] text-emerald-600/90 dark:text-emerald-400 block">
              Confidence Rating: High Authentic Integrity
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-muted/40 border">
              <span className="text-muted-foreground block">Facial Artifact Risk:</span>
              <span className="font-semibold text-foreground">{scanResult.facialArtifactScore}</span>
            </div>
            <div className="p-3 rounded-lg bg-muted/40 border">
              <span className="text-muted-foreground block">Spectral Noise:</span>
              <span className="font-semibold text-foreground">{scanResult.spectralNoiseConsistency}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
