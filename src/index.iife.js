import { el } from "./core.js"
import * as methods from "./methods.js"
import * as utilities from "./utilities.js"

class Domtify {
  constructor(elements) {
    this.elements = elements
    this.length = elements.length
  }
}

for (const key in methods) {
  Domtify.prototype[key] = function (...args) {
    const result = methods[key](...args)(this.elements)

    if (key === "get") return result
    if (!Array.isArray(result)) return result

    this.elements = result
    return this
  }
}
const $ = (selector, cxt) => new Domtify(el(selector, cxt))

Object.assign($, utilities)

export default $
