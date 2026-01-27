import { type Moola, moola } from '@/core/moola'
import { unique } from '@/helpers/unique'
import type { Context, Selector } from '@/types'

export function add(this: Moola, selector: Selector, context?: Context) {
  this.elements = unique([
    ...this.elements,
    ...moola(selector, context).elements,
  ])
  return this
}
