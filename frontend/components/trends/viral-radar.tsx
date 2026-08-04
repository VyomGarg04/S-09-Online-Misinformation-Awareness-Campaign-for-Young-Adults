"use client";

import { useEffect, useState } from "react";
import { getThemeStats } from "@/services/content";
import { ThemeStatistic } from "@/types/content";
import { Activity, MessageSquare, Share2, Globe, Video, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ViralRadar() {
  const [themes, setThemes] = useState<ThemeStatistic[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getThemeStats();
        setThemes(data);
      } catch (err) {
        console.error("Failed to load theme stats:", err);
      } font-medium;
      setIsLoading(false);
    }
    load();
  }, []);

  const platformData = [
    {
      platform: "WhatsApp Forwards",
      icon: MessageSquare,
      riskLevel: "High Viral Risk",
      density: "42%",
      color: "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20",
      description: "Encrypted peer-to-peer sharing with high illusion of truth.",
    },
    {
      platform: "X (Twitter) Posts",
      icon: Share2,
      riskLevel: "High Velocity",
      density: "28%",
      color: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
      description: "Rapid retweet cascade and bot network amplification.",
    },
    {
      platform: "Blog & Alternative News",
      icon: Globe,
      riskLevel: "Moderate Risk",
      density: "18%",
      color: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
      description: "SEO-optimized sensationalist blog headlines.",
    },
    {
      platform: "Video Transcripts & Shorts",
      icon: Video,
      riskLevel: "Emerging Threat",
      density: "12%",
      color: "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20",
      description: "AI voiceovers and out-of-context video clips.",
    },
  ];

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Activity className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            Misinformation Channel Radar
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Distribution of unverified claims across digital communication channels.
          </p>
        </div>

        <Badge className="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 gap-1 text-xs">
          <TrendingUp className="h-3.5 w-3.5" />
          Live Surge Radar
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {platformData.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.platform} className={`p-4 rounded-xl border space-y-2 ${p.color}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Icon className="h-4 w-4" />
                  <span>{p.platform}</span>
                </div>
                <span className="font-extrabold text-base">{p.density}</span>
              </div>
              <p className="text-xs opacity-90 leading-relaxed">
                {p.description}
              </p>
              <span className="inline-block text-[10px] font-mono font-semibold uppercase tracking-wider opacity-80">
                Risk Tier: {p.riskLevel}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
