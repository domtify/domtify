import { fn } from "@/core.js"
import { dimension } from "@/utils/dimension.js"

import "./toArray.js"

fn.outerHeight = function (value, includeMargin = false) {
  return dimension(this, "height", { mode: "outer", includeMargin }, value)
}
