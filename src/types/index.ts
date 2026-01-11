export type Selector =
  | string
  | Node
  | Node[]
  | NodeList
  | HTMLCollection
  | (() => void)

export type Context = Document | Element
