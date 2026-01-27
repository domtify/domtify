import { type ClassInput, resolveClasses } from '@/helpers/resolveClasses'
import type { Moola } from '@/index'

export function addClass(this: Moola, className: ClassInput) {
  for (const [index, element] of this.elements.entries()) {
    const classes = resolveClasses(element, index, className)
    ;(element as Element)?.classList?.add(...classes)
  }
  return this
}
