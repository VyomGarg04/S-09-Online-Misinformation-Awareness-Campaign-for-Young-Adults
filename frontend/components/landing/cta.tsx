import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">

        <div className="rounded-[2rem] bg-primary px-10 py-16 text-center text-primary-foreground shadow-2xl">

          <h2 className="text-4xl font-bold">
            Start verifying information with confidence.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg opacity-90">
            Join MediaShield and make informed decisions with AI-assisted media verification.
          </p>

          <div className="mt-10">

            <Link href="/register">

              <Button
                variant="secondary"
                size="lg"
              >
                Get Started

                <ArrowRight />
              </Button>

            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}