'use client'

import { Server, Shield, Activity, Layers } from 'lucide-react'
import { GithubIcon } from '@/components/shared/SocialIcons'
import { SectionReveal } from '@/components/shared/SectionReveal'
import { GlassCard } from '@/components/shared/GlassCard'
import { TiltCard } from '@/components/shared/TiltCard'
import { PROJECTS } from '@/lib/data'
import type { Project } from '@/types'

const CATEGORY_META: Record<string, { Icon: React.FC<{className?: string}>; color: string }> = {
  infrastructure: { Icon: Server, color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20' },
  devsecops: { Icon: Shield, color: 'text-red-400 bg-red-400/10 border-red-400/20' },
  monitoring: { Icon: Activity, color: 'text-green-400 bg-green-400/10 border-green-400/20' },
  automation: { Icon: Layers, color: 'text-purple-400 bg-purple-400/10 border-purple-400/20' },
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const meta = CATEGORY_META[project.category]
  const Icon = meta.Icon

  return (
    <SectionReveal delay={index * 0.1}>
      <TiltCard className="h-full" intensity={8}>
        <GlassCard className="h-full flex flex-col gradient-border relative overflow-hidden" hover={false}>
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${meta.color} border`}>
              <Icon className="w-5 h-5" />
            </div>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg glass border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <h3 className="font-semibold text-white mb-2 text-base">{project.title}</h3>
          <p className="text-white/50 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>

          <div className="grid grid-cols-3 gap-2 mb-4">
            {project.metrics.map((m, i) => (
              <div key={i} className="glass rounded-md p-2 text-center border border-white/5">
                <div className="text-xs font-bold text-white/80">{m.value}</div>
                <div className="text-[10px] text-white/30 mt-0.5 leading-tight">{m.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.stack.map((s) => (
              <span key={s} className="px-2 py-0.5 rounded-md text-[11px] font-mono glass border border-white/8 text-white/50">
                {s}
              </span>
            ))}
          </div>

          <span className={`text-[11px] px-2 py-0.5 rounded-full border font-mono self-start ${meta.color}`}>
            {project.category}
          </span>
        </GlassCard>
      </TiltCard>
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
