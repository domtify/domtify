import {
  getContentSize,
  getWindowSize,
  getDocumentSize,
  getFinalVal,
  setContentSize,
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

    return getContentSize(first, "height")
  }
  for (const [index, element] of els.entries()) {
    let finalVal = getFinalVal(element, "height", value, index, height())
    console.log(finalVal)

    setContentSize(element, "height", finalVal)
  }

  return els
}
