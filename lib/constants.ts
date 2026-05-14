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
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
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
