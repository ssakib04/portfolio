import { skillGroups } from '../content'

const items = skillGroups.flatMap((group) => [...group.items])
const line = [...items, ...items]

export function Ribbon() {
  return (
    <div className="ribbon" aria-hidden="true">
      <div className="ribbon-track">
        {line.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  )
}
