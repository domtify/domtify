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
