import { fn, Domtify } from "@/core"

declare global {
  interface DomtifyPrototype {
    toArray(): Array<unknown>
  }
}

// 实现方法
fn.toArray = function (this: Domtify) {
  return Array.from(this)
}
