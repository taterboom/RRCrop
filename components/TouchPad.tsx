import { useDrag } from "@use-gesture/react"
import { useRecoilState, useRecoilValue } from "recoil"
import { configState, cropperState, imgState } from "../store"

type TouchPadProps = {
  children?: React.ReactNode
}

const TouchPad = (props: TouchPadProps) => {
  const [cropper, setCropper] = useRecoilState(cropperState)
  const config = useRecoilValue(configState)
  const img = useRecoilValue(imgState)

  //   const bind = useDrag(
  //     ({ down, offset }) => {
  //       if (!down) return
  //       setCropper((v) => ({
  //         ...v,
  //         width: offset[0] - cropper.x,
  //       }))
  //     },
  //     {
  //       preventDefault: true,
  //       from: [cropper.x + cropper.width, 0],
  //       axis: "x",
  //       bounds: {
  //         left: cropper.x + config.cropperMinWidth,
  //         right: img.width,
  //       },
  //     }
  //   )

  const bind = useDrag(
    ({ down, offset }) => {
      if (!down) return
      setCropper((v) => ({
        ...v,
        x: offset[0],
        width: cropper.x + cropper.width - offset[0],
      }))
    },
    {
      preventDefault: true,
      from: [cropper.x, 0],
      axis: "x",
      bounds: {
        left: 0,
        right: cropper.x + cropper.width - config.cropperMinWidth,
      },
    }
  )

  return <div className="m-4 bg-indigo-900 h-[200px] touch-none" {...bind()}></div>
}

export default TouchPad
