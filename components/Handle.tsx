import { useRecoilState, useRecoilValue } from "recoil"
import { configState, cropperState, imgState } from "../store"
import { usePressRepeatly } from "./hooks/usePressRepeatly"
import { MaterialSymbolsArrow } from "./icons"
import Button, { ButtonProps } from "./UI/Button"
import { rectBottom, rectLeft, rectRight, rectTop } from "./utils"
import clsx from "classnames"

const DIR_BORDER_RADIUS = {
  up: "!rounded-t",
  down: "!rounded-b",
  left: "!rounded-l",
  right: "!rounded-r",
}
const HandleButton = (props: ButtonProps & { dir: "up" | "down" | "left" | "right" }) => {
  return (
    <Button
      className={clsx("!m-0 !p-0 !rounded-none !border-none", DIR_BORDER_RADIUS[props.dir])}
      {...props}
    >
      <MaterialSymbolsArrow dir={props.dir}></MaterialSymbolsArrow>
    </Button>
  )
}

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
    <div className="relative w-full h-full border border-midnight-blue select-none">
      {/* four border */}
      <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 flex select-none">
        <HandleButton dir="left" {...leftLeadingHandlers}></HandleButton>
        <HandleButton dir="right" {...leftTrailingHandlers}></HandleButton>
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col">
        <HandleButton dir="up" {...topLeadingHandlers}></HandleButton>
        <HandleButton dir="down" {...topTrailingHandlers}></HandleButton>
      </div>
      <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 flex">
        <HandleButton dir="left" {...rightLeadingHandlers}></HandleButton>
        <HandleButton dir="right" {...rightTrailingHandlers}></HandleButton>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex flex-col">
        <HandleButton dir="up" {...bottomLeadingHandlers}></HandleButton>
        <HandleButton dir="down" {...bottomTrailingHandlers}></HandleButton>
      </div>
    </div>
  )
}

export default Handle
