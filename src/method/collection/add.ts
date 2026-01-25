import { select } from '@/helpers/select'
import { unique } from '@/helpers/unique'
import type { PipeOperator, Selector, SelectorContext } from '@/types'

export const add =
  (selector: Selector, context?: SelectorContext): PipeOperator =>
  els =>
    unique([...els, ...select(selector, context)])
