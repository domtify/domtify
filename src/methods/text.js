import { isUndefined, isFunction } from "is-what"
import { fn } from "@/core.js"

import "./toArray.js"

fn.text = function (text) {
  if (isUndefined(text)) {
    //Getter:
    return this.toArray()
      .map((el) => el.textContent)
      .join("")
  } else {
    // Setter:
    for (const [index, element] of this.toArray().entries()) {
      let value
      if (isFunction(text)) {
        const currentText = element.textContent

        value = Reflect.apply(text, element, [index, currentText])
      } else {
        value = text
      }
      element.textContent = String(value)
    }
    return this
  }
}
