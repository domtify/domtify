export type ContextUnit = Window | Node
export type Context = ContextUnit[]

export type Selector =
  | string
  | ContextUnit
  | Context
  | NodeList
  | HTMLCollection
  | (() => void)

export type SelectorContext = Document | Element

// 大部分方法的签名
// export type InsertTo = <T extends Element = Element>(
//   target: Selector,
// ) => (els: T[]) => T[]
