"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

/**
 * Animated counter that counts up when scrolled into view.
 * Jumps straight to the target when reduced motion is preferred.
 */
export function useCounter(target: number, duration = 2) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reducedMotion = usePrefersReducedMotion();
  const [value, setValue] = useState(0);
  const decimals = Number.isInteger(target) ? 0 : 1;

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      setValue(target);
      return;
    }
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setValue(Number(latest.toFixed(decimals))),
    });
    return () => controls.stop();
  }, [inView, target, duration, decimals, reducedMotion]);

  return { ref, value: value.toFixed(decimals).replace(/\.0$/, "") };
}
