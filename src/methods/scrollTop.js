import { fn } from "@/core.js"
import { scrollTo } from "@/utils/scrollTo.js"

import "./toArray.js"

fn.scrollTop = function (value) {
  return scrollTo(this, value, "top")
}
