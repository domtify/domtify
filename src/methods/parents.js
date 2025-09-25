import { fn } from "@/core.js"
import { parents } from "@/utils/parents.js"
import { pushStack } from "@/utils/pushStack.js"

import "./toArray.js"

fn.parents = function (selector) {
  const result = parents(this.toArray(), { selector })
  return pushStack(this, result)
}
