import { skillGroups } from '../content'

export function Skills() {
  return (
    <section id="skills" className="section skills" aria-labelledby="skills-title">
      <div className="section-kicker" data-reveal>
        <span>05</span>
        <span>Capabilities</span>
      </div>
      <h2 id="skills-title" data-reveal>
        Skills
      </h2>
      <div className="skill-groups">
        {skillGroups.map((group) => (
          <div className="skill-group" key={group.title} data-reveal>
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item, index) => (
                <li key={item}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
