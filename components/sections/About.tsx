'use client'

import { MapPin, GraduationCap, Code2, Server, BookOpen, Calendar } from 'lucide-react'
import { SectionReveal } from '@/components/shared/SectionReveal'
import { GlassCard } from '@/components/shared/GlassCard'
import { ProfileAvatar } from '@/components/shared/ProfileAvatar'
import { BIO, ACHIEVEMENTS } from '@/lib/data'

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="rounded-xl p-3 text-center border border-white/8 flex-1 min-w-0"
      style={{ background: 'rgba(255,255,255,0.04)' }}
    >
      <div className="text-xl font-bold gradient-text leading-none">{value}</div>
      <div className="text-[10px] text-white/40 mt-1 leading-tight">{label}</div>
    </div>
  )
}

export function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <SectionReveal>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-cyan-400 font-mono text-sm">01.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">About Me</h2>
          </div>
          <p className="text-white/40 font-mono text-sm mb-12 md:mb-16">
            Cloud engineer. Infrastructure automator. Problem solver.
          </p>
        </SectionReveal>

        {/* ── Layout: mobile=1col | md=2col | lg=3col ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[auto_1fr_1fr] gap-8 lg:gap-12 items-start">

          {/* ── Column 1: Avatar ── */}
          <SectionReveal direction="left">
            <div className="flex flex-col items-center gap-5 w-full lg:w-auto">
              {/* Avatar centered on mobile, left-aligned on lg */}
              <div className="mx-auto lg:mx-0">
                <ProfileAvatar />
              </div>

              {/* Name + role under avatar — visible on mobile only */}
              <div className="text-center lg:hidden">
                <h3 className="text-xl font-bold text-white">{BIO.alias}</h3>
                <p className="text-cyan-400 font-mono text-sm mt-0.5">{BIO.title}</p>
                <div className="flex items-center justify-center gap-1.5 mt-1.5 text-white/40">
                  <MapPin className="w-3 h-3" />
                  <span className="text-xs">{BIO.location}</span>
                </div>
              </div>

              {/* Stats row */}
              <div className="flex gap-2 w-full max-w-xs mx-auto lg:mx-0">
                <StatPill value="1+" label="Years Exp" />
                <StatPill value="4+" label="Projects" />
                <StatPill value="3" label="Clouds" />
              </div>
            </div>
          </SectionReveal>

          {/* ── Column 2: Bio + Current Study ── */}
          <SectionReveal direction="right" delay={0.1}>
            <div className="space-y-5">

              {/* Name + location — hidden on mobile (shown under avatar) */}
              <div className="hidden lg:block">
                <h3 className="text-2xl font-bold text-white mb-0.5">{BIO.alias}</h3>
                <div className="flex items-center gap-2 text-white/40">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-sm">{BIO.location}</span>
                </div>
              </div>

              {/* Summary */}
              <p className="text-white/65 text-base leading-relaxed">{BIO.summary}</p>

              {/* Detail pills */}
              <div className="flex flex-col gap-2.5">
                {[
                  { Icon: Server, color: 'text-green-400', text: '1+ year production cloud infrastructure experience' },
                  { Icon: Code2, color: 'text-orange-400', text: 'AWS · Azure · GCP · Kubernetes · Terraform · Docker' },
                ].map(({ Icon, color, text }, i) => (
                  <div key={i} className="flex items-start gap-3 text-white/50">
                    <Icon className={`w-4 h-4 ${color} flex-shrink-0 mt-0.5`} />
                    <span className="text-sm">{text}</span>
                  </div>
                ))}
              </div>

              {/* ── DIT Education Card ── */}
              <div
                className="rounded-2xl p-4 border border-cyan-400/20 relative overflow-hidden"
                style={{ background: 'rgba(0,212,255,0.04)' }}
              >
                {/* Accent line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400/60 to-transparent rounded-t-2xl" />

                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border border-cyan-400/25"
                    style={{ background: 'rgba(0,212,255,0.1)' }}
                  >
                    <BookOpen className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <h4 className="font-semibold text-white text-sm">
                          Deggendorf Institute of Technology
                        </h4>
                        <p className="text-cyan-400 text-xs font-mono mt-0.5">
                          High Performance Computing (HPC)
                        </p>
                      </div>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full border border-cyan-400/30 text-cyan-400 font-mono whitespace-nowrap flex-shrink-0"
                        style={{ background: 'rgba(0,212,255,0.08)' }}
                      >
                        Current
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2 text-white/35">
                      <MapPin className="w-3 h-3" />
                      <span className="text-xs">Deggendorf, Germany</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── MGM University Card ── */}
              <GlassCard className="p-4 gradient-border">
                <div className="flex items-center gap-2 mb-1.5">
                  <GraduationCap className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-semibold text-white/90">{BIO.education.institution}</span>
                </div>
                <p className="text-white/50 text-sm">{BIO.education.degree}</p>
                <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 text-white/30">
                    <Calendar className="w-3 h-3" />
                    <span className="text-xs font-mono">{BIO.education.period}</span>
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full border border-purple-500/25 text-purple-400"
                    style={{ background: 'rgba(124,58,237,0.08)' }}
                  >
                    CGPA: {BIO.education.cgpa}
                  </span>
                </div>
              </GlassCard>
            </div>
          </SectionReveal>

          {/* ── Column 3: Achievements ── */}
          <SectionReveal direction="right" delay={0.2}>
            <div className="space-y-4">
              <h3 className="text-xs font-mono text-white/35 uppercase tracking-widest mb-4">
                Achievements
              </h3>
              {ACHIEVEMENTS.map((a, i) => (
                <GlassCard key={i} className="p-4 flex flex-col gap-2 glass-hover">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <span className="font-semibold text-white/90 text-sm">{a.title}</span>
                    <span className="text-[10px] text-white/30 whitespace-nowrap flex-shrink-0 mt-0.5">
                      {a.org}
                    </span>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed">{a.description}</p>
                </GlassCard>
              ))}

              {/* Open to work card */}
              <div
                className="rounded-xl p-4 border border-green-500/20 flex items-center gap-3"
                style={{ background: 'rgba(16,185,129,0.05)' }}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white/80">Open to Work</p>
                  <p className="text-xs text-white/40 mt-0.5">
                    Internships · Collaborations · Freelance
                  </p>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
