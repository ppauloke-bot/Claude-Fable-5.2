"use client";

import { useRef, useCallback } from "react";
import {
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

interface MagneticValues {
  ref: React.RefObject<HTMLDivElement | null>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  handleMouseMove: (event: React.MouseEvent) => void;
  handleMouseLeave: () => void;
}

/**
 * Magnetic hover physics: the element is gently pulled toward the cursor
 * and springs back on leave. Strength is the fraction of the offset applied.
 */
export function useMagnetic(strength = 0.3): MagneticValues {
  const ref = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const spring = { stiffness: 180, damping: 16, mass: 0.4 };
  const x = useSpring(rawX, spring);
  const y = useSpring(rawY, spring);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      if (reducedMotion || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      rawX.set((event.clientX - (rect.left + rect.width / 2)) * strength);
      rawY.set((event.clientY - (rect.top + rect.height / 2)) * strength);
    },
    [rawX, rawY, strength, reducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return { ref, x, y, handleMouseMove, handleMouseLeave };
}
