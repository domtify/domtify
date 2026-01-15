import { isUndefined } from 'is-what'

type ParentNode = Element

export const parent =
  (selector?: string) =>
  (els: Iterable<Element>): ParentNode[] => {
    const result: ParentNode[] = []
    const seen = new Set<ParentNode>()

    for (const el of els) {
      const p = el?.parentNode
      if (!p) continue
      if (p.nodeType === Node.DOCUMENT_FRAGMENT_NODE) continue

      if (!isUndefined(selector) && !p.matches(selector)) continue
      if (seen.has(p)) continue

      seen.add(p)
      result.push(p)
    }

    return result
  }
