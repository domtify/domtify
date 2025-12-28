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
  margin,
} from "@/utils/size.js"
import { isBoolean, isUndefined } from "is-what"
import { query } from "@/core.js"

export const outerHeight =
  (value, includeMargin = false) =>
  (els) => {
    if (isUndefined(value) || isBoolean(value)) {
      const el = els.at(0)
      if (!el) return undefined

      if (el === window) return getWindowSize("height")
      if (el === document) return getDocumentSize(el, "height")

      let height = getComputedSize(el, "height")

      if (!isBorderBox(el)) {
        height += padding(el, "height") + border(el, "height")
      }
      if (value) {
        height += margin(el, "height")
      }
      return height
    }
    for (const [index, element] of els.entries()) {
      let originVal = resolveSizeValue(
        element,
        value,
        index,
        outerHeight(includeMargin)(query(element)),
      )

      const isPx = isPxValue(originVal)
      const borderBox = isBorderBox(element)

      if (borderBox && !isPx && !includeMargin) {
        element.style.setProperty("height", originVal)
        continue
      }

      if (!isPx) {
        originVal = resolveToPx(element, "height", originVal)
      }
      originVal = parseFloat(originVal)

      if (!borderBox) {
        originVal -= padding(element, "height") + border(element, "height")
      }
      if (includeMargin) {
        originVal -= margin(element, "height")
      }

      element.style.setProperty("height", `${originVal}px`)
    }

    return els
  }
