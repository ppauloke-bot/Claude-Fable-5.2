"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { projects } from "@/constants/content";
import { fadeUp, viewportOnce } from "@/animations/variants";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  // Per-card parallax: the gradient "artwork" drifts slower than the card
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const artY = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [-30, 30]);

  return (
    <motion.article
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        "group relative overflow-hidden rounded-5xl border border-border/60 bg-card/50",
        "transition-all duration-700 ease-soft hover:-translate-y-1.5 hover:shadow-lifted",
        index % 3 === 0 && "lg:col-span-2"
      )}
    >
      {/* Abstract gradient artwork with parallax drift */}
      <div className="relative h-64 overflow-hidden sm:h-80">
        <motion.div
          aria-hidden="true"
          style={{ y: artY }}
          className={cn(
            "absolute -inset-10 bg-gradient-to-br transition-transform duration-700 ease-soft group-hover:scale-105",
            project.gradient
          )}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent"
        />
        <span className="absolute left-6 top-6 rounded-full border border-border/60 bg-background/70 px-3.5 py-1.5 text-xs font-medium backdrop-blur">
          {project.category}
        </span>
        <span className="absolute right-6 top-6 rounded-full border border-border/60 bg-background/70 px-3.5 py-1.5 text-xs text-muted-foreground backdrop-blur">
          {project.year}
        </span>
      </div>

      <div className="flex flex-col gap-3 p-8">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {project.client}
        </p>
        <h3 className="flex items-start justify-between gap-4 font-display text-2xl font-medium">
          {project.title}
          <ArrowUpRight
            className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-all duration-500 ease-soft group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
            aria-hidden="true"
          />
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        <p className="mt-2 w-fit rounded-full bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent">
          {project.result}
        </p>
      </div>
    </motion.article>
  );
}

/** Selected work: asymmetric grid with parallax gradient artwork. */
export function Portfolio() {
  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title="Proof, not promises."
      highlight={["Proof,"]}
      description="A few recent engagements — and what they did for the businesses behind them. Results are real; identities are shared with permission."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}
