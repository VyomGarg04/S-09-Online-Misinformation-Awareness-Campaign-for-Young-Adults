"use client";

import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function HeroButtons() {
  return (
    <div className="flex flex-wrap gap-4">

      <Link href="/register">

        <Button size="lg">
          Get Started
          <ArrowRight />
        </Button>

      </Link>

      <Link href="#features">

        <Button variant="outline" size="lg">
          Learn More
        </Button>

      </Link>

    </div>
  );
}