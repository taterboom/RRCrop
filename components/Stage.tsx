import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { configState, cropperState, imgState, isInitialSelector, stageState } from "../store"
import Cropper from "./Cropper"
import { useLoadImage } from "./hooks/useLoadImage"
import { containSize, containSizeInDocment, scaleRect } from "./utils"
import clsx from "classnames"

const Stage = () => {
  const [inputSrc, setInputSrc] = useState<string>()
  const [img, setImg] = useRecoilState(imgState)
  const setCropper = useSetRecoilState(cropperState)
  const [stage, setStage] = useRecoilState(stageState)
  const config = useRecoilValue(configState)
  const isInitial = useRecoilValue(isInitialSelector)
  const result = useLoadImage(inputSrc)
  useEffect(() => {
    if (result.data) {
      const { naturalWidth, naturalHeight } = result.data
      const [displayWidth, displayHeight] = containSizeInDocment(naturalWidth, naturalHeight)
      setImg({
        src: inputSrc!,
        width: displayWidth,
        height: displayHeight,
        naturalWidth,
        naturalHeight,
      })
      setStage({
        preview: false,
        width: displayWidth,
        height: displayHeight,
      })
      const scaledRect = scaleRect(
        {
          x: 0,
          y: 0,
          width: displayWidth,
          height: displayHeight,
        },
        config.initialScale
      )
      setCropper({
        initialX: scaledRect.x,
        initialY: scaledRect.y,
        initialWidth: scaledRect.width,
        initialHeight: scaledRect.height,
        initialRadius: config.initialRaidus,
        ...scaledRect,
        radius: config.initialRaidus,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])
  return (
    <div className="text-center select-none fixed w-full">
      <div
        className="relative inline-block box-content drop-shadow-xl"
        style={{
          width: stage.width,
          height: stage.height,
        }}
      >
        {result.loading && "loading..."}
        {img.src && (
          <>
            <img
              className={clsx("block transition-all", {
                hidden: stage.preview,
              })}
              src={img.src}
              alt="the pic to be cropped"
              width={img.width}
              height={img.height}
            ></img>
            <Cropper
              seletable={isInitial}
              onTap={() => {
                if (isInitial) {
                  const inputEl = document.createElement("input")
                  inputEl.type = "file"
                  inputEl.accept = ".jpg,.jpeg,.png"
                  inputEl.addEventListener("change", (e) => {
                    console.log(inputEl.files)
                    if (inputEl.files?.[0]) {
                      setInputSrc(URL.createObjectURL(inputEl.files[0]))
                    }
                  })
                  inputEl.click()
                }
              }}
            ></Cropper>
          </>
        )}
      </div>
    </div>
  )
}

export default Stage
