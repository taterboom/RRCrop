import { atom } from "recoil"

export const imgState = atom({
  key: "imgState",
  default: {
    src: "",
    width: 0,
    height: 0,
    naturalWidth: 0,
    naturalHeight: 0,
  },
})

export const cropperState = atom({
  key: "cropperState",
  default: {
    initialX: 0,
    initialY: 0,
    initialWidth: 0,
    initialHeight: 0,
    initialRadius: 0,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    radius: 0,
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
  },
})

export const currentActionState = atom<null | "w" | "h" | "l" | "t" | "r">({
  key: "currentActionState",
  default: null,
})
