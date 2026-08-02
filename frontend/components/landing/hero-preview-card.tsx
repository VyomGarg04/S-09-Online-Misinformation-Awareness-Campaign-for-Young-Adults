import { Newspaper, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function HeroPreviewCard() {
  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-md rounded-3xl border-border/70 bg-[#1B1815] p-7 shadow-2xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Badge
            variant="secondary"
            className="border-0 bg-[#2D2925] text-[#E8DED2]"
          >
            <ShieldCheck className="mr-2 h-3.5 w-3.5 text-primary" />
            AI Verification
          </Badge>

          <span className="text-sm font-semibold text-primary">
            96%
          </span>
        </div>

        {/* Article */}
        <div className="space-y-4">

          <div className="flex items-center gap-2 text-sm text-[#C8BDB2]">
            <Newspaper className="h-4 w-4 text-primary" />
            Breaking News
          </div>

          <h3 className="text-xl font-semibold leading-7 text-white">
            Viral post claims researchers discovered a miracle cure.
          </h3>

          <p className="text-sm leading-6 text-[#B5A89C]">
            AI analyzed the article, compared trusted sources,
            and generated a credibility assessment.
          </p>

        </div>

        {/* Confidence */}
        <div className="mt-8">

          <div className="mb-2 flex justify-between text-sm">
            <span className="text-[#D6C9BC]">
              Confidence
            </span>

            <span className="font-semibold text-primary">
              96%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-[#37322D]">

            <div className="h-full w-[96%] rounded-full bg-primary" />

          </div>

        </div>

        {/* Footer */}
        <div className="mt-8 flex items-center justify-between">

          <div className="space-y-1">

            <div className="flex items-center gap-2 text-emerald-400">

              <ShieldCheck className="h-4 w-4" />

              <span className="font-medium">
                Credible
              </span>

            </div>

            <p className="text-xs text-[#B5A89C]">
              12 trusted sources verified
            </p>

          </div>

          <Button size="sm">

            <Sparkles />

            View

            <ArrowRight />

          </Button>

        </div>

      </Card>
    </div>
  );
}