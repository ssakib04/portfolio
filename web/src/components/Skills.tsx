import { skillGroups } from '../content'
import { ClusterField } from './Motifs'

export function Skills() {
  return (
    <section id="skills" className="section skills" aria-labelledby="skills-title">
      <p className="watermark watermark-right" aria-hidden="true">
        RAG
      </p>
      <div className="section-motif section-motif-cluster" aria-hidden="true">
        <ClusterField seed={19} />
      </div>
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
