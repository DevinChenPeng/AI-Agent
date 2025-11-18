import { useEffect, useRef } from 'react'

export function useMount(fn: () => void | (() => void)): void {
  const calledRef = useRef(false)
  useEffect(() => {
    if (calledRef.current) return
    calledRef.current = true
    const cleanup = fn()
    return cleanup
  }, [fn])
}
