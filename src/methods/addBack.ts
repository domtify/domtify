import { fn, Domtify } from "@/core.js"
import { pushStack } from "@/utils/pushStack.js"
import "./toArray.js"

declare global {
  interface DomtifyPrototype {
    addBack(selector?: string): Domtify
  }
}

fn.addBack = function (this: Domtify, selector?: string): Domtify {
  let result: Element[] =
    this.prevObject instanceof Domtify
      ? (this.prevObject.toArray() as Element[])
      : []

  if (selector) {
    result = result.filter((el) => el.matches(selector))
  }

  return pushStack(this, [...result, ...this.toArray()])
}
