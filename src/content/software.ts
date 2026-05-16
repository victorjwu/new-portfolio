export type Experience = {
  when: string;
  company: string;
  role: string;
  loc?: string;
  current?: boolean;
};

export const EXPERIENCE: Experience[] = [
  {
    when: "2025 — Now",
    company: "Google",
    role: "Software Engineer II · YouTube",
    loc: "San Francisco",
    current: true,
  },
  {
    when: "2025",
    company: "Amazon Robotics",
    role: "Software Development Engineer · Vulcan Stow - Observability Tooling",
    loc: "Seattle",
  },
  {
    when: "Summer 2024",
    company: "Amazon Robotics",
    role: "SDE Intern · Vulcan Stow - Observability Tooling",
    loc: "Seattle",
  },
  {
    when: "Summer 2023",
    company: "Amazon Robotics",
    role: "SDE Intern · Vulcan Stow - Match Algorithm",
    loc: "Seattle",
  },
  {
    when: "2021 — 25",
    company: "Georgia Tech",
    role: "B.S. Computer Science · Intelligence & Media",
    loc: "Atlanta",
  },
];

export type Project = {
  num: string;
  title: string;
  status: "live" | "shipped" | "archived";
  desc: string;
  meta: string;
  year: string;
  href?: string;
};

export const PROJECTS: Project[] = [
  {
    num: "01",
    title: "mise",
    status: "live",
    desc: "Designing and building a Duolingo-style mobile cooking education app (React Native/Expo, TypeScript, Supabase) featuring AI-graded photo submissions and personalized, adaptive curricula that take beginners to confident home cooks.",
    meta: "React Native + Expo · Multimodal AI Vision Models · Supabase",
    year: "2026",
  },
  {
    num: "02",
    title: "CRM Migration AI",
    status: "live",
    desc: "Designing an AI-native Salesforce-to-HubSpot CRM migration agent that uses an LLM semantic layer to translate org metadata, code, and automations into HubSpot configuration with human-in-the-loop review and behavioral equivalence testing.",
    meta: " HubSpot MCP · Frontier LLMs",
    year: "2026"
  },
  {
    num: "03",
    title: "ABAC CoPilot",
    status: "shipped",
    desc: "An NLP model that translates plain-English policies into JSON for Microsoft's attribute-based access control. 2nd Place, Georgia Tech Junior Design.",
    meta: "PYTHON · NLP · AZURE",
    year: "2025",
  },
  {
    num: "04",
    title: "victorjwu.com",
    status: "live",
    desc: "This site. A quieter rewrite in React + Vite, leaning on type and rhythm instead of motion.",
    meta: "REACT · VITE · TS",
    year: "2025",
  },
];

export type StackColumn = { label: string; items: string[] };

export const STACK: StackColumn[] = [
  {
    label: "Languages",
    items: ["TypeScript", "Python", "Java", "C++", "Kotlin"],
  },
  {
    label: "Frameworks",
    items: [
      "React / Next.js",
      "Node.js",
      "PyTorch",
      "TensorFlow",
      "Framer Motion",
    ],
  },
  {
    label: "Infra",
    items: ["AWS", "Lambda", "PostgreSQL", "MongoDB", "Vercel"],
  },
  {
    label: "Tools",
    items: ["Figma", "Cursor", "Git", "Linear", "Notion"],
  },
];
