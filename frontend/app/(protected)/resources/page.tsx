"use client";

import { LiteracyGuides } from "@/components/resources/literacy-guides";
import { DeepfakeGuide } from "@/components/resources/deepfake-guide";
import { InteractiveQuiz } from "@/components/resources/interactive-quiz";
import { GraduationCap } from "lucide-react";

export default function ResourcesPage() {
  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="border-b pb-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-amber-600 dark:text-amber-500" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Media Literacy & Verification Hub
          </h1>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Empower yourself with verification strategies, deepfake analysis guides, and interactive claim practice.
        </p>
      </div>

      <LiteracyGuides />
      <DeepfakeGuide />
      <InteractiveQuiz />
    </div>
  );
}
