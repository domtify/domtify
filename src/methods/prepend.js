import { fn } from "@/core.js"
import { insertNode } from "@/utils/insertNode.js"

import "./toArray.js"

fn.prepend = function (...args) {
  insertNode(this.toArray(), args, "afterbegin")

  return this
}
