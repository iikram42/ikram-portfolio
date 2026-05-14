'use client'

import { motion } from 'framer-motion'

interface Orb {
  size: number
  x: string
  y: string
  color: string
  duration: number
  delay: number
}

const ORBS: Orb[] = [
  { size: 400, x: '-10%', y: '20%', color: 'rgba(0,212,255,0.04)', duration: 18, delay: 0 },
  { size: 300, x: '70%', y: '60%', color: 'rgba(124,58,237,0.05)', duration: 22, delay: 3 },
  { size: 250, x: '40%', y: '-10%', color: 'rgba(16,185,129,0.03)', duration: 15, delay: 6 },
  { size: 200, x: '85%', y: '10%', color: 'rgba(0,212,255,0.03)', duration: 20, delay: 9 },
]

export function AmbientOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
