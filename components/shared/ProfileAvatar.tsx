'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

/* CSS keyframe animations injected inline — always run regardless of OS motion settings */
const STYLES = `
  @keyframes avatarSpinCW  { to { transform: translate(-50%,-50%) rotate(360deg);  } }
  @keyframes avatarSpinCCW { to { transform: translate(-50%,-50%) rotate(-360deg); } }
  @keyframes orbitA { to { transform: rotate(360deg);  } }
  @keyframes orbitB { to { transform: rotate(-360deg); } }
  @keyframes orbitC { to { transform: rotate(360deg);  } }
  @keyframes pulse3d { 0%,100% { opacity:.3; transform:scale(1);   }
                       50%      { opacity:.7; transform:scale(1.08); } }
  .av-spin-cw  { animation: avatarSpinCW  6s linear infinite !important; animation-play-state:running !important; }
  .av-spin-ccw { animation: avatarSpinCCW 10s linear infinite !important; animation-play-state:running !important; }
  .av-orbit-a  { animation: orbitA 5s linear infinite !important; animation-play-state:running !important; }
  .av-orbit-b  { animation: orbitB 8s linear infinite !important; animation-play-state:running !important; }
  .av-orbit-c  { animation: orbitC 12s linear infinite !important; animation-play-state:running !important; }
  .av-pulse    { animation: pulse3d 3s ease-in-out infinite !important; animation-play-state:running !important; }
`

/* One orbiting dot at a given radius */
function OrbitDot({ cls, radius, dotSize, color, top }: {
  cls: string; radius: number; dotSize: number; color: string; top?: boolean
}) {
  return (
    <div className={cls} style={{
      position: 'absolute',
      top: '50%', left: '50%',
      width: radius * 2, height: radius * 2,
      marginTop: -radius, marginLeft: -radius,
      borderRadius: '50%',
    }}>
      <div style={{
        position: 'absolute',
        width: dotSize, height: dotSize,
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 ${dotSize * 2}px ${color}, 0 0 ${dotSize * 4}px ${color}60`,
        top: top ? 0 : undefined,
        bottom: top ? undefined : 0,
        left: '50%',
        transform: 'translateX(-50%)',
      }} />
    </div>
  )
}

export function ProfileAvatar() {
  return (
    <>
      <style>{STYLES}</style>

      {/* ── Outermost wrapper — hard clip boundary ── */}
      <div style={{
        position: 'relative',
        width: 260, height: 310,
        isolation: 'isolate',
        overflow: 'hidden',
        borderRadius: 22,
        flexShrink: 0,
      }}>

        {/* ── Layer 0: Primary spinning conic gradient ── */}
        <div className="av-spin-cw" style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 900, height: 900,
          background: 'conic-gradient(from 0deg, #00d4ff 0%, #003a4d 45%, #00d4ff 100%)',
          zIndex: 0,
        }} />

        {/* ── Layer 1: Secondary counter-spin (wider ring of purple) ── */}
        <div className="av-spin-ccw" style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 700, height: 700,
          background: 'conic-gradient(from 90deg, transparent 0%, transparent 70%, #7c3aed80 85%, transparent 100%)',
          zIndex: 1,
        }} />

        {/* ── Layer 2: Glow pulse ── */}
        <div className="av-pulse" style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 50% 40%, rgba(0,212,255,0.22) 0%, transparent 65%)',
          zIndex: 2,
          pointerEvents: 'none',
        }} />

        {/* ── Layer 3: Photo ── */}
        <div style={{
          position: 'absolute',
          inset: 4,
          borderRadius: 18,
          overflow: 'hidden',
          zIndex: 3,
          boxShadow: '0 0 0 1px rgba(255,255,255,0.08)',
        }}>
          <Image
            src="/avatar-portrait.jpg"
            alt="Ikram Kirmani"
            fill
            className="object-cover object-top"
            priority
            sizes="252px"
          />
          {/* Bottom fade */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 70,
            background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
            pointerEvents: 'none',
          }} />
          {/* Badge */}
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)',
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '4px 12px', borderRadius: 999,
              background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(34,197,94,0.35)', whiteSpace: 'nowrap', zIndex: 4,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }} />
            <span style={{ fontSize: 10, fontFamily: 'monospace', color: '#4ade80', letterSpacing: '0.05em' }}>
              Open to Work
            </span>
          </motion.div>
        </div>

        {/* ── Layer 4: Orbiting dots (inside overflow:hidden so clipped cleanly) ── */}
        {/* Fast cyan dot */}
        <OrbitDot cls="av-orbit-a" radius={128} dotSize={8} color="#00d4ff" top />
        {/* Slow purple dot */}
        <OrbitDot cls="av-orbit-b" radius={145} dotSize={6} color="#7c3aed" top={false} />
        {/* Medium green dot */}
        <OrbitDot cls="av-orbit-c" radius={136} dotSize={5} color="#10b981" top />

      </div>
    </>
  )
}
