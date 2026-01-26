export type MoolaElement = Window | Node

export type Selector =
  | string
  | MoolaElement
  | MoolaElement[]
  | NodeList
  | HTMLCollection
  | (() => void)

export type Context = Document | Element
