import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
}

export interface MegaMenuColumn {
  title: string;
  items: NavItem[];
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  deliverables: string[];
}

export interface Project {
  title: string;
  client: string;
  category: string;
  year: string;
  description: string;
  result: string;
  gradient: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
}

export interface TimelineStep {
  index: string;
  title: string;
  description: string;
  duration: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

export interface SearchEntry {
  title: string;
  description: string;
  href: string;
  keywords: string[];
}
