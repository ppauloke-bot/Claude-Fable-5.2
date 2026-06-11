"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { textReveal, staggerContainer, viewportOnce } from "@/animations/variants";

interface AnimatedTextProps {
  text: string;
  className?: string;
  /** Render element for the wrapper. */
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  /** Words to render with the warm gradient treatment. */
  highlight?: string[];
}

/**
 * Word-by-word mask reveal. Each word rises out of an overflow-hidden
 * line — the screen-reader experience is untouched because the full
 * string is exposed via aria-label and the visual words are aria-hidden.
 */
export function AnimatedText({
  text,
  className,
  as: Tag = "span",
  delay = 0,
  highlight = [],
}: AnimatedTextProps) {
  const words = text.split(" ");
  const MotionTag = motion.create(Tag);

  return (
    <MotionTag
      className={cn("inline-block", className)}
      variants={staggerContainer(0.06, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom"
        >
          <motion.span
            variants={textReveal}
            className={cn(
              "inline-block will-change-transform",
              highlight.includes(word.replace(/[.,]/g, "")) &&
                "text-gradient animate-gradient-pan"
            )}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
