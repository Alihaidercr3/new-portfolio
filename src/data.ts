/* ── Single source of truth — edit these values anytime ── */

export const profile = {
  name: "Ali Haider",
  shortName: "-_-",
  role: "Full-Stack Engineer",
  handle: "ali.dev",
  availability: "Available for full-stack roles & contract work",
  email: "alihaidercr3@gmail.com",
  intro:
    "a full-stack developer specializing in React, JavaScript, and Tailwind CSS. I build high-performance user interfaces and responsive web systems.",
} as const;


export const web3formsKey =
  (import.meta as ImportMeta & { env: { VITE_CONTACT_API: string } })
    .env.VITE_CONTACT_API || '';
export const marqueeItems = [
  "React.js",
  "Next.js",
  "JavaScript ES6+",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "MongoDB",
  "REST APIs",
  "Vite",
  "Git & GitHub",
] as const;

export type Project = {
  id: string;
  title: string;
  liveUrl: string;
  iframeTitle: string;
  description: string;
  year: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    id: "asset-ledger",
    title: "Enterprise Resource & Asset Ledger",
    liveUrl: "https://alidev-asset-ledger.vercel.app/",
    iframeTitle: "Live preview — Enterprise Resource & Asset Ledger",
    description:
      "A responsive resource management interface engineered with state-controlled data grids, automated validation checks, and rapid row deletion workflows.",
    year: "2025",
    stack: ["React.js", "JavaScript", "Tailwind CSS"],
  },
  {
    id: "monolith",
    title: "The Monolith Culinary Experience",
    liveUrl: "https://alidev-monolith-restaurant.vercel.app/",
    iframeTitle: "Live preview — The Monolith Culinary Experience",
    description:
      "An experiential web application featuring asynchronous cover allocation simulation, dynamic menu matrices, and custom typography scaling.",
    year: "2025",
    stack: ["React.js", "Tailwind CSS", "State Management"],
  },
];

export const skillGroups = [
  {
    n: "01",
    title: "Frontend Stack",
    items: ["React.js", "Next.js", "JavaScript (ES6+)","TypeScript","HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    n: "02",
    title: "Backend & APIs",
    items: ["Node.js", "Express.js", "REST API Integration", "JSON Data Handling"],
  },
  {
    n: "03",
    title: "Database & Tools",
    items: ["MongoDB", "Git", "GitHub", "Vite", "Vercel", "npm","AWS" ],
  },
  {
    n: "04",
    title: "UI & Workflow",
    items: ["Responsive Web Design", "Component Architecture", "Cross-Browser Testing","State Management","Performance Optimization","Version Control (Git)"],
  },
] as const;

export const stats = [
  { value: "05", label: "Live production apps" },
  { value: "03", label: "Verified certifications" },
  { value: "12+", label: "Core technologies" },
] as const;

export const experience = [
  {
    period: "2025 — 2026",
    role: "Full-Stack MERN Intern",
    company: "Co Dev",
    note: "Building modular frontend components, integrating API endpoints, fixing responsive layout regressions, and maintaining clean code standards.",
    current: true,
  },
  {
    period: "2024 — 2025",
    role: "Web & Mobile Application Specialization",
    company: "Saylani SMIT",
    note: "Completed hands-on software development training focused on modern JavaScript, the React ecosystem, and responsive layout architectures.",
    current: false,
  },
] as const;

export type Certificate = {
  id: number;
  name: string;
  issuer: string;
  monogram: string;
  brandDot: string; // decorative brand accent
  date: string;
  description: string;
  image?: string; // drop your real cert PNG into public/images/ and set the path here
};

export const certificates: Certificate[] = [
  {
    id: 1,
    name: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    monogram: "A",
    brandDot: "#d97757",
    date: "Aug 2026",
    image:"/images/anthropics.png",
    description:
      "Foundational certification verifying core competencies in artificial intelligence frameworks, model structure, and technical implementation.",
  },
  {
    id: 2,
    name: "Data Analytics Simulation",
    issuer: "Deloitte",
    monogram: "D",
    brandDot: "#86bc25",
    date: "Aug 2026",
    image:"/images/deloitte.png",
    description:
      "Practical job simulation covering enterprise data analysis, forensic technology, and handling complex datasets.",
  },
  {
    id: 3,
    name: "WordPress Site Architecture",
    issuer: "Coursera",
    monogram: "C",
    brandDot: "#0056d2",
    date: "Mar 2026",
    image:"/images/coursera.png",
    description:
      "Project-based certification demonstrating complete website design, CMS deployment, and layout optimization.",
  },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/Alihaidercr3" },
  { label: "LinkedIn", href: "#" }, // add your LinkedIn URL here
] as const;
