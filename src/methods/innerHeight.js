import {
  getWindowSize,
  getDocumentSize,
  resolveSizeValue,
  isBorderBox,
  getComputedSize,
  resolveToPx,
  border,
  isPxValue,
  padding,
} from "@/utils/size.js"
import { isUndefined } from "is-what"
import { d } from "@/core.js"

export const innerHeight = (value) => (els) => {
  if (isUndefined(value)) {
    const first = els.at(0)
    if (!first) return undefined

    if (first === window) return getWindowSize("height")
    if (first === document) return getDocumentSize(first, "height")

    let height = getComputedSize(first, "height")

    if (isBorderBox(first)) {
      // 减去border
      height -= border(first, "height")
    } else {
      height += padding(first, "height")
    }

    return height
  }
  for (const [index, element] of els.entries()) {
    let originVal = resolveSizeValue(
      element,
      value,
      index,
      innerHeight()(d(element)),
    )

    if (!isPxValue(originVal)) {
      originVal = resolveToPx(element, "height", originVal)
    }
    originVal = parseFloat(originVal)
    if (isBorderBox(element)) {
      originVal += border(element, "height")
    } else {
      originVal -= padding(element, "height")
    }

    element.style.setProperty("height", `${originVal}px`)
  }

  return els
}
