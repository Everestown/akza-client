import { useEffect, useRef, useState } from 'react'

interface Countdown { days: number; hours: number; minutes: number; seconds: number; isDone: boolean }

function timeUntil(iso: string): Omit<Countdown, 'isDone'> {
  const diff = Math.max(0, new Date(iso).getTime() - Date.now())
  const s = Math.floor(diff / 1000)
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  }
}

export function useCountdown(targetIso: string | null): Countdown {
  const [, setTick] = useState(0)
  const ref = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    if (!targetIso) return
    ref.current = setInterval(() => setTick(t => t + 1), 1000)
    return () => clearInterval(ref.current)
  }, [targetIso])

  if (!targetIso) return { days: 0, hours: 0, minutes: 0, seconds: 0, isDone: false }
  const t = timeUntil(targetIso)
  const isDone = t.days === 0 && t.hours === 0 && t.minutes === 0 && t.seconds === 0
  return { ...t, isDone }
}
