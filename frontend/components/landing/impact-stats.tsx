import { ShieldCheck, Newspaper, Users } from "lucide-react";

const stats = [
  {
    icon: ShieldCheck,
    value: "AI",
    label: "Powered Verification",
  },
  {
    icon: Newspaper,
    value: "Multi",
    label: "Content Formats Supported",
  },
  {
    icon: Users,
    value: "24/7",
    label: "Instant Analysis",
  },
];

export function ImpactStats() {
  return (
    <section className="border-y bg-background py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mb-16 text-center">

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            WHY MEDIASHIELD
          </p>

          <h2 className="text-4xl font-bold">
            Built for the modern information ecosystem.
          </h2>

        </div>

        <div className="grid gap-8 md:grid-cols-3">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-3xl border bg-card p-8 text-center transition-all hover:shadow-xl"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="text-5xl font-bold text-primary">
                  {stat.value}
                </h3>

                <p className="mt-4 text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}