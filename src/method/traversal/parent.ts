import { isInstanceOf, isUndefined } from 'is-what'
import type { PipeOperator } from '@/types'

export function parent(selector?: string): PipeOperator {
  return els => {
    const result: typeof els = []

    const seen = new Set()

    for (const el of els) {
      if (!(el instanceof Element)) continue

      const p = el.parentNode
      if (!p) continue

      if (p.nodeType === Node.DOCUMENT_FRAGMENT_NODE) continue

      if (!isUndefined(selector) && p instanceof Element) {
        if (!p.matches(selector)) continue
      }

      if (seen.has(p)) continue
      seen.add(p)
      result.push(p)
    }
    return result
  }
}
