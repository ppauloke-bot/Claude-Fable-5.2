"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Section } from "@/components/ui/section";
import { faqs } from "@/constants/content";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/variants";
import { cn } from "@/lib/utils";

/**
 * Interactive FAQ accordion — buttons wired with aria-expanded/controls,
 * height-animated answers, one item open at a time.
 */
export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section
      id="faq"
      eyebrow="Questions"
      title="Everything you're wondering, answered."
      highlight={["answered."]}
      description="Straight answers about timelines, budgets and how we work. Anything else — just ask."
    >
      <motion.div
        variants={staggerContainer(0.06)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto flex max-w-3xl flex-col gap-4"
      >
        {faqs.map((faq, i) => {
          const open = openIndex === i;
          return (
            <motion.div
              key={faq.question}
              variants={fadeUp}
              className={cn(
                "overflow-hidden rounded-3xl border transition-all duration-500 ease-soft",
                open
                  ? "border-accent/30 bg-card/70 shadow-soft"
                  : "border-border/60 bg-card/40 hover:border-border"
              )}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                aria-expanded={open}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
                className="flex w-full items-center justify-between gap-6 px-7 py-6 text-left"
              >
                <span className="text-base font-medium sm:text-lg">{faq.question}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-soft",
                    open
                      ? "rotate-45 border-accent bg-accent text-accent-foreground"
                      : "border-border text-muted-foreground"
                  )}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="px-7 pb-7 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
