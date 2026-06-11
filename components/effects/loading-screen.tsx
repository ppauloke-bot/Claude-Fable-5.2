"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

/**
 * First-visit preloader: the wordmark breathes in while a counter runs
 * to 100, then the curtain lifts. Shown once per session (sessionStorage)
 * and never longer than ~1.1s — a moment of theatre, not a wait.
 */
export function LoadingScreen() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (sessionStorage.getItem("aurelia-visited") || reducedMotion) return;
    sessionStorage.setItem("aurelia-visited", "1");
    setShow(true);

    const start = performance.now();
    const DURATION = 900;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      // ease-out so the count slows as it lands
      setProgress(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setShow(false), 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="status"
          aria-label="Loading"
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-background"
        >
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-3xl font-medium tracking-tight"
          >
            {siteConfig.shortName}
            <span className="text-accent">.</span>
          </motion.span>
          <div className="h-px w-40 overflow-hidden bg-border" aria-hidden="true">
            <motion.div
              className="h-full bg-accent"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm tabular-nums text-muted-foreground" aria-hidden="true">
            {progress}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
