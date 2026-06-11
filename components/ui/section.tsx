"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/variants";
import { AnimatedText } from "@/components/ui/animated-text";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  /** Small uppercase label above the title. */
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Words in the title that get the gradient treatment. */
  highlight?: string[];
  align?: "left" | "center";
}

/**
 * Section scaffold: consistent rhythm, eyebrow + animated title +
 * description, all entering with the shared stagger choreography.
 */
export function Section({
  id,
  children,
  className,
  eyebrow,
  title,
  description,
  highlight,
  align = "center",
}: SectionProps) {
  return (
    <section id={id} className={cn("section-pad relative scroll-mt-24", className)}>
      <div className="container-site">
        {(eyebrow || title) && (
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className={cn(
              "mb-16 flex max-w-3xl flex-col gap-5 sm:mb-20",
              align === "center" && "mx-auto items-center text-center"
            )}
          >
            {eyebrow && (
              <motion.span
                variants={fadeUp}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-border/70 bg-card/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground backdrop-blur"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                {eyebrow}
              </motion.span>
            )}
            {title && (
              <h2 className="font-display text-display-lg font-medium text-foreground">
                <AnimatedText text={title} highlight={highlight} />
              </h2>
            )}
            {description && (
              <motion.p
                variants={fadeUp}
                className="text-lg leading-relaxed text-muted-foreground"
              >
                {description}
              </motion.p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
