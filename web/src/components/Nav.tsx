import { useEffect, useRef, useState } from 'react'
import { nav, person } from '../content'
import { useDhakaTime } from '../hooks/useClock'
import { getLenis, setScrollLocked } from '../lib/scroll'
import { Magnetic } from './Magnetic'

const ids = nav.map((item) => item.id)

export function Nav() {
  const time = useDhakaTime()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const mark = () => {
      const line = window.innerHeight * 0.42
      let current = ''
      for (const id of ids) {
        const section = document.getElementById(id)
        if (!section) continue
        const rect = section.getBoundingClientRect()
        if (rect.top <= line && rect.bottom > line) current = id
      }
      setActive(current)
    }
    mark()
    window.addEventListener('scroll', mark, { passive: true })
    window.addEventListener('resize', mark)
    return () => {
      window.removeEventListener('scroll', mark)
      window.removeEventListener('resize', mark)
    }
  }, [])

  useEffect(() => {
    setScrollLocked(open)
    return () => setScrollLocked(false)
  }, [open])

  useEffect(() => {
    if (!open) return
    const root = dialogRef.current
    if (!root) return
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const focusable = () =>
      [...root.querySelectorAll<HTMLElement>('a, button')].filter((el) => !el.hasAttribute('disabled'))
    focusable()[0]?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        return
      }
      if (event.key !== 'Tab') return
      const items = focusable()
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      previous?.focus()
    }
  }, [open])

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <span id="scroll-progress-bar" />
      </div>
      <header className={scrolled ? 'nav is-scrolled' : 'nav'}>
        <a className="nav-mark" href="#top">
          <span className="sr-only">Back to top, </span>
          Kaji Sadman Sakib
        </a>
        <nav className="nav-links" aria-label="Primary">
          {nav.map((item) => (
            <a key={item.id} href={item.href} aria-current={active === item.id ? 'true' : undefined}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="nav-end">
          <p className="nav-time">
            <span className="sr-only">Time in Dhaka, </span>
            Dhaka {time}
          </p>
          <Magnetic>
            <a className="nav-write" href="#contact">
              Write
            </a>
          </Magnetic>
          <button
            type="button"
            className="nav-index"
            aria-expanded={open}
            aria-controls="site-index"
            onClick={() => setOpen(true)}
          >
            Index
          </button>
        </div>
      </header>
      <div
        id="site-index"
        ref={dialogRef}
        className={open ? 'index is-open' : 'index'}
        role="dialog"
        aria-modal="true"
        aria-label="Site index"
        inert={open ? undefined : true}
        aria-hidden={open ? undefined : true}
      >
        <div className="index-top">
          <p>Index</p>
          <button type="button" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
        <nav aria-label="Sections">
          {nav.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(event) => {
                event.preventDefault()
                setOpen(false)
                const target = document.getElementById(item.id)
                window.setTimeout(() => {
                  const lenis = getLenis()
                  if (lenis && target) {
                    lenis.start()
                    lenis.scrollTo(target, { offset: -8 })
                  } else {
                    target?.scrollIntoView()
                  }
                }, 40)
              }}
            >
              <span>{item.index}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <p className="index-mail">
          <a href={`mailto:${person.email}`}>{person.email}</a>
        </p>
      </div>
    </>
  )
}
