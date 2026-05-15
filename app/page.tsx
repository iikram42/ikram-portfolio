import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { CursorGlow } from '@/components/shared/CursorGlow'
import { CommandPalette } from '@/components/shared/CommandPalette'
import { AmbientOrbs } from '@/components/shared/AmbientOrbs'
import { FloatingGrid } from '@/components/shared/FloatingGrid'
import { Floating3D } from '@/components/shared/Floating3D'
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
      <FloatingGrid />
      <Floating3D />
      <main className="relative">
        <AmbientOrbs />
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
