import {
  Compass,
  Layers,
  MonitorSmartphone,
  Palette,
  Rocket,
  Sparkles,
  Wand2,
  LineChart,
} from "lucide-react";
import type { MegaMenuColumn, NavItem, SearchEntry } from "@/types";

export const navLinks: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

/** Columns rendered inside the Services mega menu. */
export const megaMenu: MegaMenuColumn[] = [
  {
    title: "Design",
    items: [
      {
        label: "Brand Identity",
        href: "#services",
        description: "Identities people remember",
        icon: Palette,
      },
      {
        label: "Product Design",
        href: "#services",
        description: "Interfaces that feel inevitable",
        icon: Layers,
      },
      {
        label: "Motion Design",
        href: "#services",
        description: "Stories told in 60fps",
        icon: Sparkles,
      },
    ],
  },
  {
    title: "Engineering",
    items: [
      {
        label: "Web Development",
        href: "#services",
        description: "Fast, resilient, beautiful",
        icon: MonitorSmartphone,
      },
      {
        label: "Creative Development",
        href: "#services",
        description: "WebGL and interactive 3D",
        icon: Wand2,
      },
      {
        label: "Product Launch",
        href: "#services",
        description: "From zero to shipped",
        icon: Rocket,
      },
    ],
  },
  {
    title: "Strategy",
    items: [
      {
        label: "Brand Strategy",
        href: "#services",
        description: "Positioning that cuts through",
        icon: Compass,
      },
      {
        label: "Growth & CRO",
        href: "#services",
        description: "Design that compounds",
        icon: LineChart,
      },
    ],
  },
];

/** Client-side search index for the command palette. */
export const searchIndex: SearchEntry[] = [
  {
    title: "Our Work",
    description: "Selected projects and case studies",
    href: "#work",
    keywords: ["portfolio", "projects", "case studies", "work"],
  },
  {
    title: "Services",
    description: "Brand, product, web and motion",
    href: "#services",
    keywords: ["services", "design", "development", "branding", "motion"],
  },
  {
    title: "Features",
    description: "Why teams choose Aurelia",
    href: "#features",
    keywords: ["features", "benefits", "why us"],
  },
  {
    title: "Our Process",
    description: "How we take you from idea to launch",
    href: "#process",
    keywords: ["process", "timeline", "how it works", "method"],
  },
  {
    title: "Testimonials",
    description: "What our clients say",
    href: "#testimonials",
    keywords: ["testimonials", "reviews", "clients", "social proof"],
  },
  {
    title: "Pricing",
    description: "Transparent engagement models",
    href: "#pricing",
    keywords: ["pricing", "plans", "cost", "rates", "retainer"],
  },
  {
    title: "FAQ",
    description: "Answers to common questions",
    href: "#faq",
    keywords: ["faq", "questions", "answers", "help"],
  },
  {
    title: "Contact",
    description: "Start a project with us",
    href: "#contact",
    keywords: ["contact", "hire", "start", "email", "talk"],
  },
];
