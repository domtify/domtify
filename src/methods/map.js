import { fn } from "@/core.js"
import { isArray, isNull, isUndefined } from "is-what"
import { pushStack } from "@/utils/pushStack.js"

import "./toArray.js"

fn.map = function (callback) {
  let result = []

  for (const [index, element] of this.toArray().entries()) {
    const returned = Reflect.apply(callback, element, [index, element])
    if (isArray(returned)) {
      result.push(...returned) // 扁平化处理
    } else if (!isUndefined(returned) && !isNull(returned)) {
      result.push(returned)
    }
  }

  return pushStack(this, result)
}
