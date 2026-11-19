import { education } from '../content'

export function Education() {
  return (
    <section id="education" className="section education" aria-labelledby="education-title">
      <p className="watermark watermark-left" aria-hidden="true">
        2019
      </p>
      <div className="section-kicker" data-reveal>
        <span>06</span>
        <span>Study</span>
      </div>
      <h2 id="education-title" data-reveal>
        Education
      </h2>
      <div className="edu-grid">
        <div data-reveal>
          <p className="edu-degree">{education.degree}</p>
          <p className="edu-school">{education.school}</p>
          <p className="edu-dates">{education.dates}</p>
        </div>
        <ul data-reveal>
          {education.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
