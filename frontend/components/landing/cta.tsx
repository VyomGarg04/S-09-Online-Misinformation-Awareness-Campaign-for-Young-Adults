import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CTA() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="rounded-[2rem] bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 px-10 py-16 text-center text-white shadow-2xl relative overflow-hidden border border-amber-700/50">
          <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Start verifying information with confidence.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base text-amber-100/90 leading-relaxed">
            Join MediaShield and make informed decisions with AI-assisted media literacy and credibility verification.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="/register"
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "bg-amber-100 text-amber-950 hover:bg-white font-bold gap-2 shadow-md"
              )}
            >
              <span>Get Started Free</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}