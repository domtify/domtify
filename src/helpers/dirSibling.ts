import { isUndefined } from 'is-what'
import { select } from './select'
import { unique } from './unique'

/**
 * 通用的兄弟节点获取方法
 * @param {Array<Element>} elements - 元素集合
 * @param {"next" | "previous"} direction - 遍历方向
 * @param {Object} options
 *   - {boolean} [all=false] 是否获取所有兄弟 (false=只一个, true=所有)
 *   - {string|Element|Array|jQueryObject} [until] 停止条件
 *   - {string} [filter] 可选的选择器过滤
 */
export const dirSibling = (elements, direction, options = {}) => {
  const { all = false, until, filter } = options

  let result = []
  const untilElements = !isUndefined(until) ? select(until) : []

  for (const el of elements) {
    let sibling = el[`${direction}ElementSibling`]

    while (sibling) {
      // until 条件遇到就停止
      if (untilElements.length && untilElements.includes(sibling)) break

      result.push(sibling)

      if (!all) break // 只要一个就退出

      sibling = sibling[`${direction}ElementSibling`]
    }
  }

  // 去重
  result = unique(result)

  // filter 过滤
  if (!isUndefined(filter)) {
    result = result.filter(el => el.matches(filter))
  }

  return result
}
