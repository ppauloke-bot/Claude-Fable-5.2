"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { services } from "@/constants/content";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/variants";
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";

/**
 * Services: large editorial rows with hover-revealed deliverables.
 * Alternating layout keeps the rhythm; each row is a generous click
 * target leading to contact.
 */
export function Services() {
  const { scrollTo } = useSmoothScroll();

  return (
    <Section
      id="services"
      eyebrow="What we do"
      title="Four disciplines. One standard."
      highlight={["One", "standard."]}
      description="Strategy, design, engineering and motion under one roof — so nothing gets lost between the idea and the launch."
      align="left"
    >
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="flex flex-col"
      >
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.button
              key={service.title}
              variants={fadeUp}
              type="button"
              onClick={() => scrollTo("#contact")}
              aria-label={`${service.title} — start a project`}
              className="group grid items-start gap-6 border-t border-border/60 py-10 text-left transition-colors duration-500 last:border-b hover:bg-card/40 sm:grid-cols-[auto_1fr_auto] sm:gap-10 sm:px-6 lg:py-12"
            >
              <span className="flex items-center gap-5">
                <span className="font-display text-sm text-muted-foreground" aria-hidden="true">
                  0{index + 1}
                </span>
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-all duration-500 ease-soft group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
              </span>

              <span className="flex max-w-2xl flex-col gap-3">
                <span className="font-display text-2xl font-medium transition-colors duration-300 group-hover:text-accent sm:text-3xl">
                  {service.title}
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {service.description}
                </span>
                <span className="mt-1 flex flex-wrap gap-2">
                  {service.deliverables.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border/70 bg-card/60 px-3 py-1 text-xs text-muted-foreground transition-colors duration-300 group-hover:border-accent/30"
                    >
                      {item}
                    </span>
                  ))}
                </span>
              </span>

              <span
                className="hidden h-12 w-12 items-center justify-center self-center rounded-full border border-border/70 text-muted-foreground transition-all duration-500 ease-soft group-hover:rotate-45 group-hover:border-accent group-hover:text-accent sm:flex"
                aria-hidden="true"
              >
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </Section>
  );
}
