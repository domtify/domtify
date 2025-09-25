import { fn } from "@/core.js"
import { insertNode } from "@/utils/insertNode.js"

import "./toArray.js"

fn.append = function (...args) {
  insertNode(this.toArray(), args, "beforeend")

  return this
}
