import { isUndefined } from 'is-what'

export const parent = selector => els => {
  const result = []
  const seen = new Set()

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
