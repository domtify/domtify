import { Domtify } from "@/core"

export type Context = Document | Element

declare global {
  interface DomtifyPrototype {}
  // 工具方法接口
  interface DomtifyStatic {
    (selector: DomtifySelector, context?: Document | Element): Domtify
    fn: DomtifyPrototype
  }
}

export type DomtifySelector =
  | string
  | Node
  | NodeList
  | HTMLCollection
  | Array<Node | unknown>
  | Domtify
  | (() => void)
  | null
  | undefined
