'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export function ProfileAvatar() {
  return (
    <>
      <style>{`
        @keyframes avatarSpinCW {
          from { transform: translate(-50%, -50%) rotate(0deg);   }
          to   { transform: translate(-50%, -50%) rotate(360deg);  }
        }
        @keyframes avatarSpinCCW {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(-360deg); }
        }
        .av-spin-cw  { animation: avatarSpinCW  8s linear infinite !important; animation-play-state: running !important; }
        .av-spin-ccw { animation: avatarSpinCCW 14s linear infinite !important; animation-play-state: running !important; }
      `}</style>

      {/*
       * Single wrapper — overflow:hidden is the hard wall.
       * Nothing inside can ever bleed outside this box.
       * isolation:isolate sandboxes z-index from page content.
       */}
      <div style={{
        position: 'relative',
        width: 260,
        height: 310,
        overflow: 'hidden',
        isolation: 'isolate',
        borderRadius: 22,
        flexShrink: 0,
      }}>

        {/* ── Rotating conic gradient — fills whole wrapper, spins clockwise ── */}
        <div
          className="av-spin-cw"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 800,
            height: 800,
            background: 'conic-gradient(from 0deg, #00d4ff 0%, #7c3aed 33%, #10b981 66%, #00d4ff 100%)',
            zIndex: 0,
          }}
        />

        {/* ── Glow pulse ── */}
        <motion.div
          animate={{ opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle, rgba(0,212,255,0.2) 0%, transparent 70%)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        {/* ── Photo — sits on top, 4px gap shows rotating ring around it ── */}
        <div style={{
          position: 'absolute',
          inset: 4,
          borderRadius: 18,
          overflow: 'hidden',
          zIndex: 2,
          boxShadow: '0 0 0 1px rgba(255,255,255,0.1)',
        }}>
          <Image
            src="/avatar-portrait.jpg"
            alt="Ikram Kirmani"
            fill
            className="object-cover object-top"
            priority
            sizes="252px"
          />

          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: 70,
            background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
            pointerEvents: 'none',
          }} />

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
