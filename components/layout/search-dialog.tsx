"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";
import { searchIndex } from "@/constants/navigation";
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";
import { cn } from "@/lib/utils";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Command-palette style search (⌘K / Ctrl+K). Filters a static index of
 * site destinations with keyboard navigation: arrows to move, Enter to
 * go, Escape to close. Focus is trapped in the input while open.
 */
export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { scrollTo } = useSmoothScroll();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return searchIndex;
    return searchIndex.filter(
      (entry) =>
        entry.title.toLowerCase().includes(q) ||
        entry.description.toLowerCase().includes(q) ||
        entry.keywords.some((k) => k.includes(q))
    );
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      // Focus after the entrance animation starts
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (href: string) => {
    onClose();
    scrollTo(href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    }
    if (e.key === "Enter" && results[activeIndex]) {
      go(results[activeIndex].href);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[95] flex items-start justify-center bg-foreground/20 px-4 pt-[14vh] backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search the site"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
            className="glass w-full max-w-xl overflow-hidden rounded-3xl shadow-lifted"
          >
            <div className="flex items-center gap-3 border-b border-border/60 px-5 py-4">
              <Search className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                placeholder="Search sections, services, answers…"
                aria-label="Search"
                className="w-full bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <ul role="listbox" aria-label="Search results" className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="px-4 py-8 text-center text-sm text-muted-foreground">
                  Nothing found for “{query}” — try “pricing” or “process”.
                </li>
              )}
              {results.map((entry, i) => (
                <li key={entry.href + entry.title} role="option" aria-selected={i === activeIndex}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => go(entry.href)}
                    className={cn(
                      "group flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition-colors duration-200",
                      i === activeIndex ? "bg-muted/80" : "hover:bg-muted/50"
                    )}
                  >
                    <span>
                      <span className="block text-sm font-medium text-foreground">
                        {entry.title}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {entry.description}
                      </span>
                    </span>
                    <ArrowRight
                      className={cn(
                        "h-4 w-4 text-accent transition-all duration-200",
                        i === activeIndex ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
                      )}
                      aria-hidden="true"
                    />
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 border-t border-border/60 px-5 py-3 text-[11px] text-muted-foreground">
              <span><kbd className="rounded border border-border bg-muted/60 px-1.5 py-0.5 font-sans">↑↓</kbd> navigate</span>
              <span><kbd className="rounded border border-border bg-muted/60 px-1.5 py-0.5 font-sans">↵</kbd> open</span>
              <span><kbd className="rounded border border-border bg-muted/60 px-1.5 py-0.5 font-sans">esc</kbd> close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
