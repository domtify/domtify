import { isString, isInstanceOf, isArray, isFunction } from "is-what"
import { isHtmlString, parseHTML } from "@/utils/parseHtml.js"
import { version } from "../package.json" with { type: "json" }

import type { DomtifySelector, Context } from "./types.js"

export type * from "./types.js"

/**
 * Domtify 类，用于模拟 jQuery 的核心选择器行为
 */
class Domtify {
  /** 上一个对象（模仿 jQuery 的 prevObject） */
  prevObject: Domtify | null = null

  /** 元素个数 */
  length!: number;

  /** 动态挂载元素索引 */
  [index: number]: unknown

  constructor(selector: DomtifySelector, context: Context = document) {
    let elements: unknown[] = []

    // 已经是实例，直接返回
    if (isInstanceOf(selector, "Domtify")) {
      return selector as Domtify
    } else if (isString(selector)) {
      // 字符串选择器
      if (isHtmlString(selector)) {
        elements = parseHTML(selector)
      } else {
        try {
          elements = Array.from(
            (context as Element | Document).querySelectorAll(selector),
          )
        } catch {
          // 无效选择器忽略
        }
      }
    } else if (
      isInstanceOf(selector, NodeList) ||
      isInstanceOf(selector, HTMLCollection)
    ) {
      // NodeList 或 HTMLCollection
      elements = Array.from(selector as NodeListOf<Element>)
    } else if (isFunction(selector)) {
      // 函数回调 -> DOMContentLoaded
      elements.push(document)
      this.#onDOMContentLoaded(selector as () => void)
    } else if (isArray(selector)) {
      elements = [...(selector as Array<Element | Document>)]
    } else if (selector) {
      elements.push(selector as Element | Document)
    }

    // 将元素挂载到实例上
    for (const [index, element] of elements.entries()) {
      this[index] = element
    }
    this.length = elements.length
  }

  /** DOMContentLoaded 回调管理 */
  static #domContentLoadedCallbacks: Array<() => void> = []

  /** 内部方法：执行或延迟执行 DOMContentLoaded 回调 */
  #onDOMContentLoaded(callback: () => void): void {
    if (document.readyState === "loading") {
      // 首次添加监听器
      if (!Domtify.#domContentLoadedCallbacks.length) {
        document.addEventListener("DOMContentLoaded", () => {
          for (const cb of Domtify.#domContentLoadedCallbacks) cb()
        })
      }
      Domtify.#domContentLoadedCallbacks.push(callback)
    } else {
      callback()
    }
  }

  /** 模拟 jQuery 的版本属性 */
  domtify: string = version
}

interface Domtify extends DomtifyPrototype {}

// 给类的原型对象定义别名
const fn: DomtifyPrototype = Domtify.prototype

/** 检查是否为 ID 选择器 */
function isIDSelector(selector: string): boolean {
  return selector.trimStart().startsWith("#")
}

const domtify = ((selector: DomtifySelector, context?: Document | Element) => {
  const d = new Domtify(selector, context)

  const property = "prevObject" as const
  if (
    isString(selector) &&
    !isHtmlString(selector) &&
    !isIDSelector(selector)
  ) {
    const prev = new Domtify(context)
    Reflect.deleteProperty(prev, property)
    d.prevObject = prev
  } else {
    Reflect.deleteProperty(d, property)
  }

  return d
}) as DomtifyStatic

domtify.fn = domtify.prototype = fn

export { domtify, fn, Domtify }
