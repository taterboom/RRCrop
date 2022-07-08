import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { configState, cropperState, imgState } from "../store"
import { usePressRepeatly } from "./hooks/usePressRepeatly"
import { rectBottom, rectLeft, rectRight, rectTop } from "./utils"

type HandleProps = {
  children?: React.ReactNode
}

const Handle = (props: HandleProps) => {
  const [cropper, setCropper] = useRecoilState(cropperState)
  const config = useRecoilValue(configState)
  const img = useRecoilValue(imgState)

  const leftLeadingHandlers = usePressRepeatly(() =>
    setCropper((v) => {
      const x = Math.max(v.x - 1, 0)
      return {
        ...v,
        x,
        width: rectRight(cropper) - x,
      }
    })
  )
  const leftTrailingHandlers = usePressRepeatly(() =>
    setCropper((v) => {
      const x = Math.min(v.x + 1, rectRight(cropper) - config.cropperMinWidth)
      return {
        ...v,
        x,
        width: rectRight(cropper) - x,
      }
    })
  )
  const topLeadingHandlers = usePressRepeatly(() =>
    setCropper((v) => {
      const y = Math.max(v.y - 1, 0)
      return {
        ...v,
        y,
        height: rectBottom(cropper) - y,
      }
    })
  )
  const topTrailingHandlers = usePressRepeatly(() =>
    setCropper((v) => {
      const y = Math.min(v.y + 1, rectBottom(cropper) - config.cropperMinHeight)
      return {
        ...v,
        y,
        height: rectBottom(cropper) - y,
      }
    })
  )
  const rightLeadingHandlers = usePressRepeatly(() =>
    setCropper((v) => {
      const width = Math.max(v.width - 1, rectLeft(cropper) + config.cropperMinWidth)
      return {
        ...v,
        width,
      }
    })
  )
  const rightTrailingHandlers = usePressRepeatly(() =>
    setCropper((v) => {
      const width = Math.min(v.width + 1, img.width - rectLeft(cropper))
      return {
        ...v,
        width,
      }
    })
  )
  const bottomLeadingHandlers = usePressRepeatly(() =>
    setCropper((v) => {
      const height = Math.max(v.height - 1, rectTop(cropper) + config.cropperMinHeight)
      return {
        ...v,
        height,
      }
    })
  )
  const bottomTrailingHandlers = usePressRepeatly(() =>
    setCropper((v) => {
      const height = Math.min(v.height + 1, img.height - rectTop(cropper))
      return {
        ...v,
        height,
      }
    })
  )
  return (
    <div className="relative w-[300px] h-[100px] mt-4 mx-auto">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 flex">
        <div {...leftLeadingHandlers}>⬅️</div>
        <div {...leftTrailingHandlers}>➡️</div>
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2">
        <div {...topLeadingHandlers}>⬆️</div>
        <div {...topTrailingHandlers}>⬇️</div>
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex">
        <div {...rightLeadingHandlers}>⬅️</div>
        <div {...rightTrailingHandlers}>➡️</div>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <div {...bottomLeadingHandlers}>⬆️</div>
        <div {...bottomTrailingHandlers}>⬇️</div>
      </div>
    </div>
  )
}

export default Handle
