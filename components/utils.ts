import { CONTAINER_H_WHITE_SPACE, CONTAINER_V_WHITE_SPACE } from "../constants"
import { Point, Rect } from "../types/graph"

export function inBrowser() {
  return typeof window !== "undefined"
}

export function scaleRect(rect: Rect, times: number) {
  const scaleWidth = rect.width * times
  const scaleHeight = rect.height * times
  const scaleX = rect.x + (rect.width * (1 - times)) / 2
  const scaleY = rect.x + (rect.height * (1 - times)) / 2
  return {
    x: scaleX,
    y: scaleY,
    width: scaleWidth,
    height: scaleHeight,
  }
}

export function containSize(
  inputWidth: number,
  inputHeight: number,
  containerWidth: number,
  containerHeight: number
) {
  const inputRatio = inputWidth / inputHeight
  const containerRatio = containerWidth / containerHeight
  if (inputRatio > containerRatio) {
    const outputWidth = Math.min(containerWidth, inputWidth)
    const outputHeight = outputWidth / inputRatio
    return [outputWidth, outputHeight]
  } else {
    const outputHeight = Math.min(containerHeight, inputHeight)
    const outputWidth = outputHeight * inputRatio
    return [outputWidth, outputHeight]
  }
}

export function containSizeInDocment(naturalWidth: number, naturalHeight: number) {
  if (!inBrowser()) return [0, 0]
  return containSize(
    naturalWidth,
    naturalHeight,
    document.documentElement.clientWidth - CONTAINER_H_WHITE_SPACE,
    document.documentElement.clientHeight - CONTAINER_V_WHITE_SPACE
  )
}

export function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number = 0
) {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + width, y, x + width, y + height, radius)
  ctx.arcTo(x + width, y + height, x, y + height, radius)
  ctx.arcTo(x, y + height, x, y, radius)
  ctx.arcTo(x, y, x + width, y, radius)
  // ctx.moveTo(x + radius, y)
  // ctx.lineTo(x + width - radius, y)
  // ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
  // ctx.lineTo(x + width, y + height - radius)
  // ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  // ctx.lineTo(x + radius, y + height)
  // ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
  // ctx.lineTo(x, y + radius)
  // ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
}

export function rectLeft(rect: Rect) {
  return rect.x
}
export function rectRight(rect: Rect) {
  return rect.x + rect.width
}
export function rectTop(rect: Rect) {
  return rect.y
}
export function rectBottom(rect: Rect) {
  return rect.y + rect.height
}

export function getPoint(rect: Rect, type: 0b00 | 0b01 | 0b10 | 0b11) {
  return [
    (type & 0b10) === 0b10 ? rectLeft(rect) : rectRight(rect),
    (type & 0b01) === 0b01 ? rectTop(rect) : rectBottom(rect),
  ]
}

export function getFixedAndMovablePoint(
  rect: Rect,
  movablePointType: 0b00 | 0b01 | 0b10 | 0b11
): { fixedPoint: Point; movablePoint: Point } {
  const fixedPoint: Point = [
    (movablePointType & 0b10) === 0b10 ? rectRight(rect) : rectLeft(rect),
    (movablePointType & 0b01) === 0b01 ? rectBottom(rect) : rectTop(rect),
  ]
  const movablePoint: Point = [
    (movablePointType & 0b10) === 0b10 ? rectLeft(rect) : rectRight(rect),
    (movablePointType & 0b01) === 0b01 ? rectTop(rect) : rectBottom(rect),
  ]
  return {
    fixedPoint,
    movablePoint,
  }
}
