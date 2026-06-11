"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMagnetic } from "@/hooks/use-magnetic";

type Variant = "primary" | "secondary" | "ghost";
type Size = "default" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  className?: string;
  ariaLabel?: string;
  type?: "button" | "submit";
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-foreground shadow-glow hover:shadow-lifted " +
    "after:bg-foreground/10",
  secondary:
    "glass text-foreground hover:border-accent/40 after:bg-accent/10",
  ghost:
    "text-foreground hover:bg-muted/70 after:bg-accent/10",
};

const sizeStyles: Record<Size, string> = {
  default: "h-12 px-7 text-sm",
  lg: "h-14 px-9 text-base",
};

/**
 * Magnetic button with a liquid hover fill.
 * The wrapper handles the magnetic pull; the inner element handles the
 * radial "liquid" overlay (the ::after layer that scales in on hover).
 */
export const Button = forwardRef<HTMLDivElement, ButtonProps>(function Button(
  {
    children,
    href,
    onClick,
    variant = "primary",
    size = "default",
    className,
    ariaLabel,
    type = "button",
  },
  _ref
) {
  const { ref, x, y, handleMouseMove, handleMouseLeave } = useMagnetic(0.25);

  const classes = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden",
    "rounded-full font-medium tracking-tight transition-all duration-500 ease-soft",
    "after:absolute after:inset-0 after:scale-0 after:rounded-full",
    "after:transition-transform after:duration-500 after:ease-soft",
    "hover:after:scale-150 active:scale-[0.97]",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  const content = <span className="relative z-10 flex items-center gap-2">{children}</span>;

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {href ? (
        <Link href={href} aria-label={ariaLabel} className={classes} onClick={onClick}>
          {content}
        </Link>
      ) : (
        <button type={type} aria-label={ariaLabel} className={classes} onClick={onClick}>
          {content}
        </button>
      )}
    </motion.div>
  );
});
