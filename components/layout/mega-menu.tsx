"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { megaMenu } from "@/constants/navigation";
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";

interface MegaMenuProps {
  onNavigate: () => void;
}

/**
 * Services mega menu panel. Rendered inside the navbar when the
 * Services trigger is hovered/focused; the parent owns open state.
 */
export function MegaMenu({ onNavigate }: MegaMenuProps) {
  const { scrollTo } = useSmoothScroll();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="glass absolute left-1/2 top-[calc(100%+12px)] w-[min(820px,90vw)] -translate-x-1/2 rounded-3xl p-8 shadow-lifted"
      role="menu"
      aria-label="Services menu"
    >
      <div className="grid gap-8 sm:grid-cols-3">
        {megaMenu.map((column) => (
          <div key={column.title}>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {column.title}
            </p>
            <ul className="flex flex-col gap-1">
              {column.items.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        onNavigate();
                        scrollTo(item.href);
                      }}
                      className="group flex w-full items-start gap-3 rounded-2xl p-3 text-left transition-colors duration-300 hover:bg-muted/60"
                    >
                      {Icon && (
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform duration-300 ease-soft group-hover:scale-110">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                      )}
                      <span>
                        <span className="block text-sm font-medium text-foreground">
                          {item.label}
                        </span>
                        <span className="block text-xs leading-relaxed text-muted-foreground">
                          {item.description}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <button
        type="button"
        role="menuitem"
        onClick={() => {
          onNavigate();
          scrollTo("#contact");
        }}
        className="group mt-6 flex w-full items-center justify-between rounded-2xl bg-gradient-to-r from-accent/10 via-accent-soft/10 to-accent/10 px-5 py-4 transition-shadow duration-300 hover:shadow-soft"
      >
        <span className="text-sm font-medium text-foreground">
          Not sure where to start? Tell us about your project.
        </span>
        <ArrowUpRight
          className="h-4 w-4 text-accent transition-transform duration-300 ease-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </button>
    </motion.div>
  );
}
