import { fn } from "@/core.js"
import { pushStack } from "@/utils/pushStack.js"

import "./toArray.js"

fn.odd = function () {
  return pushStack(
    this,
    this.toArray().filter((_, index) => index % 2 === 1),
  )
}
