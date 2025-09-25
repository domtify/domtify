import { fn } from "@/core.js"

import "./toArray.js"

fn.each = function (callback) {
  for (const [index, element] of this.toArray().entries()) {
    const res = Reflect.apply(callback, element, [index, element])
    if (res === false) break
  }
  return this
}
