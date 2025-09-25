import { fn } from "@/core.js"
import { dimension } from "@/utils/dimension.js"

import "./toArray.js"

fn.innerWidth = function (value) {
  return dimension(this, "width", { mode: "inner" }, value)
}
