import { fn } from "@/core.js"

import "./toArray.js"

import { insertNode } from "@/utils/insertNode.js"

fn.after = function (...args) {
  insertNode(this.toArray(), args, "afterend")
  return this
}
