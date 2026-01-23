import type { Domtify } from '@/core/Domtify'
import domtify from '@/domtify'
import { type ClassInput, resolveClasses } from '@/helpers/resolveClasses'
import { get, toArray } from '@/method'

domtify.fn.extend({ toArray, get })

export function addClass(this: Domtify, className: ClassInput) {
  for (const [index, element] of this.toArray().entries()) {
    const classes = resolveClasses(element, index, className)

    ;(element as Element)?.classList?.add(...classes)
  }
  return this
}
