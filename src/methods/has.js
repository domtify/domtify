import { domtify, fn } from "@/core.js"
import { pushStack } from "@/utils/pushStack.js"

import "./find.js"
import "./toArray.js"

fn.has = function (selector) {
  let result = this.toArray().filter((element) => {
    return domtify(element).find(selector).length //能找到后代就保留
  })

  return pushStack(this, result)
}
