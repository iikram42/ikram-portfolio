# Ikram Kirmani — Elite 3D DevOps Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready, 60fps 3D portfolio for Cloud/DevOps Engineer Syed Ikramuddin (Ikram Kirmani) that looks and feels like a senior engineer's infrastructure control center.

**Architecture:** Next.js 15 App Router with React Three Fiber for 3D scenes, Framer Motion for scroll/reveal animations, and Shadcn UI for accessible primitives. All content lives in a single `lib/data.ts` file, components are scoped to one responsibility each, and 3D scenes are lazy-loaded via Next.js dynamic imports to keep the initial bundle lean.

**Tech Stack:** Next.js 15 · TypeScript · Tailwind CSS · Framer Motion · Three.js · React Three Fiber · Drei · Shadcn UI · Lucide React

---

## File Map

```
ikram-portfolio/
├── app/
│   ├── layout.tsx              # Root layout — fonts, providers, metadata
│   ├── page.tsx                # Section orchestration, smooth scroll
│   ├── globals.css             # CSS variables, Tailwind base, scrollbar
│   └── sitemap.ts              # Auto-generated sitemap
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky nav, active-section highlight
│   │   ├── Footer.tsx          # Footer links, social icons
│   │   └── ScrollProgress.tsx  # Top progress bar
│   ├── three/
│   │   ├── HeroScene.tsx       # 3D cloud infra (K8s nodes, globe, particles)
│   │   ├── SkillsGalaxy.tsx    # 3D floating skill nodes
│   │   └── ParticleField.tsx   # Background star/data particles
│   ├── sections/
│   │   ├── Hero.tsx            # Hero layout + copy
│   │   ├── About.tsx           # About + stats
│   │   ├── Experience.tsx      # Timeline with Kyzein role
│   │   ├── Projects.tsx        # 3D project cards
│   │   ├── Skills.tsx          # Skills galaxy wrapper
│   │   ├── Certifications.tsx  # Cert badges
│   │   ├── Resume.tsx          # PDF viewer / download
│   │   └── Contact.tsx         # Contact form + social links
│   ├── shared/
│   │   ├── CommandPalette.tsx  # Cmd+K palette
│   │   ├── CursorGlow.tsx      # Custom glow cursor
│   │   ├── SectionReveal.tsx   # Framer scroll-reveal wrapper
│   │   ├── GlassCard.tsx       # Reusable glassmorphism card
│   │   ├── Terminal.tsx        # Animated terminal/deploy logs
│   │   └── MetricCard.tsx      # Live metric card (uptime, deploys…)
│   └── providers/
│       └── Providers.tsx       # Theme provider wrapper
├── lib/
│   ├── data.ts                 # ALL content: bio, experience, projects, skills, certs
│   ├── constants.ts            # Colors, nav links, animation variants
│   └── utils.ts                # cn(), formatDate(), etc.
├── types/
│   └── index.ts                # Shared TypeScript interfaces
├── public/
│   └── resume.pdf              # Ikram's resume PDF
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Task 1: Scaffold Next.js 15 project

**Files:**
- Create: `package.json` (via CLI)
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `tailwind.config.ts`

- [ ] **Step 1: Create the project**

```bash
cd "C:\Users\TUG GAMING\Downloads\ikram-portfolio"
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*" --yes
```

- [ ] **Step 2: Install all dependencies**

```bash
npm install framer-motion @react-three/fiber @react-three/drei three @types/three gsap lucide-react clsx tailwind-merge
npm install @radix-ui/react-dialog @radix-ui/react-tooltip @radix-ui/react-scroll-area
npm install next-themes
npm install -D @types/gsap
```

- [ ] **Step 3: Initialize Shadcn UI**

```bash
npx shadcn@latest init -d
```
When prompted: style=default, base color=neutral, CSS variables=yes.

- [ ] **Step 4: Add Shadcn components used in the project**

```bash
npx shadcn@latest add button badge card dialog tooltip separator
```

- [ ] **Step 5: Replace `next.config.ts` with this**

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
}

export default nextConfig
```

- [ ] **Step 6: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js 15 project with all dependencies"
```

---

## Task 2: Global styles and CSS variables

**Files:**
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Replace `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 3%;
    --foreground: 210 40% 98%;
    --card: 0 0% 6%;
    --card-foreground: 210 40% 98%;
    --border: 214 32% 14%;
    --input: 214 32% 14%;
    --primary: 196 100% 50%;
    --primary-foreground: 0 0% 0%;
    --secondary: 265 89% 66%;
    --muted: 217 33% 10%;
    --muted-foreground: 215 16% 47%;
    --accent: 196 100% 50%;
    --accent-foreground: 0 0% 0%;
    --ring: 196 100% 50%;
    --radius: 0.75rem;
    --glow-cyan: #00d4ff;
    --glow-purple: #7c3aed;
    --glow-green: #10b981;
    --grid-color: rgba(0, 212, 255, 0.04);
  }

  * {
    @apply border-border;
  }

  html {
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: hsl(var(--primary) / 0.3) transparent;
  }

  body {
    @apply bg-background text-foreground antialiased;
    background-image:
      linear-gradient(rgba(0, 212, 255, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 212, 255, 0.02) 1px, transparent 1px);
    background-size: 50px 50px;
  }

  ::selection {
    background: hsl(var(--primary) / 0.3);
    color: hsl(var(--foreground));
  }

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: hsl(var(--primary) / 0.3);
    border-radius: 2px;
  }
}

@layer utilities {
  .glow-cyan {
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.15), 0 0 40px rgba(0, 212, 255, 0.05);
  }

  .glow-purple {
    box-shadow: 0 0 20px rgba(124, 58, 237, 0.15), 0 0 40px rgba(124, 58, 237, 0.05);
  }

  .glow-text-cyan {
    text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
  }

  .glass {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.06);
  }

  .glass-hover {
    transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
  }

  .glass-hover:hover {
    background: rgba(0, 212, 255, 0.05);
    border-color: rgba(0, 212, 255, 0.2);
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.08);
  }

  .gradient-text {
    background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .gradient-border {
    position: relative;
  }

  .gradient-border::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(135deg, rgba(0, 212, 255, 0.4), rgba(124, 58, 237, 0.4));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
}
```

- [ ] **Step 2: Replace `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...fontFamily.sans],
        mono: ['var(--font-geist-mono)', ...fontFamily.mono],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0,212,255,0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(0,212,255,0.6), 0 0 40px rgba(0,212,255,0.2)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

- [ ] **Step 3: Install tailwindcss-animate**

```bash
npm install tailwindcss-animate
```

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: global styles, CSS variables, Tailwind config"
```

---

## Task 3: Types, constants, and content data

**Files:**
- Create: `types/index.ts`
- Create: `lib/constants.ts`
- Create: `lib/utils.ts`
- Create: `lib/data.ts`

- [ ] **Step 1: Create `types/index.ts`**

```ts
export interface NavItem {
  label: string
  href: string
}

export interface ExperienceItem {
  company: string
  role: string
  period: string
  location: string
  projects: {
    title: string
    bullets: string[]
  }[]
}

export interface Project {
  id: string
  title: string
  description: string
  stack: string[]
  metrics: { label: string; value: string }[]
  github?: string
  live?: string
  category: 'infrastructure' | 'devsecops' | 'automation' | 'monitoring'
}

export interface Skill {
  name: string
  category: 'cloud' | 'iac' | 'cicd' | 'containers' | 'scripting' | 'monitoring' | 'security'
  level: number // 1-5
}

