import { useCallback, useEffect } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { cropperState, imgState, stageState } from "../store"
import { useLoadImage } from "./hooks/useLoadImage"
import { roundRect } from "./utils"

const useExport = () => {
  const img = useRecoilValue(imgState)
  const cropper = useRecoilValue(cropperState)
  const imgLoadResult = useLoadImage(img.src)

  const exportImg = useCallback(() => {
    if (imgLoadResult.data) {
      const canvasEl = document.createElement("canvas")
      document.body.appendChild(canvasEl)
      canvasEl.width = cropper.width
      canvasEl.height = cropper.height
      const ctx = canvasEl.getContext("2d")
      if (!ctx) {
        alert("Unsupport Canvas")
        return
      }
      roundRect(ctx, 0, 0, cropper.width, cropper.height, cropper.radius)
      ctx.clip()
      const compressRatio = img.width / img.naturalWidth
      ctx.drawImage(
        imgLoadResult.data,
        cropper.x / compressRatio,
        cropper.y / compressRatio,
        cropper.width / compressRatio,
        cropper.height / compressRatio,
        0,
        0,
        cropper.width,
        cropper.height
      )
    }
  }, [
    cropper.height,
    cropper.radius,
    cropper.width,
    cropper.x,
    cropper.y,
    img.naturalWidth,
    img.width,
    imgLoadResult.data,
  ])

  return exportImg
}

type ControlBarProps = {
  children?: React.ReactNode
}

const ControlBar = (props: ControlBarProps) => {
  const exportImg = useExport()
  const setStageState = useSetRecoilState(stageState)
  return (
    <div className="flex items-center p-3 rounded-2xl bg-gray-100">
      <div className=" p-2 rounded-lg bg-white">W</div>
      <div className=" ml-2 p-2 rounded-lg bg-white">H</div>
      <div className=" ml-2 p-2 rounded-lg bg-white">L</div>
      <div className=" ml-2 p-2 rounded-lg bg-white">T</div>
      <div className=" ml-2 p-2 rounded-lg bg-white">R</div>
      <div className=" flex-1"></div>
      <div
        className=" ml-2 p-2 rounded-lg bg-white justify-items-end"
        onClick={() => setStageState((v) => ({ ...v, preview: !v.preview }))}
      >
        P
      </div>
      <div className=" ml-2 p-2 rounded-lg bg-white justify-items-end" onClick={() => exportImg()}>
        E
      </div>
    </div>
  )
}

export default ControlBar
