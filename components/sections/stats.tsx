"use client";

import { motion } from "framer-motion";
import { stats } from "@/constants/content";
import { useCounter } from "@/hooks/use-counter";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/variants";
import type { Stat } from "@/types";

function StatCard({ stat }: { stat: Stat }) {
  const { ref, value } = useCounter(stat.value);

  return (
    <motion.div
      variants={fadeUp}
      className="group flex flex-col gap-3 rounded-4xl border border-border/60 bg-card/40 p-8 transition-all duration-500 ease-soft hover:-translate-y-1 hover:border-accent/30 hover:shadow-soft"
    >
      <p className="font-display text-5xl font-medium tabular-nums tracking-tight sm:text-6xl">
        <span ref={ref}>{value}</span>
        <span className="text-accent">{stat.suffix}</span>
      </p>
      <p className="text-sm font-medium">{stat.label}</p>
      <p className="text-sm leading-relaxed text-muted-foreground">{stat.description}</p>
    </motion.div>
  );
}

/** Animated counters that count up as they enter the viewport. */
export function Stats() {
  return (
    <section className="section-pad relative" aria-label="Studio statistics">
      <div className="container-site">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
