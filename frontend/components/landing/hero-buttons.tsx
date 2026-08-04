"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroButtons() {
  return (
    <div className="flex flex-wrap gap-4">
      <Link
        href="/register"
        className={cn(
          buttonVariants({ size: "lg" }),
          "bg-amber-700 hover:bg-amber-800 text-white dark:bg-amber-600 dark:hover:bg-amber-700 shadow-md gap-2"
        )}
      >
        <span>Get Started</span>
        <ArrowRight className="h-4 w-4" />
      </Link>

      <Link
        href="#features"
        className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
      >
        Learn More
      </Link>
    </div>
  );
}