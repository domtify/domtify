import { isInstanceOf } from "is-what"
import { fn, Domtify } from "@/core.js"
import { pushStack } from "@/utils/pushStack.js"

import "./toArray.js"

fn.addBack = function (selector) {
  let result = isInstanceOf(this.prevObject, Domtify)
    ? this.prevObject.toArray()
    : []

  // 选择器过滤
  if (selector) {
    // 如果传递了选择器那么就再次过滤
    result = result.filter((el) => el.matches(selector))
  }

  return pushStack(this, [...result, ...this.toArray()])
}
