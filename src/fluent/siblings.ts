import { unique } from '@/helpers/unique'

export const siblings = selector => els => {
  const results = []

  for (const el of els) {
    let node = el.parentElement?.firstElementChild
    if (!node) continue

    while (node) {
      if (node !== el) {
        results.push(node)
      }
      node = node.nextElementSibling
    }
  }

  const uniqueResults = unique(results)

  return selector
    ? uniqueResults.filter(el => el.matches(selector))
    : uniqueResults
}
