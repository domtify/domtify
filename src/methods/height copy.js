import {
  getContentSize,
  getWindowSize,
  getDocumentSize,
  getFinalVal,
  setContentSize,
} from "@/utils/size.js"
import { isUndefined, isInstanceOf, isFunction, isNumber } from "is-what"

export const height = (value) => (els) => {
  if (isUndefined(value)) {
    const el = els.at(0)
    if (!el) return undefined

    if (el === window) {
      return getWindowSize("height")
    }
    if (el === document) {
      return getDocumentSize(el, "height")
    }
    return getContentSize(el, "height")
  }
  for (const [index, element] of els.entries()) {
    let res = getFinalVal(element, "height", value, index, height())

    res = setContentSize(element, "height", res)

    element.style.height = `${res}px`
  }

  return els
}
