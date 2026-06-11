"use client";

import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/marquee";
import { clients, awards } from "@/constants/content";
import { fadeIn, viewportOnce } from "@/animations/variants";

/**
 * Social proof: infinite client marquee + awards strip.
 * Wordmarks are set in the display face — elegant without logo assets.
 */
export function Clients() {
  return (
    <section id="clients" className="relative scroll-mt-24 py-16 sm:py-20" aria-label="Clients and awards">
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <p className="mb-10 text-center text-sm text-muted-foreground">
          The company kept by ambitious teams
        </p>

        <Marquee>
          {clients.map((client) => (
            <span
              key={client}
              className="mx-10 font-display text-2xl font-medium text-muted-foreground/70 transition-colors duration-300 hover:text-foreground sm:mx-14"
            >
              {client}
            </span>
          ))}
        </Marquee>

        <div className="container-site mt-14">
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {awards.map((award) => {
              const Icon = award.icon;
              return (
                <li
                  key={award.label}
                  className="glass flex items-center gap-3 rounded-2xl px-5 py-4 transition-all duration-500 ease-soft hover:-translate-y-0.5 hover:shadow-soft"
                >
                  <Icon className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                  <span>
                    <span className="block text-sm font-medium">{award.label}</span>
                    <span className="block text-xs text-muted-foreground">{award.detail}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
