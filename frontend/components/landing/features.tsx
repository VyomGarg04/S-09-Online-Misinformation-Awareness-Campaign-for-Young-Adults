import {
  Radar,
  ShieldAlert,
  FileText,
  Share2,
} from "lucide-react";

import { FeatureCard } from "./feature-card";

const features = [
  {
    icon: Radar,
    title: "Real-time Verification",
    description:
      "Instantly analyze articles, URLs and social media posts before you believe or share them.",
    href: "/analysis",
    cta: "Start Verification",
  },
  {
    icon: ShieldAlert,
    title: "Deepfake Detection",
    description:
      "Identify AI-generated images, videos and audio using advanced detection models.",
    href: "/analysis",
    cta: "Analyze Media",
  },
  {
    icon: FileText,
    title: "Source Transparency",
    description:
      "See why content is trustworthy with supporting evidence, citations and contextual explanations.",
    href: "/analysis",
    cta: "View Sources",
  },
  {
    icon: Share2,
    title: "Information Journey",
    description:
      "Understand how information spreads across platforms and evolves over time.",
    href: "/analysis",
    cta: "Explore Trends",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="mx-auto max-w-7xl px-6 py-28 lg:px-8"
    >
      <div className="mb-16 text-center">

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          FEATURES
        </p>

        <h2 className="text-4xl font-bold">
          Everything you need to verify information.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
          MediaShield combines AI-powered verification with educational
          resources to help users confidently navigate today's digital world.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            {...feature}
          />
        ))}
      </div>
    </section>
  );
}