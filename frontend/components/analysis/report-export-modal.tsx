"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ContentItem } from "@/types/content";
import { AnalysisResponse } from "@/types/analysis";
import { Printer, ShieldCheck, Download, Award, CheckCircle2 } from "lucide-react";

interface ReportExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contentItem: ContentItem;
  analysis: AnalysisResponse;
}

export function ReportExportModal({
  open,
  onOpenChange,
  contentItem,
  analysis,
}: ReportExportModalProps) {
  const handlePrint = () => {
    window.print();
  };

  const score = Math.round(analysis.credibility_score);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto print:p-0 print:shadow-none">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-amber-600 dark:text-amber-500" />
              <DialogTitle className="text-xl font-bold text-foreground">
                Official MediaShield Verification Report
              </DialogTitle>
            </div>
            <Award className="h-6 w-6 text-amber-500 hidden sm:block" />
          </div>
        </DialogHeader>

        {/* Printable Report Document Body */}
        <div id="printable-report" className="space-y-6 py-4 font-sans text-foreground">
          {/* Header Metadata */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs text-muted-foreground block uppercase font-mono tracking-wider">
                Verification Report ID
              </span>
              <span className="font-mono font-bold text-sm text-foreground">
                MS-REP-2026-{contentItem.id}
              </span>
            </div>

            <div>
              <span className="text-xs text-muted-foreground block uppercase font-mono tracking-wider">
                Fact Check Status
              </span>
              <Badge className="bg-amber-700 text-white font-bold px-2.5 py-0.5">
                {analysis.fact_check_status}
              </Badge>
            </div>

            <div>
              <span className="text-xs text-muted-foreground block uppercase font-mono tracking-wider">
                Credibility Rating
              </span>
              <span className="font-extrabold text-base text-amber-600 dark:text-amber-400">
                {score}%
              </span>
            </div>
          </div>

          {/* Article / Claim Subject */}
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Analyzed Subject / Claim Title
            </h4>
            <h3 className="text-lg font-bold text-foreground">
              {contentItem.title}
            </h3>
            <p className="text-xs text-muted-foreground">
              Category: {contentItem.content_type} • Theme: {contentItem.theme || "General"}
            </p>
          </div>

          {/* AI Explanation Narrative */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              AI Forensic Rationale & Evaluation
            </h4>
            <div className="p-4 rounded-xl bg-muted/30 border text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
              {analysis.explanation}
            </div>
          </div>

          {/* Verification Protocol Checklist */}
          <div className="space-y-2 border-t pt-3">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Verification Protocol Standard
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>Fact Repository Cross-Check</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>Source Attribution & Domain Integrity</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>Linguistic Manipulation Filter</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>Synthetic Media Spectral Check</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0 border-t pt-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button
            onClick={handlePrint}
            className="bg-amber-700 hover:bg-amber-800 text-white dark:bg-amber-600 text-xs gap-1.5"
          >
            <Printer className="h-4 w-4" />
            Print / Save as PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
