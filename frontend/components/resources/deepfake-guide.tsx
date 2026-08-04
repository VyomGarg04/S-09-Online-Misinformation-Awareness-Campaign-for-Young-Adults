"use client";

import { Eye, ShieldAlert, Cpu, Mic, Video, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function DeepfakeGuide() {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-xs space-y-6">
      <div className="flex items-center gap-2">
        <Cpu className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        <div>
          <h3 className="text-base font-bold text-foreground">
            Deepfake & Synthetic Media Detection Manual
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Key visual & auditory indicators of AI-generated content.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Synthetic Images */}
        <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400">
            <Eye className="h-4 w-4" />
            AI Images & Photos
          </div>
          <ul className="space-y-2 text-xs text-muted-foreground leading-normal">
            <li>• <strong>Hands & Fingers:</strong> Extra/missing fingers, unnatural joint angles, or warped fingernails.</li>
            <li>• <strong>Background Blur:</strong> Inconsistent depth-of-field or distorted text in background signs.</li>
            <li>• <strong>Lighting Artifacts:</strong> Reflections in eyes not matching ambient light sources.</li>
          </ul>
        </div>

        {/* Deepfake Video */}
        <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400">
            <Video className="h-4 w-4" />
            Deepfake Video
          </div>
          <ul className="space-y-2 text-xs text-muted-foreground leading-normal">
            <li>• <strong>Unnatural Blinking:</strong> Irregular blink rate or rigid facial posture during speech.</li>
            <li>• <strong>Boundary Glitches:</strong> Blurring around jawlines, necklines, or eyeglasses.</li>
            <li>• <strong>Skin Texture:</strong> Overly smooth, plastic-looking skin tone lacking pores or shadows.</li>
          </ul>
        </div>

        {/* Voice Cloning */}
        <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400">
            <Mic className="h-4 w-4" />
            Audio & Voice Clones
          </div>
          <ul className="space-y-2 text-xs text-muted-foreground leading-normal">
            <li>• <strong>Robotic Cadence:</strong> Unnatural pauses or robotic inflections between words.</li>
            <li>• <strong>Lack of Room Acoustics:</strong> Clean studio voice isolated over noisy video background.</li>
            <li>• <strong>Spectral Artifacts:</strong> Metallic hiss or sudden pitch drops in sentence endings.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
