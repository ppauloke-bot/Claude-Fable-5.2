"use client";

import { cn } from "@/lib/utils";

/**
 * Ambient mesh-gradient background: three soft, slowly morphing blobs.
 * Pure CSS animation (GPU transforms only). The global reduced-motion
 * rule freezes the drift while keeping the warm wash of color.
 */
export function MeshGradient({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className="animate-blob absolute -top-1/4 left-[10%] h-[60vmax] w-[60vmax] rounded-full bg-accent-soft/15 blur-3xl dark:bg-accent-soft/[0.07]" />
      <div
        className="animate-blob absolute -right-[15%] top-[15%] h-[50vmax] w-[50vmax] rounded-full bg-orange-200/25 blur-3xl dark:bg-orange-300/[0.05]"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="animate-blob absolute -bottom-[20%] left-[25%] h-[55vmax] w-[55vmax] rounded-full bg-rose-200/20 blur-3xl dark:bg-rose-300/[0.04]"
        style={{ animationDelay: "-12s" }}
      />
    </div>
  );
}
