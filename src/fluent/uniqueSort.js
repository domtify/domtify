import { isInstanceOf } from 'is-what'
import { unique } from '@/helpers/unique.js'

export const uniqueSort = () => els => {
  const result = unique(els.filter(el => isInstanceOf(el, Element)))

  result.sort((a, b) => {
    if (a === b) return 0
    return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING
      ? -1
      : 1
  })

  return result
}
