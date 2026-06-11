import {
  Award,
  Compass,
  Fingerprint,
  Gauge,
  Gem,
  HeartHandshake,
  Layers,
  MonitorSmartphone,
  Palette,
  ShieldCheck,
  Sparkles,
  Wand2,
} from "lucide-react";
import type {
  FaqItem,
  Feature,
  PricingTier,
  Project,
  Service,
  Stat,
  Testimonial,
  TimelineStep,
} from "@/types";

/* ------------------------------------------------------------------ */
/* Clients                                                             */
/* ------------------------------------------------------------------ */

export const clients = [
  "Northwind",
  "Helios Labs",
  "Marlowe & Co",
  "Vantage",
  "Atelier Nove",
  "Crescent",
  "Fieldstone",
  "Lumen Capital",
  "Oslo Supply",
  "Praxis Health",
];

/* ------------------------------------------------------------------ */
/* Statistics                                                          */
/* ------------------------------------------------------------------ */

export const stats: Stat[] = [
  {
    value: 140,
    suffix: "+",
    label: "Products shipped",
    description: "From seed-stage launches to enterprise replatforms",
  },
  {
    value: 23,
    suffix: "",
    label: "Design awards",
    description: "Awwwards, CSSDA and FWA recognitions since 2014",
  },
  {
    value: 98,
    suffix: "%",
    label: "Client retention",
    description: "Most partners stay with us for three years or more",
  },
  {
    value: 4.2,
    suffix: "x",
    label: "Average conversion lift",
    description: "Measured across redesigns in the last 24 months",
  },
];

/* ------------------------------------------------------------------ */
/* Features                                                            */
/* ------------------------------------------------------------------ */

export const features: Feature[] = [
  {
    icon: Gem,
    title: "Craft without compromise",
    description:
      "Every pixel, easing curve and line of code is reviewed by senior hands. We don't ship 'good enough' — we ship work we'd put our name on.",
  },
  {
    icon: Gauge,
    title: "Performance as a feature",
    description:
      "Beauty that loads in milliseconds. We engineer for Core Web Vitals from day one, because speed is the first impression before design.",
  },
  {
    icon: Fingerprint,
    title: "Unmistakably yours",
    description:
      "No templates. No recycled layouts. We build a visual language from your brand's DNA, so your product could never be confused with anyone else's.",
  },
  {
    icon: ShieldCheck,
    title: "Accessible by default",
    description:
      "WCAG-compliant contrast, keyboard navigation and reduced-motion support are built in — not bolted on. Premium means everyone is included.",
  },
  {
    icon: Sparkles,
    title: "Motion with meaning",
    description:
      "Animation that guides attention and builds trust, tuned to 60fps. Every transition has a purpose; nothing moves just to move.",
  },
  {
    icon: HeartHandshake,
    title: "A partner, not a vendor",
    description:
      "Direct access to the people doing the work. Weekly demos, honest timelines and a team that treats your launch like our own.",
  },
];

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export const services: Service[] = [
  {
    icon: Compass,
    title: "Brand Strategy & Identity",
    description:
      "We distill what makes you different into a brand system that's impossible to ignore — voice, identity, and the story that ties them together.",
    deliverables: ["Positioning", "Visual identity", "Brand guidelines", "Naming & voice"],
  },
  {
    icon: Layers,
    title: "Product & Interface Design",
    description:
      "End-to-end product design that balances delight with usability. Research-driven, prototype-tested, and ready for engineering on day one.",
    deliverables: ["UX research", "Design systems", "Prototyping", "Usability testing"],
  },
  {
    icon: MonitorSmartphone,
    title: "Web Design & Engineering",
    description:
      "Marketing sites and web apps built on modern frameworks. Fast, accessible, SEO-ready — and engineered to score 95+ on Lighthouse.",
    deliverables: ["Next.js development", "CMS integration", "Performance tuning", "Analytics"],
  },
  {
    icon: Wand2,
    title: "Motion & Interaction",
    description:
      "Signature animations, WebGL moments and micro-interactions that make your product feel alive — choreographed, never chaotic.",
    deliverables: ["Interaction design", "WebGL & 3D", "Lottie & SVG animation", "Motion systems"],
  },
];

