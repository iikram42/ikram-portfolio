'use client'

import { motion } from 'framer-motion'
import { Award, Clock, CheckCircle2, ExternalLink, FileDown, ChevronRight } from 'lucide-react'
import { SectionReveal } from '@/components/shared/SectionReveal'
import { CERTIFICATIONS } from '@/lib/data'
import type { Certification } from '@/types'

const ISSUER_COLORS: Record<string, string> = {
  Oracle: '#c74634',
  'Amazon Web Services': '#f59e0b',
  'Google / GDSC MGM University': '#10b981',
  'Cloud Native Computing Foundation': '#00d4ff',
  HashiCorp: '#7c3aed',
}

const ISSUER_BG: Record<string, string> = {
  Oracle: 'from-red-900/20 to-orange-900/10',
  'Amazon Web Services': 'from-yellow-900/20 to-orange-900/10',
  'Google / GDSC MGM University': 'from-green-900/20 to-emerald-900/10',
  'Cloud Native Computing Foundation': 'from-cyan-900/20 to-blue-900/10',
  HashiCorp: 'from-purple-900/20 to-violet-900/10',
}

// Oracle badge SVG logo
function OracleLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 20" fill="none">
      <rect width="60" height="20" rx="3" fill="#c74634" />
      <text x="50%" y="14" textAnchor="middle" fill="white" fontSize="9" fontFamily="Arial" fontWeight="bold">ORACLE</text>
    </svg>
  )
}

function EarnedCard({ cert }: { cert: Certification }) {
  const color = ISSUER_COLORS[cert.issuer] || '#00d4ff'
  const bgGrad = ISSUER_BG[cert.issuer] || 'from-cyan-900/20 to-blue-900/10'
  const isOracle = cert.issuer === 'Oracle'

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={`relative glass rounded-2xl overflow-hidden bg-gradient-to-br ${bgGrad} h-full flex flex-col`}
      style={{ border: `1px solid ${color}30` }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />

      <div className="p-5 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            {isOracle ? (
              <OracleLogo className="h-5 w-auto" />
            ) : (
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border"
                style={{ background: `${color}15`, borderColor: `${color}30` }}
              >
                <Award className="w-4 h-4" style={{ color }} />
              </div>
            )}
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs text-green-400 font-mono">Earned</span>
          </div>
        </div>

        {/* Name */}
        <h3 className="font-semibold text-white text-sm leading-snug mb-1">{cert.name}</h3>
        <p className="text-xs text-white/40 mb-3">{cert.issuer}</p>

        {/* Dates */}
        <div className="flex items-center gap-3 mb-3 text-xs font-mono text-white/30">
          {cert.date && <span>Issued {cert.date}</span>}
          {cert.expires && (
            <>
              <span className="text-white/15">·</span>
              <span>Expires {cert.expires}</span>
            </>
          )}
        </div>

        {/* Skills */}
        {cert.skills && cert.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {cert.skills.map((s) => (
              <span
                key={s}
                className="text-[10px] px-2 py-0.5 rounded-full border font-mono"
                style={{ color: `${color}cc`, borderColor: `${color}25`, background: `${color}0a` }}
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t border-white/5">
          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border"
              style={{
                color,
                borderColor: `${color}30`,
                background: `${color}0a`,
              }}
            >
              <ExternalLink className="w-3 h-3" />
              View Credential
            </a>
          )}
          {cert.pdfUrl && (
            <a
              href={cert.pdfUrl}
              download
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border border-white/10 text-white/50 hover:text-white hover:border-white/20"
            >
              <FileDown className="w-3 h-3" />
              PDF
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function InProgressCard({ cert }: { cert: Certification }) {
  const color = ISSUER_COLORS[cert.issuer] || '#00d4ff'

  return (
    <div
      className="relative glass rounded-2xl overflow-hidden h-full flex flex-col"
      style={{ border: `1px solid ${color}30` }}
    >
      {/* Top accent line — same as EarnedCard */}
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />

      <div className="p-5 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border"
            style={{ background: `${color}15`, borderColor: `${color}30` }}
          >
            <Award className="w-5 h-5" style={{ color }} />
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <Clock className="w-3.5 h-3.5 text-orange-400 animate-spin [animation-duration:3s]" />
            <span className="text-xs text-orange-400 font-mono">In Progress</span>
          </div>
        </div>

        {/* Name */}
        <h3 className="font-semibold text-white/90 text-sm leading-snug mb-1">{cert.name}</h3>
        <p className="text-xs text-white/40 mb-3">{cert.issuer}</p>

        {/* Skills */}
        {cert.skills && cert.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {cert.skills.map((s) => (
              <span
                key={s}
                className="text-[10px] px-2 py-0.5 rounded-full border font-mono"
                style={{ color: `${color}cc`, borderColor: `${color}25`, background: `${color}0a` }}
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function Certifications() {
  const earned = CERTIFICATIONS.filter((c) => c.status === 'earned')
  const inProgress = CERTIFICATIONS.filter((c) => c.status === 'in-progress')

  return (
    <section id="certifications" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionReveal>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-cyan-400 font-mono text-sm">05.</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Certifications</h2>
        </div>
        <p className="text-white/40 font-mono text-sm mb-16">Verified credentials & active pursuits.</p>
      </SectionReveal>

      {/* Earned — prominent grid */}
      <div className="mb-10">
        <SectionReveal>
          <div className="flex items-center gap-2 mb-5">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span className="text-sm font-mono text-green-400">Earned</span>
            <span className="text-xs text-white/20 font-mono ml-1">({earned.length})</span>
          </div>
        </SectionReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          {earned.map((cert, i) => (
            <SectionReveal key={cert.name} delay={i * 0.1} className="h-full">
              <EarnedCard cert={cert} />
            </SectionReveal>
          ))}
        </div>
      </div>

      {/* In Progress */}
      <div>
        <SectionReveal>
          <div className="flex items-center gap-2 mb-5">
            <Clock className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-mono text-orange-400">In Progress</span>
            <span className="text-xs text-white/20 font-mono ml-1">({inProgress.length})</span>
          </div>
        </SectionReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          {inProgress.map((cert, i) => (
            <SectionReveal key={cert.name} delay={i * 0.08} className="h-full">
              <InProgressCard cert={cert} />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
