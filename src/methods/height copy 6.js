import {
  getWindowSize,
  getDocumentSize,
  resolveSizeValue,
  isBorderBox,
  getContentExtra,
  getComputedSize,
  parsePxValue,
  resolveToPx,
  resolveToPx2,
} from "@/utils/size.js"
import { isUndefined } from "is-what"

export const height = (value) => (els) => {
  if (isUndefined(value)) {
    const first = els.at(0)
    if (!first) return undefined

    if (first === window) {
      return getWindowSize("height")
    }
    if (first === document) {
      return getDocumentSize(first, "height")
    }

    let height = getComputedSize(first, "height")

    if (isBorderBox(first)) {
      height -= getContentExtra(first, "height")
    }

    return height
  }
  for (const [index, element] of els.entries()) {
    const originVal = resolveSizeValue(element, value, index, height())
    let px = parsePxValue(originVal)

    if (isBorderBox(element)) {
      const extra = getContentExtra(element, "height")
      // content-box
      if (px) {
        element.style.setProperty("height", `${px + extra}px`)
      } else {
        // 不是px结尾的就先获取到px长度
        const resolvedPx = resolveToPx2(element, "height", originVal)
        element.style.setProperty("height", `${resolvedPx + extra}px`)
      }
    } else {
      // content-box 直接设置原来的值
      element.style.setProperty("height", px ? `${px}px` : originVal)
    }
  }

  return els
}
