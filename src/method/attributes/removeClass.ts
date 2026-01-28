import { type ClassInput, resolveClasses } from '@/helpers/resolveClasses'
import type { Moola } from '@/index'

export function removeClass(this: Moola, className: ClassInput) {
  for (const [index, element] of this.elements.entries()) {
    const classes = resolveClasses(element, index, className)
    ;(element as Element)?.classList?.remove(...classes)
  }
  return this
}
