import {
  getWindowSize,
  getDocumentSize,
  resolveSizeValue,
  isBorderBox,
  getContentExtra,
  getComputedSize,
  parsePxValue,
  resolveToPx,
} from "@/utils/size.js"
import { isNull, isUndefined } from "is-what"
export const createInnerSize = (prop) => (value) => (els) => {
  if (isUndefined(value)) {
    const first = els.at(0)
    if (!first) return undefined

    if (first === window) return getWindowSize(prop)
    if (first === document) return getDocumentSize(first, prop)

    let height = getComputedSize(first, prop)

    if (isBorderBox(first)) {
      height -= getContentExtra(first, prop)
    }

    return height
  }
  for (const [index, element] of els.entries()) {
    const originVal = resolveSizeValue(
      element,
      value,
      index,
      createInnerSize(prop)()([element]),
    )

    const px = parsePxValue(originVal)
    const borderBox = isBorderBox(element)

    if (!borderBox && isNull(px)) {
      element.style.setProperty(prop, originVal)
      continue
    }

    let resolvedPx = px

    if (isNull(resolvedPx)) {
      resolvedPx = resolveToPx(element, prop, originVal)
    }

    if (borderBox) {
      resolvedPx += getContentExtra(element, prop)
    }

    element.style.setProperty(prop, `${resolvedPx}px`)
  }

  return els
}
