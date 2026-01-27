import type { Moola } from '@/core/moola'
import { toArray as helperToArray } from '@/helpers/getArray'

export function toArray(this: Moola) {
  return helperToArray(this)
}
