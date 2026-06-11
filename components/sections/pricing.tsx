"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/ui/tilt-card";
import { pricingTiers } from "@/constants/content";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/variants";
import { cn } from "@/lib/utils";

/** Pricing: three animated tiers, the partner plan lifted and glowing. */
export function Pricing() {
  return (
    <Section
      id="pricing"
      eyebrow="Investment"
      title="Transparent pricing. No surprises."
      highlight={["Transparent"]}
      description="Fixed proposals, honest scopes, and engagement models that match how you actually work."
    >
      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid items-stretch gap-6 lg:grid-cols-3"
      >
        {pricingTiers.map((tier) => (
          <motion.div key={tier.name} variants={fadeUp} className="h-full">
            <TiltCard intensity={4} className="group h-full">
              <article
                className={cn(
                  "relative flex h-full flex-col gap-6 rounded-4xl border p-8 transition-shadow duration-500 ease-soft sm:p-10",
                  tier.highlighted
                    ? "border-accent/40 bg-card shadow-glow lg:-translate-y-3"
                    : "border-border/60 bg-card/40 hover:shadow-soft"
                )}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-xs font-medium text-accent-foreground shadow-glow">
                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                    Most popular
                  </span>
                )}

                <header className="flex flex-col gap-2">
                  <h3 className="font-display text-xl font-medium">{tier.name}</h3>
                  <p className="flex items-baseline gap-2">
                    <span className="font-display text-5xl font-medium tracking-tight">
                      {tier.price}
                    </span>
                    <span className="text-sm text-muted-foreground">{tier.period}</span>
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {tier.description}
                  </p>
                </header>

                <ul className="flex flex-1 flex-col gap-3.5">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent"
                        aria-hidden="true"
                      >
                        <Check className="h-3 w-3" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  href="#contact"
                  variant={tier.highlighted ? "primary" : "secondary"}
                  className="w-full"
                  ariaLabel={`${tier.cta} — ${tier.name} plan`}
                >
                  {tier.cta}
                </Button>
              </article>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-12 text-center text-sm text-muted-foreground"
      >
        Every engagement includes a 30-day post-launch polish window — on us.
      </motion.p>
    </Section>
  );
}
