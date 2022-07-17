import { useEffect, useRef } from "react"

const WithEl = <T extends HTMLElement>({ el }: { el?: T }) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const container = ref.current
    if (el && container) {
      el.style.width = "100%"
      container.appendChild(el)
      return () => {
        container.removeChild(el)
      }
    }
  }, [el])
  return <div ref={ref} className="w-full h-full"></div>
}

export default WithEl
