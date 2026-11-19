import type Lenis from 'lenis'

let current: Lenis | null = null

export function setLenis(instance: Lenis | null) {
  current = instance
}

export function getLenis() {
  return current
}

export function setScrollLocked(locked: boolean) {
  document.documentElement.classList.toggle('scroll-lock', locked)
  if (!current) return
  if (locked) current.stop()
  else current.start()
}
