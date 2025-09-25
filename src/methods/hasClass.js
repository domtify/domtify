import { fn } from "@/core.js"

import "./toArray.js"

fn.hasClass = function (className) {
  for (const el of this.toArray()) {
    if (el?.classList?.contains(className)) {
      return true
    }
  }
  return false
}
