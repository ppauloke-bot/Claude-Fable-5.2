# Aurelia Studio

A premium, production-ready studio website — minimalist luxury with warm tones,
award-level motion design, and obsessive attention to accessibility and
performance.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · TailwindCSS ·
Framer Motion · GSAP ScrollTrigger · Lenis smooth scroll · Three.js · Lucide.

---

## ✨ Highlights

- **Motion system** — one shared easing language (`animations/variants.ts`),
  word-mask text reveals, scroll-triggered storytelling (GSAP), magnetic
  buttons, 3D tilt cards with cursor spotlight, mouse-parallax hero cards,
  Three.js light-dust particles, infinite marquee, animated counters,
  morphing mesh-gradient blobs, film-grain noise, first-visit preloader,
  scroll progress bar and page transitions.
- **UX** — floating glass navbar with Services mega menu, ⌘K command-palette
  search, dark/light mode, language switcher, back-to-top, skip link,
  full-screen mobile menu with large touch targets.
- **Accessibility** — semantic HTML, ARIA throughout, keyboard navigation
  (arrows/enter/escape in search, focus-visible rings everywhere),
  AA-checked color tokens, and `prefers-reduced-motion` respected by every
  animation — Lenis, GSAP, Framer Motion, Three.js and CSS alike.
- **Performance** — Three.js lazy-loaded client-side only, capped pixel
  ratio, GPU-only animations (transform/opacity), `next/font` with swap,
  package import optimization, no third-party scripts.
- **SEO** — full metadata, Open Graph + Twitter cards (generated OG image),
  JSON-LD structured data (Organization / WebSite / ProfessionalService),
  `sitemap.xml`, `robots.txt`, web manifest.

## 📁 Structure

```
app/            Routes, layout, metadata, sitemap/robots/manifest, OG image
components/
  effects/      Cursor, particles, mesh gradient, noise, preloader, progress
  layout/       Navbar, mega menu, mobile menu, search, footer, toggles
  providers/    Theme (next-themes) and Lenis + GSAP smooth-scroll provider
  sections/     Hero, clients, stats, features, services, portfolio,
                testimonials, timeline, FAQ, pricing, CTA
  ui/           Button, AnimatedText, Marquee, TiltCard, Section
hooks/          Magnetic hover, counters, media queries, mouse position
lib/            cn(), math helpers, JSON-LD builder
animations/     Shared Framer Motion variants and easing
config/         Site-wide configuration (branding, URLs, locales)
constants/      Navigation, mega menu, search index, all marketing content
types/          Shared TypeScript interfaces
styles/         Tailwind layers + design tokens (CSS custom properties)
utils/          Formatting helpers
assets/         Source design assets (not bundled)
public/         Static files served as-is
```

## 🚀 Getting started

**Requirements:** Node.js ≥ 18.18.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
# → http://localhost:3000

# 3. Production build + preview
npm run build
npm start

# Quality gates
npm run lint
npm run typecheck
```

## ☁️ Deployment

### Vercel (recommended)

1. Push this repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo —
   Vercel auto-detects Next.js; no configuration needed.
3. Deploy. Every push to the default branch becomes a production deploy;
   every PR gets a preview URL.

Or from the CLI:

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

After deploying, set your final domain in `config/site.ts` (`siteConfig.url`)
so canonical URLs, the sitemap and structured data point at production.

### Self-hosted

```bash
npm run build
npm start       # serves on port 3000 behind your reverse proxy
```

## 🎨 Customization

- **Branding & copy** — `config/site.ts` and `constants/content.ts` hold every
  word and link on the site; no copy is hard-coded inside components.
- **Colors** — design tokens live in `styles/globals.css` as RGB triplets
  consumed by `tailwind.config.ts`. Change two blocks, re-theme everything.
- **Type** — fonts are wired in `app/layout.tsx` via `next/font` (Inter +
  Fraunces). Swap them in one place.
- **Motion** — global easing and variants in `animations/variants.ts`;
  Lenis/GSAP wiring in `components/providers/smooth-scroll-provider.tsx`.
- **i18n** — the language switcher persists locale and updates `<html lang>`;
  to ship full translations, add `next-intl` (or similar) and map the stored
  locale to routed dictionaries.

## ♿ Accessibility notes

Every animated component checks `prefers-reduced-motion` and degrades to a
static, fully readable layout. The custom cursor never replaces the native
one. Interactive controls are real `<button>`/`<a>` elements with labels,
and the FAQ, carousel, menus and search dialog follow WAI-ARIA patterns.

---

© Aurelia Studio. All content in `constants/content.ts` is original
marketing copy for this fictional studio — replace it with your own.
