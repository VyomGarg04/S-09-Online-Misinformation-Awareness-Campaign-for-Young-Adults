import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
    </>
  );
}
