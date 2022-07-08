import { useCallback } from "react"
import { useEffect, useRef } from "react"

const isBrowser = typeof window !== "undefined" && window.document && window.document.createElement
const supportsTouchEvents = isBrowser && "ontouchstart" in window

export const usePressRepeatly = (handler: () => void) => {
  const timeoutRef = useRef<number>()
  const firstRepeatRef = useRef(false)
  const handlerRef = useRef(handler)
  handlerRef.current = handler

  const delayHandler = useCallback(() => {
    timeoutRef.current = window.setTimeout(
      () => {
        handlerRef.current()
        firstRepeatRef.current = false
        delayHandler()
      },
      firstRepeatRef.current ? 300 : 30
    )
  }, [])

  const onStart = useCallback(() => {
    handlerRef.current()
    firstRepeatRef.current = true
    delayHandler()
  }, [delayHandler])

  const onEnd = useCallback(() => {
    window.clearTimeout(timeoutRef.current)
  }, [])

  useEffect(() => {
    onEnd()
  }, [onEnd])

  return supportsTouchEvents
    ? {
        onTouchStart: onStart,
        onTouchEnd: onEnd,
      }
    : {
        onMouseDown: onStart,
        onMouseUp: onEnd,
      }
}
