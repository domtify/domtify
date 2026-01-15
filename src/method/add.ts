import { dom } from '@/core/dom'
import { unique } from '@/helpers/unique'
import type { Context, Selector } from '@/types'

/**
 * 将指定 selector 的元素添加到已有元素数组中，并去重
 * @param selector CSS选择器、Node、Node数组、NodeList、HTMLCollection 或函数
 * @param context 可选上下文
 * @returns 高阶函数，接收现有元素数组并返回合并去重后的元素数组
 */
export const add =
  (selector: Selector, context?: Context) =>
  (els: Node[]): Node[] =>
    unique([...els, ...dom(selector, context)])
