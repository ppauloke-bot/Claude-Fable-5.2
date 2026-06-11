"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { navLinks } from "@/constants/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";
import { MegaMenu } from "@/components/layout/mega-menu";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { SearchDialog } from "@/components/layout/search-dialog";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { LanguageSwitcher } from "@/components/layout/language-switcher";

/**
 * Floating navbar: full-width and transparent at the top of the page,
 * condensing into a glass pill once you scroll. Hosts the Services
 * mega menu, ⌘K search, theme toggle and language switcher.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Global ⌘K / Ctrl+K shortcut for search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const closeMegaSoon = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 120);
  };

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[110] -translate-y-20 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] transition-all duration-500 ease-soft",
          scrolled ? "px-3 pt-3 sm:px-5" : "px-0 pt-0"
        )}
      >
        <div
          className={cn(
            "mx-auto flex h-16 items-center justify-between gap-4 transition-all duration-500 ease-soft",
            scrolled
              ? "glass max-w-5xl rounded-full px-4 shadow-soft sm:px-6"
              : "max-w-7xl px-5 sm:px-8 lg:px-12"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label={`${siteConfig.name} — home`}
            onClick={(e) => {
              e.preventDefault();
              scrollTo(0, 0);
            }}
            className="font-display text-xl font-medium tracking-tight text-foreground"
          >
            {siteConfig.shortName}
            <span className="text-accent">.</span>
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Main navigation" className="relative hidden items-center gap-1 lg:flex">
            {navLinks.map((link) =>
              link.label === "Services" ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={openMega}
                  onMouseLeave={closeMegaSoon}
                >
                  <button
                    type="button"
                    aria-expanded={megaOpen}
                    aria-haspopup="menu"
                    onClick={() => setMegaOpen((v) => !v)}
                    onFocus={openMega}
                    className="flex items-center gap-1 rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
                  >
                    {link.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-300",
                        megaOpen && "rotate-180"
                      )}
                      aria-hidden="true"
                    />
                  </button>
                  <AnimatePresence>
                    {megaOpen && <MegaMenu onNavigate={() => setMegaOpen(false)} />}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => scrollTo(link.href)}
                  className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
                >
                  {link.label}
                </button>
              )
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search (Command K)"
              className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors duration-300 hover:bg-muted/70 hover:text-foreground"
            >
              <Search className="h-[18px] w-[18px]" aria-hidden="true" />
            </button>
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => scrollTo("#contact")}
              className="ml-2 hidden h-10 items-center rounded-full bg-accent px-5 text-sm font-medium text-accent-foreground shadow-glow transition-all duration-300 ease-soft hover:scale-[1.04] active:scale-[0.98] lg:flex"
            >
              Start a project
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors duration-300 hover:bg-muted/70 lg:hidden"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
