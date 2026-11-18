import { useEffect, useState } from 'react'

const format = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Dhaka',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

export function useDhakaTime() {
  const [time, setTime] = useState(() => format.format(new Date()))

  useEffect(() => {
    const tick = () => setTime(format.format(new Date()))
    tick()
    const id = window.setInterval(tick, 1000 * 15)
    return () => window.clearInterval(id)
  }, [])

  return time
}