/* ------------------------------------------------------------------ */
/* Portfolio                                                           */
/* ------------------------------------------------------------------ */

export const projects: Project[] = [
  {
    title: "A bank that feels like a boutique",
    client: "Lumen Capital",
    category: "Fintech · Web Platform",
    year: "2025",
    description:
      "A complete digital replatform for a private wealth firm — warm, discreet, and engineered for trust at every scroll.",
    result: "+212% qualified leads in the first quarter",
    gradient: "from-amber-200/60 via-orange-100/40 to-rose-100/50",
  },
  {
    title: "Healthcare, without the cold",
    client: "Praxis Health",
    category: "Health · Brand & Product",
    year: "2025",
    description:
      "We rebuilt a telehealth product around comfort: soft motion, generous space, and language that reads like a friend, not a form.",
    result: "Patient onboarding completion rose from 61% to 89%",
    gradient: "from-emerald-100/50 via-teal-50/40 to-amber-100/40",
  },
  {
    title: "Commerce at the speed of desire",
    client: "Oslo Supply",
    category: "E-commerce · Design & Build",
    year: "2024",
    description:
      "A headless storefront with sub-second page loads and cinematic product storytelling for a Scandinavian furniture house.",
    result: "Checkout conversion up 3.4x year over year",
    gradient: "from-stone-200/60 via-amber-100/40 to-orange-100/40",
  },
  {
    title: "The dev tool developers talk about",
    client: "Helios Labs",
    category: "SaaS · Brand & Web",
    year: "2024",
    description:
      "Launch site and identity for an AI infrastructure startup — technical credibility wrapped in unexpected warmth.",
    result: "Site of the Day · 40k signups in launch week",
    gradient: "from-violet-100/50 via-rose-100/40 to-amber-100/50",
  },
];

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

export const testimonials: Testimonial[] = [
  {
    quote:
      "Aurelia didn't just redesign our site — they changed how our company sees itself. Within a month, prospects started telling us we 'felt like the obvious choice'. That's worth more than any metric.",
    author: "Margaux Chen",
    role: "Chief Executive Officer",
    company: "Lumen Capital",
    initials: "MC",
  },
  {
    quote:
      "I've worked with agencies for fifteen years. This is the first team where the engineering matched the design ambition. 98 Lighthouse score on a site this animated still doesn't seem possible.",
    author: "Daniel Okafor",
    role: "VP of Engineering",
    company: "Helios Labs",
    initials: "DO",
  },
  {
    quote:
      "Every detail was considered — down to how the focus states feel on a keyboard. Our accessibility audit came back clean for the first time ever, and the site is the most beautiful thing we've shipped.",
    author: "Sofie Lindqvist",
    role: "Head of Digital",
    company: "Oslo Supply",
    initials: "SL",
  },
  {
    quote:
      "They asked harder questions about our business than our investors did. The strategy work alone paid for the engagement before a single pixel was drawn.",
    author: "Ana Reyes",
    role: "Founder",
    company: "Praxis Health",
    initials: "AR",
  },
];

/* ------------------------------------------------------------------ */
/* Process timeline                                                    */
/* ------------------------------------------------------------------ */

