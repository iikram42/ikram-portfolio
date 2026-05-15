'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export function ProfileAvatar() {
  return (
    /* Outer wrapper — isolates stacking context, nothing bleeds outside */
    <div
      className="relative"
      style={{ width: 240, height: 320, isolation: 'isolate' }}
    >
      {/* Ambient glow — pointer-events none, clipped by parent overflow */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute rounded-2xl pointer-events-none"
        style={{
          inset: 0,
          background:
            'radial-gradient(ellipse at center, rgba(0,212,255,0.18) 0%, transparent 70%)',
          filter: 'blur(18px)',
          zIndex: 0,
        }}
      />

      {/* Rotating gradient border — stays inside the container (inset: 0) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute pointer-events-none"
        style={{
          inset: 0,
          borderRadius: 18,
          padding: 2,
          background:
            'conic-gradient(from 0deg, #00d4ff 0%, #7c3aed 40%, #10b981 70%, #00d4ff 100%)',
          zIndex: 1,
        }}
      >
        {/* Inner mask to make it look like a border */}
        <div
          className="w-full h-full"
          style={{ borderRadius: 16, background: '#05050e' }}
        />
      </motion.div>

      {/* Photo — sits above border, contained */}
      <div
        className="absolute overflow-hidden"
        style={{ inset: 3, borderRadius: 15, zIndex: 2 }}
      >
        <Image
          src="/avatar-portrait.jpg"
          alt="Ikram Kirmani"
          fill
          className="object-cover object-top"
          priority
          sizes="240px"
        />
        {/* Very subtle bottom fade only */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* Available badge — inside container, no overflow */}
      <motion.div
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute flex items-center gap-1.5 px-3 py-1 rounded-full border border-green-500/30"
        style={{
          bottom: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 3,
          whiteSpace: 'nowrap',
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        <span className="text-[10px] font-mono text-green-400 tracking-wide">
          Open to Work
        </span>
      </motion.div>
    </div>
  )
}
