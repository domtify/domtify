import { fn, domtify } from "@/core.js"
import { uniqueArray } from "@/utils/uniqueArray.js"
import "./get.js"

fn.add = function (selector, context) {
  return domtify(
    uniqueArray([...this.get(), ...domtify(selector, context).get()]),
  )
}
