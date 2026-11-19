import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { getLenis, setLenis } from '../lib/scroll'

export function useSmoothScroll(active: boolean) {
  const activeRef = useRef(active)

  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.08,
      smoothWheel: true,
      syncTouch: false,
      anchors: true,
      stopInertiaOnNavigate: true,
    })

    setLenis(lenis)
    lenis.on('scroll', ScrollTrigger.update)
    if (!activeRef.current) lenis.stop()

    const update = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh).catch(() => {})
    window.addEventListener('load', refresh)

    return () => {
      window.removeEventListener('load', refresh)
      gsap.ticker.remove(update)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  useEffect(() => {
    const lenis = getLenis()
    if (!lenis) return
    if (active) lenis.start()
    else lenis.stop()
  }, [active])
}