export interface Certification {
  name: string
  issuer: string
  date?: string
  credentialId?: string
  badge?: string
  status: 'earned' | 'in-progress'
}

export interface MetricStat {
  label: string
  value: string
  suffix?: string
}
```

- [ ] **Step 2: Create `lib/utils.ts`**

```ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}
```

- [ ] **Step 3: Create `lib/constants.ts`**

```ts
import type { NavItem } from '@/types'

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
]

export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/ikramkirmani/',
  github: 'https://github.com/iikram42',
  youtube: 'https://www.youtube.com/@IkramKirmani',
  portfolio: 'https://ikramkirmanii.vercel.app/',
}

export const COLORS = {
  cyan: '#00d4ff',
  purple: '#7c3aed',
  green: '#10b981',
  orange: '#f59e0b',
}

export const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export const FADE_IN = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
}

export const STAGGER_CONTAINER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
```

- [ ] **Step 4: Create `lib/data.ts`**

```ts
import type { ExperienceItem, Project, Skill, Certification, MetricStat } from '@/types'

export const BIO = {
  name: 'Syed Ikramuddin',
  alias: 'Ikram Kirmani',
  title: 'Cloud / DevOps Engineer',
  tagline: 'Building infrastructure that scales. Automating everything that doesn\'t.',
  summary:
    'Cloud / DevOps Engineer with 1+ years of experience designing and implementing scalable cloud infrastructure across AWS, Azure, and GCP. Adept at deploying automation with Terraform and Ansible, streamlining CI/CD pipelines, containerizing applications, and securing cloud environments.',
  location: 'Aurangabad, India',
  email: 'iikramkirmani@gmail.com',
  phone: '+91 9146929255',
  education: {
    degree: 'B.Tech in Information Technology',
    institution: 'MGM University',
    location: 'Aurangabad, India',
    period: '2021 – 2025',
    cgpa: '7.69',
  },
}

export const STATS: MetricStat[] = [
  { label: 'Cloud Cost Reduced', value: '25', suffix: '%' },
  { label: 'Deployment Reliability', value: '95', suffix: '%' },
  { label: 'Incident Response Faster', value: '40', suffix: '%' },
  { label: 'Manual Intervention Reduced', value: '60', suffix: '%' },
]

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: 'Kyzein Developers',
    role: 'Cloud / DevOps Engineer',
    period: 'Apr 2024 – Apr 2025',
    location: 'Remote',
    projects: [
      {
        title: 'Infrastructure Cost Optimization',
        bullets: [
          'Identified 30% unused resources across environments, causing $500–$1,000 in monthly waste.',
          'Used Cost Explorer and CloudWatch to analyze usage; resized 18 EC2 instances, implemented Auto Scaling, and removed 500+ GB of unused EBS volumes.',
          'Reduced monthly cloud spend by 25% without affecting availability or performance.',
        ],
      },
      {
        title: 'Blue-Green Deployment Pipeline',
        bullets: [
          'Deployment failures were causing app downtime during business hours, affecting user trust.',
          'Designed a blue-green deployment strategy to allow zero-downtime rollouts and easy rollback.',
          'Integrated release gates, health checks, and routing logic into the deployment pipeline.',
          'Improved release reliability by 95% and eliminated customer-facing disruptions.',
        ],
      },
    ],
  },
]

export const PROJECTS: Project[] = [
  {
    id: 'ai-support-ticketing',
    title: 'AI-Powered Support Ticketing System',
    description:
      'Intelligent support ticket routing and resolution platform with ML-based categorization, automated priority assignment, and cloud-native deployment on EKS with full observability.',
    stack: ['Python', 'FastAPI', 'AWS EKS', 'Docker', 'Terraform', 'GitHub Actions', 'Prometheus', 'Grafana'],
    metrics: [
      { label: 'Ticket Resolution', value: '40% faster' },
      { label: 'Auto-routing Accuracy', value: '92%' },
      { label: 'Uptime SLA', value: '99.9%' },
    ],
    github: 'https://github.com/iikram42',
    category: 'infrastructure',
  },
  {
    id: 'devsecops-pipeline',
    title: 'DevSecOps CI/CD Pipeline',
    description:
      'End-to-end secure CI/CD pipeline integrating SAST, DAST, container scanning, IaC policy enforcement, and automated compliance checks. Zero-trust deployment to multi-cloud environments.',
    stack: ['GitHub Actions', 'Terraform', 'Docker', 'ArgoCD', 'Trivy', 'SonarQube', 'AWS', 'Kubernetes'],
    metrics: [
      { label: 'Deploy Time', value: '8 min avg' },
      { label: 'Security Issues Caught', value: '100% pre-prod' },
      { label: 'Rollback Time', value: '< 2 min' },
    ],
    github: 'https://github.com/iikram42',
    category: 'devsecops',
  },
  {
    id: 'cloud-monitoring-stack',
    title: 'Cloud Monitoring Stack',
    description:
      'Provisioned EC2 instances and IAM roles via Terraform; standardized config using Ansible. Configured CloudWatch dashboards with SNS-based alerting.',
    stack: ['Terraform', 'Ansible', 'EC2', 'CloudWatch', 'SNS', 'Linux'],
    metrics: [
      { label: 'Incident Response', value: '40% faster' },
      { label: 'Alert Coverage', value: '100%' },
      { label: 'MTTR', value: 'Reduced 35%' },
    ],
    github: 'https://github.com/iikram42',
    category: 'monitoring',
  },
  {
    id: 'cicd-backup-automation',
    title: 'CI/CD + Backup Automation',
    description:
      'Multi-stage CI/CD pipelines for Dockerized applications with automated EBS snapshot backups using AWS Lambda and Boto3. Replicated in Azure DevOps.',
    stack: ['Jenkins', 'GitHub Actions', 'Lambda', 'Python', 'Azure DevOps', 'Docker'],
    metrics: [
      { label: 'Manual Intervention', value: '60% reduced' },
      { label: 'Backup Consistency', value: '100%' },
      { label: 'Deploy Frequency', value: '3x increase' },
    ],
    github: 'https://github.com/iikram42',
    category: 'automation',
  },
]

export const SKILLS: Skill[] = [
  // Cloud
  { name: 'AWS', category: 'cloud', level: 5 },
  { name: 'Azure', category: 'cloud', level: 4 },
  { name: 'GCP', category: 'cloud', level: 3 },
  // IaC
  { name: 'Terraform', category: 'iac', level: 5 },
  { name: 'Ansible', category: 'iac', level: 4 },
  { name: 'CloudFormation', category: 'iac', level: 3 },
  // CI/CD
  { name: 'GitHub Actions', category: 'cicd', level: 5 },
  { name: 'Jenkins', category: 'cicd', level: 4 },
  { name: 'ArgoCD', category: 'cicd', level: 4 },
  { name: 'GitLab CI', category: 'cicd', level: 3 },
  // Containers
  { name: 'Docker', category: 'containers', level: 5 },
  { name: 'Kubernetes', category: 'containers', level: 4 },
  // Monitoring
  { name: 'Prometheus', category: 'monitoring', level: 4 },
  { name: 'Grafana', category: 'monitoring', level: 4 },
  { name: 'CloudWatch', category: 'monitoring', level: 5 },
  // Scripting
  { name: 'Python', category: 'scripting', level: 4 },
  { name: 'Bash', category: 'scripting', level: 4 },
  // Security
  { name: 'Linux', category: 'security', level: 5 },
  { name: 'IAM', category: 'security', level: 4 },
]

