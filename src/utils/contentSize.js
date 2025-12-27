import { isUndefined } from "is-what"
import { d } from "@/core.js"
import {
  getWindowSize,
  getDocumentSize,
  resolveSizeValue,
  isBorderBox,
  getComputedSize,
  resolveToPx,
  isPxValue,
  border,
  padding,
} from "@/utils/size.js"

export const contentSize = (prop) => (value) => (els) => {
  if (isUndefined(value)) {
    const el = els.at(0)
    if (!el) return undefined

    if (el === window) return getWindowSize(prop)
    if (el === document) return getDocumentSize(el, prop)

    let height = getComputedSize(el, prop)

    if (isBorderBox(el)) {
      height -= border(el, prop) + padding(el, prop)
    }

    return height
  }
  for (const [index, element] of els.entries()) {
    let originVal = resolveSizeValue(
      element,
      value,
      index,
      contentSize(prop)()(d(element)),
    )

    const isPx = isPxValue(originVal)
    const borderBox = isBorderBox(element)

    if (!borderBox && !isPx) {
      element.style.setProperty(prop, originVal)
      continue
    }

    if (!isPx) {
      originVal = resolveToPx(element, prop, originVal)
    }
    originVal = parseFloat(originVal)

    if (borderBox) {
      originVal += border(element, prop) + padding(element, prop)
    }
    element.style.setProperty(prop, `${originVal}px`)
  }

  return els
}
