'use client'

import { FileDown, ExternalLink } from 'lucide-react'
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
            <h3 className="text-2xl font-bold text-white mb-3">{BIO.name}</h3>
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
