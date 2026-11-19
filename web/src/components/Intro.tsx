import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

type Props = { onDone: () => void }

export function Intro({ onDone }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const onDoneRef = useRef(onDone)

  useGSAP(
    () => {
      const el = root.current
      if (!el) return
      onDoneRef.current = onDone
      let finished = false
      const finish = () => {
        if (finished) return
        finished = true
        onDoneRef.current()
      }

      const timeline = gsap.timeline({ onComplete: finish })
      timeline
        .from('.intro-mark', { opacity: 0, y: 16, duration: 0.7, ease: 'power3.out' })
        .from(
          '.intro-line span',
          { yPercent: 112, duration: 1.05, stagger: 0.08, ease: 'power4.out' },
          '-=0.25',
        )
        .from('.intro-rule', { scaleX: 0, duration: 0.7, ease: 'power2.inOut' }, '-=0.45')
        .from('.intro-role', { opacity: 0, y: 10, duration: 0.55, ease: 'power2.out' }, '-=0.25')
        .to(el, { yPercent: -100, duration: 1.05, ease: 'power4.inOut', delay: 0.38 })

      const skip = () => timeline.progress(1)
      const onKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape' || event.key === 'Enter') skip()
      }
      el.addEventListener('click', skip)
      window.addEventListener('keydown', onKey)
      return () => {
        el.removeEventListener('click', skip)
        window.removeEventListener('keydown', onKey)
      }
    },
    { scope: root },
  )

  return (
    <div className="intro" ref={root} role="region" aria-label="Introduction">
      <button type="button" className="intro-skip">
        Skip
      </button>
      <div className="intro-center">
        <p className="intro-mark">Portfolio</p>
        <p className="intro-name" aria-hidden="true">
          <span className="intro-line">
            <span>Kaji</span>
          </span>
          <span className="intro-line">
            <span className="italic">Sadman</span>
          </span>
          <span className="intro-line">
            <span>Sakib</span>
          </span>
        </p>
        <div className="intro-rule" aria-hidden="true" />
        <p className="intro-role">
          Software Engineer
          <span>BJIT</span>
        </p>
      </div>
    </div>
  )
}
