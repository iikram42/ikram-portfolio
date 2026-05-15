'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface Props {
  children: React.ReactNode
  className?: string
  intensity?: number
}

export function TiltCard({ children, className, intensity = 15 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 200, damping: 20 })
  const springY = useSpring(y, { stiffness: 200, damping: 20 })

  const rotateX = useTransform(springY, [-0.5, 0.5], [intensity, -intensity])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-intensity, intensity])
  const translateZ = useTransform(
    [springX, springY],
    ([lx, ly]: number[]) => Math.abs(lx) + Math.abs(ly) > 0.1 ? 20 : 0
  )
  const glareX = useTransform(springX, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(springY, [-0.5, 0.5], ['0%', '100%'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        z: translateZ,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={className}
    >
      {/* Glare overlay — follows cursor like real light */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl z-10 opacity-0 hover:opacity-100 transition-opacity duration-200"
        style={{
          background: useTransform(
            [glareX, glareY],
            ([gx, gy]) =>
              `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.10) 0%, transparent 55%)`
          ),
        }}
      />
      {/* Shadow depth — card lifts on hover */}
      <motion.div
        className="pointer-events-none absolute -inset-1 rounded-xl -z-10"
        style={{
          opacity: useTransform([springX, springY], ([lx, ly]: number[]) => (Math.abs(lx as number) + Math.abs(ly as number)) * 0.8),
          background: 'rgba(0,212,255,0.08)',
          filter: 'blur(12px)',
        }}
      />
      <div style={{ transform: 'translateZ(4px)' }} className="relative w-full h-full">
        {children}
      </div>
    </motion.div>
  )
}
