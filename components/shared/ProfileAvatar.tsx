'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export function ProfileAvatar() {
  return (
    <div
      style={{
        width: 240,
        height: 320,
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',      /* clips everything — no bleeding outside */
        borderRadius: 18,
      }}
    >
      {/* ── Rotating conic gradient — large square centered so rotation is smooth ── */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 600,
          height: 600,
          marginTop: -300,
          marginLeft: -300,
          background:
            'conic-gradient(from 0deg, #00d4ff 0%, #7c3aed 33%, #10b981 66%, #00d4ff 100%)',
          zIndex: 0,
        }}
      />

      {/* ── Photo — 2px inset from edges creates the visible rotating border ── */}
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

        {/* Bottom fade */}
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
            background: 'rgba(0,0,0,0.72)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(34,197,94,0.3)',
            whiteSpace: 'nowrap',
            zIndex: 2,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#4ade80',
            }}
          />
          <span
            style={{
              fontSize: 10,
              fontFamily: 'monospace',
              color: '#4ade80',
              letterSpacing: '0.05em',
            }}
          >
            Open to Work
          </span>
        </motion.div>
      </div>
    </div>
  )
}
