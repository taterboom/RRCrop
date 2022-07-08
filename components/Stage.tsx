import { useEffect } from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { configState, cropperState, imgState, stageState } from "../store"
import Cropper from "./Cropper"
import { useLoadImage } from "./hooks/useLoadImage"
import { containSize, scaleRect } from "./utils"
import clsx from "classnames"

type RawProps = {
  src: string
}

const Raw = (props: RawProps) => {
  const [img, setImg] = useRecoilState(imgState)
  const setCropper = useSetRecoilState(cropperState)
  const stage = useRecoilValue(stageState)
  const config = useRecoilValue(configState)
  const result = useLoadImage(props.src)
  useEffect(() => {
    if (result.data) {
      const { naturalWidth, naturalHeight } = result.data
      const [displayWidth, displayHeight] = containSize(
        naturalWidth,
        naturalHeight,
        document.documentElement.clientWidth - 16 * 2,
        document.documentElement.clientHeight - 16 * 2
      )
      setImg({
        src: props.src,
        width: displayWidth,
        height: displayHeight,
        naturalWidth,
        naturalHeight,
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
    <div>
      {result.loading && "loading..."}
      <div className="text-center">
        <div
          className="relative inline-block border-8 stage-rect-border box-content"
          style={{
            width: img.width,
            height: img.height,
          }}
        >
          <img
            className={clsx("block transition-all", {
              hidden: stage.preview,
            })}
            src={img.src}
            alt="the pic to be cropped"
            width={img.width}
            height={img.height}
          ></img>
          <Cropper></Cropper>
        </div>
      </div>
    </div>
  )
}

const Stage = () => (
  <div>
    <Raw src="https://s3.bmp.ovh/imgs/2022/06/30/112a2f62ab1411db.jpeg"></Raw>
  </div>
)

export default Stage
