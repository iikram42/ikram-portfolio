'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = NAV_ITEMS.map(i => i.href.replace('#', ''))
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }),
      { rootMargin: '-10% 0px -60% 0px' }
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
  }

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Certifications', href: '#certifications' },
  ]

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(5,5,5,0.82)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">

        {/* Left: Logo */}
        <button
          onClick={() => scrollTo('#hero')}
          className="font-semibold text-sm tracking-tight text-white/90 hover:text-white transition-colors"
          style={{ letterSpacing: '-0.01em' }}
        >
          <span className="text-white">Ikram</span>
          <span style={{ color: '#00D6FF' }}> Kirmani</span>
        </button>

        {/* Center: Nav links — desktop */}
        <nav className="hidden md:flex items-center gap-0">
          {navLinks.map(item => {
            const isActive = activeSection === item.href.replace('#', '')
            return (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className={cn(
                  'relative px-3.5 py-1 text-[13px] font-medium transition-all duration-200',
                  isActive ? 'text-white' : 'text-white/50 hover:text-white/80'
                )}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: '#00D6FF' }}
                    transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
                  />
                )}
              </button>
            )
          })}
        </nav>

        {/* Right: CTA button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => scrollTo('#contact')}
            className="relative text-[13px] font-medium text-white px-4 py-1.5 rounded-full transition-all duration-200 overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #0050FF, #00D6FF)',
              boxShadow: '0 0 20px rgba(0,80,255,0.25)',
            }}
          >
            <motion.span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, #0060ff, #00e6ff)' }}
            />
            <span className="relative z-10">Hire Me</span>
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white/60 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ background: 'rgba(5,5,5,0.95)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map(item => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="text-left px-3 py-2.5 text-sm text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-all"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo('#contact')}
                className="mt-2 text-sm font-medium text-white py-2.5 rounded-full text-center"
                style={{ background: 'linear-gradient(135deg, #0050FF, #00D6FF)' }}
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
