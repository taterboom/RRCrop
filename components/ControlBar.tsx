import { useCallback, useEffect } from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { configState, cropperState, imgState, stageState } from "../store"
import Handle from "./Handle"
import { useLoadImage } from "./hooks/useLoadImage"
import {
  AntDesignFullscreenOutlined,
  IconParkOutlinePreviewOpen,
  IconParkPreviewCloseOne,
  UilExport,
} from "./icons"
import Button from "./UI/Button"
import { roundRect } from "./utils"

// TODO Full JSON config
const useExport = () => {
  const img = useRecoilValue(imgState)
  const cropper = useRecoilValue(cropperState)
  const imgLoadResult = useLoadImage(img.src)

  const exportImg = useCallback(() => {
    if (imgLoadResult.data) {
      const canvasEl = document.createElement("canvas")
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
      const downloadTrigger = document.createElement("a")
      downloadTrigger.href = canvasEl.toDataURL("png")
      downloadTrigger.download = "rrcrop.png"
      downloadTrigger.click()
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

const useFull = () => {
  const setCropper = useSetRecoilState(cropperState)
  const img = useRecoilValue(imgState)

  return () => {
    setCropper((v) => ({
      ...v,
      x: 0,
      y: 0,
      width: img.width,
      height: img.height,
      radius: 0,
    }))
  }
}

type ControlBarProps = {
  children?: React.ReactNode
}

const ControlBar = (props: ControlBarProps) => {
  const exportImg = useExport()
  const [stage, setStageState] = useRecoilState(stageState)
  const full = useFull()
  return (
    <div className="fixed bottom-4 left-1/2 w-full max-w-[768px] p-2 -translate-x-1/2">
      <div className="flex justify-between p-3 rounded-2xl bg-white/30 backdrop-blur">
        <div className="w-0 flex-1 ">
          <div>
            <Button onClick={() => full()}>
              <AntDesignFullscreenOutlined />
            </Button>
          </div>
        </div>
        <div>
          <Handle></Handle>
        </div>
        <div className="w-0 flex-1">
          <div className=" text-right">
            <Button onClick={() => setStageState((v) => ({ ...v, preview: !v.preview }))}>
              {stage.preview ? <IconParkOutlinePreviewOpen /> : <IconParkPreviewCloseOne />}
            </Button>
          </div>
          <div className=" text-right mt-2">
            <Button onClick={() => exportImg()}>
              <UilExport />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ControlBar
