"use client";

import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useMounted } from "@/hooks/use-mounted";

/** Sun/moon toggle with a soft rotate-and-fade swap. */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors duration-300 hover:bg-muted/70 hover:text-foreground"
    >
      {mounted && (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ opacity: 0, rotate: -40, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 40, scale: 0.7 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex"
          >
            {isDark ? (
              <Moon className="h-[18px] w-[18px]" aria-hidden="true" />
            ) : (
              <Sun className="h-[18px] w-[18px]" aria-hidden="true" />
            )}
          </motion.span>
        </AnimatePresence>
      )}
    </button>
  );
}
