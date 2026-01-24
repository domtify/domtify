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

export type PipeOperator<T = Context> = (ctx: T) => Context
export type TerminalOperator<R, T = Context> = (ctx: T) => R
export type Operator<T = Context> = (ctx: T) => T
export type OperatorInput = PipeOperator | OperatorInput[]
