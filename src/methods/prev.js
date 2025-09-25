import { fn } from "@/core.js"
import { siblings } from "@/utils/siblings.js"
import { pushStack } from "@/utils/pushStack.js"

import "./toArray.js"

fn.prev = function (selector) {
  return pushStack(this, siblings(this.toArray(), "prev", { filter: selector }))
}
