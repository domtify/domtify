import { isUndefined, isFunction } from "is-what"
import { fn } from "@/core.js"

import "./toArray.js"

fn.html = function (html) {
  // getter
  if (isUndefined(html)) {
    const el = this.toArray().at(0)
    return el?.innerHTML
  } else {
    // setter
    for (const [index, element] of this.toArray().entries()) {
      const newHtml = isFunction(html)
        ? Reflect.apply(html, element, [index, element.innerHTML])
        : html

      if (newHtml) element.innerHTML = newHtml
    }
    return this
  }
}
