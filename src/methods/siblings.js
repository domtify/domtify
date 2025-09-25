import { fn } from "@/core.js"
import { uniqueArray } from "@/utils/uniqueArray.js"
import { pushStack } from "@/utils/pushStack.js"

import "./toArray.js"

fn.siblings = function (selector) {
  let results = []

  for (const el of this.toArray()) {
    const parent = el.parentElement
    if (!parent) return

    // 既然是兄弟节点,肯定是要排除自身的
    const siblings = Array.from(parent.children).filter((node) => node !== el)
    results.push(...siblings)
  }

  // 去重
  results = uniqueArray(results)

  if (selector) {
    // 如果传递了选择器那么就再次过滤
    results = results.filter((el) => el.matches(selector))
  }

  return pushStack(this, results)
}
