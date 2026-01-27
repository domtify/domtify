import type { Moola } from '@/core/moola'

export type MoolaElement = Window | Node

export type Selector =
  | string
  | MoolaElement
  | MoolaElement[]
  | NodeList
  | HTMLCollection
  | (() => void)

export type Context = Document | Element

export type FnMethods = Record<string, (this: Moola, ...args: any[]) => any>

export interface MoolaStatic {
  (selector: Selector, context?: Context): Moola
  fn: Moola
  use: (methods: FnMethods) => MoolaStatic
}
