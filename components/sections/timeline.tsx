"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section } from "@/components/ui/section";
import { timeline } from "@/constants/content";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

/**
 * Scroll-triggered process storytelling, powered by GSAP ScrollTrigger.
 * A warm line draws itself down the spine as each step scrubs into
 * view. Falls back to static layout under reduced motion.
 */
export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || !containerRef.current || !lineRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Spine draws with scroll progress
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 65%",
            scrub: 0.6,
          },
        }
      );

      // Each step rises in as it crosses the viewport
      gsap.utils.toArray<HTMLElement>("[data-timeline-step]").forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: step, start: "top 82%" },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <Section
      id="process"
      eyebrow="How we work"
      title="A process you can set your watch to."
      highlight={["watch"]}
      description="Ten weeks from kickoff to launch, with weekly demos and zero surprises. Here's exactly how it unfolds."
    >
      <div ref={containerRef} className="relative mx-auto max-w-3xl">
        {/* Spine */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-[27px] top-0 w-px bg-border sm:left-1/2"
        />
        <div
          ref={lineRef}
          aria-hidden="true"
          className="absolute bottom-0 left-[27px] top-0 w-px origin-top bg-gradient-to-b from-accent to-accent-soft sm:left-1/2"
          style={{ transform: reducedMotion ? undefined : "scaleY(0)" }}
        />

        <ol className="flex flex-col gap-14 sm:gap-20">
          {timeline.map((step, i) => (
            <li
              key={step.index}
              data-timeline-step
              className={`relative flex gap-8 pl-16 sm:w-1/2 sm:pl-0 ${
                i % 2 === 0
                  ? "sm:mr-auto sm:pr-14 sm:text-right"
                  : "sm:ml-auto sm:pl-14"
              }`}
            >
              {/* Node */}
              <span
                aria-hidden="true"
                className={`absolute left-[15px] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-accent/40 bg-background sm:top-2 ${
                  i % 2 === 0
                    ? "sm:left-auto sm:-right-3"
                    : "sm:-left-3"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-accent" />
              </span>

              <div className="flex flex-col gap-2.5">
                <span className="font-display text-sm text-accent">{step.index}</span>
                <h3 className="font-display text-2xl font-medium">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
                <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground/70">
                  {step.duration}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
