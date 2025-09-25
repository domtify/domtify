import { fn } from "@/core.js"
import { pushStack } from "@/utils/pushStack.js"

import "./toArray.js"

fn.contents = function () {
  const result = []

  for (const el of this.toArray()) {
    if (el.tagName === "IFRAME") {
      try {
        const doc = el.contentDocument
        if (doc) result.push(doc)
      } catch (e) {
        // 忽略 iframe 跨域等错误
      }
    } else {
      result.push(...el.childNodes)
    }
  }

  return pushStack(this, result)
}
