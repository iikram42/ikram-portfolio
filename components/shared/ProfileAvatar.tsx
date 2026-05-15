'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

/*
 * Visual structure (outermost → innermost):
 *
 *  ┌─────────────────────────────────────┐  ← outer container 300×380
 *  │  [spinning colorful background]     │  ← conic gradient rotating like a clock
 *  │   ┌─────────────────────────┐       │
 *  │   │                         │       │  ← 22px of rotating background visible
 *  │   │      YOUR PHOTO         │       │     on all sides around the image
 *  │   │      (full portrait)    │       │
 *  │   │                         │       │
 *  │   └─────────────────────────┘       │
 *  │                                     │
 *  └─────────────────────────────────────┘
 *
 *  overflow:hidden → nothing leaks outside 300×380 ever.
 *  isolation:isolate → z-index is sandboxed, never overlaps siblings.
 */
export function ProfileAvatar() {
  return (
    <div
      style={{
        width: 300,
        height: 380,
        position: 'relative',
        isolation: 'isolate',   /* sandboxes stacking — never overlaps page content */
        overflow: 'hidden',     /* hard clip — nothing bleeds outside this box */
        borderRadius: 24,
        flexShrink: 0,
      }}
    >
      {/* ── Rotating colorful background — spins clockwise like a clock ── */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 900,
          height: 900,
          x: '-50%',
          y: '-50%',
          background:
            'conic-gradient(from 0deg, #00d4ff 0%, #7c3aed 25%, #f59e0b 50%, #10b981 75%, #00d4ff 100%)',
          zIndex: 0,
        }}
      />

      {/* ── Image — sits on top of the spinning background ── */}
      {/* 22px inset → 22px band of rotating background clearly visible on all sides */}
      <div
        style={{
          position: 'absolute',
          inset: 22,
          borderRadius: 16,
          overflow: 'hidden',
          zIndex: 1,
          boxShadow: '0 0 0 1px rgba(255,255,255,0.12)',  /* thin white border on photo edge */
        }}
      >
        <Image
          src="/avatar-portrait.jpg"
          alt="Ikram Kirmani"
          fill
          className="object-cover object-top"
          priority
          sizes="256px"
        />

        {/* Bottom fade for badge readability */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 64,
            background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)',
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
