import { dom } from "./core.js"
import * as methods from "./methods.js"
import * as utilities from "./utilities.js"

class Domtify {
  constructor(els) {
    this.results = els
  }
  get length() {
    return this.results.length
  }
}

for (const key in methods) {
  Domtify.prototype[key] = function (...args) {
    const result = methods[key](...args)(this.results)

    if (key === "get") return result
    if (!Array.isArray(result)) return result

    this.results = result
    return this
  }
}
const $ = (selector, cxt) => new Domtify(dom(selector, cxt))

Object.assign($, utilities)

export default $
