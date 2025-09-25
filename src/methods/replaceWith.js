import { fn } from "@/core.js"
import { isFunction, isInstanceOf } from "is-what"
import { flatElements } from "@/utils/flatElements.js"

import "./toArray.js"

fn.replaceWith = function (newContent) {
  for (const [index, element] of this.toArray().entries()) {
    let result
    if (isFunction(newContent)) {
      const currentText = isInstanceOf(element, Element)
        ? element.textContent
        : ""
      result = Reflect.apply(newContent, element, [index, currentText])
    } else {
      result = newContent
    }

    if (isInstanceOf(element, Element)) {
      result = flatElements(result, false)

      element.replaceWith(...result)
    }
  }
  return this
}
