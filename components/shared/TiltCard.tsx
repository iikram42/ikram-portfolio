'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface Props {
  children: React.ReactNode
  className?: string
  intensity?: number
}

export function TiltCard({ children, className, intensity = 12 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 300, damping: 30 })
  const springY = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(springY, [-0.5, 0.5], [intensity, -intensity])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-intensity, intensity])
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
        transformStyle: 'preserve-3d',
        perspective: 800,
      }}
      className={className}
    >
      {/* Glare overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl z-10 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useTransform(
            [glareX, glareY],
            ([gx, gy]) =>
              `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.06) 0%, transparent 60%)`
          ),
        }}
      />
      <div style={{ transform: 'translateZ(0px)' }} className="relative w-full h-full">
        {children}
      </div>
    </motion.div>
  )
}
