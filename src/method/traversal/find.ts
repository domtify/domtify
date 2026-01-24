import { select } from '@/helpers/select'

export const find = selector => els => {
  const candidates = select(selector)
  const roots = new Set(els)
  const result = []

  for (const node of candidates) {
    let cur = node.parentNode

    while (cur) {
      if (roots.has(cur)) {
        result.push(node)
        break
      }
      cur = cur.parentNode
    }
  }

  return result
}
