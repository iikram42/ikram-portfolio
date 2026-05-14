import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { CursorGlow } from '@/components/shared/CursorGlow'
import { CommandPalette } from '@/components/shared/CommandPalette'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Experience } from '@/components/sections/Experience'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { Certifications } from '@/components/sections/Certifications'
import { Resume } from '@/components/sections/Resume'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
    </>
  )
}
