/**
 * Global site configuration.
 * Single source of truth for branding, URLs and metadata.
 */
export const siteConfig = {
  name: "Aurelia Studio",
  shortName: "Aurelia",
  tagline: "Digital experiences that move people",
  description:
    "Aurelia is a premium digital product studio. We design and engineer brands, websites and products that feel effortless — and convert like nothing else.",
  url: "https://aurelia-studio.vercel.app",
  ogImage: "/opengraph-image",
  email: "hello@aurelia.studio",
  phone: "+1 (415) 555-0188",
  address: "660 Mission Street, San Francisco, CA",
  twitterHandle: "@aureliastudio",
  links: {
    twitter: "https://twitter.com/aureliastudio",
    linkedin: "https://linkedin.com/company/aurelia-studio",
    instagram: "https://instagram.com/aurelia.studio",
    dribbble: "https://dribbble.com/aurelia",
    github: "https://github.com/aurelia-studio",
  },
  locales: [
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
    { code: "de", label: "Deutsch" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
