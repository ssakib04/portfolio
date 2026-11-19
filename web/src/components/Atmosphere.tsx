import { useEffect, useRef } from 'react'
import type { SilkHandle } from '../lib/silk'

export function Atmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let handle: SilkHandle | null = null
    let dead = false

    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight
      const progress = height > 0 ? window.scrollY / height : 0
      handle?.setScroll(progress)
    }

    import('../lib/silk').then(({ mountSilk }) => {
      if (dead || !canvasRef.current) return
      handle = mountSilk(canvasRef.current, { animate: !reduce })
      onScroll()
    })

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      dead = true
      window.removeEventListener('scroll', onScroll)
      handle?.destroy()
    }
  }, [])

  return (
    <div className="atmosphere" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}
