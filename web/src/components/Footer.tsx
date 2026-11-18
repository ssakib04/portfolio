import { person } from '../content'
import { useDhakaTime } from '../hooks/useClock'

const year = new Date().getFullYear()

export function Footer() {
  const time = useDhakaTime()

  return (
    <footer className="footer">
      <p>{person.name}</p>
      <p>
        {person.role}, {person.company}
      </p>
      <p>
        <span className="sr-only">Time in Dhaka, </span>
        {person.location} {time}
      </p>
      <p>© {year}</p>
    </footer>
  )
}
