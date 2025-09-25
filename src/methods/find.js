import { domtify, fn } from "@/core.js"
import { uniqueArray } from "@/utils/uniqueArray.js"
import { pushStack } from "@/utils/pushStack.js"

import "./toArray.js"

fn.find = function (selector) {
  let result = []

  // 获取所有候选节点（可能是 selector 匹配的、或者传入的元素/domtify 对象）
  const candidates = domtify(selector).toArray()

  // 遍历元素
  for (const el of this.toArray()) {
    for (const node of candidates) {
      if (el !== node && el.contains(node)) {
        result.push(node)
      }
    }
  }

  result = uniqueArray(result)

  return pushStack(this, result)
}
