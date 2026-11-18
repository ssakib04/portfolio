import { useEffect, useState } from 'react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Cursor } from './components/Cursor'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Intro } from './components/Intro'
import { Nav } from './components/Nav'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { gsap, ScrollTrigger, useGSAP } from './lib/gsap'

export default function App() {
  const reduced = usePrefersReducedMotion()
  const [ready, setReady] = useState(reduced)
  useSmoothScroll(ready || reduced)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
      gsap.from(el, {
        y: 28,
        autoAlpha: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      })
    })
  })

  useEffect(() => {
    const bar = document.getElementById('scroll-progress-bar')
    if (!bar) return
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight
      const progress = height > 0 ? window.scrollY / height : 0
      bar.style.transform = `scaleX(${progress})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ready])

  useEffect(() => {
    if (!ready) return
    const id = window.requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => window.cancelAnimationFrame(id)
  }, [ready])

  return (
    <>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <div className="grain" aria-hidden="true" />
      <Cursor />
      {!ready ? <Intro onDone={() => setReady(true)} /> : null}
      <div inert={!ready ? true : undefined}>
        <Nav />
        <main id="content">
          <Hero shown={ready} />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
