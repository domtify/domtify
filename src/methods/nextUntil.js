import { fn } from "@/core.js"
import { siblings } from "@/utils/siblings.js"
import { pushStack } from "@/utils/pushStack.js"

import "./toArray.js"

fn.nextUntil = function (selector, filter) {
  return pushStack(
    this,
    siblings(this.toArray(), "next", {
      all: true,
      until: selector,
      filter,
    }),
  )
}
