'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ArrowDown, Terminal, Zap } from 'lucide-react'
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
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* 3D scene */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-background/95 via-background/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 z-[1] h-40 bg-gradient-to-t from-background to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="max-w-2xl">
          {/* Status badge */}
          <motion.div
            variants={FADE_UP}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-green-500/20 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-mono text-green-400">Available for opportunities</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={FADE_UP}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-4"
          >
            <span className="text-white">{BIO.alias.split(' ')[0]}</span>
            <br />
            <span className="gradient-text glow-text-cyan">{BIO.alias.split(' ')[1]}</span>
          </motion.h1>

          {/* Role */}
          <motion.div
            variants={FADE_UP}
            initial="hidden"
            animate="visible"
            custom={2}
            className="flex items-center gap-2 mb-4"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-cyan-400 text-lg">{BIO.title}</span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={FADE_UP}
            initial="hidden"
            animate="visible"
            custom={3}
            className="text-white/60 text-lg leading-relaxed mb-8 max-w-xl"
          >
            {BIO.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={FADE_UP}
            initial="hidden"
            animate="visible"
            custom={4}
            className="flex flex-wrap gap-4 mb-12"
          >
            <button
              onClick={() => scrollTo('projects')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition-all duration-200 glow-cyan"
            >
              <Zap className="w-4 h-4" />
              View Projects
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/10 text-white/80 hover:border-cyan-400/40 hover:text-white transition-all duration-200"
            >
              Get in Touch
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={FADE_UP}
            initial="hidden"
            animate="visible"
            custom={5}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {STATS.map((stat, i) => (
              <div key={i} className="glass rounded-lg p-3 border border-white/5">
                <div className="text-2xl font-bold gradient-text">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-xs text-white/40 mt-0.5 leading-snug">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Socials */}
          <motion.div
            variants={FADE_UP}
            initial="hidden"
            animate="visible"
            custom={6}
            className="flex items-center gap-3"
          >
            {[
              { href: SOCIAL_LINKS.linkedin, Icon: LinkedinIcon, hoverColor: 'hover:text-cyan-400 hover:border-cyan-400/40' },
              { href: SOCIAL_LINKS.github, Icon: GithubIcon, hoverColor: 'hover:text-cyan-400 hover:border-cyan-400/40' },
              { href: SOCIAL_LINKS.youtube, Icon: YoutubeIcon, hoverColor: 'hover:text-red-400 hover:border-red-400/40' },
            ].map(({ href, Icon, hoverColor }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center text-white/50 transition-all ${hoverColor}`}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-xs font-mono">scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
