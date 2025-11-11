import { fn, domtify, DomtifySelector, Domtify, Context } from "@/core.js"
import { uniqueArray } from "@/utils/uniqueArray.js"
import "./get.js"

declare global {
  interface DomtifyPrototype {
    add(selector: DomtifySelector, context?: Context): Domtify
  }
}

fn.add = function (this: Domtify, selector: DomtifySelector, context: Context) {
  return domtify(
    uniqueArray([...this.get(), ...domtify(selector, context).get()]),
  )
}
