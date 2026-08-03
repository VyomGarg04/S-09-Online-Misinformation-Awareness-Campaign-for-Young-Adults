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
    <div className="rounded-2xl border bg-card p-6 transition-all hover:shadow-md">

      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">
          {title}
        </h3>

        {icon}
      </div>

      <div className="text-4xl font-bold">
        {value}
      </div>

      <p className="mt-2 text-sm text-muted-foreground">
        {description}
      </p>

    </div>
  );
}