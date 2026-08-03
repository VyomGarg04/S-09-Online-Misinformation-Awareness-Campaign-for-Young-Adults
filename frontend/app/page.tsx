import { LandingNavbar } from "@/components/layout/landing-navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { ImpactStats } from "@/components/landing/impact-stats";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <>
      <LandingNavbar />
      <Hero />
      <Features />
      <HowItWorks />
      <ImpactStats />
      <CTA />
      <Footer />
    </>
  );
}
