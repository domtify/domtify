import { fn } from "@/core.js"
import { pushStack } from "@/utils/pushStack.js"

import "./eq.js"

fn.first = function () {
  return pushStack(this, this.eq(0))
}
