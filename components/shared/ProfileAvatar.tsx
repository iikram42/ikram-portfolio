'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export function ProfileAvatar() {
  return (
    /*
     * Outer container — rotating gradient fills this entirely.
     * Photo sits on top of it, smaller, so gradient shows around all edges.
     * overflow:hidden clips everything — zero bleed outside this box.
     */
    <div
      style={{
        width: 260,
        height: 300,
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',
        borderRadius: 20,
      }}
    >
      {/* ── Rotating gradient background — fills the full container, spins like a clock ── */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 700,
          height: 700,
          x: '-50%',
          y: '-50%',
          background:
            'conic-gradient(from 0deg, #00d4ff 0%, #7c3aed 25%, #ff6b35 50%, #10b981 75%, #00d4ff 100%)',
          zIndex: 0,
        }}
      />

      {/* ── Slight dark wash over the gradient so it's not too harsh ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.15)',
          zIndex: 1,
        }}
      />

      {/* ── Photo — 10px inset on all sides so gradient background is visible around it ── */}
      <div
        style={{
          position: 'absolute',
          inset: 10,
          borderRadius: 14,
          overflow: 'hidden',
          zIndex: 2,
        }}
      >
        <Image
          src="/avatar-portrait.jpg"
          alt="Ikram Kirmani"
          fill
          className="object-cover object-top"
          priority
          sizes="260px"
        />

        {/* Bottom fade */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 60,
            background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Available badge inside photo */}
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
            border: '1px solid rgba(34,197,94,0.35)',
            whiteSpace: 'nowrap',
            zIndex: 3,
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
