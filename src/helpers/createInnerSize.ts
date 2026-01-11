import { isUndefined } from 'is-what'
import { dom } from '@/core/dom'

import {
  border,
  getComputedSize,
  getDocumentSize,
  getWindowSize,
  isBorderBox,
  isPxValue,
  padding,
  resolveSizeValue,
  resolveToPx,
} from '@/helpers/size'

export const createInnerSize = prop => value => els => {
  if (isUndefined(value)) {
    const first = els.at(0)
    if (!first) return undefined

    if (first === window) return getWindowSize(prop)
    if (first === document) return getDocumentSize(first, prop)

    let height = getComputedSize(first, prop)

    if (isBorderBox(first)) {
      // 减去border
      height -= border(first, prop)
    } else {
      height += padding(first, prop)
    }

    return height
  }
  for (const [index, element] of els.entries()) {
    let originVal = resolveSizeValue(
      element,
      value,
      index,
      createInnerSize(prop)()(dom(element)),
    )

    if (!isPxValue(originVal)) {
      originVal = resolveToPx(element, prop, originVal)
    }
    originVal = parseFloat(originVal)
    if (isBorderBox(element)) {
      originVal += border(element, prop)
    } else {
      originVal -= padding(element, prop)
    }

    element.style.setProperty(prop, `${originVal}px`)
  }

  return els
}
