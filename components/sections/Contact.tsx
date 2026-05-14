'use client'

import { useState } from 'react'
import { Mail, Send, CheckCircle2 } from 'lucide-react'
import { GithubIcon, LinkedinIcon, YoutubeIcon } from '@/components/shared/SocialIcons'
import { SectionReveal } from '@/components/shared/SectionReveal'
import { GlassCard } from '@/components/shared/GlassCard'
import { BIO } from '@/lib/data'
import { SOCIAL_LINKS } from '@/lib/constants'

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/xpwzgvqo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('sent')
      } else {
        setStatus('idle')
        alert('Something went wrong. Please email me directly at iikramkirmani@gmail.com')
      }
    } catch {
      setStatus('idle')
      alert('Network error. Please email me directly at iikramkirmani@gmail.com')
    }
  }

  const LINKS = [
    { href: `mailto:${BIO.email}`, Icon: Mail, label: BIO.email, hoverColor: 'group-hover:text-cyan-400 group-hover:border-cyan-400/40' },
    { href: SOCIAL_LINKS.linkedin, Icon: LinkedinIcon, label: 'linkedin.com/in/ikramkirmani', hoverColor: 'group-hover:text-cyan-400 group-hover:border-cyan-400/40' },
    { href: SOCIAL_LINKS.github, Icon: GithubIcon, label: 'github.com/iikram42', hoverColor: 'group-hover:text-cyan-400 group-hover:border-cyan-400/40' },
    { href: SOCIAL_LINKS.youtube, Icon: YoutubeIcon, label: '@IkramKirmani', hoverColor: 'group-hover:text-red-400 group-hover:border-red-400/40' },
  ]

  return (
    <section id="contact" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionReveal>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-cyan-400 font-mono text-sm">07.</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Contact</h2>
        </div>
        <p className="text-white/40 font-mono text-sm mb-16">Let&#39;s build something together.</p>
      </SectionReveal>

      <div className="grid lg:grid-cols-2 gap-12">
        <SectionReveal direction="left">
          <div className="space-y-6">
            <p className="text-white/60 text-lg leading-relaxed">
              Currently a student at <span className="text-cyan-400 font-medium">DIT</span>, studying{' '}
              <span className="text-cyan-400 font-medium">High Performance Computing (HPC)</span>, while
              actively building cloud infrastructure and DevOps projects.
              Open to internships, collaborations, and freelance work.
              Whether you have a project in mind or just want to say hello, my inbox is open.
            </p>
            <div className="space-y-3">
              {LINKS.map(({ href, Icon, label, hoverColor }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/50 hover:text-white transition-all group"
                >
                  <div className={`w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center transition-all ${hoverColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-sm">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </SectionReveal>

        <SectionReveal direction="right" delay={0.1}>
          <GlassCard className="gradient-border">
            {status === 'sent' ? (
              <div className="flex flex-col items-center justify-center py-8 gap-4 text-center">
                <CheckCircle2 className="w-12 h-12 text-green-400" />
                <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                <p className="text-white/50">I&#39;ll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name', value: form.name, onChange: (v: string) => setForm({ ...form, name: v }) },
                  { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com', value: form.email, onChange: (v: string) => setForm({ ...form, email: v }) },
                ].map(({ id, label, type, placeholder, value, onChange }) => (
                  <div key={id}>
                    <label className="text-xs font-mono text-white/40 block mb-1.5">{label}</label>
                    <input
                      type={type}
                      required
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                      placeholder={placeholder}
                      className="w-full glass rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 border border-white/10 focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/20 transition-all"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-xs font-mono text-white/40 block mb-1.5">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="What's on your mind?"
                    className="w-full glass rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 border border-white/10 focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/20 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-400 text-black font-semibold hover:bg-cyan-300 disabled:opacity-60 disabled:cursor-not-allowed transition-all glow-cyan"
                >
                  {status === 'sending' ? (
                    <span className="font-mono text-sm">Sending...</span>
                  ) : (
                    <><Send className="w-4 h-4" />Send Message</>
                  )}
                </button>
              </form>
            )}
          </GlassCard>
        </SectionReveal>
      </div>
    </section>
  )
}
