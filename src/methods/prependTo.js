import { domtify, fn } from "@/core.js"
import { flatElements } from "@/utils/flatElements.js"

import "./prepend.js"

fn.prependTo = function (target) {
  domtify(flatElements(domtify(target))).prepend(this)

  return this
}
