'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export function ProfileAvatar() {
  return (
    /*
     * Outer wrapper — fixed size, overflow:hidden so NOTHING bleeds outside.
     * isolation:isolate keeps z-index contained so it never overlaps siblings.
     */
    <div
      style={{
        width: 240,
        height: 320,
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',
        borderRadius: 18,
      }}
    >
      {/* ── Rotating gradient border layer ── */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          inset: -80,           // large enough so corners always cover during rotation
          background:
            'conic-gradient(from 0deg, #00d4ff 0%, #7c3aed 40%, #10b981 70%, #00d4ff 100%)',
          zIndex: 0,
        }}
      />

      {/* ── Photo sits on top, leaving 2px gap = visible border ── */}
      <div
        style={{
          position: 'absolute',
          inset: 2,
          borderRadius: 16,
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        <Image
          src="/avatar-portrait.jpg"
          alt="Ikram Kirmani"
          fill
          className="object-cover object-top"
          priority
          sizes="240px"
        />

        {/* Subtle bottom fade */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 60,
            background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Available badge — inside the photo box */}
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
            background: 'rgba(0,0,0,0.72)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(34,197,94,0.3)',
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#4ade80',
              animation: 'pulse 2s infinite',
            }}
          />
          <span style={{ fontSize: 10, fontFamily: 'monospace', color: '#4ade80', letterSpacing: '0.05em' }}>
            Open to Work
          </span>
        </motion.div>
      </div>
    </div>
  )
}
