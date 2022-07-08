import { Reducer, useEffect, useReducer } from "react"

export const useLoadImage = (src: string) => {
  const [state, dispatch] = useReducer<
    Reducer<
      {
        data: HTMLImageElement | null
        error: any | null
        loading: boolean
      },
      { type: any; payload?: any }
    >
  >(
    (_, action) => {
      switch (action.type) {
        case "start":
          return { data: null, error: null, loading: true }
        case "load":
          return { data: action.payload, error: null, loading: false }
        case "error":
          return { data: null, error: action.payload, loading: false }
        default:
          throw new Error()
      }
    },
    {
      data: null,
      error: null,
      loading: false,
    }
  )
  useEffect(() => {
    dispatch({ type: "start" })
    const imgEl = new Image()
    const onload = () => {
      dispatch({
        type: "load",
        payload: imgEl,
      })
    }
    const onerror = (err: any) => {
      dispatch({
        type: "error",
        payload: err,
      })
    }
    imgEl.addEventListener("load", onload)
    imgEl.addEventListener("error", onerror)
    imgEl.src = src
    return () => {
      imgEl.removeEventListener("load", onload)
      imgEl.removeEventListener("error", onerror)
    }
  }, [src])
  return state
}
