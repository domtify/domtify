import { fn } from "@/core.js"
import { uniqueArray } from "@/utils/uniqueArray.js"
import { pushStack } from "@/utils/pushStack.js"

import "./toArray.js"

fn.children = function (selector) {
  let result = []

  for (const [, element] of this.toArray().entries()) {
    if (element && element.children) {
      const kids = Array.from(element.children)
      result.push(...kids)
    }
  }

  // 去重
  result = uniqueArray(result)

  // 选择器过滤
  if (selector) {
    // 如果传递了选择器那么就再次过滤
    result = result.filter((el) => el.matches(selector))
  }

  return pushStack(this, result)
}
