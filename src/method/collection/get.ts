import { isNull, isUndefined } from 'is-what'
import type { Moola } from '@/core/moola'

export function get(this: Moola, index?: number) {
  if (isUndefined(index) || isNull(index)) return this.elements

  const i = Number(index)
  return Number.isInteger(i) ? this.elements.at(i) : undefined
}
