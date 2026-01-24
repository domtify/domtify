import { isUndefined } from 'is-what'
import type { Context, PipeOperator } from '@/types'

export function parent(selector?: string): PipeOperator {
  return (els: Context) => {
    const result: Context = []
    const seen = new Set()

    for (const el of els) {
      const p = el?.parentNode
      if (!p) continue

      if (p.nodeType === Node.DOCUMENT_FRAGMENT_NODE) continue

      if (!isUndefined(selector)) {
        if (p.nodeType !== Node.ELEMENT_NODE) continue
        if (!(p as Element).matches(selector)) continue
      }

      if (seen.has(p)) continue
      seen.add(p)
      result.push(p)
    }
    return result
  }
}
