'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export function ProfileAvatar() {
  return (
    <>
      <style>{`
        @keyframes avatarSpin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .avatar-bg-spin {
          animation: avatarSpin 6s linear infinite !important;
          animation-play-state: running !important;
        }
      `}</style>

      {/*
       * Outer wrapper — LARGER than the image.
       * The spinning background fills this wrapper.
       * The image card sits on top, centered, SMALLER — so spinning bg
       * is clearly visible AROUND the image (not as a border ON it).
       */}
      <div
        style={{
          width: 320,
          height: 400,
          position: 'relative',
          isolation: 'isolate',
          overflow: 'hidden',
          borderRadius: 28,
          flexShrink: 0,
        }}
      >
        {/* ── Rotating background — fills the wrapper, spins clockwise ── */}
        <div
          className="avatar-bg-spin"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 1000,
            height: 1000,
            background:
              'conic-gradient(from 0deg, #00d4ff 0%, #003a4d 50%, #00d4ff 100%)',
            zIndex: 0,
          }}
        />

        {/*
         * ── Image card — sits cleanly ON TOP of the spinning background ──
         * Has margin/inset so spinning background is visible around it.
         * Image itself is clean — no colored border, glass look.
         */}
        <div
          style={{
            position: 'absolute',
            top: 32,
            left: 32,
            right: 32,
            bottom: 32,
            borderRadius: 18,
            overflow: 'hidden',
            zIndex: 2,
            boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)',
          }}
        >
          {/* Clean image — full, untouched */}
          <Image
            src="/avatar-portrait.jpg"
            alt="Ikram Kirmani"
            fill
            className="object-cover object-top"
            priority
            sizes="256px"
          />

          {/* Bottom gradient for badge */}
          <div
            style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              height: 70,
              background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
              pointerEvents: 'none',
            }}
          />

          {/* Badge */}
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              position: 'absolute',
              bottom: 12,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 12px',
              borderRadius: 999,
              background: 'rgba(0,0,0,0.75)',
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
    </>
  )
}
