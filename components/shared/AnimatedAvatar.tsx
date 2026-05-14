'use client'

import Image from 'next/image'
import { motion, useAnimationControls } from 'framer-motion'
import { useEffect, useRef } from 'react'

export function AnimatedAvatar() {
  const scanControls = useAnimationControls()
  const glitchControls = useAnimationControls()

  // Continuous scan loop
  useEffect(() => {
    const runScan = async () => {
      while (true) {
        await scanControls.start({
          y: ['-100%', '100%'],
          transition: { duration: 2.8, ease: 'linear' },
        })
        await new Promise((r) => setTimeout(r, 1200))
      }
    }
    runScan()
  }, [scanControls])

  // Random glitch burst
  useEffect(() => {
    const runGlitch = async () => {
      while (true) {
        await new Promise((r) => setTimeout(r, 2500 + Math.random() * 3000))
        for (let i = 0; i < 4; i++) {
          await glitchControls.start({
            x: [(Math.random() - 0.5) * 10, 0],
            skewX: [(Math.random() - 0.5) * 4, 0],
            opacity: [0.85, 1],
            transition: { duration: 0.06 },
          })
        }
      }
    }
    runGlitch()
  }, [glitchControls])

  return (
    <div className="relative w-64 h-72 select-none" style={{ perspective: '800px' }}>

      {/* Outer glow ring */}
      <motion.div
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -inset-3 rounded-2xl"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.12) 0%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />

      {/* Main photo frame */}
      <motion.div
        animate={glitchControls}
        className="relative w-full h-full rounded-2xl overflow-hidden border border-cyan-400/30"
        style={{ boxShadow: '0 0 30px rgba(0,212,255,0.1), inset 0 0 30px rgba(0,0,0,0.5)' }}
      >
        {/* Photo — illustrated / duotone style */}
        <Image
          src="/avatar.jpg"
          alt="Ikram Kirmani"
          fill
          className="object-cover object-top"
          priority
          style={{
            filter: 'contrast(1.25) saturate(1.4) brightness(1.05)',
          }}
        />

        {/* Duotone layer — shadows cyan, highlights white */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(160deg, rgba(0,212,255,0.18) 0%, rgba(10,5,30,0.45) 100%)',
            mixBlendMode: 'color',
          }}
        />

        {/* Poster / graphic-art sharpening layer */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(5,10,20,0.75) 100%)',
          }}
        />

        {/* Scan lines texture */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)',
            backgroundSize: '100% 4px',
          }}
        />

        {/* Moving scan beam */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={scanControls}
            className="absolute left-0 right-0 h-8"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(0,212,255,0.18) 40%, rgba(0,212,255,0.35) 50%, rgba(0,212,255,0.18) 60%, transparent 100%)',
              filter: 'blur(2px)',
            }}
          />
        </div>

        {/* Glitch slice 1 */}
        <motion.div
          animate={{ opacity: [0, 0, 1, 0], x: [0, 6, -4, 0] }}
          transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 3.8 }}
          className="absolute inset-0 overflow-hidden rounded-2xl"
          style={{ clipPath: 'polygon(0 30%, 100% 30%, 100% 34%, 0 34%)' }}
        >
          <Image src="/avatar.jpg" alt="" fill className="object-cover object-top" style={{ filter: 'hue-rotate(90deg) saturate(2)' }} />
        </motion.div>

        {/* Glitch slice 2 */}
        <motion.div
          animate={{ opacity: [0, 0, 1, 0], x: [0, -8, 4, 0] }}
          transition={{ duration: 0.12, repeat: Infinity, repeatDelay: 5.2, delay: 0.5 }}
          className="absolute inset-0 overflow-hidden rounded-2xl"
          style={{ clipPath: 'polygon(0 62%, 100% 62%, 100% 65%, 0 65%)' }}
        >
          <Image src="/avatar.jpg" alt="" fill className="object-cover object-top" style={{ filter: 'hue-rotate(200deg) saturate(3)' }} />
        </motion.div>

        {/* HUD corner brackets */}
        {/* Top-left */}
        <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-cyan-400/80 rounded-tl" />
        {/* Top-right */}
        <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-cyan-400/80 rounded-tr" />
        {/* Bottom-left */}
        <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-cyan-400/80 rounded-bl" />
        {/* Bottom-right */}
        <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-cyan-400/80 rounded-br" />

        {/* Status tag top */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/60 border border-cyan-400/40"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-[9px] font-mono text-cyan-400 tracking-widest">ID VERIFIED</span>
          </motion.div>
        </div>

        {/* Bottom data overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/80 to-transparent">
          <div className="font-mono text-[9px] text-cyan-400/80 space-y-0.5">
            <div className="flex justify-between">
              <span>SYS_ID: IK-2025</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ██ ACTIVE
              </motion.span>
            </div>
            <div className="flex justify-between text-white/40">
              <span>ROLE: Cloud Eng Intern</span>
              <span>AUTH: ✓</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Side tick marks */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 flex flex-col gap-1">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.2, 0.8, 0.2], scaleX: [1, 1.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
            className="w-1.5 h-0.5 bg-cyan-400/60 rounded"
          />
        ))}
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 flex flex-col gap-1">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.2, 0.8, 0.2], scaleX: [1, 1.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 + 0.75 }}
            className="w-1.5 h-0.5 bg-purple-400/60 rounded"
          />
        ))}
      </div>

      {/* Orbit dots */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        className="absolute -inset-5 rounded-full pointer-events-none"
      >
        <div
          className="absolute w-2.5 h-2.5 rounded-full bg-cyan-400 top-0 left-1/2 -translate-x-1/2"
          style={{ boxShadow: '0 0 8px #00d4ff, 0 0 16px #00d4ff60' }}
        />
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
        className="absolute -inset-5 rounded-full pointer-events-none"
      >
        <div
          className="absolute w-2 h-2 rounded-full bg-purple-400 bottom-0 right-0"
          style={{ boxShadow: '0 0 6px #7c3aed' }}
        />
      </motion.div>
    </div>
  )
}
