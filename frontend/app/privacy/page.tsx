import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
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
            <ShieldCheck className="h-6 w-6 text-amber-600" />
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Privacy Policy</h1>
          </div>
          <p className="text-sm text-muted-foreground">Last updated: August 2026</p>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-foreground/90">
          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">1. Information We Collect</h2>
            <p className="text-sm leading-relaxed">
              MediaShield collects only the minimum information necessary to provide our AI-powered fact-checking and media literacy services. This includes account registration details (email, username) and content you submit for analysis.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">2. How We Use Your Data</h2>
            <p className="text-sm leading-relaxed">
              Your submitted content is analyzed using our AI Credibility Engine to generate fact-check verdicts and credibility scores. We do not sell, share, or distribute your personal data to third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">3. Data Security</h2>
            <p className="text-sm leading-relaxed">
              All data is encrypted in transit using TLS. Passwords are hashed with bcrypt. JWT authentication tokens are issued with expiration to prevent session hijacking.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">4. Your Rights</h2>
            <p className="text-sm leading-relaxed">
              You have the right to access, correct, or delete your personal data at any time through your Profile settings. You may also request a full data export.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">5. Contact</h2>
            <p className="text-sm leading-relaxed">
              For privacy-related inquiries, please reach out via our GitHub repository or contact us at privacy@mediashield.org.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
