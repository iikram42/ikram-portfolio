'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

/*
 * The rotation uses a raw CSS @keyframes animation with !important
 * so it works even when Windows "prefers-reduced-motion" is ON.
 * Framer Motion respects reduced-motion and stops — raw CSS with !important overrides it.
 */
export function ProfileAvatar() {
  return (
    <>
      {/* Inject keyframes so the spin always runs regardless of OS motion settings */}
      <style>{`
        @keyframes avatarSpin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .avatar-bg-spin {
          animation: avatarSpin 5s linear infinite !important;
          animation-play-state: running !important;
        }
      `}</style>

      <div
        style={{
          width: 300,
          height: 380,
          position: 'relative',
          isolation: 'isolate',
          overflow: 'hidden',
          borderRadius: 24,
          flexShrink: 0,
        }}
      >
        {/* ── Rotating background — distinct color bands so spin is clearly visible ── */}
        <div
          className="avatar-bg-spin"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 900,
            height: 900,
            /* asymmetric bands: each color occupies a clear arc, rotation is obvious */
            background:
              'conic-gradient(from 0deg, #00d4ff 0% 20%, #7c3aed 20% 45%, #f59e0b 45% 65%, #10b981 65% 85%, #ff4e8a 85% 100%)',
            zIndex: 0,
          }}
        />

        {/* ── Image sits on top — 22px gap shows spinning background around all edges ── */}
        <div
          style={{
            position: 'absolute',
            inset: 22,
            borderRadius: 6,
            overflow: 'hidden',
            zIndex: 1,
            boxShadow: '0 0 0 1px rgba(255,255,255,0.15)',
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

          {/* Bottom fade */}
          <div
            style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
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
    </>
  )
}
