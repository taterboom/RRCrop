import { useCallback, useRef, useState } from "react"
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil"
import { cropperState, imgState, stageState } from "../store"
import { Rect } from "../types/graph"
import Handle from "./Handle"
import { useLoadImage } from "./hooks/useLoadImage"
import {
  AntDesignFullscreenOutlined,
  IconParkDownPicture,
  IconParkOutlineClear,
  IconParkOutlinePreviewOpen,
  IconParkPreviewCloseOne,
} from "./icons"
import Button from "./UI/Button"
import Popup from "./UI/Popup"
import { containSizeInDocment, roundRect } from "./utils"

// TODO Full JSON config
const useExport = () => {
  const img = useRecoilValue(imgState)
  const cropper = useRecoilValue(cropperState)
  const imgLoadResult = useLoadImage(img.src)

  const exportImg = useCallback(() => {
    if (imgLoadResult.data) {
      const compressRatio = img.width / img.naturalWidth
      const naturalSize = (size: number) => size / compressRatio
      const canvasEl = document.createElement("canvas")
      canvasEl.width = naturalSize(cropper.width)
      canvasEl.height = naturalSize(cropper.height)
      const ctx = canvasEl.getContext("2d")
      if (!ctx) {
        alert("Unsupport Canvas")
        return
      }
      const maxRadius = Math.min(cropper.width / 2, cropper.height / 2)
      roundRect(
        ctx,
        0,
        0,
        naturalSize(cropper.width),
        naturalSize(cropper.height),
        naturalSize(Math.min(cropper.radius, maxRadius))
      )
      ctx.clip()
      ctx.drawImage(
        imgLoadResult.data,
        naturalSize(cropper.x),
        naturalSize(cropper.y),
        naturalSize(cropper.width),
        naturalSize(cropper.height),
        0,
        0,
        naturalSize(cropper.width),
        naturalSize(cropper.height)
      )
      const downloadTrigger = document.createElement("a")
      downloadTrigger.href = canvasEl.toDataURL("png")
      downloadTrigger.download = `rrcrop-${Date.now()}.png`
      downloadTrigger.click()

      return {
        href: downloadTrigger.href,
        canvasEl,
      }
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
  const [stage, setStageState] = useRecoilState(stageState)
  const resetImgState = useResetRecoilState(imgState)
  const resetCropperState = useResetRecoilState(cropperState)
  const resetStageState = useResetRecoilState(stageState)
  const full = useFull()
  const exportImg = useExport()
  const [exportImgPopupVisible, setExportImgPopupVisible] = useState(false)
  const currentExportImgResultRef = useRef<ReturnType<typeof exportImg>>()
  const cropperFromAndToRef = useRef<{ from: Rect; to: Rect }>({
    from: { x: 0, y: 0, width: 0, height: 0 },
    to: { x: 0, y: 0, width: 0, height: 0 },
  })
  const onExport = () => {
    currentExportImgResultRef.current = exportImg()!
    const cropperEl = document.getElementById("cropper")!
    const cropperElRect = cropperEl.getBoundingClientRect()
    const from = {
      x: cropperElRect.x,
      y: cropperElRect.y,
      width: cropperElRect.width,
      height: cropperElRect.height,
    }
    const toSize = containSizeInDocment(
      currentExportImgResultRef.current.canvasEl.width,
      currentExportImgResultRef.current.canvasEl.height
    )
    const to = {
      x: (document.documentElement.clientWidth - toSize[0]) / 2,
      y: (document.documentElement.clientHeight - toSize[1]) / 2,
      width: toSize[0],
      height: toSize[1],
    }
    cropperFromAndToRef.current = {
      from,
      to,
    }
    setExportImgPopupVisible(true)
  }

  return (
    <>
      <div className="fixed bottom-4 left-1/2 w-full max-w-[768px] p-4 -translate-x-1/2">
        <div className="flex justify-between p-3 rounded-2xl bg-white/30 backdrop-blur">
          <div className="w-0 flex-1 ">
            <div>
              <Button onClick={() => setStageState((v) => ({ ...v, preview: !v.preview }))}>
                {stage.preview ? <IconParkOutlinePreviewOpen /> : <IconParkPreviewCloseOne />}
              </Button>
            </div>
            <div className=" mt-2">
              <Button onClick={() => full()}>
                <AntDesignFullscreenOutlined />
              </Button>
            </div>
            <div className=" mt-2">
              <Button
                onClick={() => {
                  resetCropperState()
                  resetImgState()
                  resetStageState()
                }}
              >
                <IconParkOutlineClear />
              </Button>
            </div>
          </div>
          <div>
            <Handle></Handle>
          </div>
          <div className="w-0 flex-1">
            <div className=" text-right">
              <Button onClick={() => onExport()}>
                <IconParkDownPicture />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Popup
        show={exportImgPopupVisible}
        place={{
          from: cropperFromAndToRef.current?.from,
          to: cropperFromAndToRef.current?.to,
        }}
        tips="If the download doesn't start, long press the image to save"
        onClose={() => setExportImgPopupVisible(false)}
      >
        <img src={currentExportImgResultRef.current?.href} />
      </Popup>
    </>
  )
}

export default ControlBar
