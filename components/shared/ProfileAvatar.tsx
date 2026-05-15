'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export function ProfileAvatar() {
  return (
    <div className="relative" style={{ width: 240, height: 320 }}>

      {/* Soft background glow */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -inset-4 rounded-2xl pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.14) 0%, transparent 70%)',
          filter: 'blur(16px)',
        }}
      />

      {/* Rotating border */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute -inset-[2px] rounded-2xl pointer-events-none"
        style={{
          background: 'conic-gradient(from 0deg, #00d4ff 0%, #7c3aed 40%, #10b981 70%, #00d4ff 100%)',
          borderRadius: 18,
        }}
      />

      {/* White inner mask for border gap */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none z-[1]"
        style={{ background: 'var(--color-background)', borderRadius: 16, inset: 2 }}
      />

      {/* Photo — clean, no filters */}
      <div className="absolute inset-[3px] rounded-2xl overflow-hidden z-[2]">
        <Image
          src="/avatar-portrait.jpg"
          alt="Ikram Kirmani"
          fill
          className="object-cover object-top"
          priority
          sizes="240px"
        />
      </div>

      {/* Available badge */}
      <motion.div
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[3] flex items-center gap-1.5 px-3 py-1 rounded-full border border-green-500/30 whitespace-nowrap"
        style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        <span className="text-[10px] font-mono text-green-400 tracking-wide">Open to Work</span>
      </motion.div>

      {/* Orbiting dot */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="absolute pointer-events-none z-[3]"
        style={{ inset: -16 }}
      >
        <div
          className="absolute w-2.5 h-2.5 rounded-full bg-cyan-400 top-0 left-1/2 -translate-x-1/2"
          style={{ boxShadow: '0 0 8px #00d4ff, 0 0 16px rgba(0,212,255,0.5)' }}
        />
      </motion.div>
    </div>
  )
}
