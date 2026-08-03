import {
  ShieldCheck,
  FileText,
  Brain,
  Activity,
} from "lucide-react";

import { StatsCard } from "@/components/dashboard/stats-card";
import { WelcomeBanner } from "@/components/dashboard/welcome-banner";

export default function DashboardPage() {
  return (
    <div className="space-y-8">

      <WelcomeBanner />

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatsCard
          title="Verified Content"
          value="128"
          description="Articles verified"
          icon={<ShieldCheck className="h-6 w-6 text-primary" />}
        />

        <StatsCard
          title="AI Analyses"
          value="52"
          description="Completed today"
          icon={<Brain className="h-6 w-6 text-primary" />}
        />

        <StatsCard
          title="Reports"
          value="31"
          description="Generated"
          icon={<FileText className="h-6 w-6 text-primary" />}
        />

        <StatsCard
          title="Credibility Score"
          value="96%"
          description="Average confidence"
          icon={<Activity className="h-6 w-6 text-primary" />}
        />

      </section>

    </div>
  );
}