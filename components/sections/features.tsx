"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { TiltCard } from "@/components/ui/tilt-card";
import { features } from "@/constants/content";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/variants";

/** Why-us grid: six 3D-tilt glass cards with spotlight hover. */
export function Features() {
  return (
    <Section
      id="features"
      eyebrow="Why Aurelia"
      title="The details others skip are where we begin."
      highlight={["begin."]}
      description="Anyone can make a website. Few can make one that feels inevitable. These are the standards behind every engagement."
    >
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div key={feature.title} variants={fadeUp}>
              <TiltCard className="group h-full">
                <article className="gradient-border flex h-full flex-col gap-4 rounded-4xl p-8 transition-shadow duration-500 ease-soft hover:shadow-soft">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-transform duration-500 ease-soft group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-xl font-medium">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </article>
              </TiltCard>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
