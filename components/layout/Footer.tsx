import { Terminal } from 'lucide-react'
import { GithubIcon, LinkedinIcon, YoutubeIcon } from '@/components/shared/SocialIcons'
import { SOCIAL_LINKS } from '@/lib/constants'
import { BIO } from '@/lib/data'

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 mt-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center">
            <Terminal className="w-3 h-3 text-black" />
          </div>
          <span className="font-mono text-sm text-white/40">
            {BIO.alias} · {BIO.title}
          </span>
        </div>
        <div className="flex items-center gap-4">
          {[
            { href: SOCIAL_LINKS.github, Icon: GithubIcon },
            { href: SOCIAL_LINKS.linkedin, Icon: LinkedinIcon },
            { href: SOCIAL_LINKS.youtube, Icon: YoutubeIcon },
          ].map(({ href, Icon }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer"
              className="text-white/30 hover:text-cyan-400 transition-colors">
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
        <span className="font-mono text-xs text-white/20">
          © {new Date().getFullYear()} · Built with Next.js + Three.js
        </span>
      </div>
    </footer>
  )
}
