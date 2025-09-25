import { domtify, fn } from "@/core.js"
import { flatElements } from "@/utils/flatElements.js"

import "./after.js"

fn.insertAfter = function (target) {
  domtify(flatElements(domtify(target))).after(this)
  return this
}
