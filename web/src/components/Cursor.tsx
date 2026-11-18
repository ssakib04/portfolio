import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    const dotEl = dot.current
    const ringEl = ring.current
    if (!dotEl || !ringEl) return

    gsap.set([dotEl, ringEl], { xPercent: -50, yPercent: -50, x: -200, y: -200 })
    const dotX = gsap.quickTo(dotEl, 'x', { duration: 0.16, ease: 'power3.out' })
    const dotY = gsap.quickTo(dotEl, 'y', { duration: 0.16, ease: 'power3.out' })
    const ringX = gsap.quickTo(ringEl, 'x', { duration: 0.5, ease: 'power3.out' })
    const ringY = gsap.quickTo(ringEl, 'y', { duration: 0.5, ease: 'power3.out' })

    const move = (event: PointerEvent) => {
      document.documentElement.classList.add('has-cursor')
      dotX(event.clientX)
      dotY(event.clientY)
      ringX(event.clientX)
      ringY(event.clientY)
    }
    const over = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      ringEl.classList.toggle('is-hot', Boolean(target.closest('a, button')))
    }

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
    }
  }, [])

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
