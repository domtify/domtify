import { el } from "@/core.js"
import { unique } from "@/utils/unique.js"

export const closest = (selector, context) => (els) => {
  const result = []

  // 先获取到所有的候选集合数组
  const candidates =
    context instanceof Element ? el(selector, context) : el(selector)

  for (const el of els) {
    let current = el
    while (current) {
      // 实际上这整个while就是在模拟原生的api的closest的行为
      if (candidates.includes(current)) {
        result.push(current)
        break
      }
      current = current.parentElement
    }
  }

  return unique(result)
}
