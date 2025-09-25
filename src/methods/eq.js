import { isUndefined } from "is-what"
import { fn } from "@/core.js"
import { pushStack } from "@/utils/pushStack.js"

import "./get.js"

fn.eq = function (index) {
  const result = []
  const find = this.get(index)
  !isUndefined(find) && result.push(find)
  return pushStack(this, result)
}
