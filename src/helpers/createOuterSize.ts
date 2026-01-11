import { isBoolean, isUndefined } from 'is-what'
import { dom } from '@/core/dom'
import {
  border,
  getComputedSize,
  getDocumentSize,
  getWindowSize,
  isBorderBox,
  isPxValue,
  margin,
  padding,
  resolveSizeValue,
  resolveToPx,
} from '@/helpers/size'

export const createOuterSize =
  prop =>
  (value, includeMargin = false) =>
  els => {
    if (isUndefined(value) || isBoolean(value)) {
      const el = els.at(0)
      if (!el) return undefined

      if (el === window) return getWindowSize(prop)
      if (el === document) return getDocumentSize(el, prop)

      let height = getComputedSize(el, prop)

      if (!isBorderBox(el)) {
        height += padding(el, prop) + border(el, prop)
      }
      if (value) {
        height += margin(el, prop)
      }
      return height
    }
    for (const [index, element] of els.entries()) {
      let originVal = resolveSizeValue(
        element,
        value,
        index,
        createOuterSize(prop)(includeMargin)(dom(element)),
      )

      const isPx = isPxValue(originVal)
      const borderBox = isBorderBox(element)

      if (borderBox && !isPx && !includeMargin) {
        element.style.setProperty(prop, originVal)
        continue
      }

      if (!isPx) {
        originVal = resolveToPx(element, prop, originVal)
      }
      originVal = parseFloat(originVal)

      if (!borderBox) {
        originVal -= padding(element, prop) + border(element, prop)
      }
      if (includeMargin) {
        originVal -= margin(element, prop)
      }

      element.style.setProperty(prop, `${originVal}px`)
    }

    return els
  }
