import { useRef, useEffect } from 'react'
import { useCountdown } from '../model/use-countdown'
import { animateDigit } from '@/shared/lib/gsap'

interface Props {
  targetIso: string
  onExpire?: () => void
}

function DigitBlock({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const prev = useRef(value)

  useEffect(() => {
    if (prev.current !== value) {
      animateDigit(ref.current)
      prev.current = value
    }
  }, [value])

  return (
    <div className="flex flex-col items-center gap-1 min-w-[52px]">
      <span ref={ref} className="font-display text-4xl md:text-5xl font-light text-mist tabular-nums leading-none">
        {value}
      </span>
      <span className="section-tag">{label}</span>
    </div>
  )
}

function Colon() {
  return <span className="font-display text-3xl text-smoke self-start mt-1 select-none">:</span>
}

export function Countdown({ targetIso, onExpire }: Props) {
  const { days, hours, minutes, seconds, isDone } = useCountdown(targetIso)
  const fired = useRef(false)

  useEffect(() => {
    if (isDone && !fired.current) {
      fired.current = true
      onExpire?.()
    }
  }, [isDone, onExpire])

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="flex items-center gap-3">
      <DigitBlock value={pad(days)}    label="дней" />
      <Colon />
      <DigitBlock value={pad(hours)}   label="часов" />
      <Colon />
      <DigitBlock value={pad(minutes)} label="минут" />
      <Colon />
      <DigitBlock value={pad(seconds)} label="секунд" />
    </div>
  )
}
