'use client'

import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import { GithubIcon, LinkedinIcon, YoutubeIcon } from '@/components/shared/SocialIcons'
import { BIO, STATS } from '@/lib/data'
import { SOCIAL_LINKS } from '@/lib/constants'

const HeroScene = dynamic(
  () => import('@/components/three/HeroScene').then(m => m.HeroScene),
  { ssr: false, loading: () => <div className="w-full h-full" /> }
)

export function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -60])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#050505' }}>

      {/* 3D scene */}
      <div className="absolute inset-0 z-0" style={{ background: '#05050e' }}>
        <HeroScene />
      </div>

      {/* Cinematic gradient overlays */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.65) 40%, rgba(5,5,5,0.1) 100%)',
        }} />
      {/* Radial glow behind text */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 60% at 20% 50%, rgba(0,80,255,0.07) 0%, transparent 70%)',
        }} />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 z-[1] h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #050505, transparent)' }} />

      {/* Content — scroll-linked fade */}
      <motion.div style={{ opacity, y }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="max-w-2xl">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#00D6FF' }} />
            <span className="text-xs font-mono tracking-widest uppercase"
              style={{ color: '#00D6FF', letterSpacing: '0.15em' }}>
              Student @ DIT · Deggendorf, Germany
            </span>
          </motion.div>

          {/* Hero headline — Apple/Sony editorial style */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-bold tracking-tight leading-none mb-4"
            style={{ fontSize: 'clamp(48px, 7vw, 80px)', letterSpacing: '-0.03em' }}
          >
            <span className="text-white">{BIO.alias.split(' ')[0]}</span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #ffffff 30%, #00D6FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {BIO.alias.split(' ')[1]}
            </span>
          </motion.h1>

          {/* Tagline — Sony-style confident copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-medium mb-2"
            style={{ fontSize: 18, color: 'rgba(255,255,255,0.9)', letterSpacing: '-0.01em' }}
          >
            {BIO.title}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="text-base leading-relaxed mb-10 max-w-lg"
            style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}
          >
            {BIO.tagline}
          </motion.p>

          {/* CTAs — Sony/Apple button style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            <button
              onClick={() => scrollTo('projects')}
              className="relative px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300 overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, #0050FF, #00D6FF)',
                boxShadow: '0 0 30px rgba(0,80,255,0.3), 0 0 60px rgba(0,80,255,0.1)',
              }}
            >
              <span className="relative z-10">View Projects</span>
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                color: 'rgba(255,255,255,0.8)',
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(8px)',
              }}
            >
              Get in Touch
            </button>
          </motion.div>

          {/* Stats — clean editorial grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
          >
            {STATS.map((stat, i) => (
              <div key={i} className="relative overflow-hidden rounded-xl p-3"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}>
                <div className="text-xl font-bold mb-0.5"
                  style={{
                    background: 'linear-gradient(135deg, #fff 40%, #00D6FF)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-[11px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="flex items-center gap-3"
          >
            {[
              { href: SOCIAL_LINKS.linkedin, Icon: LinkedinIcon },
              { href: SOCIAL_LINKS.github, Icon: GithubIcon },
              { href: SOCIAL_LINKS.youtube, Icon: YoutubeIcon },
            ].map(({ href, Icon }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 group"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}>
                <Icon className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
              </a>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => scrollTo('about')}
      >
        <span className="text-[10px] font-mono tracking-widest uppercase"
          style={{ color: 'rgba(255,255,255,0.2)', letterSpacing: '0.15em' }}>
          Scroll
        </span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.2)' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
