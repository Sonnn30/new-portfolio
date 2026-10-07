import { useLayoutEffect } from 'react'                      // ganti useEffect

export default function useTyping(ref, speed = 20, active = true, onDone) {   // tambah active
  useLayoutEffect(() => {                                     // ganti useEffect
    const root = ref.current
    if (!active || !root) return                              // baris baru
    root.style.minHeight = root.offsetHeight + 'px'

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
    const items = []
    while (walker.nextNode()) {
      const n = walker.currentNode
      if (n.nodeValue.trim() && !n.parentElement.closest('.group')) items.push([n, n.nodeValue])
    }
    items.forEach(([n]) => (n.nodeValue = ''))

    let i = 0, c = 0
    const timer = setInterval(() => {
        if (i >= items.length) {                      // ganti baris return clearInterval
            clearInterval(timer)
            onDone?.()                                  // baris baru
            return
        }
      const [n, t] = items[i]
      c++
      n.nodeValue = c >= t.length ? t : t.slice(0, c) + '|'
      if (c >= t.length) { i++; c = 0 }
    }, speed)

    return () => {
      clearInterval(timer)
      items.forEach(([n, t]) => (n.nodeValue = t))
    }
  }, [active])                                                // dependency active
}