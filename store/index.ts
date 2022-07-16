import { atom, selector } from "recoil"
import { containSizeInDocment, scaleRect } from "../components/utils"
import { PLACEMENT_HEIGHT, PLACEMENT_WIDTH } from "../constants"

const placementSize = containSizeInDocment(PLACEMENT_WIDTH, PLACEMENT_HEIGHT)

const placementCropperScaledRect = scaleRect(
  {
    x: 0,
    y: 0,
    width: placementSize[0],
    height: placementSize[1],
  },
  0.8
)

export const imgState = atom({
  key: "imgState",
  default: {
    src: "/taichi.jpeg",
    width: placementSize[0],
    height: placementSize[1],
    naturalWidth: PLACEMENT_WIDTH,
    naturalHeight: PLACEMENT_HEIGHT,
  },
})

export const cropperState = atom({
  key: "cropperState",
  default: {
    initialX: placementCropperScaledRect.x,
    initialY: placementCropperScaledRect.y,
    initialWidth: placementCropperScaledRect.width,
    initialHeight: placementCropperScaledRect.height,
    initialRadius: 16,
    x: placementCropperScaledRect.x,
    y: placementCropperScaledRect.y,
    width: placementCropperScaledRect.width,
    height: placementCropperScaledRect.height,
    radius: 16,
  },
})

export const configState = atom({
  key: "configState",
  default: {
    initialScale: 0.8,
    initialRaidus: 16,
    cropperMinWidth: 48,
    cropperMinHeight: 48,
    borderRadiusHandleRadius: 4,
  },
})

export const stageState = atom({
  key: "stageState",
  default: {
    preview: false,
    width: placementSize[0],
    height: placementSize[1],
  },
})

export const currentActionState = atom<null | "w" | "h" | "l" | "t" | "r">({
  key: "currentActionState",
  default: null,
})

export const radiusHandlerDragDownState = atom<boolean>({
  key: "radiusHandlerDragDownState",
  default: false,
})

export const isInitialSelector = selector({
  key: "isInitialSelector",
  get: ({ get }) => {
    return get(imgState).src === "/taichi.jpeg"
  },
})
