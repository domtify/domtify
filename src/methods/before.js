import { fn } from "@/core.js"
import { insertNode } from "@/utils/insertNode.js"

import "./toArray.js"

fn.before = function (...args) {
  insertNode(this.toArray(), args, "beforebegin", false)
  return this
}
