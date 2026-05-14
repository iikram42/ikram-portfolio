'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { TERMINAL_LINES } from '@/lib/data'

type LineType = 'cmd' | 'out' | 'success'

interface TerminalLine {
  type: LineType
  text: string
}

interface Props {
  lines?: TerminalLine[]
  className?: string
  speed?: number
}

export function Terminal({ lines = TERMINAL_LINES, className, speed = 60 }: Props) {
  const [displayed, setDisplayed] = useState<TerminalLine[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (currentLine >= lines.length) return
    const line = lines[currentLine]

    if (line.type === 'cmd') {
      if (currentChar < line.text.length) {
        const t = setTimeout(() => {
          setCurrentText((p) => p + line.text[currentChar])
          setCurrentChar((c) => c + 1)
        }, speed)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => {
          setDisplayed((d) => [...d, line])
          setCurrentText('')
          setCurrentChar(0)
          setCurrentLine((l) => l + 1)
        }, 300)
        return () => clearTimeout(t)
      }
    } else {
      const t = setTimeout(() => {
        setDisplayed((d) => [...d, line])
        setCurrentLine((l) => l + 1)
      }, 120)
      return () => clearTimeout(t)
    }
  }, [currentLine, currentChar, lines, speed])

  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' })
  }, [displayed, currentText])

  const lineColor = (type: LineType) =>
    type === 'cmd' ? 'text-cyan-400' : type === 'success' ? 'text-green-400' : 'text-white/50'

  return (
    <div className={cn('glass rounded-xl overflow-hidden', className)}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-auto text-xs font-mono text-white/30">ikram@cloud-ops ~ zsh</span>
      </div>
      <div ref={containerRef} className="p-4 font-mono text-xs leading-relaxed h-52 overflow-y-auto space-y-0.5">
        <AnimatePresence initial={false}>
          {displayed.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              className={lineColor(line.type)}
            >
              {line.text}
            </motion.div>
          ))}
        </AnimatePresence>
        {currentLine < lines.length && lines[currentLine].type === 'cmd' && (
          <div className="text-cyan-400">
            {currentText}
            <span className="inline-block w-1.5 h-3.5 bg-cyan-400 ml-0.5 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  )
}
