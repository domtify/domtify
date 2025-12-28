import { query } from "@/core.js"
import { unique } from "@/utils/unique.js"

export const find = (selector) => (els) => {
  let result = []

  // 获取所有候选节点（可能是 selector 匹配的、或者传入的元素/domtify 对象）
  const candidates = query(selector)

  // 遍历元素
  for (const el of els) {
    for (const node of candidates) {
      if (el !== node && el.contains(node)) {
        result.push(node)
      }
    }
  }

  result = unique(result)

  return result
}
