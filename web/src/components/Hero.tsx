import { useRef } from 'react'
import { person } from '../content'
import { gsap, useGSAP } from '../lib/gsap'

type Props = { shown: boolean }

export function Hero({ shown }: Props) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const lines = gsap.utils.toArray<HTMLElement>('.hero-line')
      lines.forEach((line, index) => {
        gsap.to(line, {
          yPercent: -12 - index * 16,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    },
    { scope: root },
  )

  return (
    <section className={shown ? 'hero is-shown' : 'hero'} id="top" ref={root}>
      <div className="hero-scrim" aria-hidden="true" />
      <p className="hero-spine" aria-hidden="true">
        <span>LLM</span>
        <span>Agents</span>
        <span>RAG</span>
        <span>Clustering</span>
      </p>
      <div className="hero-inner">
        <p className="hero-kicker">
          <span>01</span>
          <span>Software Engineer</span>
          <span>{person.company}</span>
        </p>
        <h1 id="home-title">
          <span className="sr-only">{person.name}</span>
          <span className="hero-line" aria-hidden="true">
            <span>Kaji</span>
          </span>
          <span className="hero-line" aria-hidden="true">
            <span className="italic">Sadman</span>
          </span>
          <span className="hero-line" aria-hidden="true">
            <span>Sakib</span>
          </span>
        </h1>
        <div className="hero-bottom">
          <p className="lede">
            AI/ML engineer for large language models, agents, retrieval-augmented generation, and
            recommendation systems.
          </p>
          <div className="hero-actions">
            <a className="text-link" href="#projects">
              Selected work
            </a>
            <a className="text-link" href="#contact">
              Contact
            </a>
          </div>
        </div>
      </div>
      <a className="scroll-cue" href="#about">
        <span>Scroll</span>
        <i aria-hidden="true" />
      </a>
    </section>
  )
}
