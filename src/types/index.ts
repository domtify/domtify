export type ContextUnit = Window | Node
export type Context = ContextUnit[]

export interface ContextListOf<T extends ContextUnit = ContextUnit>
  extends ReadonlyArray<T> {}

export type Selector =
  | string
  | ContextUnit
  | Context
  | NodeList
  | HTMLCollection
  | (() => void)

export type NoFuncSelector = Exclude<Selector, Function>
export type SelectorContext = Document | Element

export type TerminalOperator<R, T = Context> = (ctx: T) => R

export type PipeOperator<T = ContextUnit> = (ctx: T[]) => ContextUnit[]
export type OperatorInput = PipeOperator | OperatorInput[]
