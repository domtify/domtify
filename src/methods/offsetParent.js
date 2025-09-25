import { fn } from "@/core.js"
import { uniqueArray } from "@/utils/uniqueArray.js"
import { pushStack } from "@/utils/pushStack.js"

import "./toArray.js"

fn.offsetParent = function () {
  let result = []

  for (const [, element] of this.toArray().entries()) {
    if (element && element.offsetParent) {
      result.push(element.offsetParent)
    } else {
      // jQuery 在 offsetParent 为 null 时返回 documentElement
      result.push(document.documentElement)
    }
  }

  result = uniqueArray(result)

  return pushStack(this, result)
}
