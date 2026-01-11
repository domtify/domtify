import { isArray, isFunction, isString } from 'is-what'
import { isHtmlString } from '@/helpers/isHtmlString'
import { onDOMContentLoaded } from '@/helpers/onDOMContentLoaded'
import type { Context, Selector } from '@/types'
import { parseHTML } from '@/util/parseHTML'

/**
 * 类似轻量版 jQuery 的 DOM 选择函数
 * @param selector CSS选择器、HTML字符串、Node节点、数组/集合或回调函数
 * @param context 可选上下文，默认 document
 * @returns Node[] 选中的节点数组
 */
export const dom = (
  selector: Selector,
  context: Context = document,
): Node[] => {
  let elements: Node[] = []

  if (isString(selector)) {
    // 字符串处理
    if (isHtmlString(selector)) {
      elements = parseHTML(selector, context)
    } else {
      try {
        elements = Array.from(context.querySelectorAll(selector))
      } catch (_error) {
        // 错误的选择器,什么操作都不做
      }
    }
  } else if (
    selector instanceof NodeList ||
    selector instanceof HTMLCollection
  ) {
    // 是直接传递的NodeList或者HTMLCollection集合
    elements = Array.from(selector)
  } else if (isFunction(selector)) {
    // 是函数,就立马进行加载
    onDOMContentLoaded(selector)
  } else if (isArray(selector)) {
    // 是数组直接展开
    elements = [...selector]
  } else if (selector) {
    // 其他单个 Node
    elements.push(selector)
  }

  return elements
}
