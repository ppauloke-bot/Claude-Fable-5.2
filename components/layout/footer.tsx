"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { navLinks } from "@/constants/navigation";
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/variants";

const socials = [
  { label: "Twitter / X", href: siteConfig.links.twitter },
  { label: "LinkedIn", href: siteConfig.links.linkedin },
  { label: "Instagram", href: siteConfig.links.instagram },
  { label: "Dribbble", href: siteConfig.links.dribbble },
];

export function Footer() {
  const { scrollTo } = useSmoothScroll();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/60">
      <div className="container-site py-16 sm:py-20">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]"
        >
          {/* Brand column */}
          <motion.div variants={fadeUp} className="flex flex-col gap-5">
            <Link
              href="/"
              aria-label={`${siteConfig.name} — home`}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(0, 0);
              }}
              className="w-fit font-display text-2xl font-medium tracking-tight"
            >
              {siteConfig.shortName}
              <span className="text-accent">.</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {siteConfig.tagline}. A senior studio for brands that refuse to blend in.
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="group flex w-fit items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent"
            >
              {siteConfig.email}
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-300 ease-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </motion.div>

          {/* Sitemap */}
          <motion.nav variants={fadeUp} aria-label="Footer navigation">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Explore
            </p>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Socials */}
          <motion.div variants={fadeUp}>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Follow
            </p>
            <ul className="flex flex-col gap-2.5">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Studio */}
          <motion.div variants={fadeUp}>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Studio
            </p>
            <address className="text-sm not-italic leading-relaxed text-muted-foreground">
              {siteConfig.address}
              <br />
              {siteConfig.phone}
            </address>
          </motion.div>
        </motion.div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year} {siteConfig.name}. Crafted with care in San Francisco.
          </p>
          <p className="text-xs text-muted-foreground">
            Designed & engineered in-house. No templates were harmed.
          </p>
        </div>
      </div>
    </footer>
  );
}
