export function WelcomeBanner() {
  return (
    <section className="rounded-3xl border bg-card p-8">
      <p className="text-sm text-muted-foreground">
        Welcome back 👋
      </p>

      <h1 className="mt-2 text-4xl font-bold tracking-tight">
        MediaShield Dashboard
      </h1>

      <p className="mt-4 max-w-2xl text-muted-foreground">
        Monitor misinformation, analyze media, and manage verified content
        from one place.
      </p>
    </section>
  );
}