"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  /** Reverse the scroll direction. */
  reverse?: boolean;
  /** Pause the marquee while hovered. */
  pauseOnHover?: boolean;
}

/**
 * Infinite marquee. Content is duplicated once (aria-hidden) and the
 * track translates -50% in a seamless CSS loop — GPU-only, 60fps.
 * The global reduced-motion rule freezes the animation automatically.
 */
export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex w-full overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        className
      )}
    >
      <div
        className={cn(
          "flex w-max shrink-0 animate-marquee items-center will-change-transform",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
