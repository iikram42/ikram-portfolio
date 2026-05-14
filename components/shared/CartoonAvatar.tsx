'use client'

import { useEffect, useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'

export function CartoonAvatar() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scanControls = useAnimationControls()
  const glitchControls = useAnimationControls()

  // Apply cartoon effect to the photo
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      // Scale to fit
      const SIZE = 320
      const scale = Math.min(SIZE / img.naturalWidth, SIZE / img.naturalHeight)
      canvas.width = Math.round(img.naturalWidth * scale)
      canvas.height = Math.round(img.naturalHeight * scale)

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const d = imageData.data
      const w = canvas.width
      const h = canvas.height

      // ── Step 1: Bilateral-like smoothing (box blur) ──
      const blurred = boxBlur(d, w, h, 2)

      // ── Step 2: Posterize blurred data ──
      const levels = 6
      const factor = 255 / (levels - 1)
      for (let i = 0; i < blurred.length; i += 4) {
        blurred[i]     = Math.round(blurred[i] / factor) * factor
        blurred[i + 1] = Math.round(blurred[i + 1] / factor) * factor
        blurred[i + 2] = Math.round(blurred[i + 2] / factor) * factor
      }

      // ── Step 3: Boost saturation on posterized data ──
      for (let i = 0; i < blurred.length; i += 4) {
        const r = blurred[i] / 255
        const g = blurred[i + 1] / 255
        const b = blurred[i + 2] / 255
        const [h2, s, l] = rgbToHsl(r, g, b)
        const [nr, ng, nb] = hslToRgb(h2, Math.min(1, s * 1.7), l)
        blurred[i]     = nr * 255
        blurred[i + 1] = ng * 255
        blurred[i + 2] = nb * 255
      }

      // ── Step 4: Edge detection (Sobel) on grayscale ──
      const edges = sobelEdges(d, w, h)

      // ── Step 5: Composite: blurred+posterized base + dark edges ──
      for (let i = 0; i < d.length; i += 4) {
        const px = i / 4
        const edge = edges[px]
        if (edge > 55) {
          // Dark outline
          const strength = Math.min(1, (edge - 55) / 120)
          blurred[i]     = blurred[i] * (1 - strength)
          blurred[i + 1] = blurred[i + 1] * (1 - strength)
          blurred[i + 2] = blurred[i + 2] * (1 - strength)
        }
        d[i]     = blurred[i]
        d[i + 1] = blurred[i + 1]
        d[i + 2] = blurred[i + 2]
        d[i + 3] = 255
      }

      ctx.putImageData(imageData, 0, 0)
    }
    img.src = '/avatar.jpg'
  }, [])

  // Scan animation
  useEffect(() => {
    const run = async () => {
      while (true) {
        await scanControls.start({ y: ['-100%', '110%'], transition: { duration: 3, ease: 'linear' } })
        await new Promise((r) => setTimeout(r, 1500))
      }
    }
    run()
  }, [scanControls])

  // Glitch burst
  useEffect(() => {
    const run = async () => {
      while (true) {
        await new Promise((r) => setTimeout(r, 3000 + Math.random() * 3000))
        for (let i = 0; i < 3; i++) {
          await glitchControls.start({
            x: [(Math.random() - 0.5) * 8, 0],
            skewX: [(Math.random() - 0.5) * 3, 0],
            transition: { duration: 0.07 },
          })
        }
      }
    }
    run()
  }, [glitchControls])

  return (
    <div className="relative select-none" style={{ width: 260, height: 300 }}>
      {/* Outer glow */}
      <motion.div
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute -inset-4 rounded-2xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.15) 0%, transparent 70%)', filter: 'blur(10px)' }}
      />

      {/* Main frame */}
      <motion.div
        animate={glitchControls}
        className="relative w-full h-full rounded-2xl overflow-hidden border border-cyan-400/40"
        style={{ boxShadow: '0 0 40px rgba(0,212,255,0.12), inset 0 0 20px rgba(0,0,0,0.4)' }}
      >
        {/* Cartoon canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
          style={{ imageRendering: 'crisp-edges', display: 'block' }}
        />

        {/* Scan lines overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-15"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)',
          }}
        />

        {/* Moving scan beam */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={scanControls}
            className="absolute left-0 right-0 h-10"
            style={{
              background: 'linear-gradient(180deg, transparent, rgba(0,212,255,0.25) 50%, transparent)',
              filter: 'blur(3px)',
            }}
          />
        </div>

        {/* HUD corners */}
        <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-cyan-400 rounded-tl" />
        <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-cyan-400 rounded-tr" />
        <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-cyan-400 rounded-bl" />
        <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-cyan-400 rounded-br" />

        {/* Top status */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 border border-cyan-400/50"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[9px] font-mono text-cyan-400 tracking-widest">ID VERIFIED</span>
          </motion.div>
        </div>

        {/* Bottom data */}
        <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/90 to-transparent">
          <div className="font-mono text-[9px] space-y-0.5">
            <div className="flex justify-between text-cyan-400/90">
              <span>SYS_ID: IK-2025</span>
              <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                ■ ACTIVE
              </motion.span>
            </div>
            <div className="flex justify-between text-white/40">
              <span>ROLE: Cloud Eng Intern</span>
              <span>AUTH: ✓</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Side ticks */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={`l${i}`}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
          className="absolute w-2 h-0.5 bg-cyan-400/60 rounded"
          style={{ left: -10, top: `${30 + i * 10}%` }}
        />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={`r${i}`}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 + 0.75 }}
          className="absolute w-2 h-0.5 bg-purple-400/60 rounded"
          style={{ right: -10, top: `${30 + i * 10}%` }}
        />
      ))}

      {/* Orbit dots */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        className="absolute pointer-events-none"
        style={{ inset: -20 }}
      >
        <div
          className="absolute w-3 h-3 rounded-full bg-cyan-400 top-0 left-1/2 -translate-x-1/2"
          style={{ boxShadow: '0 0 8px #00d4ff, 0 0 20px #00d4ff50' }}
        />
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
        className="absolute pointer-events-none"
        style={{ inset: -20 }}
      >
        <div
          className="absolute w-2 h-2 rounded-full bg-purple-400 bottom-0 right-0"
          style={{ boxShadow: '0 0 8px #7c3aed' }}
        />
      </motion.div>
    </div>
  )
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function boxBlur(data: Uint8ClampedArray, w: number, h: number, radius: number): Uint8ClampedArray {
  const out = new Uint8ClampedArray(data.length)
  const size = (radius * 2 + 1) ** 2
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let r = 0, g = 0, b = 0
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const nx = Math.max(0, Math.min(w - 1, x + dx))
          const ny = Math.max(0, Math.min(h - 1, y + dy))
          const idx = (ny * w + nx) * 4
          r += data[idx]; g += data[idx + 1]; b += data[idx + 2]
        }
      }
      const o = (y * w + x) * 4
      out[o] = r / size; out[o + 1] = g / size; out[o + 2] = b / size; out[o + 3] = 255
    }
  }
  return out
}

