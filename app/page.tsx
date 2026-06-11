import { Hero } from "@/components/sections/hero";
import { Clients } from "@/components/sections/clients";
import { Stats } from "@/components/sections/stats";
import { Features } from "@/components/sections/features";
import { Services } from "@/components/sections/services";
import { Portfolio } from "@/components/sections/portfolio";
import { Testimonials } from "@/components/sections/testimonials";
import { Timeline } from "@/components/sections/timeline";
import { Faq } from "@/components/sections/faq";
import { Pricing } from "@/components/sections/pricing";
import { Cta } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Clients />
      <Stats />
      <Features />
      <Services />
      <Portfolio />
      <Testimonials />
      <Timeline />
      <Faq />
      <Pricing />
      <Cta />
    </>
  );
}
