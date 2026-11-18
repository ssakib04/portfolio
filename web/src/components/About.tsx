import { person, summary } from '../content'

export function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="section-kicker" data-reveal>
        <span>02</span>
        <span>About</span>
      </div>
      <h2 id="about-title" className="display" data-reveal>
        {summary.quote}
      </h2>
      <div className="about-grid">
        <div className="about-copy" data-reveal>
          <p>{summary.lead}</p>
          <p>{summary.support}</p>
        </div>
        <aside className="now-card" data-reveal>
          <p className="now-label">Now</p>
          <p className="now-role">{person.role}</p>
          <p className="now-org">{person.company}</p>
          <p className="now-dates">Jul 2026 – Present</p>
          <p className="now-origin">Began as AI Trainee</p>
          <div className="now-also">
            <p className="now-label">Also</p>
            <p>Freelance Web &amp; Brand Developer</p>
            <p className="now-dates">2025 – Present</p>
          </div>
          <div className="now-focus">
            <p className="now-label">Focus</p>
            <ul>
              <li>Large language models &amp; AI agents</li>
              <li>Retrieval-augmented generation</li>
              <li>Recommendation systems</li>
              <li>Clustering</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  )
}
