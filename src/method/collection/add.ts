import { unique } from '@/helpers/unique'
import type { Context, Selector, SelectorContext } from '@/types'

export function add(selector: Selector, context?: SelectorContext) {
  return unique([...els, ...select(selector, context)])
}
