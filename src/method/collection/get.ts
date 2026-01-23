import { isNull, isUndefined } from 'is-what'
import type { Domtify } from '@/core/Domtify'
import { d } from '@/domtify'
import { toArray } from '@/method'

d.fn.extend({ toArray })

export function get(this: Domtify, index) {
  if (isUndefined(index) || isNull(index)) return this.toArray()

  const i = Number(index)
  return Number.isInteger(i) ? this.toArray().at(i) : undefined
}
