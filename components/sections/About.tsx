'use client'

import { MapPin, GraduationCap, Code2, Server } from 'lucide-react'
import { SectionReveal } from '@/components/shared/SectionReveal'
import { GlassCard } from '@/components/shared/GlassCard'
import { BIO, ACHIEVEMENTS } from '@/lib/data'

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
        <SectionReveal direction="left">
          <div className="space-y-6">
            <p className="text-white/70 text-lg leading-relaxed">{BIO.summary}</p>
            <div className="flex flex-col gap-3 pt-2">
              {[
                { Icon: MapPin, color: 'text-cyan-400', text: BIO.location },
                {
                  Icon: GraduationCap,
                  color: 'text-purple-400',
                  text: `${BIO.education.degree} — ${BIO.education.institution} (${BIO.education.period}) · CGPA ${BIO.education.cgpa}`,
                },
                { Icon: Server, color: 'text-green-400', text: '1+ year production cloud infrastructure experience' },
                { Icon: Code2, color: 'text-orange-400', text: 'AWS · Azure · GCP · Kubernetes · Terraform' },
              ].map(({ Icon, color, text }, i) => (
                <div key={i} className="flex items-start gap-3 text-white/50">
                  <Icon className={`w-4 h-4 ${color} flex-shrink-0 mt-0.5`} />
                  <span className="text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>

        <SectionReveal direction="right" delay={0.15}>
          <div className="space-y-4">
            <h3 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-4">Achievements</h3>
            {ACHIEVEMENTS.map((a, i) => (
              <GlassCard key={i} className="p-4 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-white/90 text-sm">{a.title}</span>
                  <span className="text-xs text-white/30 whitespace-nowrap flex-shrink-0">{a.org}</span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">{a.description}</p>
              </GlassCard>
            ))}

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
