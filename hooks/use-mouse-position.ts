"use client";

import { useEffect, useRef } from "react";

/**
 * Tracks the pointer in a mutable ref (no re-renders).
 * Consumers read `.current` inside their own rAF loops.
 */
export function useMousePosition() {
  const position = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      position.current = { x: event.clientX, y: event.clientY };
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return position;
}
