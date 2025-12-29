import { dom } from "@/core.js"
import { unique } from "@/utils/unique.js"

export const find = (selector) => (els) => {
  const result = []

  // 获取所有候选节点
  const candidates = dom(selector)

  // 遍历元素
  for (const el of els) {
    for (const node of candidates) {
      if (el !== node && el.contains(node)) {
        result.push(node)
      }
    }
  }

  return unique(result)
}
