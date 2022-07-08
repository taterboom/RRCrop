import { useRecoilState, useRecoilValue } from "recoil"
import { configState, cropperState, imgState, stageState } from "../store"
import { useDrag } from "@use-gesture/react"
import clsx from "classnames"
import { getFixedAndMovablePoint, rectBottom, rectLeft, rectRight, rectTop } from "./utils"
import { useDragBounds, useLocalDragBounds } from "./hooks/useDragBounds"
import { useMemo } from "react"

type CornerProps = {
  children?: React.ReactNode
  type: 0b00 | 0b01 | 0b10 | 0b11
}

const Corner = (props: CornerProps) => {
  const isLeft = (props.type & 0b10) === 0b10
  const isTop = (props.type & 0b01) === 0b01

  const [cropper, setCropper] = useRecoilState(cropperState)
  const config = useRecoilValue(configState)

  const bindTopLeft = useLocalDragBounds(getFixedAndMovablePoint(cropper, 0b11))

  const bindTopRight = useLocalDragBounds(getFixedAndMovablePoint(cropper, 0b01))

  const bindBottomLeft = useLocalDragBounds(getFixedAndMovablePoint(cropper, 0b10))

  const bindBottomRight = useLocalDragBounds(getFixedAndMovablePoint(cropper, 0b00))

  const maxRadius = useMemo(
    () => Math.min(cropper.width / 2, cropper.height / 2),
    [cropper.height, cropper.width]
  )

  const bindTopLeftRadius = useDrag(
    ({ down, offset }) => {
      if (!down) return
      const nextRaidus = (offset[0] + offset[1]) / 2
      setCropper((v) => ({
        ...v,
        radius: nextRaidus,
      }))
    },
    {
      preventDefault: true,
      from: [cropper.radius, cropper.radius],
      bounds: {
        left: 0,
        right: maxRadius,
        top: 0,
        bottom: maxRadius,
      },
    }
  )

  const bindTopRightRadius = useDrag(
    ({ down, offset }) => {
      if (!down) return
      const nextRaidus = (cropper.width - offset[0] + offset[1]) / 2
      setCropper((v) => ({
        ...v,
        radius: nextRaidus,
      }))
    },
    {
      preventDefault: true,
      from: [cropper.width - cropper.radius, cropper.radius],
      bounds: {
        left: maxRadius,
        right: cropper.width,
        top: 0,
        bottom: maxRadius,
      },
    }
  )

  const bindBottomLeftRadius = useDrag(
    ({ down, offset }) => {
      if (!down) return
      const nextRaidus = (offset[0] + (cropper.height - offset[1])) / 2
      setCropper((v) => ({
        ...v,
        radius: nextRaidus,
      }))
    },
    {
      preventDefault: true,
      from: [cropper.radius, cropper.height - cropper.radius],
      bounds: {
        left: 0,
        right: maxRadius,
        top: maxRadius,
        bottom: cropper.height,
      },
    }
  )

  const bindBottomRightRadius = useDrag(
    ({ down, offset }) => {
      if (!down) return
      const nextRaidus = (cropper.width - offset[0] + (cropper.height - offset[1])) / 2
      setCropper((v) => ({
        ...v,
        radius: nextRaidus,
      }))
    },
    {
      preventDefault: true,
      from: [cropper.width - cropper.radius, cropper.height - cropper.radius],
      bounds: {
        left: maxRadius,
        right: cropper.width,
        top: maxRadius,
        bottom: cropper.height,
      },
    }
  )

  return (
    <>
      {/* handle for position */}
      <div
        className="absolute w-2 h-2 border border-black -translate-x-1/2 -translate-y-1/2 touch-none"
        {...(props.type == 0b11 && bindTopLeft())}
        {...(props.type == 0b01 && bindTopRight())}
        {...(props.type == 0b10 && bindBottomLeft())}
        {...(props.type == 0b00 && bindBottomRight())}
        style={{
          left: isLeft ? 0 : "100%",
          top: isTop ? 0 : "100%",
        }}
      ></div>
      {/* handle for radius */}
      <div
        className="absolute w-2 h-2 border border-black rounded-full touch-none"
        {...(props.type === 0b11 && bindTopLeftRadius())}
        {...(props.type === 0b01 && bindTopRightRadius())}
        {...(props.type === 0b10 && bindBottomLeftRadius())}
        {...(props.type === 0b00 && bindBottomRightRadius())}
        style={{
          left: isLeft ? 0 : "100%",
          top: isTop ? 0 : "100%",
          transform: `translate(${
            (isLeft ? cropper.radius : -cropper.radius) - config.borderRadiusHandleRadius
          }px, ${(isTop ? cropper.radius : -cropper.radius) - config.borderRadiusHandleRadius}px)`,
        }}
      ></div>
    </>
  )
}

type CropperProps = {
  children?: React.ReactNode
}

const Cropper = (props: CropperProps) => {
  const [cropper, setCropper] = useRecoilState(cropperState)
  const img = useRecoilValue(imgState)
  const stage = useRecoilValue(stageState)

  const bind = useDrag(
    ({ down, offset }) => {
      if (!down) return
      const nextPosition = offset
      setCropper((v) => ({
        ...v,
        x: nextPosition[0],
        y: nextPosition[1],
      }))
    },
    {
      preventDefault: true,
      from: [cropper.x, cropper.y],
      bounds: {
        left: 0,
        top: 0,
        right: img.width - cropper.width,
        bottom: img.height - cropper.height,
      },
    }
  )

  return (
    <>
      <div className="absolute inset-0 bg-white/30 backdrop-blur-md"></div>
      <div
        className="absolute"
        style={{
          left: cropper.x,
          top: cropper.y,
          width: cropper.width,
          height: cropper.height,
        }}
      >
        {/* cliped rect with rounded corner */}
        <div
          className="absolute inset-0 overflow-hidden touch-none"
          style={{
            borderRadius: cropper.radius,
          }}
        >
          {/* the raw img over the mask */}
          <img
            className="absolute max-w-none bg-white"
            src={img.src}
            alt="the pic to be cropped"
            width={img.width}
            height={img.height}
            style={{
              width: img.width,
              height: img.height,
              left: -cropper.x,
              top: -cropper.y,
            }}
          ></img>
        </div>
        {/* corner border outline */}
        <div
          className={clsx("absolute inset-0 border border-black", {
            hidden: stage.preview,
          })}
          style={{
            borderRadius: cropper.radius,
          }}
        ></div>
        {/* rect outline */}
        <div
          {...bind()}
          className={clsx("absolute inset-0 border border-black transition-all touch-none", {
            hidden: stage.preview,
          })}
        ></div>
        {/* control point */}
        <div
          className={clsx("transition-all", {
            hidden: stage.preview,
          })}
        >
          {[...new Array(4)].map((_, index) => (
            <Corner key={index} type={index as CornerProps["type"]}></Corner>
          ))}
        </div>
      </div>
    </>
  )
}
export default Cropper
