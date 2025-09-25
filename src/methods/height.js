import { fn } from "@/core.js"
import { dimension } from "@/utils/dimension.js"

import "./toArray.js"

fn.height = function (value) {
  return dimension(this, "height", { mode: "content" }, value)
}
