function rand(seed: number) {
  let value = seed >>> 0
  return () => {
    value = (value + 0x6d2b79f5) >>> 0
    let t = Math.imul(value ^ (value >>> 15), 1 | value)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function GraphField({ seed = 3 }: { seed?: number }) {
  const next = rand(seed)
  const nodes = Array.from({ length: 16 }, () => ({
    x: 28 + next() * 344,
    y: 22 + next() * 230,
    r: 2.2 + next() * 3.4,
  }))
  const edges: Array<[number, number]> = []
  nodes.forEach((node, index) => {
    nodes.forEach((other, otherIndex) => {
      if (otherIndex <= index) return
      const dx = node.x - other.x
      const dy = node.y - other.y
      if (dx * dx + dy * dy < 12000) edges.push([index, otherIndex])
    })
  })

  return (
    <svg className="motif motif-graph" viewBox="0 0 400 280" aria-hidden="true">
      {edges.map(([a, b]) => {
        const from = nodes[a]
        const to = nodes[b]
        if (!from || !to) return null
        return (
          <line
            key={`${a}-${b}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
          />
        )
      })}
      {nodes.map((node, index) => (
        <circle key={index} cx={node.x} cy={node.y} r={node.r} />
      ))}
    </svg>
  )
}

export function ClusterField({ seed = 11 }: { seed?: number }) {
  const next = rand(seed)
  const centers = [
    { x: 90, y: 80 },
    { x: 210, y: 150 },
    { x: 320, y: 70 },
  ]
  const points = centers.flatMap((center, group) =>
    Array.from({ length: 18 }, (_, index) => ({
      cx: center.x + (next() - 0.5) * (70 + group * 16),
      cy: center.y + (next() - 0.5) * (58 + group * 10),
      r: 1.4 + next() * 3.2,
      key: `${group}-${index}`,
    })),
  )

  return (
    <svg className="motif motif-cluster" viewBox="0 0 400 240" aria-hidden="true">
      {points.map((point) => (
        <circle key={point.key} cx={point.cx} cy={point.cy} r={point.r} />
      ))}
    </svg>
  )
}

export function FilamentField() {
  return (
    <svg className="motif motif-filament" viewBox="0 0 400 240" aria-hidden="true">
      <path d="M-10 180 C 70 40, 140 220, 220 90 S 360 20, 420 120" />
      <path d="M-20 80 C 80 160, 150 20, 250 140 S 370 200, 430 60" />
      <path d="M20 210 C 120 120, 180 200, 280 70 S 360 40, 410 150" />
    </svg>
  )
}
