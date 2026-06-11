"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { navLinks } from "@/constants/navigation";
import { siteConfig } from "@/config/site";
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";
import { staggerContainer, fadeUp } from "@/animations/variants";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/** Full-screen mobile navigation with large, touch-friendly targets. */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onEscape);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onEscape);
    };
  }, [open, onClose]);

  const go = (href: string) => {
    onClose();
    // Let the close animation begin before scrolling
    setTimeout(() => scrollTo(href), 150);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          initial={{ opacity: 0, y: "-4%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-4%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[85] flex flex-col bg-background/95 px-6 pb-10 pt-28 backdrop-blur-xl lg:hidden"
        >
          <motion.nav
            variants={staggerContainer(0.07, 0.1)}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-2"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <motion.button
                key={link.href + link.label}
                variants={fadeUp}
                type="button"
                onClick={() => go(link.href)}
                className="group flex items-center justify-between rounded-2xl px-2 py-4 text-left font-display text-3xl font-medium text-foreground transition-colors duration-300 hover:text-accent"
              >
                {link.label}
                <ArrowUpRight
                  className="h-6 w-6 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </motion.button>
            ))}
          </motion.nav>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
            className="mt-auto flex flex-col gap-4"
          >
            <button
              type="button"
              onClick={() => go("#contact")}
              className="flex h-14 w-full items-center justify-center rounded-full bg-accent text-base font-medium text-accent-foreground shadow-glow transition-transform duration-300 active:scale-[0.98]"
            >
              Start a project
            </button>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-center text-sm text-muted-foreground"
            >
              {siteConfig.email}
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
