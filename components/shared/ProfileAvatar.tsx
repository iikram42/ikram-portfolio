'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export function ProfileAvatar() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 260, height: 300 }}>

      {/* Ambient glow behind the photo */}
      <motion.div
        animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.06, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute rounded-2xl pointer-events-none"
        style={{
          inset: -16,
          background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.18) 0%, rgba(124,58,237,0.10) 50%, transparent 75%)',
          filter: 'blur(12px)',
        }}
      />

      {/* Rotating conic gradient border */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="absolute rounded-2xl pointer-events-none"
        style={{
          inset: -2,
          background: 'conic-gradient(from 0deg, #00d4ff, #7c3aed, #10b981, #00d4ff)',
          borderRadius: 20,
          padding: 2,
        }}
      >
        <div className="w-full h-full rounded-[18px] bg-background" />
      </motion.div>

      {/* Second slower counter-ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        className="absolute pointer-events-none"
        style={{
          inset: -8,
          borderRadius: 26,
          border: '1px solid transparent',
          background: 'conic-gradient(from 120deg, rgba(0,212,255,0.3), transparent 40%, rgba(124,58,237,0.3) 70%, transparent 90%) border-box',
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {/* The actual photo — untouched */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden z-10" style={{ border: '2px solid rgba(255,255,255,0.08)' }}>
        <Image
          src="/avatar.jpg"
          alt="Ikram Kirmani"
          fill
          className="object-cover object-top"
          priority
        />
        {/* Very subtle cyan tint at bottom only — keeps face untouched */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(0,10,20,0.55) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* Status badge — bottom left */}
      <motion.div
        animate={{ opacity: [1, 0.6, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-green-500/30"
        style={{ background: 'rgba(5,15,10,0.85)', backdropFilter: 'blur(8px)' }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
        <span className="text-[9px] font-mono text-green-400 tracking-wider">Available</span>
      </motion.div>

      {/* Orbiting dot 1 */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
        className="absolute pointer-events-none"
        style={{ inset: -18 }}
      >
        <div
          className="absolute w-2.5 h-2.5 rounded-full bg-cyan-400 top-0 left-1/2 -translate-x-1/2"
          style={{ boxShadow: '0 0 8px #00d4ff, 0 0 18px rgba(0,212,255,0.4)' }}
        />
      </motion.div>

      {/* Orbiting dot 2 */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
        className="absolute pointer-events-none"
        style={{ inset: -12 }}
      >
        <div
          className="absolute w-2 h-2 rounded-full bg-purple-400 bottom-4 right-0"
          style={{ boxShadow: '0 0 6px #7c3aed' }}
        />
      </motion.div>
    </div>
  )
}
