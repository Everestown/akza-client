import { useEffect, useRef, useState } from 'react'
export function useIntersection<T extends Element>(options?: IntersectionObserverInit) {
  const ref = useRef<T>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [options])
  return { ref, isIntersecting }
}
