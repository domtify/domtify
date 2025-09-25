import {
  isFunction,
  isString,
  isInstanceOf,
  isUndefined,
  isPlainObject,
} from "is-what"
import { fn } from "@/core.js"

import "./toArray.js"

fn.replaceClass = function (oldClassName, newClassName) {
  let replace = {}

  for (const [index, element] of this.toArray().entries()) {
    if (isString(oldClassName)) {
      const value = callMaybeFunction(newClassName, element, index)
      if (isString(value) && !isUndefined(value)) {
        replace[oldClassName] = value
      }
    } else if (isPlainObject(oldClassName)) {
      replace = oldClassName
    } else if (isFunction(oldClassName)) {
      const result = callMaybeFunction(oldClassName, element, index)
      if (isPlainObject(result)) replace = result
    }

    for (const [key, val] of Object.entries(replace)) {
      if (isInstanceOf(element, Element) && element.classList.contains(key)) {
        element.classList.replace(key, val)
      }
    }
  }

  return this
}

function callMaybeFunction(maybeFn, element, index) {
  if (isFunction(maybeFn)) {
    return Reflect.apply(maybeFn, element, [
      index,
      isInstanceOf(element, Element) ? element.classList.value : "",
    ])
  }
  return maybeFn
}
