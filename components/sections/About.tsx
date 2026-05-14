'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin, GraduationCap, Code2, Server } from 'lucide-react'
import { SectionReveal } from '@/components/shared/SectionReveal'
import { GlassCard } from '@/components/shared/GlassCard'
import { BIO, ACHIEVEMENTS } from '@/lib/data'

function AvatarCard() {
  return (
    <SectionReveal direction="left">
      <div className="flex flex-col items-center gap-6">
        {/* Animated avatar */}
        <div className="relative w-56 h-56 md:w-64 md:h-64">
          {/* Rotating gradient ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'conic-gradient(from 0deg, #00d4ff, #7c3aed, #10b981, #00d4ff)',
              padding: '3px',
              borderRadius: '9999px',
            }}
          >
            <div className="w-full h-full rounded-full bg-background" />
          </motion.div>

          {/* Second slower ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-2 rounded-full"
            style={{
              background:
                'conic-gradient(from 180deg, transparent 60%, rgba(0,212,255,0.4) 80%, transparent 100%)',
              borderRadius: '9999px',
            }}
          />

          {/* Glow pulse */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(0,212,255,0.2) 0%, transparent 70%)',
            }}
          />

          {/* Photo */}
          <div className="absolute inset-[3px] rounded-full overflow-hidden border-2 border-white/10">
            <Image
              src="/avatar.jpg"
              alt="Ikram Kirmani"
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          {/* Status dot */}
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-3 right-3 w-4 h-4 rounded-full bg-green-400 border-2 border-background z-10"
          />
        </div>

        {/* Name + title under photo */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-white">{BIO.alias}</h3>
          <p className="text-cyan-400 font-mono text-sm mt-1">{BIO.title}</p>
          <div className="flex items-center justify-center gap-1.5 mt-2 text-white/40">
            <MapPin className="w-3 h-3" />
            <span className="text-xs">{BIO.location}</span>
          </div>
        </div>

        {/* Quick stats row */}
        <div className="grid grid-cols-3 gap-3 w-full">
          {[
            { value: '1+', label: 'Years Exp' },
            { value: '4+', label: 'Projects' },
            { value: '3', label: 'Clouds' },
          ].map((s, i) => (
            <div
              key={i}
              className="glass rounded-xl p-3 text-center border border-white/5"
            >
              <div className="text-lg font-bold gradient-text">{s.value}</div>
              <div className="text-[10px] text-white/40 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </SectionReveal>
  )
}

export function About() {
  return (
    <section id="about" className="py-24 max-w-7xl mx-auto px-6">
      <SectionReveal>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-cyan-400 font-mono text-sm">01.</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">About Me</h2>
        </div>
        <p className="text-white/40 font-mono text-sm mb-16">
          Cloud engineer. Infrastructure automator. Problem solver.
        </p>
      </SectionReveal>

      <div className="grid md:grid-cols-3 gap-12 items-start">
        {/* Avatar column */}
        <AvatarCard />

        {/* Bio + achievements column (spans 2) */}
        <div className="md:col-span-2 space-y-10">
          <SectionReveal direction="right">
            <div className="space-y-5">
              <p className="text-white/70 text-lg leading-relaxed">{BIO.summary}</p>
              <div className="flex flex-col gap-3 pt-1">
                {[
                  { Icon: GraduationCap, color: 'text-purple-400', text: `${BIO.education.degree} — ${BIO.education.institution} (${BIO.education.period}) · CGPA ${BIO.education.cgpa}` },
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
              <h3 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-4">
                Achievements
              </h3>
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
      </div>
    </section>
  )
}
