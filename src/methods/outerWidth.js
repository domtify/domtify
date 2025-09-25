import { fn } from "@/core.js"
import { dimension } from "@/utils/dimension.js"

import "./toArray.js"

fn.outerWidth = function (value, includeMargin = false) {
  return dimension(this, "width", { mode: "outer", includeMargin }, value)
}
