import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-16 space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-amber-600" />
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Terms of Service</h1>
          </div>
          <p className="text-sm text-muted-foreground">Last updated: August 2026</p>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-foreground/90">
          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p className="text-sm leading-relaxed">
              By accessing and using MediaShield, you agree to be bound by these Terms of Service. MediaShield is an AI-powered media literacy and fact-checking platform designed for educational and informational purposes.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">2. Use of Service</h2>
            <p className="text-sm leading-relaxed">
              MediaShield provides AI-generated credibility assessments for informational purposes only. Our verdicts are machine-generated analyses and should not be considered as definitive legal or journalistic fact-checking.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">3. User Content</h2>
            <p className="text-sm leading-relaxed">
              You retain ownership of all content you submit for analysis. By submitting content, you grant MediaShield a limited license to process it through our AI engine for the purpose of generating credibility reports.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">4. Prohibited Activities</h2>
            <p className="text-sm leading-relaxed">
              Users may not use MediaShield to intentionally spread misinformation, harass individuals, or circumvent our verification systems. Abuse of the platform may result in account suspension.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">5. Limitation of Liability</h2>
            <p className="text-sm leading-relaxed">
              MediaShield is provided &quot;as is&quot; without warranty. We are not liable for decisions made based on AI-generated credibility scores or fact-check verdicts.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
