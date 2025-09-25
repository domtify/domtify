import { fn } from "@/core.js"
import { siblings } from "@/utils/siblings.js"
import { pushStack } from "@/utils/pushStack.js"

import "./toArray.js"

fn.prevUntil = function (selector, filter) {
  return pushStack(
    this,
    siblings(this.toArray(), "prev", {
      all: true,
      until: selector,
      filter,
    }),
  )
}
