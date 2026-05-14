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
      <span className="text-sm text-white/70 w-28 flex-shrink-0 truncate">{name}</span>
      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
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
          <p className="text-white/40 font-mono text-sm mb-16">Click nodes to explore.</p>
        </SectionReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <SectionReveal direction="left">
            <div className="h-96 w-full">
              <SkillsGalaxy skills={SKILLS} />
            </div>
          </SectionReveal>

          <SectionReveal direction="right" delay={0.1}>
            <div className="space-y-4">
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
