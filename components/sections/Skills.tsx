'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionReveal } from '@/components/shared/SectionReveal'
import { GlassCard } from '@/components/shared/GlassCard'
import { SKILLS } from '@/lib/data'

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

const SKILL_ICONS: Record<string, string> = {
  AWS: '☁️', Azure: '🔷', GCP: '🌐',
  Terraform: '🏗️', Ansible: '⚙️', CloudFormation: '📋',
  'GitHub Actions': '🔄', Jenkins: '🔧', ArgoCD: '🚀', 'GitLab CI': '🦊',
  Docker: '🐳', Kubernetes: '☸️',
  Prometheus: '📊', Grafana: '📈', CloudWatch: '👁️',
  Python: '🐍', Bash: '💻',
  Linux: '🐧', 'IAM / VPC': '🔒',
}

function SkillBubble({ skill, index }: { skill: typeof SKILLS[0]; index: number }) {
  const color = CATEGORY_COLORS[skill.category] || '#00d4ff'
  const size = 0.8 + (skill.level / 5) * 0.4

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: index * 0.04,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.12, y: -4, transition: { duration: 0.15 } }}
      className="group relative flex flex-col items-center gap-1.5 cursor-default"
      style={{ transform: `scale(${size})` }}
    >
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 3 + (index % 4),
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.2,
        }}
        className="relative"
      >
        {/* Glow ring */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"
          style={{ background: `${color}40` }}
        />
        {/* Card */}
        <div
          className="relative w-20 h-20 rounded-2xl flex flex-col items-center justify-center gap-1 border transition-all duration-300"
          style={{
            background: `${color}10`,
            borderColor: `${color}30`,
            boxShadow: `0 0 0 0 ${color}00`,
          }}
        >
          <span className="text-2xl select-none">{SKILL_ICONS[skill.name] || '⚡'}</span>
          {/* Level dots */}
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full"
                style={{
                  background: i < skill.level ? color : `${color}25`,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Label */}
      <span
        className="text-[11px] font-mono font-medium text-center leading-tight"
        style={{ color: `${color}cc` }}
      >
        {skill.name}
      </span>
    </motion.div>
  )
}

function SkillsCloud() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <div ref={ref} className="relative">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)' }} />
      </div>

      {inView && (
        <div className="flex flex-wrap justify-center gap-6 py-4">
          {SKILLS.map((skill, i) => (
            <SkillBubble key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}

function SkillBar({ name, level, color }: { name: string; level: number; color: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="flex items-center gap-3">
      <span className="text-sm text-white/70 w-32 flex-shrink-0 truncate">{name}</span>
      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${(level / 5) * 100}%` } : { width: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-cyan-400 font-mono text-sm">04.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Skills</h2>
          </div>
          <p className="text-white/40 font-mono text-sm mb-16">
            Hover to inspect. Dots = proficiency level.
          </p>
        </SectionReveal>

        {/* Animated skills cloud */}
        <SectionReveal>
          <div className="glass rounded-2xl p-8 mb-10 border border-white/5">
            <SkillsCloud />
          </div>
        </SectionReveal>

        {/* Skill bars by category */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const catSkills = SKILLS.filter((s) => s.category === cat)
            const color = CATEGORY_COLORS[cat] || '#00d4ff'
            return (
              <SectionReveal key={cat} delay={0.05}>
                <GlassCard className="p-4 h-full">
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
              </SectionReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
