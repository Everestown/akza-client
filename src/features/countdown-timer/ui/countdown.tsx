import { useEffect, useRef, useState } from 'react'
import { cn } from '@/shared/lib/cn'
import { animateDigit } from '@/shared/lib/gsap'

interface Props { targetIso: string; compact?: boolean }

function pad(n: number) { return String(n).padStart(2, '0') }

function getRemaining(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now())
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000)  / 60000),
    seconds: Math.floor((diff % 60000)    / 1000),
    expired: diff <= 0,
  }
}

export function Countdown({ targetIso, compact = false }: Props) {
  const target = new Date(targetIso)
  const [time, setTime] = useState(() => getRemaining(target))
  const prevRef = useRef(time)

  useEffect(() => {
    const id = setInterval(() => {
      const next = getRemaining(target)
      const prev = prevRef.current

      // Animate digits that changed
      if (next.days    !== prev.days)    animateDigit(document.querySelector('.cd-days'))
      if (next.hours   !== prev.hours)   animateDigit(document.querySelector('.cd-hours'))
      if (next.minutes !== prev.minutes) animateDigit(document.querySelector('.cd-min'))
      animateDigit(document.querySelector('.cd-sec'))

      prevRef.current = next
      setTime(next)
    }, 1000)
    return () => clearInterval(id)
  }, [targetIso])

  if (time.expired) return (
    <span className={cn('section-tag', compact ? 'text-[10px]' : '')}>Опубликовано</span>
  )

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 font-mono text-xs text-fog">
        {time.days > 0 && <span>{time.days}д</span>}
        <span className="cd-hours">{pad(time.hours)}</span>:
        <span className="cd-min">{pad(time.minutes)}</span>:
        <span className="cd-sec">{pad(time.seconds)}</span>
      </div>
    )
  }

  const units = [
    { cls: 'cd-days', val: pad(time.days), label: 'дней' },
    { cls: 'cd-hours', val: pad(time.hours), label: 'часов' },
    { cls: 'cd-min', val: pad(time.minutes), label: 'минут' },
    { cls: 'cd-sec', val: pad(time.seconds), label: 'секунд' },
  ]

  return (
    <div className="flex items-end gap-3 md:gap-5">
      {units.map(({ cls, val, label }) => (
        <div key={cls} className="flex flex-col items-center gap-1">
          <span className={cn('font-display text-3xl md:text-4xl font-light text-mist tabular-nums', cls)}>
            {val}
          </span>
          <span className="section-tag">{label}</span>
        </div>
      ))}
    </div>
  )
}
