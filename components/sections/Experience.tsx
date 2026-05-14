'use client'

import { Building2, Calendar, MapPin, ChevronRight } from 'lucide-react'
import { SectionReveal } from '@/components/shared/SectionReveal'
import { GlassCard } from '@/components/shared/GlassCard'
import { Terminal } from '@/components/shared/Terminal'
import { EXPERIENCE } from '@/lib/data'

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
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: b.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white/80">$1</strong>'),
                                }}
                              />
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

          <SectionReveal direction="right" delay={0.2}>
            <div className="space-y-4">
              <div className="text-sm font-mono text-white/40 mb-4">// Live ops console</div>
              <Terminal />
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
