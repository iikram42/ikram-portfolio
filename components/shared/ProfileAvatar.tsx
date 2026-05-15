'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export function ProfileAvatar() {
  return (
    /*
     * Layout (outermost → innermost):
     * 1. Outer frame (280x340) — rotating gradient background fills this, overflow hidden
     * 2. Image box (inset 8px) — the actual photo at near-full size with 1px colored border
     * 3. Available badge inside the image box
     *
     * Result: photo looks normal size, thin colored border around it,
     * 8px band of rotating gradient visible around the outside — like a glowing frame.
     * Nothing bleeds outside 280x340.
     */
    <div
      style={{
        width: 280,
        height: 340,
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',
        borderRadius: 20,
      }}
    >
      {/* ── Rotating gradient background — spins like clock behind the photo ── */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 800,
          height: 800,
          x: '-50%',
          y: '-50%',
          background:
            'conic-gradient(from 0deg, #00d4ff 0%, #7c3aed 25%, #ff6b35 50%, #10b981 75%, #00d4ff 100%)',
          zIndex: 0,
        }}
      />

      {/* ── Image container — 8px inset shows 8px of rotating gradient as background frame ── */}
      <div
        style={{
          position: 'absolute',
          inset: 6,            /* 6px gap on all sides = rotating background clearly visible */
          borderRadius: 12,
          overflow: 'hidden',
          zIndex: 1,
          border: '1px solid rgba(255,255,255,0.15)',  /* thin subtle border on image */
        }}
      >
        {/* Photo — full size, untouched */}
        <Image
          src="/avatar-portrait.jpg"
          alt="Ikram Kirmani"
          fill
          className="object-cover object-top"
          priority
          sizes="264px"
        />

        {/* Bottom fade so badge is readable */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 64,
            background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Available badge */}
        <motion.div
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: 'absolute',
            bottom: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 10px',
            borderRadius: 999,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(34,197,94,0.35)',
            whiteSpace: 'nowrap',
            zIndex: 2,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }} />
          <span style={{ fontSize: 10, fontFamily: 'monospace', color: '#4ade80', letterSpacing: '0.05em' }}>
            Open to Work
          </span>
        </motion.div>
      </div>
    </div>
  )
}
