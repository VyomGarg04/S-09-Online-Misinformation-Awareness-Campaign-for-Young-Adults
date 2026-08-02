import { HeroButtons } from "./hero-buttons";
import { HeroPreviewCard } from "./hero-preview-card";

export function Hero() {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl grid-cols-1 items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:px-8">

      {/* Left */}

      <div className="space-y-8">

        <div className="inline-flex items-center gap-2 rounded-full border bg-secondary px-4 py-2 text-xs font-medium text-muted-foreground">

          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />

          AI-powered Media Literacy Platform

        </div>

        <div className="space-y-5">

          <h1 className="text-5xl font-bold leading-tight lg:text-7xl">

            Think
            <br />

            <span className="text-primary">
              Critically.
            </span>

            <br />

            Verify
            <br />

            Confidently.

          </h1>

          <p className="max-w-xl text-lg leading-8 text-muted-foreground">

            MediaShield helps students and young adults detect misinformation,
            verify online claims, and understand the credibility of digital
            content using AI-assisted analysis.

          </p>

        </div>

        <HeroButtons />

      </div>

      {/* Right */}

      <HeroPreviewCard />

    </section>
  );
}