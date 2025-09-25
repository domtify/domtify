import { isUndefined } from "is-what"
import { uniqueArray } from "./uniqueArray.js"
import { domtify } from "@/core.js"

/**
 * 通用的兄弟节点获取方法 (支持 until / filter)
 * @param {Array<Element>} elements - 元素集合
 * @param {"next" | "prev"} direction - 遍历方向
 * @param {Object} options
 *   - {boolean} [all=false] 是否获取所有兄弟 (false=只一个, true=所有)
 *   - {string|Element|Array|jQueryObject} [until] 停止条件
 *   - {string} [filter] 可选的选择器过滤
 */
function siblings(elements, direction, options = {}) {
  const { all = false, until, filter } = options

  let result = []
  const untilElements = !isUndefined(until) ? domtify(until).toArray() : []

  for (const el of elements) {
    let sibling =
      direction === "next" ? el.nextElementSibling : el.previousElementSibling

    while (sibling) {
      // until 条件遇到就停止
      if (untilElements.length && untilElements.includes(sibling)) break

      result.push(sibling)

      if (!all) break // 只要一个就退出

      sibling =
        direction === "next"
          ? sibling.nextElementSibling
          : sibling.previousElementSibling
    }
  }

  // 去重
  result = uniqueArray(result)

  // filter 过滤
  if (!isUndefined(filter)) {
    result = result.filter((el) => el.matches(filter))
  }

  return result
}

export { siblings }
