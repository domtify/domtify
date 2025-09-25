import { domtify, fn } from "@/core.js"
import { flatElements } from "@/utils/flatElements.js"

import "./before.js"

fn.insertBefore = function (target) {
  domtify(flatElements(domtify(target))).before(this)
  return this
}