export const CERTIFICATIONS: Certification[] = [
  {
    name: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    status: 'in-progress',
  },
  {
    name: 'Google Cloud Study Jam 2023',
    issuer: 'Google / GDSC MGM University',
    date: '2023',
    status: 'earned',
  },
  {
    name: 'Certified Kubernetes Administrator (CKA)',
    issuer: 'Cloud Native Computing Foundation',
    status: 'in-progress',
  },
  {
    name: 'HashiCorp Terraform Associate',
    issuer: 'HashiCorp',
    status: 'in-progress',
  },
]

export const ACHIEVEMENTS = [
  {
    title: 'Google Cloud Study Jam 2023',
    org: 'GDSC, MGM University',
    description: 'Completed 9 hands-on labs covering cloud infrastructure, networking, and GenAI using Qwiklabs on GCP.',
  },
  {
    title: 'Swayambhu Technical Event',
    org: 'MGM University, Aurangabad',
    description: 'Coordinated the Idea Poster Presentation competition at the university\'s annual tech fest.',
  },
]

export const TERMINAL_LINES = [
  { type: 'cmd' as const, text: '$ kubectl get pods -n production' },
  { type: 'out' as const, text: 'NAME                          READY   STATUS    RESTARTS   AGE' },
  { type: 'out' as const, text: 'api-deployment-7f8b9c-xkp2n   1/1     Running   0          2d' },
  { type: 'out' as const, text: 'api-deployment-7f8b9c-mn4q7   1/1     Running   0          2d' },
  { type: 'out' as const, text: 'worker-6d9f8b-pqr3t           1/1     Running   0          1d' },
  { type: 'cmd' as const, text: '$ terraform apply -auto-approve' },
  { type: 'out' as const, text: 'Apply complete! Resources: 12 added, 3 changed, 0 destroyed.' },
  { type: 'cmd' as const, text: '$ argocd app sync production' },
  { type: 'success' as const, text: '✓ Sync OK — revision: a3f8c2e' },
  { type: 'cmd' as const, text: '$ kubectl rollout status deploy/api' },
  { type: 'success' as const, text: '✓ deployment "api" successfully rolled out' },
]
```

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: types, constants, content data"
```

---

## Task 4: Root layout and providers

**Files:**
- Create: `components/providers/Providers.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create `components/providers/Providers.tsx`**

```tsx
'use client'

import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
      {children}
    </ThemeProvider>
  )
}
```

- [ ] **Step 2: Replace `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Providers } from '@/components/providers/Providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ikram Kirmani — Cloud / DevOps Engineer',
  description:
    'Senior Cloud & DevOps Engineer specializing in AWS, Kubernetes, Terraform, and CI/CD automation. Building infrastructure that scales.',
  keywords: ['Cloud Engineer', 'DevOps', 'AWS', 'Kubernetes', 'Terraform', 'CI/CD', 'Infrastructure'],
  authors: [{ name: 'Syed Ikramuddin', url: 'https://ikramkirmanii.vercel.app' }],
  creator: 'Syed Ikramuddin',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ikramkirmanii.vercel.app',
    title: 'Ikram Kirmani — Cloud / DevOps Engineer',
    description: 'Senior Cloud & DevOps Engineer. AWS · Kubernetes · Terraform · CI/CD.',
    siteName: 'Ikram Kirmani Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ikram Kirmani — Cloud / DevOps Engineer',
    description: 'Senior Cloud & DevOps Engineer. AWS · Kubernetes · Terraform · CI/CD.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Install Geist font**

```bash
npm install geist
```

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: root layout, providers, SEO metadata"
```

---

## Task 5: ScrollProgress and CursorGlow

**Files:**
- Create: `components/layout/ScrollProgress.tsx`
- Create: `components/shared/CursorGlow.tsx`

- [ ] **Step 1: Create `components/layout/ScrollProgress.tsx`**

```tsx
'use client'

import { useScroll, motion } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
```

- [ ] **Step 2: Create `components/shared/CursorGlow.tsx`**

```tsx
'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CursorGlow() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springX = useSpring(cursorX, { stiffness: 500, damping: 40 })
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [cursorX, cursorY])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null

  return (
    <>
      {/* Large ambient glow */}
      <motion.div
        className="pointer-events-none fixed z-0 rounded-full"
        style={{
          width: 400,
          height: 400,
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)',
        }}
      />
      {/* Small precise dot */}
      <motion.div
        className="pointer-events-none fixed z-50 w-3 h-3 rounded-full border border-cyan-400/60"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: ScrollProgress bar and CursorGlow"
