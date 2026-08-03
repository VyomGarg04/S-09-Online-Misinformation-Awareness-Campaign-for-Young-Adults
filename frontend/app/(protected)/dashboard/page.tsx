"use client";
import { ShieldCheck, FileText, Brain, Activity, } from "lucide-react"; 
import { useEffect, useState } from "react"; 
import { DashboardStats } from "@/types/dashboard"; 
import { getDashboardStats } from "@/services/dashboard"; 
import { StatsCard } from "@/components/dashboard/stats-card"; 
import { WelcomeBanner } from "@/components/dashboard/welcome-banner"; 
import { QuickActions } from "@/components/dashboard/quick-actions"; 
import { RecentActivity } from "@/components/dashboard/recent-activity";


export default function DashboardPage() {

  const [statsData, setStatsData] =
      useState<DashboardStats | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getDashboardStats();
        setStatsData(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadStats();
  }, []);

  const stats = [
    {
      title: "Total Content",
      value: statsData?.total_content ?? "...",
      description: "Articles in database",
      icon: FileText,
    },
    {
      title: "Verified",
      value: statsData?.verified ?? "...",
      description: "Successfully verified",
      icon: ShieldCheck,
    },
    {
      title: "Pending",
      value: statsData?.pending ?? "...",
      description: "Awaiting analysis",
      icon: Brain,
    },
    {
      title: "Misleading / False",
      value:
        statsData == null
          ? "..."
          : statsData.misleading + statsData.false,
      description: "Flagged content",
      icon: Activity,
    },
  ];

  
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
            value={String(stat.value)}
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