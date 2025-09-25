import { domtify, fn } from "@/core.js"

import { flatElements } from "@/utils/flatElements.js"

import "./append.js"

fn.appendTo = function (target) {
  domtify(flatElements(domtify(target))).append(this)
  return this
}
