import { isFunction } from "is-what"
import { domtify, fn } from "@/core.js"
import { pushStack } from "@/utils/pushStack.js"

import "./toArray.js"

fn.not = function (selector) {
  // 先获取所有的需要过滤的元素

  let result = this.toArray().filter((element, index) => {
    if (isFunction(selector)) {
      return !Reflect.apply(selector, element, [index, element])
    } else {
      let notElements = isFunction(selector) ? [] : domtify(selector).toArray()
      return !notElements.includes(element)
    }
  })

  return pushStack(this, result)
}
