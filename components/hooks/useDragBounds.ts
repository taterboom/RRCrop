import { useDrag } from "@use-gesture/react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { configState, cropperState, imgState } from "../../store"
import { Point, Rect } from "../../types/graph"
import { rectBottom, rectRight } from "../utils"

/**
 * container
 * +------------------------+
 * |                        |
 * |  ✦ (fixedPoint)----+   |
 * |  |                 |   |
 * |  |                 |   |
 * |  +--(movablePoint) ✦   |
 * |                        |
 * |                        |
 * +------------------------+
 */

type UseBoundsOptions = {
  container: Rect
  fixedPoint: Point
  movablePoint: Point
  onChange: (rect: Rect) => void
  minSize?: {
    width?: number
    height?: number
  }
}

export const useDragBounds = ({
  container,
  fixedPoint,
  movablePoint,
  onChange,
  minSize,
}: UseBoundsOptions) => {
  const minWidth = minSize?.width ?? 0
  const minHeight = minSize?.height ?? 0
  const fixedLeft = movablePoint[0] > fixedPoint[0]
  const fixedTop = movablePoint[1] > fixedPoint[1]
  const bind = useDrag(
    ({ down, offset }) => {
      if (!down) return
      const nextPoint = offset
      const nextCropperSize = [
        Math.abs(fixedPoint[0] - nextPoint[0]),
        Math.abs(fixedPoint[1] - nextPoint[1]),
      ]
      onChange({
        x: fixedLeft ? fixedPoint[0] : nextPoint[0],
        y: fixedTop ? fixedPoint[1] : nextPoint[1],
        width: nextCropperSize[0],
        height: nextCropperSize[1],
      })
    },
    {
      preventDefault: true,
      from: movablePoint,
      bounds: {
        left: fixedLeft ? fixedPoint[0] + minWidth : 0,
        top: fixedTop ? fixedPoint[1] + minHeight : 0,
        right: fixedLeft ? rectRight(container) : fixedPoint[0] - minWidth,
        bottom: fixedTop ? rectBottom(container) : fixedPoint[1] - minHeight,
      },
    }
  )

  return bind
}

export const useLocalDragBounds = (
  options: Omit<UseBoundsOptions, "container" | "minSize" | "onChange">
) => {
  const img = useRecoilValue(imgState)
  const config = useRecoilValue(configState)
  const setCropper = useSetRecoilState(cropperState)

  return useDragBounds({
    container: { x: 0, y: 0, width: img.width, height: img.height },
    minSize: {
      width: config.cropperMinWidth,
      height: config.cropperMinHeight,
    },
    onChange: (rect) => {
      setCropper((v) => ({
        ...v,
        ...rect,
      }))
    },
    ...options,
  })
}
