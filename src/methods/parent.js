import { fn } from "@/core.js"
import { isUndefined } from "is-what"
import { uniqueArray } from "@/utils/uniqueArray.js"
import { pushStack } from "@/utils/pushStack.js"

import "./toArray.js"

fn.parent = function (selector) {
  let result = this.toArray()
    .map((el) => el.parentNode) //这里必须用parentNode而不是parentElement,否则无法和jquery行为完全保持一致
    .filter((p) => p && p.nodeType !== Node.DOCUMENT_FRAGMENT_NODE)

  if (!isUndefined(selector)) {
    // 如果传入 selector，则进一步筛选
    result = result.filter((p) => p.matches(selector))
  }

  result = uniqueArray(result) // 去重

  return pushStack(this, result)
}
