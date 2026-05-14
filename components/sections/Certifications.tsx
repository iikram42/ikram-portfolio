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
              <GlassCard className="h-full flex flex-col gap-4 gradient-border">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                >
                  <Award className="w-6 h-6" style={{ color }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white/90 text-sm leading-snug mb-1">{cert.name}</h3>
                  <p className="text-xs text-white/40">{cert.issuer}</p>
                  {cert.date && <p className="text-xs text-white/30 mt-1 font-mono">{cert.date}</p>}
                </div>
                <div className="flex items-center gap-1.5">
                  {isEarned ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-xs text-green-400 font-mono">Earned</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-3.5 h-3.5 text-orange-400 animate-spin [animation-duration:3s]" />
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
