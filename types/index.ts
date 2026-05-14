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
  level: number
}

export interface Certification {
  name: string
  issuer: string
  date?: string
  expires?: string
  status: 'earned' | 'in-progress'
  credentialUrl?: string
  pdfUrl?: string
  skills?: string[]
}

export interface MetricStat {
  label: string
  value: string
  suffix?: string
}
