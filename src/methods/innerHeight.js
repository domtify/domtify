import { fn } from "@/core.js"
import { dimension } from "@/utils/dimension.js"

import "./toArray.js"

fn.innerHeight = function (value) {
  return dimension(this, "height", { mode: "inner" }, value)
}
