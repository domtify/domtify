import type { Domtify } from '@/core/Domtify'

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

// 原型方法接口（可扩展）
export interface DomtifyPrototype {
  // 基础原型方法
  domtify: string
  find: (selector: string) => Domtify
  extend(methods: PlainObject<Function>): void
  toArray(): []
}

// 静态方法接口
export interface DomtifyStatic {
  // 构造函数
  (selector: Selector, context?: SelectorContext): Domtify

  // 原型链引用
  fn: DomtifyPrototype
}
export type PlainObject<T> = Record<string, T>
