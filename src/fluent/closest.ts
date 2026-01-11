import { dom } from '@/core/dom.js'
import { unique } from '@/helpers/unique.js'

export const closest = (selector, context) => els => {
  const result = []

  // 先获取到所有的候选集合数组
  const candidates =
    context instanceof Element ? dom(selector, context) : dom(selector)

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
