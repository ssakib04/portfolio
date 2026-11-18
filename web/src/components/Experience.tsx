import { useRef } from 'react'
import { roles } from '../content'
import { gsap, useGSAP } from '../lib/gsap'

export function Experience() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.fromTo(
        '.roles-rail span',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.roles',
            start: 'top 70%',
            end: 'bottom 75%',
            scrub: true,
          },
        },
      )
    },
    { scope: root },
  )

  return (
    <section id="experience" className="section experience" ref={root} aria-labelledby="experience-title">
      <div className="experience-layout">
        <div className="experience-sticky">
          <p className="section-kicker">
            <span>03</span>
            <span>Practice</span>
          </p>
          <h2 id="experience-title">Experience</h2>
          <p className="section-note">
            Software Engineer at BJIT. The path runs through applied AI, product engineering, and
            independent brand sites.
          </p>
        </div>
        <div className="roles">
          <div className="roles-rail" aria-hidden="true">
            <span />
          </div>
          {roles.map((role) => (
            <article className="role" key={role.index} data-reveal>
              <p className="role-index">{role.index}</p>
              <div>
                <p className="role-dates">{role.dates}</p>
                <h3>{role.title}</h3>
                <p className="role-org">{role.org}</p>
                {role.origin ? <p className="role-origin">{role.origin}</p> : null}
              </div>
              <ul>
                {role.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
