import {
  CheckCircle2,
  FileSearch,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { WorkflowStep } from "./workflow-step";

const workflow = [
  {
    number: 1,
    title: "Paste a Link or Claim",
    description:
      "Paste a news article, social media post, image, or video link that you want to verify.",
  },
  {
    number: 2,
    title: "AI Verifies Content",
    description:
      "MediaShield analyzes the content, compares trusted sources, and detects misleading information.",
  },
  {
    number: 3,
    title: "Understand the Evidence",
    description:
      "Receive a credibility score, supporting sources, and an easy-to-understand explanation.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-secondary/30 py-28"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:px-8">

        {/* Left */}

        <div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            HOW IT WORKS
          </p>

          <h2 className="mb-10 text-4xl font-bold">
            Verify information in three simple steps.
          </h2>

          <div className="space-y-8">
            {workflow.map((step) => (
              <WorkflowStep
                key={step.number}
                {...step}
              />
            ))}
          </div>

        </div>

        {/* Right */}

        <Card className="rounded-3xl p-8 shadow-lg">

          <div className="mb-8 flex items-center justify-between">

            <h3 className="font-semibold">
              Verification Report
            </h3>

            <ShieldCheck className="text-primary" />

          </div>

          <div className="space-y-6">

            <div className="rounded-xl border p-4">

              <div className="mb-2 flex items-center gap-2">
                <FileSearch className="h-4 w-4 text-primary" />

                <span className="font-medium">
                  Source Reliability
                </span>
              </div>

              <p className="text-sm text-muted-foreground">
                Compared with 12 trusted news sources.
              </p>

            </div>

            <div className="rounded-xl border p-4">

              <div className="mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />

                <span className="font-medium">
                  AI Analysis
                </span>
              </div>

              <p className="text-sm text-muted-foreground">
                No signs of manipulation or misleading edits detected.
              </p>

            </div>

            <div className="rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950/20">

              <div className="flex items-center gap-2 text-green-700 dark:text-green-400">

                <CheckCircle2 className="h-5 w-5" />

                <span className="font-semibold">
                  Credibility Score
                </span>

              </div>

              <p className="mt-2 text-4xl font-bold">
                96%
              </p>

            </div>

          </div>

        </Card>

      </div>
    </section>
  );
}