function sobelEdges(data: Uint8ClampedArray, w: number, h: number): Float32Array {
  const edges = new Float32Array(w * h)
  const gray = new Float32Array(w * h)
  for (let i = 0; i < w * h; i++) {
    const d = i * 4
    gray[i] = data[d] * 0.299 + data[d + 1] * 0.587 + data[d + 2] * 0.114
  }
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const tl = gray[(y-1)*w+(x-1)], tc = gray[(y-1)*w+x], tr = gray[(y-1)*w+(x+1)]
      const ml = gray[y*w+(x-1)],                             mr = gray[y*w+(x+1)]
      const bl = gray[(y+1)*w+(x-1)], bc = gray[(y+1)*w+x], br = gray[(y+1)*w+(x+1)]
      const gx = -tl - 2*ml - bl + tr + 2*mr + br
      const gy = -tl - 2*tc - tr + bl + 2*bc + br
      edges[y * w + x] = Math.sqrt(gx * gx + gy * gy)
    }
  }
  return edges
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return [0, 0, l]
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6
  else if (max === g) h = ((b - r) / d + 2) / 6
  else h = ((r - g) / d + 4) / 6
  return [h, s, l]
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  if (s === 0) return [l, l, l]
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q
  const hue2rgb = (t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1
    if (t < 1/6) return p + (q - p) * 6 * t
    if (t < 1/2) return q
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
    return p
  }
  return [hue2rgb(h + 1/3), hue2rgb(h), hue2rgb(h - 1/3)]
}
