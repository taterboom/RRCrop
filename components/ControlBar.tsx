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
import { containSizeInDocment, getOrientation, roundRect } from "./utils"
import clsx from 'classnames'

// TODO Full JSON config
const useExport = () => {
  const img = useRecoilValue(imgState)
  const cropper = useRecoilValue(cropperState)
  const imgLoadResult = useLoadImage(img.src)

  const exportImg = useCallback(async () => {
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

      const href = await new Promise<string>((res, rej) => {
        canvasEl.toBlob((blob) => {
          if (!blob) {
            rej()
          } else {
            const downloadTrigger = document.createElement("a")
            const url = URL.createObjectURL(blob)
            downloadTrigger.href = url
            downloadTrigger.download = `rrcrop-${Date.now()}.png`
            setTimeout(() => {
              downloadTrigger.click()
            }, 500)
            res(url)
          }
        }, "image/png")
      })

      return {
        href,
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

type PromiseValue<T> = T extends Promise<infer K> ? K : never

const ControlBar = (props: ControlBarProps) => {
  const [stage, setStageState] = useRecoilState(stageState)
  const resetImgState = useResetRecoilState(imgState)
  const resetCropperState = useResetRecoilState(cropperState)
  const resetStageState = useResetRecoilState(stageState)
  const full = useFull()
  const exportImg = useExport()
  const [exportImgPopupVisible, setExportImgPopupVisible] = useState(false)
  const currentExportImgResultRef = useRef<PromiseValue<ReturnType<typeof exportImg>>>()
  const cropperFromAndToRef = useRef<{ from: Rect; to: Rect }>({
    from: { x: 0, y: 0, width: 0, height: 0 },
    to: { x: 0, y: 0, width: 0, height: 0 },
  })
  const onExport = async () => {
    currentExportImgResultRef.current = await exportImg()
    if (!currentExportImgResultRef.current) return
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

  const isPortrait = getOrientation() === "portrait"

  const exportBtn = <Button onClick={() => onExport()} title="save the cropped image">
    <IconParkDownPicture />
  </Button>

  return (
    <>
      <div className={clsx(
        `fixed p-4 select-none`,
        isPortrait ? "bottom-4 left-1/2 w-full max-w-[640px] -translate-x-1/2" : "left-0 top-16"
      )}>
        <div className={clsx("flex justify-between rounded-2xl bg-white/30 backdrop-blur", isPortrait ? "flex-row p-3" : "flex-col p-6")}>
          <div className={clsx(isPortrait ? "w-0 flex-1 " : "text-center text-2xl")}>
            <div>
              <Button
                onClick={() => setStageState((v) => ({ ...v, preview: !v.preview }))}
                title="preview"
              >
                {stage.preview ? <IconParkOutlinePreviewOpen /> : <IconParkPreviewCloseOne />}
              </Button>
            </div>
            <div className=" mt-2">
              <Button onClick={() => full()} title="full">
                <AntDesignFullscreenOutlined />
              </Button>
            </div>
            <div className=" mt-2">
              <Button
                title="reset"
                onClick={() => {
                  resetCropperState()
                  resetImgState()
                  resetStageState()
                }}
              >
                <IconParkOutlineClear />
              </Button>
            </div>
            {
              !isPortrait && <div className=" mt-2">
                {exportBtn}</div>

            }
          </div>
          <div className={clsx("m-4 mx-auto ", isPortrait ? "w-[200px] h-[80px]" : "w-[54px] h-[80px] mt-12")}>
            <Handle></Handle>
          </div>
          {
            isPortrait &&
            <div className="w-0 flex-1 ">
              <div className=" text-right">
                {exportBtn}
              </div>
            </div>
          }
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
