import { isUndefined } from "is-what"
import { fn, Domtify } from "@/core.js"
import { pushStack } from "@/utils/pushStack.js"

import "./get.js"

declare global {
  interface DomtifyPrototype {
    eq(index: number): Domtify
  }
}

fn.eq = function (this: Domtify, index: number) {
  const result = []
  const find = this.get(index)
  !isUndefined(find) && result.push(find)
  return pushStack(this, result)
}
