import {
  ShieldCheck,
  FileText,
  Brain,
  Activity,
} from "lucide-react";

import { StatsCard } from "@/components/dashboard/stats-card";
import { WelcomeBanner } from "@/components/dashboard/welcome-banner";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RecentActivity } from "@/components/dashboard/recent-activity";

const stats = [
  {
    title: "Verified Content",
    value: "128",
    description: "Articles verified",
    icon: ShieldCheck,
  },
  {
    title: "AI Analyses",
    value: "52",
    description: "Completed today",
    icon: Brain,
  },
  {
    title: "Reports",
    value: "31",
    description: "Generated",
    icon: FileText,
  },
  {
    title: "Credibility Score",
    value: "96%",
    description: "Average confidence",
    icon: Activity,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <WelcomeBanner />

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <StatsCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              description={stat.description}
              icon={<Icon className="h-6 w-6 text-primary" />}
            />
          );
        })}
      </section>

      <QuickActions />
      <RecentActivity />
    </div>
  );
}