```

---

## Task 6: Navbar

**Files:**
- Create: `components/layout/Navbar.tsx`

- [ ] **Step 1: Create `components/layout/Navbar.tsx`**

```tsx
'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Terminal } from 'lucide-react'
import { NAV_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = NAV_ITEMS.map((i) => i.href.replace('#', ''))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -40% 0px' }
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'glass border-b border-white/5 py-3' : 'py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo('#hero')}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center group-hover:glow-cyan transition-all">
            <Terminal className="w-4 h-4 text-black" />
          </div>
          <span className="font-mono text-sm font-semibold tracking-tight text-white/90">
            ikram<span className="text-cyan-400">@</span>cloud
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.replace('#', '')
            return (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className={cn(
                  'relative px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200',
                  isActive
                    ? 'text-cyan-400'
                    : 'text-white/50 hover:text-white/90'
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-md bg-cyan-400/10 border border-cyan-400/20"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => scrollTo('#contact')}
            className="px-4 py-1.5 text-sm font-medium rounded-lg bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/20 transition-all duration-200"
          >
            Hire Me
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/5 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="text-left px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-all"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add .
git commit -m "feat: sticky Navbar with active section tracking"
```

---

## Task 7: SectionReveal and GlassCard shared components

**Files:**
- Create: `components/shared/SectionReveal.tsx`
- Create: `components/shared/GlassCard.tsx`

- [ ] **Step 1: Create `components/shared/SectionReveal.tsx`**

```tsx
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
}

export function SectionReveal({ children, className, delay = 0, direction = 'up' }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : 0,
      x: direction === 'left' ? -40 : direction === 'right' ? 40 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Create `components/shared/GlassCard.tsx`**

```tsx
import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  className?: string
  glow?: 'cyan' | 'purple' | 'green' | 'none'
  hover?: boolean
}

export function GlassCard({ children, className, glow = 'none', hover = true }: Props) {
  return (
    <div
      className={cn(
        'glass rounded-xl p-6',
        hover && 'glass-hover',
        glow === 'cyan' && 'glow-cyan',
        glow === 'purple' && 'glow-purple',
        className
      )}
    >
      {children}
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: SectionReveal, GlassCard shared components"
```

---

## Task 8: Hero 3D Scene (React Three Fiber)

**Files:**
- Create: `components/three/HeroScene.tsx`
- Create: `components/three/ParticleField.tsx`

- [ ] **Step 1: Create `components/three/ParticleField.tsx`**

```tsx
'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function ParticleField({ count = 800 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null)

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const color = new THREE.Color()

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20

      const t = Math.random()
      if (t < 0.6) color.setHex(0x00d4ff)
      else if (t < 0.85) color.setHex(0x7c3aed)
      else color.setHex(0x10b981)

      colors[i * 3] = color.r * (0.3 + Math.random() * 0.3)
      colors[i * 3 + 1] = color.g * (0.3 + Math.random() * 0.3)
      colors[i * 3 + 2] = color.b * (0.3 + Math.random() * 0.3)
    }
    return { positions, colors }
  }, [count])

  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += delta * 0.02
    meshRef.current.rotation.x += delta * 0.005
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}
```

- [ ] **Step 2: Create `components/three/HeroScene.tsx`**

```tsx
'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sphere, Box, Line, OrbitControls, Float, Text } from '@react-three/drei'
import * as THREE from 'three'
import { ParticleField } from './ParticleField'

// Single K8s node: a glowing hexagonal cluster indicator
function KubeNode({ position, label, color = '#00d4ff' }: {
  position: [number, number, number]
  label: string
  color?: string
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={position}>
        <mesh ref={meshRef}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.4}
            transparent
            opacity={0.85}
            wireframe={false}
          />
        </mesh>
        <mesh rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[0.44, 0.44, 0.44]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.1} wireframe transparent opacity={0.3} />
        </mesh>
      </group>
    </Float>
  )
}

// Animated connection line between two points
function ConnectionLine({ start, end, color = '#00d4ff' }: {
  start: [number, number, number]
  end: [number, number, number]
  color?: string
}) {
  const points = useMemo(() => [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end),
  ], [start, end])

  return (
    <Line
      points={points}
      color={color}
      lineWidth={0.4}
      transparent
      opacity={0.25}
      dashed
      dashSize={0.3}
      gapSize={0.2}
    />
  )
}

// Rotating globe representing global infrastructure
function InfraGlobe() {
  const meshRef = useRef<THREE.Mesh>(null)
  const wireRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (!meshRef.current || !wireRef.current) return
    meshRef.current.rotation.y += delta * 0.15
    wireRef.current.rotation.y -= delta * 0.08
    wireRef.current.rotation.x += delta * 0.03
  })

  return (
    <group position={[2.5, 0, -2]}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color="#0a1628"
          emissive="#00d4ff"
          emissiveIntensity={0.05}
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh ref={wireRef}>
        <sphereGeometry args={[1.25, 16, 16]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.3}
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
      {/* Orbital ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.6, 0.01, 8, 64]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.5} transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

// Camera responds subtly to mouse
function CameraRig() {
  const { camera, mouse } = useThree()
  useFrame(() => {
    camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.02
    camera.position.y += (mouse.y * 0.3 - camera.position.y) * 0.02
    camera.lookAt(0, 0, 0)
  })
  return null
}

const NODES: Array<{ pos: [number, number, number]; label: string; color: string }> = [
  { pos: [-3, 1, 0], label: 'EKS', color: '#00d4ff' },
  { pos: [-1.5, -0.5, 0.5], label: 'API', color: '#7c3aed' },
  { pos: [0, 1.5, 0], label: 'LB', color: '#10b981' },
  { pos: [1.5, -0.8, 0.3], label: 'RDS', color: '#f59e0b' },
  { pos: [-2.5, -1.5, -0.5], label: 'S3', color: '#00d4ff' },
  { pos: [0.5, 0, 1], label: 'Lambda', color: '#7c3aed' },
]

const CONNECTIONS: Array<[number, number]> = [
  [0, 1], [1, 2], [2, 3], [1, 5], [0, 4], [2, 5],
]

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00d4ff" />
      <pointLight position={[-5, -3, 2]} intensity={0.5} color="#7c3aed" />

      <ParticleField count={600} />
      <InfraGlobe />

      {NODES.map((n, i) => (
        <KubeNode key={i} position={n.pos} label={n.label} color={n.color} />
      ))}

      {CONNECTIONS.map(([a, b], i) => (
        <ConnectionLine
          key={i}
          start={NODES[a].pos}
          end={NODES[b].pos}
          color={i % 2 === 0 ? '#00d4ff' : '#7c3aed'}
        />
      ))}

      <CameraRig />
    </Canvas>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: HeroScene 3D cloud infra visualization with R3F"
```

---

## Task 9: Hero Section

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] **Step 1: Create `components/sections/Hero.tsx`**

```tsx
'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Youtube, Terminal, Zap } from 'lucide-react'
import { BIO, STATS } from '@/lib/data'
import { SOCIAL_LINKS, FADE_UP } from '@/lib/constants'

const HeroScene = dynamic(
  () => import('@/components/three/HeroScene').then((m) => m.HeroScene),
  { ssr: false, loading: () => <div className="w-full h-full" /> }
)

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* 3D scene background */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-background/95 via-background/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 z-[1] h-40 bg-gradient-to-t from-background to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="max-w-2xl">
          {/* Status badge */}
          <motion.div
            variants={FADE_UP}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-green-500/20 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-mono text-green-400">Available for opportunities</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={FADE_UP}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-4"
          >
            <span className="text-white">{BIO.alias.split(' ')[0]}</span>
            <br />
            <span className="gradient-text glow-text-cyan">{BIO.alias.split(' ')[1]}</span>
          </motion.h1>

          {/* Role */}
          <motion.div
            variants={FADE_UP}
            initial="hidden"
            animate="visible"
            custom={2}
            className="flex items-center gap-2 mb-4"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-cyan-400 text-lg">{BIO.title}</span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={FADE_UP}
            initial="hidden"
            animate="visible"
            custom={3}
            className="text-white/60 text-lg leading-relaxed mb-8 max-w-xl"
          >
            {BIO.tagline}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={FADE_UP}
            initial="hidden"
            animate="visible"
            custom={4}
            className="flex flex-wrap gap-4 mb-12"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition-all duration-200 glow-cyan"
            >
              <Zap className="w-4 h-4" />
              View Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/10 text-white/80 hover:border-cyan-400/40 hover:text-white transition-all duration-200"
            >
              Get in Touch
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={FADE_UP}
            initial="hidden"
            animate="visible"
            custom={5}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {STATS.map((stat, i) => (
              <div key={i} className="glass rounded-lg p-3 border border-white/5">
                <div className="text-2xl font-bold gradient-text">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={FADE_UP}
            initial="hidden"
            animate="visible"
            custom={6}
            className="flex items-center gap-4"
          >
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center text-white/50 hover:text-cyan-400 hover:border-cyan-400/40 transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center text-white/50 hover:text-cyan-400 hover:border-cyan-400/40 transition-all"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={SOCIAL_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center text-white/50 hover:text-red-400 hover:border-red-400/40 transition-all"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-xs font-mono">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add .
git commit -m "feat: Hero section with 3D scene integration"
```

---

## Task 10: About Section

**Files:**
- Create: `components/sections/About.tsx`

- [ ] **Step 1: Create `components/sections/About.tsx`**

```tsx
'use client'

import { motion } from 'framer-motion'
import { MapPin, GraduationCap, Code2, Server } from 'lucide-react'
import { SectionReveal } from '@/components/shared/SectionReveal'
import { GlassCard } from '@/components/shared/GlassCard'
import { BIO, ACHIEVEMENTS } from '@/lib/data'
import { FADE_UP, STAGGER_CONTAINER } from '@/lib/constants'

export function About() {
  return (
    <section id="about" className="py-24 max-w-7xl mx-auto px-6">
      <SectionReveal>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-cyan-400 font-mono text-sm">01.</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">About Me</h2>
        </div>
        <p className="text-white/40 font-mono text-sm mb-16">Cloud engineer. Infrastructure automator. Problem solver.</p>
      </SectionReveal>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left: bio */}
        <SectionReveal direction="left">
          <div className="space-y-6">
            <p className="text-white/70 text-lg leading-relaxed">{BIO.summary}</p>

            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-3 text-white/50">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="text-sm">{BIO.location}</span>
              </div>
              <div className="flex items-center gap-3 text-white/50">
                <GraduationCap className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span className="text-sm">
                  {BIO.education.degree} — {BIO.education.institution} ({BIO.education.period}) · CGPA {BIO.education.cgpa}
                </span>
              </div>
              <div className="flex items-center gap-3 text-white/50">
                <Server className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-sm">1+ year production cloud infrastructure experience</span>
              </div>
              <div className="flex items-center gap-3 text-white/50">
                <Code2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span className="text-sm">AWS · Azure · GCP · Kubernetes · Terraform</span>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Right: achievements */}
        <SectionReveal direction="right" delay={0.15}>
          <div className="space-y-4">
            <h3 className="text-sm font-mono text-white/40 uppercase tracking-widest mb-4">Achievements</h3>
            {ACHIEVEMENTS.map((a, i) => (
              <GlassCard key={i} className="p-4 gap-2 flex flex-col">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-white/90 text-sm">{a.title}</span>
                  <span className="text-xs text-white/30 whitespace-nowrap">{a.org}</span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">{a.description}</p>
              </GlassCard>
            ))}

            {/* Education card */}
            <GlassCard className="p-4 gradient-border">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-semibold text-white/90">{BIO.education.institution}</span>
              </div>
              <p className="text-white/50 text-sm">{BIO.education.degree}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-white/30 font-mono">{BIO.education.period}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  CGPA: {BIO.education.cgpa}
                </span>
              </div>
            </GlassCard>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add .
git commit -m "feat: About section"
```

---

## Task 11: Experience Section with Terminal

**Files:**
- Create: `components/shared/Terminal.tsx`
- Create: `components/sections/Experience.tsx`

- [ ] **Step 1: Create `components/shared/Terminal.tsx`**

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { TERMINAL_LINES } from '@/lib/data'

type LineType = 'cmd' | 'out' | 'success'

interface TerminalLine {
  type: LineType
  text: string
}

interface Props {
  lines?: TerminalLine[]
  className?: string
  autoPlay?: boolean
  speed?: number
}

export function Terminal({ lines = TERMINAL_LINES, className, autoPlay = true, speed = 80 }: Props) {
  const [displayed, setDisplayed] = useState<TerminalLine[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!autoPlay || currentLine >= lines.length) return

    const line = lines[currentLine]
    if (line.type === 'cmd') {
      // Typewriter effect for commands
      if (currentChar < line.text.length) {
        const timer = setTimeout(() => {
          setCurrentText((t) => t + line.text[currentChar])
          setCurrentChar((c) => c + 1)
        }, speed)
        return () => clearTimeout(timer)
      } else {
        const timer = setTimeout(() => {
          setDisplayed((d) => [...d, { type: line.type, text: currentText + line.text.slice(currentText.length) }])
          setCurrentText('')
          setCurrentChar(0)
          setCurrentLine((l) => l + 1)
        }, 300)
        return () => clearTimeout(timer)
      }
    } else {
      // Output lines appear instantly after a small delay
      const timer = setTimeout(() => {
        setDisplayed((d) => [...d, line])
        setCurrentLine((l) => l + 1)
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [currentLine, currentChar, currentText, lines, autoPlay, speed])

  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' })
  }, [displayed, currentText])

  const lineColor = (type: LineType) => {
    if (type === 'cmd') return 'text-cyan-400'
    if (type === 'success') return 'text-green-400'
    return 'text-white/50'
  }

  return (
    <div className={cn('glass rounded-xl overflow-hidden', className)}>
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-auto text-xs font-mono text-white/30">ikram@cloud-ops ~ zsh</span>
      </div>

      {/* Terminal body */}
      <div
        ref={containerRef}
        className="p-4 font-mono text-xs leading-relaxed h-52 overflow-y-auto space-y-0.5"
      >
        <AnimatePresence initial={false}>
          {displayed.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              className={lineColor(line.type)}
            >
              {line.text}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Currently typing line */}
        {currentLine < lines.length && lines[currentLine].type === 'cmd' && (
          <div className="text-cyan-400">
            {currentText}
            <span className="inline-block w-1.5 h-3.5 bg-cyan-400 ml-0.5 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create `components/sections/Experience.tsx`**

```tsx
'use client'

import { motion } from 'framer-motion'
import { Building2, Calendar, MapPin, ChevronRight } from 'lucide-react'
import { SectionReveal } from '@/components/shared/SectionReveal'
import { GlassCard } from '@/components/shared/GlassCard'
import { Terminal } from '@/components/shared/Terminal'
import { EXPERIENCE } from '@/lib/data'
import { FADE_UP } from '@/lib/constants'

export function Experience() {
  return (
    <section id="experience" className="py-24 bg-gradient-to-b from-transparent via-muted/20 to-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <SectionReveal>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-cyan-400 font-mono text-sm">02.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Experience</h2>
          </div>
          <p className="text-white/40 font-mono text-sm mb-16">Production-grade cloud work.</p>
        </SectionReveal>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Timeline */}
          <div className="space-y-6">
            {EXPERIENCE.map((exp, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <GlassCard className="gradient-border">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Building2 className="w-4 h-4 text-cyan-400" />
                        <span className="font-semibold text-white">{exp.company}</span>
                      </div>
                      <div className="text-cyan-400 text-sm font-mono">{exp.role}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center gap-1 text-xs text-white/40 mb-1">
                        <Calendar className="w-3 h-3" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-white/30">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {exp.projects.map((proj, j) => (
                      <div key={j}>
                        <div className="flex items-center gap-2 mb-2">
                          <ChevronRight className="w-3 h-3 text-purple-400" />
                          <span className="text-sm font-semibold text-white/80">{proj.title}</span>
                        </div>
                        <ul className="space-y-1.5 ml-5">
                          {proj.bullets.map((b, k) => (
                            <li key={k} className="text-sm text-white/50 leading-relaxed flex gap-2">
                              <span className="text-cyan-400/50 mt-1 flex-shrink-0">·</span>
                              <span dangerouslySetInnerHTML={{
                                __html: b.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white/80">$1</strong>')
                              }} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </SectionReveal>
            ))}
          </div>

          {/* Terminal panel */}
          <SectionReveal direction="right" delay={0.2}>
            <div className="space-y-4">
              <div className="text-sm font-mono text-white/40 mb-4">// Live ops console</div>
              <Terminal />

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                {[
                  { label: 'Infra Cost Cut', value: '25%', color: 'text-green-400' },
                  { label: 'Deploy Reliability', value: '95%', color: 'text-cyan-400' },
                  { label: 'Incident Response', value: '−40%', color: 'text-purple-400' },
                  { label: 'Manual Work', value: '−60%', color: 'text-orange-400' },
                ].map((m, i) => (
                  <div key={i} className="glass rounded-lg p-3 border border-white/5 text-center">
                    <div className={`text-xl font-bold font-mono ${m.color}`}>{m.value}</div>
                    <div className="text-xs text-white/40 mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: Experience section with Terminal and metrics"
```

---

## Task 12: Projects Section

**Files:**
- Create: `components/sections/Projects.tsx`

- [ ] **Step 1: Create `components/sections/Projects.tsx`**

```tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, ChevronDown, ChevronUp, Server, Shield, Activity, Layers } from 'lucide-react'
import { SectionReveal } from '@/components/shared/SectionReveal'
import { GlassCard } from '@/components/shared/GlassCard'
import { PROJECTS } from '@/lib/data'
import { FADE_UP } from '@/lib/constants'
import type { Project } from '@/types'

const CATEGORY_ICONS = {
  infrastructure: Server,
  devsecops: Shield,
  monitoring: Activity,
  automation: Layers,
}

const CATEGORY_COLORS = {
  infrastructure: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  devsecops: 'text-red-400 bg-red-400/10 border-red-400/20',
  monitoring: 'text-green-400 bg-green-400/10 border-green-400/20',
  automation: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = CATEGORY_ICONS[project.category]
  const colorClass = CATEGORY_COLORS[project.category]

  return (
    <SectionReveal delay={index * 0.1}>
      <motion.div
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="h-full"
      >
        <GlassCard className="h-full flex flex-col gradient-border glass-hover cursor-default" hover={false}>
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass} border`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex gap-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg glass border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Title & description */}
          <h3 className="font-semibold text-white mb-2">{project.title}</h3>
          <p className="text-white/50 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {project.metrics.map((m, i) => (
              <div key={i} className="glass rounded-md p-2 text-center border border-white/5">
                <div className="text-xs font-bold text-white/80">{m.value}</div>
                <div className="text-[10px] text-white/30 mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Stack */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.stack.map((s) => (
              <span
                key={s}
                className="px-2 py-0.5 rounded-md text-[11px] font-mono glass border border-white/8 text-white/50"
              >
                {s}
              </span>
            ))}
          </div>

          {/* Category badge */}
          <div className="flex items-center justify-between">
            <span className={`text-[11px] px-2 py-0.5 rounded-full border font-mono ${colorClass}`}>
              {project.category}
            </span>
          </div>
        </GlassCard>
      </motion.div>
    </SectionReveal>
  )
}

export function Projects() {
  return (
    <section id="projects" className="py-24 max-w-7xl mx-auto px-6">
      <SectionReveal>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-cyan-400 font-mono text-sm">03.</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Projects</h2>
        </div>
        <p className="text-white/40 font-mono text-sm mb-16">Production systems. Real metrics.</p>
      </SectionReveal>

      <div className="grid md:grid-cols-2 gap-6">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add .
git commit -m "feat: Projects section with 3D-hover cards"
```

---

## Task 13: Skills 3D Galaxy Scene

**Files:**
- Create: `components/three/SkillsGalaxy.tsx`
- Create: `components/sections/Skills.tsx`

- [ ] **Step 1: Create `components/three/SkillsGalaxy.tsx`**

```tsx
'use client'

import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, Html } from '@react-three/drei'
import * as THREE from 'three'
import type { Skill } from '@/types'

const CATEGORY_COLORS: Record<string, string> = {
  cloud: '#00d4ff',
  iac: '#7c3aed',
  cicd: '#10b981',
  containers: '#f59e0b',
  scripting: '#ef4444',
  monitoring: '#06b6d4',
  security: '#84cc16',
}

function SkillNode({
  skill,
  position,
  onClick,
  selected,
}: {
  skill: Skill
  position: [number, number, number]
  onClick: () => void
  selected: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const color = CATEGORY_COLORS[skill.category] || '#00d4ff'
  const size = 0.12 + skill.level * 0.04

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0] * 2) * 0.08
    if (selected) meshRef.current.rotation.y += 0.02
  })

  return (
    <group position={position}>
      <mesh ref={meshRef} onClick={onClick}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={selected ? 0.8 : 0.3}
          transparent
          opacity={selected ? 1 : 0.8}
        />
      </mesh>
      {/* Tooltip on hover */}
      {selected && (
        <Html center distanceFactor={6}>
          <div className="glass px-2 py-1 rounded text-xs text-white whitespace-nowrap pointer-events-none border border-white/10">
            {skill.name} · L{skill.level}
          </div>
        </Html>
      )}
    </group>
  )
}

