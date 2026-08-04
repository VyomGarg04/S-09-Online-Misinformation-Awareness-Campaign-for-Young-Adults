"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Laptop, ShieldAlert, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProfileSettings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-xs space-y-6">
      <div>
        <h3 className="text-base font-bold text-foreground">
          Appearance & User Preferences
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Customize your MediaShield workspace interface.
        </p>
      </div>

      {/* Theme Selection */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-foreground uppercase tracking-wider block">
          Interface Theme
        </label>
        <div className="grid grid-cols-3 gap-3">
          <Button
            type="button"
            variant={theme === "light" ? "default" : "outline"}
            onClick={() => setTheme("light")}
            className={`text-xs gap-2 ${
              theme === "light" ? "bg-amber-700 text-white hover:bg-amber-800" : ""
            }`}
          >
            <Sun className="h-4 w-4 text-amber-500" />
            Light Cream
          </Button>

          <Button
            type="button"
            variant={theme === "dark" ? "default" : "outline"}
            onClick={() => setTheme("dark")}
            className={`text-xs gap-2 ${
              theme === "dark" ? "bg-amber-600 text-white hover:bg-amber-700" : ""
            }`}
          >
            <Moon className="h-4 w-4 text-amber-400" />
            Warm Dark
          </Button>

          <Button
            type="button"
            variant={theme === "system" ? "default" : "outline"}
            onClick={() => setTheme("system")}
            className="text-xs gap-2"
          >
            <Laptop className="h-4 w-4 text-muted-foreground" />
            System
          </Button>
        </div>
      </div>

      {/* System Status & API info */}
      <div className="border-t pt-4 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-foreground font-medium">
            <Cpu className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <span>AI Verification Model Engine</span>
          </div>
          <span className="font-mono text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded text-[11px]">
            Gemini 1.5 Pro / Flash
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-foreground font-medium">
            <ShieldAlert className="h-4 w-4 text-emerald-600" />
            <span>Backend Security Status</span>
          </div>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
            JWT Stateless Auth Active
          </span>
        </div>
      </div>
    </div>
  );
}
