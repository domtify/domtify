import { fn } from "@/core.js"
import { pushStack } from "@/utils/pushStack.js"

import "./toArray.js"

fn.slice = function (...args) {
  return pushStack(this, this.toArray().slice(...args))
}
