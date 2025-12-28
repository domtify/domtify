import { isFunction, isUndefined, isNull, isInstanceOf } from "is-what"
import { cssInt } from "@/utils/cssInt.js"
import { dom } from "@/core.js"

export const offset = (coordinates) => (els) => {
  if (isUndefined(coordinates)) {
    // getter
    const element = els.at(0)
    if (!isInstanceOf(element, Element)) return undefined
    const rect = element.getBoundingClientRect()

    return {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    }
  } else {
    for (const [index, element] of els.entries()) {
      const offsetRes = offset()(dom(element))

      // setter
      const newCoordinates = isFunction(coordinates)
        ? coordinates.call(element, index, offsetRes)
        : coordinates

      const style = window.getComputedStyle(element)

      // 如果是 static，需要改成 relative
      if (style.position === "static") {
        element.style.position = "relative"
      }

      const topDelta = newCoordinates.top - offsetRes.top
      const leftDelta = newCoordinates.left - offsetRes.left

      const curTopCSS = cssInt(style, "top")
      const curLeftCSS = cssInt(style, "left")

      if (!isNull(newCoordinates.top)) {
        element.style.top = curTopCSS + topDelta + "px"
      }

      if (!isNull(newCoordinates.left)) {
        element.style.left = curLeftCSS + leftDelta + "px"
      }
    }
    return els
  }
}
