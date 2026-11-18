import { useState } from 'react'
import { person } from '../content'
import { Magnetic } from './Magnetic'

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(person.email)
    } catch {
      const field = document.createElement('textarea')
      field.value = person.email
      field.setAttribute('readonly', '')
      field.style.position = 'fixed'
      field.style.left = '-999px'
      document.body.appendChild(field)
      field.select()
      document.execCommand('copy')
      field.remove()
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2200)
  }

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="section-kicker" data-reveal>
        <span>07</span>
        <span>Correspondence</span>
      </div>
      <h2 id="contact-title" className="display" data-reveal>
        Write.
      </h2>
      <p className="contact-lead" data-reveal>
        Software Engineer at {person.company}. For roles, collaborations, and questions about the work.
      </p>
      <div className="email-row" data-reveal>
        <a className="email" href={`mailto:${person.email}`}>
          <span className="sr-only">{person.email}</span>
          <span aria-hidden="true">kazisadmansakib</span>
          <span aria-hidden="true">@gmail.com</span>
        </a>
        <Magnetic>
          <button type="button" className="copy" onClick={copyEmail} aria-describedby="copy-status">
            {copied ? 'Copied' : 'Copy email'}
          </button>
        </Magnetic>
        <p id="copy-status" className="sr-only" aria-live="polite">
          {copied ? 'Email address copied to clipboard.' : ''}
        </p>
      </div>
      <ul className="contact-list" data-reveal>
        <li>
          <span>Phone</span>
          <a href={person.phoneHref}>{person.phoneDisplay}</a>
        </li>
        <li>
          <span>GitHub</span>
          <a href={person.github} target="_blank" rel="noreferrer">
            {person.githubLabel}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
        <li>
          <span>LinkedIn</span>
          <a href={person.linkedin} target="_blank" rel="noreferrer">
            {person.linkedinLabel}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
        <li>
          <span>CV</span>
          <a href={person.cv} download>
            Download CV
          </a>
        </li>
      </ul>
    </section>
  )
}
