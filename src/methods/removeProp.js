import { fn } from "@/core.js"
import { isString } from "is-what"

import "./toArray.js"

fn.removeProp = function (propertyName) {
  if (!isString(propertyName)) return this

  for (const [, element] of this.toArray().entries()) {
    Reflect.deleteProperty(element, propertyName)
  }

  return this
}
