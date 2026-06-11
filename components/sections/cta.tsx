"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/ui/animated-text";
import { MeshGradient } from "@/components/effects/mesh-gradient";
import { siteConfig } from "@/config/site";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/variants";

/** Final call to action: warm, unmissable, generous. */
export function Cta() {
  return (
    <section id="contact" className="section-pad relative scroll-mt-24 overflow-hidden">
      <MeshGradient className="opacity-70" />

      <div className="container-site relative z-10">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="gradient-border mx-auto flex max-w-4xl flex-col items-center gap-8 rounded-5xl px-6 py-16 text-center shadow-lifted sm:px-16 sm:py-24"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground backdrop-blur"
          >
            <CalendarCheck className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            Two partner slots open for Q3
          </motion.span>

          <h2 className="font-display text-display-lg font-medium">
            <AnimatedText
              text="Your next chapter deserves better than fine."
              highlight={["better"]}
            />
          </h2>

          <motion.p
            variants={fadeUp}
            className="max-w-xl text-balance text-lg leading-relaxed text-muted-foreground"
          >
            Thirty minutes. No deck, no pressure — just an honest conversation
            about where your brand is and where it could be. If we&apos;re not
            the right fit, we&apos;ll tell you who is.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" href={`mailto:${siteConfig.email}?subject=New project inquiry`}>
              <Mail className="h-4 w-4" aria-hidden="true" />
              Book your intro call
            </Button>
            <Button size="lg" variant="ghost" href={`mailto:${siteConfig.email}`}>
              Or just say hello
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </motion.div>

          <motion.p variants={fadeUp} className="text-xs text-muted-foreground">
            Average reply time: under 4 business hours.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
