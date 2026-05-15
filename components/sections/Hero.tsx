'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ArrowDown, Terminal, Zap, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon, YoutubeIcon } from '@/components/shared/SocialIcons'
import { BIO, STATS } from '@/lib/data'
import { SOCIAL_LINKS, FADE_UP } from '@/lib/constants'

const HeroScene = dynamic(
  () => import('@/components/three/HeroScene').then((m) => m.HeroScene),
  { ssr: false, loading: () => <div className="w-full h-full" /> }
)

export function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: '#05050e' }}>

      {/* ── 3D Scene — full viewport, dark bg so no white flash ── */}
      <div className="absolute inset-0 z-0" style={{ background: '#05050e' }}>
        <HeroScene />
      </div>

      {/* ── Left text panel: subtle dark vignette only where text sits ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(5,5,14,0.88) 0%, rgba(5,5,14,0.60) 35%, rgba(5,5,14,0.15) 65%, rgba(5,5,14,0.0) 100%)',
        }}
      />
      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[1] h-28 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #05050e 0%, transparent 100%)' }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="max-w-xl">

          {/* Status badge */}
          <motion.div
            variants={FADE_UP} initial="hidden" animate="visible" custom={0}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 border border-green-500/30"
            style={{ background: 'rgba(16,185,129,0.08)' }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <MapPin className="w-3 h-3 text-green-400/70" />
            <span className="text-xs font-mono text-green-400">
              Student @ DIT · Deggendorf, Germany
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={FADE_UP} initial="hidden" animate="visible" custom={1}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-none mb-3"
          >
            <span className="text-white drop-shadow-lg">{BIO.alias.split(' ')[0]}</span>
            <br />
            <span
              className="gradient-text glow-text-cyan"
              style={{ filter: 'drop-shadow(0 0 24px rgba(0,212,255,0.4))' }}
            >
              {BIO.alias.split(' ')[1]}
            </span>
          </motion.h1>

          {/* Role */}
          <motion.div
            variants={FADE_UP} initial="hidden" animate="visible" custom={2}
            className="flex items-center gap-2 mb-4"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-cyan-400 text-base md:text-lg tracking-wide">
              {BIO.title}
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={FADE_UP} initial="hidden" animate="visible" custom={3}
            className="text-white/65 text-base md:text-lg leading-relaxed mb-8 max-w-md"
          >
            {BIO.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={FADE_UP} initial="hidden" animate="visible" custom={4}
            className="flex flex-wrap gap-3 mb-10"
          >
            <button
              onClick={() => scrollTo('projects')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400 text-black font-semibold text-sm hover:bg-cyan-300 active:scale-95 transition-all glow-cyan"
            >
              <Zap className="w-4 h-4" />
              View Projects
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white/80 text-sm font-medium border border-white/15 hover:border-cyan-400/50 hover:text-white active:scale-95 transition-all"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              Get in Touch
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={FADE_UP} initial="hidden" animate="visible" custom={5}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10"
          >
            {STATS.map((stat, i) => (
              <div
                key={i}
                className="rounded-xl px-3 py-2.5 border border-white/8"
                style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(8px)' }}
              >
                <div className="text-xl font-bold gradient-text leading-none">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-[11px] text-white/40 mt-1 leading-tight">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Socials */}
          <motion.div
            variants={FADE_UP} initial="hidden" animate="visible" custom={6}
            className="flex items-center gap-3"
          >
            {[
              { href: SOCIAL_LINKS.linkedin, Icon: LinkedinIcon, hover: 'hover:text-cyan-400 hover:border-cyan-400/40' },
              { href: SOCIAL_LINKS.github, Icon: GithubIcon, hover: 'hover:text-cyan-400 hover:border-cyan-400/40' },
              { href: SOCIAL_LINKS.youtube, Icon: YoutubeIcon, hover: 'hover:text-red-400 hover:border-red-400/40' },
            ].map(({ href, Icon, hover }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-9 h-9 rounded-lg flex items-center justify-center text-white/50 border border-white/10 transition-all ${hover}`}
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/25 cursor-pointer"
        onClick={() => scrollTo('about')}
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
