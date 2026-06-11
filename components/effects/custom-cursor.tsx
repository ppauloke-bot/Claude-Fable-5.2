"use client";

import { useEffect, useRef } from "react";
import { lerp } from "@/lib/utils";
import { useIsTouchDevice, usePrefersReducedMotion } from "@/hooks/use-media-query";
import { useMounted } from "@/hooks/use-mounted";

/**
 * Trailing cursor ring + warm mouse glow.
 * The native cursor stays visible (accessibility first) — this adds a
 * soft ring that lags behind with lerp and swells over interactive
 * elements. Skipped entirely on touch devices and for reduced motion.
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const mounted = useMounted();
  const isTouch = useIsTouchDevice();
  const reducedMotion = usePrefersReducedMotion();
  const enabled = mounted && !isTouch && !reducedMotion;

  useEffect(() => {
    if (!enabled) return;

    const target = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let scale = 1;
    let targetScale = 1;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const interactive = (e.target as HTMLElement).closest(
        "a, button, [role='button'], input, textarea, [data-cursor]"
      );
      targetScale = interactive ? 2.2 : 1;
    };

    const tick = () => {
      ring.x = lerp(ring.x, target.x, 0.16);
      ring.y = lerp(ring.y, target.y, 0.16);
      scale = lerp(scale, targetScale, 0.14);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Soft ambient glow following the pointer */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[5] h-[520px] w-[520px] rounded-full opacity-50 blur-3xl will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgb(var(--accent-soft) / 0.10), transparent 65%)",
        }}
      />
      {/* Trailing ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[80] h-8 w-8 rounded-full border border-accent/50 will-change-transform"
      />
    </>
  );
}
