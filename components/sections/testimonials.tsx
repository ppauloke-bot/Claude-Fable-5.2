"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Section } from "@/components/ui/section";
import { testimonials } from "@/constants/content";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 7000;

/**
 * Auto-playing testimonial carousel. Pauses on hover and focus,
 * announces changes politely to screen readers, and offers manual
 * controls with generous touch targets.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => setIndex((i) => (i + 1) % testimonials.length), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length),
    []
  );

  useEffect(() => {
    if (paused || reducedMotion) return;
    timer.current = setInterval(next, AUTOPLAY_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, reducedMotion, next]);

  const current = testimonials[index];

  return (
    <Section
      id="testimonials"
      eyebrow="Kind words"
      title="Clients say it better than we could."
      highlight={["better"]}
    >
      <div
        className="relative mx-auto max-w-3xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <Quote
          className="absolute -top-8 left-1/2 h-16 w-16 -translate-x-1/2 text-accent/15"
          aria-hidden="true"
        />

        <div aria-live="polite" className="relative min-h-[280px] sm:min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-8 text-center"
            >
              <blockquote className="font-display text-xl font-medium leading-relaxed sm:text-2xl">
                “{current.quote}”
              </blockquote>
              <figcaption className="flex items-center gap-4">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 font-display text-sm font-medium text-accent"
                  aria-hidden="true"
                >
                  {current.initials}
                </span>
                <span className="text-left">
                  <span className="block text-sm font-medium">{current.author}</span>
                  <span className="block text-xs text-muted-foreground">
                    {current.role}, {current.company}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="glass flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-all duration-300 hover:border-accent/40 hover:text-accent"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label="Testimonials">
            {testimonials.map((t, i) => (
              <button
                key={t.author}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Testimonial from ${t.author}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-500 ease-soft",
                  i === index ? "w-8 bg-accent" : "w-2 bg-border hover:bg-muted-foreground/40"
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="glass flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-all duration-300 hover:border-accent/40 hover:text-accent"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </Section>
  );
}
