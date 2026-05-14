'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Terminal, User, Briefcase, Code2, Star, Award, FileDown, Mail, X } from 'lucide-react'
import { NAV_ITEMS } from '@/lib/constants'

const SECTION_ICONS: Record<string, React.FC<{ className?: string }>> = {
  hero: Terminal,
  about: User,
  experience: Briefcase,
  projects: Code2,
  skills: Star,
  certifications: Award,
  resume: FileDown,
  contact: Mail,
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const filtered = NAV_ITEMS.filter((i) =>
    i.label.toLowerCase().includes(query.toLowerCase())
  )

  const navigate = useCallback((href: string) => {
    setOpen(false)
    setQuery('')
    const id = href.replace('#', '')
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-3 py-2 glass rounded-lg border border-white/10 text-white/40 hover:text-white hover:border-cyan-400/30 transition-all text-xs font-mono"
      >
        <Search className="w-3.5 h-3.5" />
        <span>⌘K</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.15 }}
              className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[90] w-full max-w-lg glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
                <Search className="w-4 h-4 text-white/40 flex-shrink-0" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Navigate to..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
                />
                <button onClick={() => setOpen(false)} className="text-white/30 hover:text-white/60">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="py-2 max-h-64 overflow-y-auto">
                {filtered.map((item) => {
                  const id = item.href.replace('#', '')
                  const Icon = SECTION_ICONS[id] || Terminal
                  return (
                    <button
                      key={item.href}
                      onClick={() => navigate(item.href)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all text-left"
                    >
                      <Icon className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  )
                })}
              </div>
              <div className="px-4 py-2 border-t border-white/5 flex items-center gap-4 text-[11px] text-white/20 font-mono">
                <span>↵ select</span>
                <span>esc close</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
