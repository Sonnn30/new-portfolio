import { useEffect, useRef, useState } from 'react'

export default function useInView(threshold = 0) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)
  const [animate, setAnimate] = useState(true)

    useEffect(() => {
    const element = ref.current
    if (!element) return   // jika ref belum dipasang, jangan lakukan apa-apa

    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
        const fromBottom = entry.boundingClientRect.top > window.innerHeight / 2
        setAnimate(fromBottom)
        setIsInView(true)
        } else {
        setIsInView(false)
        }
    }, { threshold })

    observer.observe(element)
    return () => observer.disconnect()
    }, [])

  return [ref, isInView, animate]
}