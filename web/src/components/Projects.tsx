import { useRef } from 'react'
import { projects } from '../content'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { getLenis } from '../lib/scroll'
import { ClusterField, FilamentField, GraphField } from './Motifs'

function ProjectArt({ index }: { index: string }) {
  if (index === '02') return <ClusterField seed={21} />
  if (index === '03') return <GraphField seed={4} />
  return <FilamentField />
}

export function Projects() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 960px) and (prefers-reduced-motion: no-preference)', () => {
        const track = root.current?.querySelector<HTMLElement>('.projects-track')
        const pin = root.current?.querySelector<HTMLElement>('.projects-pin')
        if (!track || !pin) return
        gsap.to(track, {
          x: () => -(track.scrollWidth - pin.clientWidth),
          ease: 'none',
          scrollTrigger: {
            id: 'projects-pin',
            trigger: pin,
            start: 'top top',
            end: () => `+=${Math.max(track.scrollWidth - pin.clientWidth, 1)}`,
            pin: true,
            scrub: 0.65,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  const step = (direction: number) => {
    const trigger = ScrollTrigger.getById('projects-pin')
    if (!trigger) {
      const articles = [...(root.current?.querySelectorAll('article') ?? [])]
      const current = articles.findIndex((article) => {
        const rect = article.getBoundingClientRect()
        return rect.top >= -20 && rect.top < window.innerHeight * 0.6
      })
      const next = articles[Math.min(articles.length - 1, Math.max(0, current + direction))]
      next?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    const count = Math.max(projects.length - 1, 1)
    const next = Math.min(1, Math.max(0, trigger.progress + direction / count))
    const y = trigger.start + (trigger.end - trigger.start) * next
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(y)
    else window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <section id="projects" className="projects" ref={root} aria-labelledby="projects-title">
      <div className="projects-pin">
        <header className="projects-bar">
          <div>
            <p className="section-kicker">
              <span>04</span>
              <span>Selected work</span>
            </p>
            <h2 id="projects-title">Projects</h2>
          </div>
          <div className="project-controls">
            <button type="button" onClick={() => step(-1)} aria-label="Previous project">
              Prev
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Next project">
              Next
            </button>
          </div>
        </header>
        <div className="projects-viewport">
          <div className="projects-track">
            {projects.map((project) => (
              <article className="project-panel" key={project.index} id={`project-${project.index}`}>
                <div className="project-art" aria-hidden="true">
                  <ProjectArt index={project.index} />
                </div>
                <div className="project-copy">
                <p className="project-index" aria-hidden="true">
                  {project.index}
                  <span> / 04</span>
                </p>
                <h3>
                  <span className="project-name">{project.name}</span>
                  <span className="project-title">{project.title}</span>
                </h3>
                <p className="project-meta">
                  <span>{project.year}</span>
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </p>
                <ul>
                  {project.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                {project.links.length > 0 ? (
                  <div className="project-links">
                    {project.links.map((link) => (
                      <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                        {link.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ))}
                  </div>
                ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
