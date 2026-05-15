'use client'

import { motion } from 'framer-motion'

export function FloatingGrid() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-30">
      {/* 3D perspective grid floor */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '60vh',
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.07) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: 'perspective(400px) rotateX(70deg)',
          transformOrigin: 'bottom center',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
        }}
      />
      {/* Scanning line across grid */}
      <motion.div
        animate={{ y: ['100vh', '-20vh'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent)',
          filter: 'blur(1px)',
        }}
      />
    </div>
  )
}
