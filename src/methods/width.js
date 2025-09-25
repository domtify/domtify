import { fn } from "@/core.js"
import { dimension } from "@/utils/dimension.js"

import "./toArray.js"

fn.width = function (value) {
  return dimension(this, "width", { mode: "content" }, value)
}
