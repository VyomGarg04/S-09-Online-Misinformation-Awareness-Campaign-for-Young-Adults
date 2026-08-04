import Link from "next/link";

import { Logo } from "@/components/branding";

export function Footer() {
  return (
    <footer className="border-t py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 text-sm text-muted-foreground md:flex-row lg:px-8">

        <Logo />

        <div className="flex gap-8">

          <Link href="/privacy" className="hover:text-foreground transition-colors">
            Privacy
          </Link>

          <Link href="/terms" className="hover:text-foreground transition-colors">
            Terms
          </Link>

          <a
            href="https://github.com/VyomGarg04"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>

        </div>

        <p>
          © 2026 MediaShield. All rights reserved.
        </p>

      </div>
    </footer>
  );
}