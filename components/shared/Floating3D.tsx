'use client'

import { motion } from 'framer-motion'

interface Shape {
  size: number
  x: string
  y: string
  color: string
  duration: number
  delay: number
  shape: 'cube' | 'sphere' | 'ring'
}

const SHAPES: Shape[] = [
  { size: 60, x: '5%', y: '20%', color: '#00d4ff', duration: 12, delay: 0, shape: 'cube' },
  { size: 40, x: '90%', y: '15%', color: '#7c3aed', duration: 16, delay: 2, shape: 'sphere' },
  { size: 50, x: '80%', y: '60%', color: '#10b981', duration: 14, delay: 4, shape: 'ring' },
  { size: 35, x: '15%', y: '75%', color: '#f59e0b', duration: 18, delay: 6, shape: 'cube' },
  { size: 45, x: '92%', y: '80%', color: '#00d4ff', duration: 10, delay: 1, shape: 'sphere' },
  { size: 30, x: '50%', y: '5%', color: '#7c3aed', duration: 20, delay: 8, shape: 'ring' },
]

function Cube({ size, color }: { size: number; color: string }) {
  return (
    <div style={{ width: size, height: size, transformStyle: 'preserve-3d', perspective: 200 }}>
      <motion.div
        animate={{ rotateX: 360, rotateY: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d' }}
      >
        {/* 6 faces */}
        {[
          { transform: `translateZ(${size / 2}px)` },
          { transform: `translateZ(-${size / 2}px) rotateY(180deg)` },
          { transform: `rotateY(90deg) translateZ(${size / 2}px)` },
          { transform: `rotateY(-90deg) translateZ(${size / 2}px)` },
          { transform: `rotateX(90deg) translateZ(${size / 2}px)` },
          { transform: `rotateX(-90deg) translateZ(${size / 2}px)` },
        ].map((style, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: size,
              height: size,
              border: `1px solid ${color}60`,
              background: `${color}08`,
              backdropFilter: 'blur(2px)',
              ...style,
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

function Sphere({ size, color }: { size: number; color: string }) {
  return (
    <motion.div
      animate={{ rotateY: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: `1px solid ${color}50`,
        background: `radial-gradient(circle at 35% 35%, ${color}25, ${color}08 60%, transparent)`,
        boxShadow: `0 0 ${size / 2}px ${color}20, inset 0 0 ${size / 3}px ${color}15`,
      }}
    />
  )
}

function Ring({ size, color }: { size: number; color: string }) {
  return (
    <motion.div
      animate={{ rotateX: 70, rotateZ: 360 }}
      transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: `2px solid ${color}60`,
        boxShadow: `0 0 10px ${color}30`,
      }}
    />
  )
}

export function Floating3D() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {SHAPES.map((s, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: s.x,
            top: s.y,
            transformStyle: 'preserve-3d',
          }}
        >
          {s.shape === 'cube' && <Cube size={s.size} color={s.color} />}
          {s.shape === 'sphere' && <Sphere size={s.size} color={s.color} />}
          {s.shape === 'ring' && <Ring size={s.size} color={s.color} />}
        </motion.div>
      ))}
    </div>
  )
}
