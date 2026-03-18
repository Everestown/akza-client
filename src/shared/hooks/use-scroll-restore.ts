import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const scrollPositions = new Map<string, number>()

/**
 * Saves and restores scroll position per route.
 * Saves current position before navigation, restores on back-navigation.
 */
export function useScrollRestore() {
  const { key, pathname } = useLocation()
  const savedKey = useRef<string>(key)

  // Save position before leaving
  useEffect(() => {
    const prevKey = savedKey.current
    savedKey.current = key

    return () => {
      scrollPositions.set(prevKey, window.scrollY)
    }
  }, [key])

  // Restore or scroll to top
  useEffect(() => {
    const saved = scrollPositions.get(key)
    if (saved !== undefined) {
      // Small delay to let page render before restoring
      requestAnimationFrame(() => {
        window.scrollTo({ top: saved, behavior: 'instant' })
      })
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [key, pathname])
}
