import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
}

export function StatsCard({
  title,
  value,
  description,
  icon,
}: StatsCardProps) {
  return (
    <div className="rounded-2xl border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">
          {title}
        </h3>

        <div className="rounded-xl bg-amber-500/10 p-2.5 dark:bg-amber-400/10">
          {icon}
        </div>
      </div>

      <div className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {value}
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        {description}
      </p>
    </div>
  );
}