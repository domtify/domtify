import { fn } from "@/core.js"

import "./filter.js"

fn.is = function (selector) {
  return this.filter(selector).length > 0
}
