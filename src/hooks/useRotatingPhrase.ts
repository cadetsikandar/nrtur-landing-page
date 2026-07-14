import { useEffect, useState } from 'react'

export function useRotatingPhrase(phrases: string[], intervalMs = 2800) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (phrases.length <= 1) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % phrases.length)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [phrases.length, intervalMs])

  return { phrase: phrases[index], index }
}
