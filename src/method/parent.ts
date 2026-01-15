import { isUndefined } from 'is-what'

export function parent<E extends Element = HTMLElement>(
  selector?: string,
): (els: Iterable<Node>) => E[]

export function parent(
  selector?: string,
): (els: Iterable<Node>) => (Element | Document)[] {
  return (els: Iterable<Node>) => {
    const result: (Element | Document)[] = []
    const seen = new Set<Node>()

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
      result.push(p as Element | Document)
    }

    return result
  }
}
