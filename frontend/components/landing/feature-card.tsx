import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  cta: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  href,
  cta,
}: FeatureCardProps) {
  return (
    <Link href={href}>
      <Card className="group h-full rounded-2xl border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl">

        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
          <Icon className="h-5 w-5" />
        </div>

        <h3 className="mb-3 text-xl font-semibold">
          {title}
        </h3>

        <p className="text-muted-foreground leading-7">
          {description}
        </p>

        <div className="mt-8 flex items-center gap-2 text-sm font-medium text-primary">
          {cta}

          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>

      </Card>
    </Link>
  );
}