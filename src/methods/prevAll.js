import { fn } from "@/core.js"
import { siblings } from "@/utils/siblings.js"
import { pushStack } from "@/utils/pushStack.js"

import "./toArray.js"

fn.prevAll = function (selector) {
  return pushStack(
    this,
    siblings(this.toArray(), "prev", { all: true, filter: selector }),
  )
}
