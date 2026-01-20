import { select } from '@/core/select'
import { unique } from '@/helpers/unique'
import type { Context, Selector, SelectorContext } from '@/types'

export const add =
  (selector: Selector, context?: SelectorContext) => (els: Context) =>
    unique([...els, ...select(selector, context)])
