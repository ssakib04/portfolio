import { useEffect, useRef } from 'react'

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return
    const el = dot.current
    if (!el) return
    document.documentElement.classList.add('has-cursor')
    el.style.transform = 'translate3d(-40px, -40px, 0) translate(-50%, -50%)'

    const move = (event: PointerEvent) => {
      el.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`
      const target = event.target
      const hot = target instanceof Element && Boolean(target.closest('a, button'))
      el.classList.toggle('is-hot', hot)
    }

    window.addEventListener('pointermove', move, { passive: true })
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
    }
  }, [])

  return <div ref={dot} className="cursor-dot" aria-hidden="true" />
}
