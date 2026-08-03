"use client";

import Link from "next/link";
import { Search, FilePlus2, BrainCircuit } from "lucide-react";

const actions = [
  {
    title: "Analyze Content",
    description: "Verify news, text or media.",
    href: "/analysis",
    icon: BrainCircuit,
  },
  {
    title: "Manage Content",
    description: "Browse verified articles.",
    href: "/content",
    icon: Search,
  },
  {
    title: "Add Content",
    description: "Create a new article.",
    href: "/content",
    icon: FilePlus2,
  },
];

export function QuickActions() {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold">
        Quick Actions
      </h2>

      <div className="grid gap-5 md:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="group rounded-2xl border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg"
            >
              <Icon className="mb-5 h-8 w-8 text-primary" />

              <h3 className="font-semibold">
                {action.title}
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                {action.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}