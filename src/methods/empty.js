import { fn } from "@/core.js"

import "./toArray.js"

fn.empty = function () {
  for (const element of this.toArray()) {
    element.replaceChildren()
  }
  return this
}
