"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, ArrowRight, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/ui/animated-text";
import { MeshGradient } from "@/components/effects/mesh-gradient";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

// Three.js field is heavy — load it after hydration, never on the server
const Particles = dynamic(() => import("@/components/effects/particles"), {
  ssr: false,
});

/**
 * Hero: animated headline, mouse-parallax floating cards, mesh gradient,
 * Three.js light dust and a scroll cue. The whole section gently fades
 * and parallaxes away as you scroll past it.
 */
export function Hero() {
  const { scrollTo } = useSmoothScroll();
  const reducedMotion = usePrefersReducedMotion();

  // Section-level scroll parallax
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 600], [0, reducedMotion ? 0 : 120]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0.2]);

  // Mouse parallax for the floating cards
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 60, damping: 20 };
  const cardX = useSpring(mouseX, springConfig);
  const cardY = useSpring(mouseY, springConfig);
  const cardXInverse = useTransform(cardX, (v) => -v * 0.6);
  const cardYInverse = useTransform(cardY, (v) => -v * 0.6);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion) return;
    const { innerWidth, innerHeight } = window;
    mouseX.set((e.clientX / innerWidth - 0.5) * 24);
    mouseY.set((e.clientY / innerHeight - 0.5) * 24);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24"
      aria-label="Introduction"
    >
      {/* Layered background: mesh blobs, dotted grid, light particles */}
      <MeshGradient />
      <div aria-hidden="true" className="bg-grid absolute inset-0" />
      <Particles />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-site relative z-10"
      >
        <motion.div
          variants={staggerContainer(0.12, 0.2)}
          initial="hidden"
          animate="visible"
          className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center"
        >
          {/* Availability badge */}
          <motion.div
            variants={fadeUp}
            className="glass flex items-center gap-2.5 rounded-full px-4 py-2 text-sm text-muted-foreground"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Booking two new partners for Q3 2026
          </motion.div>

          {/* Headline */}
          <h1 className="font-display text-display-xl font-medium">
            <AnimatedText
              text="Digital experiences that move people."
              highlight={["move", "people"]}
              delay={0.3}
            />
          </h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            Aurelia is a senior design and engineering studio. We build brands,
            websites and products so considered, your customers feel the
            difference before they can explain it.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" onClick={() => scrollTo("#contact")}>
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-soft group-hover:translate-x-1" aria-hidden="true" />
            </Button>
            <Button size="lg" variant="secondary" onClick={() => scrollTo("#work")}>
              <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              See our work
            </Button>
          </motion.div>

          {/* Social proof line */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col items-center gap-2 text-sm text-muted-foreground sm:flex-row sm:gap-3"
          >
            <span className="flex items-center gap-1" aria-label="Rated 5 out of 5 by clients">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-accent text-accent" aria-hidden="true" />
              ))}
            </span>
            <span>Trusted by 140+ teams — from seed rounds to the S&P 500</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating glass cards with mouse parallax */}
      <motion.div
        aria-hidden="true"
        style={{ x: cardX, y: cardY }}
        className="absolute left-[6%] top-[24%] hidden xl:block"
      >
        <div className="glass animate-float w-52 rounded-3xl p-5 shadow-soft">
          <p className="text-3xl font-medium tabular-nums">4.2x</p>
          <p className="mt-1 text-xs text-muted-foreground">
            average conversion lift after redesign
          </p>
        </div>
      </motion.div>
      <motion.div
        aria-hidden="true"
        style={{ x: cardXInverse, y: cardYInverse }}
        className="absolute right-[6%] top-[58%] hidden xl:block"
      >
        <div
          className="glass animate-float w-56 rounded-3xl p-5 shadow-soft"
          style={{ animationDelay: "-3s" }}
        >
          <p className="font-display text-lg">“The obvious choice.”</p>
          <p className="mt-1 text-xs text-muted-foreground">
            — what prospects now tell our clients
          </p>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        type="button"
        onClick={() => scrollTo("#clients")}
        aria-label="Scroll to explore"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 rounded-full p-3 text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" aria-hidden="true" />
      </motion.button>
    </section>
  );
}
