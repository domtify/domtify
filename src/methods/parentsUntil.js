import { fn, domtify } from "@/core.js"
import { isUndefined } from "is-what"
import { parents } from "@/utils/parents.js"
import { pushStack } from "@/utils/pushStack.js"

import "./toArray.js"

fn.parentsUntil = function (selector, filter) {
  const untilElements = !isUndefined(selector)
    ? domtify(selector).toArray()
    : []
  const result = parents(this.toArray(), {
    until: untilElements,
    filter,
  })
  return pushStack(this, result)
}
