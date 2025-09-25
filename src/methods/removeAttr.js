import { fn } from "@/core.js"
import { isString } from "is-what"

import "./toArray.js"

fn.removeAttr = function (attributeName) {
  if (!isString(attributeName)) return this

  const attrs = attributeName.trim().split(/\s+/)

  for (const [, element] of this.toArray().entries()) {
    for (const attr of attrs) {
      element.removeAttribute(attr)
    }
  }

  return this
}
