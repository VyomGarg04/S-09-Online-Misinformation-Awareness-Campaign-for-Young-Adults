import { Badge } from "@/components/ui/badge";

const activities = [
  {
    title: "Article verified",
    description: "Climate policy news was marked as Credible.",
    status: "Verified",
  },
  {
    title: "AI analysis completed",
    description: "Deepfake video scan finished successfully.",
    status: "Analysis",
  },
  {
    title: "New content added",
    description: "Election fact-check article published.",
    status: "Content",
  },
];

export function RecentActivity() {
  return (
    <section className="rounded-2xl border bg-card p-6">
      <h2 className="mb-6 text-2xl font-semibold">
        Recent Activity
      </h2>

      <div className="space-y-5">
        {activities.map((activity) => (
          <div
            key={activity.title}
            className="flex items-start justify-between border-b pb-4 last:border-0"
          >
            <div>
              <h3 className="font-medium">
                {activity.title}
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                {activity.description}
              </p>
            </div>

            <Badge>{activity.status}</Badge>
          </div>
        ))}
      </div>
    </section>
  );
}