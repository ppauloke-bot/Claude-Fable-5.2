"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Globe } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Locale selector. Persists the choice and updates <html lang> —
 * ready to be wired to a full i18n routing layer (see README).
 */
export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [locale, setLocale] = useState("en");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("aurelia-locale");
    if (saved) {
      setLocale(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  const select = (code: string) => {
    setLocale(code);
    localStorage.setItem("aurelia-locale", code);
    document.documentElement.lang = code;
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Change language"
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex h-10 items-center gap-1.5 rounded-full px-3 text-sm text-muted-foreground transition-colors duration-300 hover:bg-muted/70 hover:text-foreground"
      >
        <Globe className="h-4 w-4" aria-hidden="true" />
        <span className="uppercase">{locale}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label="Language"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="glass absolute right-0 top-12 z-50 w-44 overflow-hidden rounded-2xl p-1.5 shadow-lifted"
          >
            {siteConfig.locales.map((l) => (
              <li key={l.code} role="option" aria-selected={locale === l.code}>
                <button
                  type="button"
                  onClick={() => select(l.code)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors duration-200",
                    locale === l.code
                      ? "bg-muted/80 text-foreground"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  {l.label}
                  {locale === l.code && (
                    <Check className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  )}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
