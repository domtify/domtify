import {
  isFunction,
  isNull,
  isPlainObject,
  isString,
  isUndefined,
} from "is-what"
import { domtify, fn } from "@/core.js"

import "./toArray.js"

fn.attr = function (name, value) {
  if (isUndefined(value) && !isPlainObject(name)) {
    // getter
    const el = this.toArray().at(0)
    if (!el) return undefined
    const attribute = el.getAttribute(name)
    return attribute ? attribute : undefined
  } else {
    //setter
    for (const [index, element] of this.toArray().entries()) {
      if (isString(name)) {
        if (isNull(value) || (value === false && !name.startsWith("aria-"))) {
          // 如果是null或者是非ARIA 属性的通过传递false来删除
          element.removeAttribute(name)
        } else if (isFunction(value)) {
          const newVal = Reflect.apply(value, element, [
            index,
            domtify(element).attr(name),
          ])
          if (!isNull(newVal)) {
            element.setAttribute(name, newVal)
          }
        } else {
          element.setAttribute(name, value)
        }
      } else if (isPlainObject(name)) {
        for (const [key, val] of Object.entries(name)) {
          domtify(element).attr(key, val)
        }
      }
    }
  }
}
