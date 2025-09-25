import { isInstanceOf } from "is-what"
import { domtify, fn } from "@/core.js"
import { uniqueArray } from "@/utils/uniqueArray.js"
import { pushStack } from "@/utils/pushStack.js"

import "./toArray.js"

fn.closest = function (selector, context) {
  let result = []

  // 先获取到所有的候选集合数组
  const candidates = isInstanceOf(context, Element)
    ? domtify(selector, context).toArray()
    : domtify(selector).toArray()

  for (const el of this.toArray()) {
    let current = el
    while (current) {
      // 实际上这整个while就是在模拟原生的api的closest的行为
      if (candidates.includes(current)) {
        result.push(current)
        break
      }
      current = current.parentElement
    }
  }

  result = uniqueArray(result)

  return pushStack(this, result)
}
