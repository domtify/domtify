import { isFunction, isUndefined, isNull, isInstanceOf } from "is-what"
import { fn, domtify } from "@/core.js"
import { cssInt } from "@/utils/cssInt.js"

import "./toArray.js"

fn.offset = function (coordinates) {
  if (isUndefined(coordinates)) {
    // getter
    const element = this.toArray().at(0)
    if (!isInstanceOf(element, Element)) return undefined
    const rect = element.getBoundingClientRect()

    return {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    }
  } else {
    for (const [index, element] of this.toArray().entries()) {
      const offset = domtify(element).offset()

      // setter
      let newCoordinates = isFunction(coordinates)
        ? Reflect.apply(coordinates, element, [index, offset])
        : coordinates

      const style = window.getComputedStyle(element)

      // 如果是 static，需要改成 relative
      if (style.position === "static") {
        element.style.position = "relative"
      }

      const topDelta = newCoordinates.top - offset.top
      const leftDelta = newCoordinates.left - offset.left

      const curTopCSS = cssInt(style, "top")
      const curLeftCSS = cssInt(style, "left")

      if (!isNull(newCoordinates.top)) {
        element.style.top = curTopCSS + topDelta + "px"
      }

      if (!isNull(newCoordinates.left)) {
        element.style.left = curLeftCSS + leftDelta + "px"
      }
    }
    return this
  }
}