export const timeline: TimelineStep[] = [
  {
    index: "01",
    title: "Discover",
    description:
      "We immerse ourselves in your business, audience and ambitions. Stakeholder interviews, competitive analysis and a shared definition of success.",
    duration: "Week 1–2",
  },
  {
    index: "02",
    title: "Define",
    description:
      "Strategy crystallizes into direction: positioning, information architecture, content strategy and a creative brief everyone believes in.",
    duration: "Week 2–3",
  },
  {
    index: "03",
    title: "Design",
    description:
      "Concepts become a living design system. You see real pages, real motion and real copy — reviewed together in weekly working sessions.",
    duration: "Week 3–6",
  },
  {
    index: "04",
    title: "Develop",
    description:
      "Senior engineers translate design intent with obsessive fidelity. Performance budgets, accessibility audits and QA on real devices.",
    duration: "Week 6–9",
  },
  {
    index: "05",
    title: "Deliver",
    description:
      "Launch is the beginning, not the end. Analytics, training, documentation and a 30-day polish window are part of every engagement.",
    duration: "Week 9–10",
  },
];

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export const faqs: FaqItem[] = [
  {
    question: "How long does a typical project take?",
    answer:
      "Most brand-and-website engagements run 8–10 weeks from kickoff to launch. Product design work is usually structured in monthly cycles. We'd rather give you an honest timeline up front than a fast one we can't keep.",
  },
  {
    question: "What does an engagement cost?",
    answer:
      "Website projects typically start at $40k; ongoing product partnerships start at $12k per month. After a 30-minute intro call we'll send a fixed proposal — no hourly billing, no surprise invoices.",
  },
  {
    question: "Who will actually work on our project?",
    answer:
      "The senior team you meet on the first call is the team that does the work. We deliberately stay small — every project gets a strategist, a designer and an engineer with 8+ years of experience.",
  },
  {
    question: "Do you work with startups or only established companies?",
    answer:
      "Both. Roughly half our partners are venture-backed startups preparing to launch or raise; the other half are established brands modernizing their digital presence. The bar for craft is the same.",
  },
  {
    question: "Can you work with our in-house team?",
    answer:
      "Gladly. We regularly embed with internal design and engineering teams, hand off documented design systems, and run workshops so the work keeps evolving after we leave.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Every project includes a 30-day polish window for refinements at no extra cost. After that, most clients move to a lightweight retainer for continuous improvement — but there's never lock-in.",
  },
];

/* ------------------------------------------------------------------ */
/* Pricing                                                             */
/* ------------------------------------------------------------------ */

export const pricingTiers: PricingTier[] = [
  {
    name: "Launch",
    price: "$40k",
    period: "from, fixed scope",
    description:
      "For teams that need a world-class marketing site, fast. Strategy, design and build in one focused sprint.",
    features: [
      "Brand-aligned art direction",
      "Up to 8 bespoke pages",
      "Custom motion & interactions",
      "CMS so your team can edit",
      "95+ Lighthouse guarantee",
      "30-day post-launch polish",
    ],
    cta: "Start a project",
    highlighted: false,
  },
  {
    name: "Partner",
    price: "$12k",
    period: "per month",
    description:
      "An embedded senior team for product companies that ship continuously. Design and engineering on tap.",
    features: [
      "Dedicated designer + engineer",
      "Unlimited requests, one at a time",
      "Weekly strategy sessions",
      "Design system stewardship",
      "Async Slack collaboration",
      "Pause or cancel anytime",
    ],
    cta: "Book an intro call",
    highlighted: true,
  },
  {
    name: "Transform",
    price: "Custom",
    period: "scoped per engagement",
    description:
      "Full rebrand and replatform for established companies. Strategy through launch, with executive alignment.",
    features: [
      "Complete brand strategy",
      "Identity & guidelines",
      "Website + product redesign",
      "Engineering & migration",
      "Team training & handoff",
      "12-month roadmap",
    ],
    cta: "Talk to us",
    highlighted: false,
  },
];

/* ------------------------------------------------------------------ */
/* Awards strip (social proof)                                         */
/* ------------------------------------------------------------------ */

export const awards = [
  { icon: Award, label: "Awwwards", detail: "Site of the Day ×6" },
  { icon: Award, label: "CSS Design Awards", detail: "Website of the Year nominee" },
  { icon: Award, label: "FWA", detail: "FWA of the Day ×4" },
  { icon: Palette, label: "Brand New", detail: "Featured identity work" },
];