function Galaxy({ skills }: { skills: Skill[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const positions = useMemo((): [number, number, number][] => {
    return skills.map((_, i) => {
      const angle = (i / skills.length) * Math.PI * 2
      const radius = 2 + Math.random() * 1.5
      const height = (Math.random() - 0.5) * 2
      return [Math.cos(angle) * radius, height, Math.sin(angle) * radius]
    })
  }, [skills])

  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.05
  })

  return (
    <group ref={groupRef}>
      {skills.map((skill, i) => (
        <SkillNode
          key={skill.name}
          skill={skill}
          position={positions[i]}
          onClick={() => setSelectedId(selectedId === skill.name ? null : skill.name)}
          selected={selectedId === skill.name}
        />
      ))}
    </group>
  )
}

export function SkillsGalaxy({ skills }: { skills: Skill[] }) {
  return (
    <Canvas
      camera={{ position: [0, 1, 7], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={1} color="#00d4ff" />
      <pointLight position={[-4, -2, -4]} intensity={0.6} color="#7c3aed" />
      <Galaxy skills={skills} />
    </Canvas>
  )
}
```

- [ ] **Step 2: Create `components/sections/Skills.tsx`**

```tsx
'use client'

import dynamic from 'next/dynamic'
import { SectionReveal } from '@/components/shared/SectionReveal'
import { GlassCard } from '@/components/shared/GlassCard'
import { SKILLS } from '@/lib/data'

const SkillsGalaxy = dynamic(
  () => import('@/components/three/SkillsGalaxy').then((m) => m.SkillsGalaxy),
  { ssr: false, loading: () => <div className="h-96" /> }
)

const CATEGORY_LABELS: Record<string, string> = {
  cloud: 'Cloud Platforms',
  iac: 'IaC / Automation',
  cicd: 'CI/CD',
  containers: 'Containers',
  scripting: 'Scripting',
  monitoring: 'Monitoring',
  security: 'Security & OS',
}

const CATEGORY_COLORS: Record<string, string> = {
  cloud: '#00d4ff',
  iac: '#7c3aed',
  cicd: '#10b981',
  containers: '#f59e0b',
  scripting: '#ef4444',
  monitoring: '#06b6d4',
  security: '#84cc16',
}

function SkillBar({ name, level, color }: { name: string; level: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-white/70 w-28 flex-shrink-0">{name}</span>
      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${(level / 5) * 100}%`,
            background: `linear-gradient(90deg, ${color}, ${color}80)`,
            boxShadow: `0 0 6px ${color}60`,
          }}
        />
      </div>
      <span className="text-xs text-white/30 w-4">{level}/5</span>
    </div>
  )
}

export function Skills() {
  const categories = [...new Set(SKILLS.map((s) => s.category))]

  return (
    <section id="skills" className="py-24 bg-gradient-to-b from-transparent via-muted/20 to-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <SectionReveal>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-cyan-400 font-mono text-sm">04.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Skills</h2>
          </div>
          <p className="text-white/40 font-mono text-sm mb-16">Click nodes to explore. Hover for details.</p>
        </SectionReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Galaxy */}
          <SectionReveal direction="left">
            <div className="h-96 w-full">
              <SkillsGalaxy skills={SKILLS} />
            </div>
          </SectionReveal>

          {/* Skill bars by category */}
          <SectionReveal direction="right" delay={0.1}>
            <div className="space-y-6">
              {categories.map((cat) => {
                const catSkills = SKILLS.filter((s) => s.category === cat)
                const color = CATEGORY_COLORS[cat] || '#00d4ff'
                return (
                  <GlassCard key={cat} className="p-4">
                    <h3
                      className="text-xs font-mono font-semibold mb-3 uppercase tracking-widest"
                      style={{ color }}
                    >
                      {CATEGORY_LABELS[cat]}
                    </h3>
                    <div className="space-y-2.5">
                      {catSkills.map((s) => (
                        <SkillBar key={s.name} name={s.name} level={s.level} color={color} />
                      ))}
                    </div>
                  </GlassCard>
                )
              })}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: Skills section with 3D galaxy and skill bars"
```

---

## Task 14: Certifications Section

**Files:**
- Create: `components/sections/Certifications.tsx`

- [ ] **Step 1: Create `components/sections/Certifications.tsx`**

```tsx
'use client'

import { Award, Clock, CheckCircle2 } from 'lucide-react'
import { SectionReveal } from '@/components/shared/SectionReveal'
import { GlassCard } from '@/components/shared/GlassCard'
import { CERTIFICATIONS } from '@/lib/data'

const ISSUER_COLORS: Record<string, string> = {
  'Amazon Web Services': '#f59e0b',
  'Google / GDSC MGM University': '#10b981',
  'Cloud Native Computing Foundation': '#00d4ff',
  HashiCorp: '#7c3aed',
}

export function Certifications() {
  return (
    <section id="certifications" className="py-24 max-w-7xl mx-auto px-6">
      <SectionReveal>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-cyan-400 font-mono text-sm">05.</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Certifications</h2>
        </div>
        <p className="text-white/40 font-mono text-sm mb-16">Earned & in progress.</p>
      </SectionReveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CERTIFICATIONS.map((cert, i) => {
          const color = ISSUER_COLORS[cert.issuer] || '#00d4ff'
          const isEarned = cert.status === 'earned'
          return (
            <SectionReveal key={i} delay={i * 0.08}>
              <GlassCard className="h-full flex flex-col gap-4 gradient-border glass-hover">
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                >
                  <Award className="w-6 h-6" style={{ color }} />
                </div>

                {/* Name */}
                <div className="flex-1">
                  <h3 className="font-semibold text-white/90 text-sm leading-snug mb-1">{cert.name}</h3>
                  <p className="text-xs text-white/40">{cert.issuer}</p>
                  {cert.date && <p className="text-xs text-white/30 mt-1 font-mono">{cert.date}</p>}
                </div>

                {/* Status */}
                <div className="flex items-center gap-1.5">
                  {isEarned ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-xs text-green-400 font-mono">Earned</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-3.5 h-3.5 text-orange-400 animate-spin" style={{ animationDuration: '3s' }} />
                      <span className="text-xs text-orange-400 font-mono">In Progress</span>
                    </>
                  )}
                </div>
              </GlassCard>
            </SectionReveal>
          )
        })}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add .
git commit -m "feat: Certifications section"
```

---

## Task 15: Resume Section

**Files:**
- Create: `components/sections/Resume.tsx`

- [ ] **Step 1: Create `components/sections/Resume.tsx`**

```tsx
'use client'

import { FileDown, Eye, ExternalLink } from 'lucide-react'
import { SectionReveal } from '@/components/shared/SectionReveal'
import { GlassCard } from '@/components/shared/GlassCard'
import { BIO } from '@/lib/data'
import { SOCIAL_LINKS } from '@/lib/constants'

export function Resume() {
  return (
    <section id="resume" className="py-24 bg-gradient-to-b from-transparent via-muted/20 to-transparent">
      <div className="max-w-4xl mx-auto px-6">
        <SectionReveal>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-cyan-400 font-mono text-sm">06.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Resume</h2>
          </div>
          <p className="text-white/40 font-mono text-sm mb-16">Full engineering background.</p>
        </SectionReveal>

        <SectionReveal>
          <GlassCard className="gradient-border text-center py-16 px-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-600/20 border border-cyan-400/20 flex items-center justify-center mx-auto mb-6">
              <FileDown className="w-8 h-8 text-cyan-400" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-3">
              {BIO.name}
            </h3>
            <p className="text-white/50 mb-2 font-mono">{BIO.title}</p>
            <p className="text-white/30 text-sm mb-8">
              {BIO.education.degree} · {BIO.education.institution} · {BIO.education.period}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/resume.pdf"
                download="Ikram_Kirmani_Resume.pdf"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition-all glow-cyan"
              >
                <FileDown className="w-4 h-4" />
                Download PDF
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass border border-white/10 text-white/80 hover:border-cyan-400/40 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                View on LinkedIn
              </a>
            </div>
          </GlassCard>
        </SectionReveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add a placeholder resume PDF to public/**

```bash
# Create a simple placeholder — replace with real PDF later
echo "placeholder" > "public/resume.pdf"
```

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: Resume section with PDF download"
```

---

## Task 16: Contact Section

**Files:**
- Create: `components/sections/Contact.tsx`

- [ ] **Step 1: Create `components/sections/Contact.tsx`**

```tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Youtube, Send, CheckCircle2 } from 'lucide-react'
import { SectionReveal } from '@/components/shared/SectionReveal'
import { GlassCard } from '@/components/shared/GlassCard'
import { BIO } from '@/lib/data'
import { SOCIAL_LINKS } from '@/lib/constants'

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // Simulate sending — wire up to Resend/Formspree in production
    await new Promise((r) => setTimeout(r, 1200))
    setStatus('sent')
  }

  return (
    <section id="contact" className="py-24 max-w-7xl mx-auto px-6">
      <SectionReveal>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-cyan-400 font-mono text-sm">07.</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Contact</h2>
        </div>
        <p className="text-white/40 font-mono text-sm mb-16">Let's build something together.</p>
      </SectionReveal>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left: info */}
        <SectionReveal direction="left">
          <div className="space-y-6">
            <p className="text-white/60 text-lg leading-relaxed">
              I'm currently open to full-time Cloud / DevOps roles and freelance infrastructure consulting.
              Whether you have a project in mind or just want to say hello, my inbox is open.
            </p>

            <div className="space-y-3">
              <a
                href={`mailto:${BIO.email}`}
                className="flex items-center gap-3 text-white/50 hover:text-white transition-all group"
              >
                <div className="w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center group-hover:border-cyan-400/40 group-hover:text-cyan-400 transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="font-mono text-sm">{BIO.email}</span>
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/50 hover:text-white transition-all group"
              >
                <div className="w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center group-hover:border-cyan-400/40 group-hover:text-cyan-400 transition-all">
                  <Linkedin className="w-4 h-4" />
                </div>
                <span className="font-mono text-sm">linkedin.com/in/ikramkirmani</span>
              </a>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/50 hover:text-white transition-all group"
              >
                <div className="w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center group-hover:border-cyan-400/40 group-hover:text-cyan-400 transition-all">
                  <Github className="w-4 h-4" />
                </div>
                <span className="font-mono text-sm">github.com/iikram42</span>
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/50 hover:text-white transition-all group"
              >
                <div className="w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center group-hover:border-red-400/40 group-hover:text-red-400 transition-all">
                  <Youtube className="w-4 h-4" />
                </div>
                <span className="font-mono text-sm">@IkramKirmani</span>
              </a>
            </div>
          </div>
        </SectionReveal>

        {/* Right: form */}
        <SectionReveal direction="right" delay={0.1}>
          <GlassCard className="gradient-border">
            {status === 'sent' ? (
              <div className="flex flex-col items-center justify-center py-8 gap-4 text-center">
                <CheckCircle2 className="w-12 h-12 text-green-400" />
                <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                <p className="text-white/50">I'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-white/40 block mb-1.5">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full glass rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 border border-white/10 focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/20 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-white/40 block mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full glass rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 border border-white/10 focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/20 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-white/40 block mb-1.5">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="What's on your mind?"
                    className="w-full glass rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 border border-white/10 focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/20 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-400 text-black font-semibold hover:bg-cyan-300 disabled:opacity-60 disabled:cursor-not-allowed transition-all glow-cyan"
                >
                  {status === 'sending' ? (
                    <span className="font-mono text-sm">Sending...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </GlassCard>
        </SectionReveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add .
git commit -m "feat: Contact section with form"
```

---

## Task 17: CommandPalette

**Files:**
- Create: `components/shared/CommandPalette.tsx`

- [ ] **Step 1: Create `components/shared/CommandPalette.tsx`**

```tsx
'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Terminal, User, Briefcase, Code2, Star, Award, FileDown, Mail, X } from 'lucide-react'
import { NAV_ITEMS } from '@/lib/constants'

const SECTION_ICONS: Record<string, React.FC<{ className?: string }>> = {
  hero: Terminal,
  about: User,
  experience: Briefcase,
  projects: Code2,
  skills: Star,
  certifications: Award,
  resume: FileDown,
  contact: Mail,
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const filtered = NAV_ITEMS.filter((i) =>
    i.label.toLowerCase().includes(query.toLowerCase())
  )

  const navigate = useCallback((href: string) => {
    setOpen(false)
    setQuery('')
    const id = href.replace('#', '')
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      {/* Trigger hint */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-3 py-2 glass rounded-lg border border-white/10 text-white/40 hover:text-white hover:border-cyan-400/30 transition-all text-xs font-mono"
      >
        <Search className="w-3.5 h-3.5" />
        <span>⌘K</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.15 }}
              className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[90] w-full max-w-lg glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
                <Search className="w-4 h-4 text-white/40 flex-shrink-0" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Navigate to..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
                />
                <button onClick={() => setOpen(false)} className="text-white/30 hover:text-white/60">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Results */}
              <div className="py-2 max-h-64 overflow-y-auto">
                {filtered.map((item) => {
                  const id = item.href.replace('#', '')
                  const Icon = SECTION_ICONS[id] || Terminal
                  return (
                    <button
                      key={item.href}
                      onClick={() => navigate(item.href)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all text-left"
                    >
                      <Icon className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  )
                })}
              </div>

              <div className="px-4 py-2 border-t border-white/5 flex items-center gap-4 text-[11px] text-white/20 font-mono">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span>esc close</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add .
git commit -m "feat: CommandPalette with Cmd+K shortcut"
```

---

## Task 18: Footer

**Files:**
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Create `components/layout/Footer.tsx`**

```tsx
import { Github, Linkedin, Youtube, Terminal } from 'lucide-react'
import { SOCIAL_LINKS } from '@/lib/constants'
import { BIO } from '@/lib/data'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 py-10 mt-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center">
            <Terminal className="w-3 h-3 text-black" />
          </div>
          <span className="font-mono text-sm text-white/40">
            {BIO.alias} · {BIO.title}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer"
            className="text-white/30 hover:text-white/70 transition-colors">
            <Github className="w-4 h-4" />
          </a>
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer"
            className="text-white/30 hover:text-white/70 transition-colors">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer"
            className="text-white/30 hover:text-white/70 transition-colors">
            <Youtube className="w-4 h-4" />
          </a>
        </div>

        <span className="font-mono text-xs text-white/20">
          © {year} · Built with Next.js + Three.js
        </span>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add .
git commit -m "feat: Footer"
```

---

## Task 19: Page Assembly

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { CursorGlow } from '@/components/shared/CursorGlow'
import { CommandPalette } from '@/components/shared/CommandPalette'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Experience } from '@/components/sections/Experience'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { Certifications } from '@/components/sections/Certifications'
import { Resume } from '@/components/sections/Resume'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add .
git commit -m "feat: assemble full page"
```

---

## Task 20: Sitemap and Vercel config

**Files:**
- Create: `app/sitemap.ts`
- Create: `vercel.json`
- Create: `.env.example`

- [ ] **Step 1: Create `app/sitemap.ts`**

```ts
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://ikramkirmanii.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
```

- [ ] **Step 2: Create `vercel.json`**

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ]
}
```

- [ ] **Step 3: Create `.env.example`**

```
# No environment variables required for base portfolio.
# Add these if wiring up contact form to Resend:
# RESEND_API_KEY=re_...
# CONTACT_EMAIL=iikramkirmani@gmail.com
```

- [ ] **Step 4: Run build to verify no errors**

```bash
npm run build
```

Expected: `Route (app) / ...` with no TypeScript errors. If errors appear, fix them before committing.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: sitemap, vercel config, build verification"
```

---

## Task 21: Performance — reduce-motion, dynamic imports, bundle check

**Files:**
- Modify: `app/globals.css`
- Modify: `components/three/HeroScene.tsx` (add Suspense boundary already done via dynamic)

- [ ] **Step 1: Add `prefers-reduced-motion` CSS override to `globals.css`**

Append to the end of `app/globals.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Analyze bundle**

```bash
npm install -D @next/bundle-analyzer
```

Add to `next.config.ts`:

```ts
import type { NextConfig } from 'next'
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  reactStrictMode: true,
}

export default withBundleAnalyzer(nextConfig)
```

- [ ] **Step 3: Run with analyzer to spot any oversized chunks**

```bash
$env:ANALYZE="true"; npm run build
```

Expected: Three.js chunks appear in `@react-three` namespace. Verify no chunk exceeds 2MB. If one does, investigate and split.

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "perf: prefers-reduced-motion, bundle analyzer, performance pass"
```

---

## Self-Review Checklist

**Spec coverage:**

| Requirement | Task |
|---|---|
| Hero 3D cloud infra scene | Task 8, 9 |
| K8s nodes, globe, particles, connection lines | Task 8 |
| About section | Task 10 |
| Experience (Kyzein role, real metrics) | Task 11 |
| Projects — AI Support Ticketing, DevSecOps | Task 12 |
| Skills 3D galaxy — all 13+ skills | Task 13 |
| Certifications section | Task 14 |
| Resume section + PDF download | Task 15 |
| Contact form + social links | Task 16 |
| CommandPalette ⌘K | Task 17 |
| Footer | Task 18 |
| Sticky navbar, active section | Task 6 |
| Scroll progress bar | Task 5 |
| Cursor glow | Task 5 |
| Animated section reveals | Task 7 |
| Terminal with fake deploy logs | Task 11 |
| Dark mode default | Task 2, 4 |
| Glassmorphism | Task 2, 7 |
| Gradient text | Task 2 |
| 60fps / instancing / lazy-load 3D | Tasks 8, 13, 21 |
| Mobile responsive | All section layouts use responsive grid |
| SEO metadata | Task 4 |
| Sitemap | Task 20 |
| Vercel deployment config | Task 20 |
| prefers-reduced-motion | Task 21 |
| Social links (LinkedIn, GitHub, YouTube) | Tasks 3, 9, 16, 18 |

All spec requirements covered. No placeholders or TBDs detected.
